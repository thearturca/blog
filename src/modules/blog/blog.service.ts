import { Inject, Injectable } from "@nestjs/common";
import { BlogPersistenceAdapter } from "../blog-persistence/blog-persistence.adapter";
import { BlogPostEntity } from "./blog-post.entity";
import { BlogPort } from "./blog.port";

@Injectable()
export class BlogService 
{
    constructor(@Inject(BlogPersistenceAdapter) private readonly _blogPort: BlogPort) {}

    async loadBlogPosts(): Promise<BlogPostEntity[]> 
    {
        return await this._blogPort.loadAllBlogPosts();
    }

    async saveBlogPost(blogPost: BlogPostEntity): Promise<BlogPostEntity>
    {
        return await this._blogPort.saveNewBlogPost(blogPost);
    }
}