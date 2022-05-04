import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AccountPersistenceModule } from './modules/account-persistence/account-persistence.module';
import { AccountWebModule } from './modules/account-web/account-web.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

const routes: Routes = 
[{
  path: "api",
  module: AccountWebModule
}];

@Module(
{
  imports: [
    ConfigModule.forRoot(
    {
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
    {
      type: 'sqlite',
      database: join(__dirname, '..', 'data', 'data.db'),
      logging: false,
      synchronize: true,
      autoLoadEntities: true
    }),
    AccountPersistenceModule,
    AccountWebModule,
    AuthModule,
    UsersModule,
    RouterModule.register(routes)],
  controllers: [],
  providers: [],
})
export class AppModule {}
