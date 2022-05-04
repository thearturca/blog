import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv';
import { Payload } from "./auth.service";

dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) 
{
    constructor () 
    {
        super
        ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExiration: true,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: Payload) 
    {
        return {id: payload.sub, username: payload.username,}
    }
}