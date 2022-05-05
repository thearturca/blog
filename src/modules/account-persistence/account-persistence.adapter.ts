import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NewUserEntity } from "../users/new-user.entity.";
import { UserEntity } from "../users/user.entity";
import { UsersAccountPort } from "../users/users-account.port";
import { AccountMapper } from "./account.mapper";
import { AccountOrmEntity } from "./account.orm-entity";

@Injectable()
export class AccountPersistenceAdapter implements UsersAccountPort 
{
    constructor(
        @InjectRepository(AccountOrmEntity) private readonly _accountRepository: Repository<AccountOrmEntity>,
    ) {}

    async loadAuthAccount(username: string): Promise<UserEntity | null> 
    {
        const account: AccountOrmEntity | undefined = await this._accountRepository.findOne({username: username});
        if (account === undefined) 
        {
            return null;
        }
        return AccountMapper.mapToAuthUserEntity(account);
    }

    async addNewAccount(account: NewUserEntity): Promise<UserEntity> 
    {
        const newUser: AccountOrmEntity = await this._accountRepository.save(AccountMapper.mapNewUserToAccountOrmEntity(account));
        return AccountMapper.mapToAuthUserEntity(newUser);
    }

    async findUsernameById(userId: number): Promise<string | null>
    {
        const user: AccountOrmEntity | undefined = await this._accountRepository.findOne({id: userId});
        if (user === undefined)
        {
            return null;
        }
        const username = user.username;
        return username;
    }
}