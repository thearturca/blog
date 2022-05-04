import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountPersistenceAdapter } from "./account-persistence.adapter";
import { AccountOrmEntity } from "./account.orm-entity";

@Global()
@Module({
    imports: 
    [
        TypeOrmModule.forFeature([AccountOrmEntity])
    ],
    providers: 
    [AccountPersistenceAdapter],
    exports: [AccountPersistenceAdapter]
})
export class AccountPersistenceModule {}