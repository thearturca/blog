import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BlogModule } from "../blog/blog.module";
import { UsersModule } from "../users/users.module";
import { AccountAuthController } from "./account-auth.controller";
import { BlogController } from "./blog.controller";

@Module({
    imports: [AuthModule, BlogModule, UsersModule],
    controllers: [AccountAuthController, BlogController]
})
export class AccountWebModule {}