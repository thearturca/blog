import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogPersistenceAdapter } from "./blog-persistence.adapter";
import { BlogOrmEntity } from "./blog.orm-entity";

@Global()
@Module({
    imports: 
    [
        TypeOrmModule.forFeature([BlogOrmEntity])
    ],
    providers: 
    [BlogPersistenceAdapter],
    exports: [BlogPersistenceAdapter]
})
export class BlogPersistenceModule {}