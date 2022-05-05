import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { AccountPersistenceAdapter } from '../account-persistence/account-persistence.adapter';
import { NewUserEntity } from './new-user.entity.';
import { UserEntity } from './user.entity';
import { UsersAccountPort } from './users-account.port';

@Injectable()
export class UsersService {
    constructor (
        @Inject(AccountPersistenceAdapter) private readonly _usersLoadAccountPort: UsersAccountPort
    ) {}
    
    async findOne(accountId: string): Promise<UserEntity | null> {
        const account: UserEntity | null = await this._usersLoadAccountPort.loadAuthAccount(accountId);
        return account;
      }

    async findUsernameByUserId(userId: number): Promise<string | null> {
        const username: string | null = await this._usersLoadAccountPort.findUsernameById(userId);
        return username;
    }

    async addNewUser(user: NewUserEntity): Promise<UserEntity> {
        const hashedPassword: string = await bcrypt.hash(user.userSecret, 10);
        const userWithHashedPassword: NewUserEntity = new NewUserEntity(user.username, hashedPassword, user.fullName,)
        return await this._usersLoadAccountPort.addNewAccount(userWithHashedPassword);
    }
}
