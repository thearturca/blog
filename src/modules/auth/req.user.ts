import { NewUserEntity } from "../users/new-user.entity.";
import { UserEntity } from "../users/user.entity";


export interface UserReq {
    user: UserEntity;
}

export interface NewUserReq {
    user: NewUserEntity;
}