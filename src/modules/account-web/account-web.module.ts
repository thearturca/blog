import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AccountAuthController } from "./account-auth.controller";

@Module({
    imports: [AuthModule],
    controllers: [AccountAuthController]
})
export class AccountWebModule {}