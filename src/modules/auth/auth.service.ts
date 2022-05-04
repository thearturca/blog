import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NewUserEntity } from '../users/new-user.entity.';
import { UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';

export interface Payload 
{
    sub: number;
    username: string;
}

export interface UserPayload 
{
    readonly id: number,
    readonly username: string,
    readonly fullName: string,
}

@Injectable()
export class AuthService 
{
    constructor 
    (
        @Inject(UsersService) private readonly _usersService: UsersService,
        @Inject(JwtService) private readonly _jwtService: JwtService
    ) {}

    async validateUser(accountId: string, secret: string): Promise<UserEntity | null> 
    {
        const user = await this._usersService.findOne(accountId);
        if (!user) 
        {
            return null;
        }
        const isMatch: boolean = await bcrypt.compare(secret, user.userSecret);
        
        if(user && isMatch) 
        {
            return user;
        }
        return null;
    }

    async register(user: NewUserEntity) 
    {
        const IsUserExistByUsername: UserEntity | null = await this._usersService.findOne(user.username);
        if(IsUserExistByUsername !== null) 
        {
            throw new HttpException('Username already exist', HttpStatus.CONFLICT);
        }
        const newUser: UserEntity = await this._usersService.addNewUser(user);
        return await this.login(newUser);
    }

    async login(user: UserEntity) 
    {
        const payload: Payload = 
        {
            username: user.username, 
            sub: user.id,
        };
        
        const userPayload: UserPayload = 
        {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
        };

        return {
            user: userPayload,
            access_token: this._jwtService.sign(payload)
        };
    }
}