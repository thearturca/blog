import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { UserReq } from "../auth/req.user";
import { NewUserEntity } from "../users/new-user.entity.";

@Controller("/auth")
export class AccountAuthController 
{
    constructor 
    (
        @Inject(AuthService) private readonly _authService: AuthService
    ) 
    {}

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Req() req: UserReq) 
    {
        return await this._authService.login(req.user);
    }

    @Post("/register")
    async register(@Body() user: NewUserEntity) 
    {
        return this._authService.register(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/profile")
    getProfile(@Req() req: UserReq) 
    {
        if(!req.user) 
        {
            throw new HttpException('unauthorized', HttpStatus.FORBIDDEN)
        }
        return req.user;
    }
}