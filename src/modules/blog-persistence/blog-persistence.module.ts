import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { BlogFilesOrmEntity } from "./blog-files.orm-entity";
import { BlogPersistenceAdapter } from "./blog-persistence.adapter";
import { BlogOrmEntity } from "./blog.orm-entity";

@Global()
@Module({
    imports: 
    [
        TypeOrmModule.forFeature([BlogOrmEntity, BlogFilesOrmEntity]), UsersModule
    ],
    providers: 
    [BlogPersistenceAdapter],
    exports: [BlogPersistenceAdapter]
})
export class BlogPersistenceModule {}