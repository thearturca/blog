import { Module } from '@nestjs/common';
import { AccountPersistenceModule } from '../account-persistence/account-persistence.module';
import { UsersService } from './users.service';

@Module({
  imports:[AccountPersistenceModule],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
