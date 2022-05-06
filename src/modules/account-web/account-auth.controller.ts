import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService, LoginPayload } from "../auth/auth.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { UserReq } from "../auth/req.user";
import { NewUserEntity } from "../users/new-user.entity.";
import { ApiBody, ApiProperty, ApiResponse } from '@nestjs/swagger';

class loginDTO
{
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}

@Controller("/auth")
export class AccountAuthController 
{
    constructor 
    (
        @Inject(AuthService) private readonly _authService: AuthService
    ) 
    {}

    @ApiResponse({type: LoginPayload})
    @ApiBody({ type: loginDTO,  })
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Req() req: UserReq) 
    {
        return await this._authService.login(req.user);
    }

    @ApiResponse({type: LoginPayload})
    @Post("/register")
    async register(@Body() user: NewUserEntity) 
    {
        return this._authService.register(user);
    }

    @ApiResponse({type: UserReq, description: "Bearer authorization required"})
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