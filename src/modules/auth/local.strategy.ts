import { ForbiddenException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserEntity } from "../users/user.entity";
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) 
{
    constructor(@Inject(AuthService) private readonly _authService: AuthService) 
    {
        super();
    }

    async validate(username: string, password: string): Promise<UserEntity> 
    {
        const user: UserEntity = await this._authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}