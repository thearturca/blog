import { NewUserEntity } from "../users/new-user.entity.";
import { UserEntity } from "../users/user.entity";
import {  ApiProperty } from "@nestjs/swagger"

export class UserReq {
    @ApiProperty()
    user: UserEntity;
}

export interface NewUserReq {
    user: NewUserEntity;
}