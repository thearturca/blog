import { NewUserEntity } from "../users/new-user.entity.";
import { UserEntity } from "../users/user.entity";
import { AccountOrmEntity } from "./account.orm-entity";


export class AccountMapper 
{
    static mapToAuthUserEntity(user: AccountOrmEntity): UserEntity 
    {
        return new UserEntity(user.id, user.username, user.userSecret, user.fullName)
    }

    static mapNewUserToAccountOrmEntity(account: NewUserEntity): AccountOrmEntity 
    {
        const accountOrmEntity: AccountOrmEntity = new AccountOrmEntity();
        accountOrmEntity.username = account.username;
        accountOrmEntity.fullName = account.fullName;
        accountOrmEntity.userSecret = account.userSecret;
        return accountOrmEntity;
    }
}