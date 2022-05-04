import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogPersistenceAdapter } from "./blog-persistence.adapter";

@Global()
@Module({
    imports: 
    [
        TypeOrmModule.forFeature([])
    ],
    providers: 
    [BlogPersistenceAdapter],
    exports: [BlogPersistenceAdapter]
})
export class BlogPersistenceModule {}