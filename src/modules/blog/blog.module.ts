import { Global, Module } from "@nestjs/common";
import { BlogPersistenceModule } from "../blog-persistence/blog-persistence.module";
import { BlogService } from "./blog.service";

@Global()
@Module({
    imports: [BlogPersistenceModule],
    providers: [BlogService],
    exports: [BlogService]
})
export class BlogModule {}