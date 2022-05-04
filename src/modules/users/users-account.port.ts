import { NewUserEntity } from "./new-user.entity.";
import { UserEntity } from "./user.entity";


export interface UsersAccountPort 
{
    loadAuthAccount(username: string): Promise<UserEntity | null>
    addNewAccount(user: NewUserEntity): Promise<UserEntity>
}