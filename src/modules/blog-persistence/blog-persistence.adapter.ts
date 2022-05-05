import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlogPostEntity } from "../blog/blog-post.entity";
import { BlogPort } from "../blog/blog.port";
import { BlogMapper } from "./blog.mapper";
import { BlogOrmEntity } from "./blog.orm-entity";

@Injectable()
export class BlogPersistenceAdapter implements BlogPort
{
    constructor(@InjectRepository(BlogOrmEntity) private readonly _blogRepository: Repository<BlogOrmEntity>) {}

    async loadAllBlogPosts(): Promise<BlogPostEntity[]> 
    {
        const blogPostOrmEntities: BlogOrmEntity[] = await this._blogRepository.find();
        const blogPosts: BlogPostEntity[] = [];
        blogPostOrmEntities.forEach((blogOrmEntity) =>
        {
            blogPosts.push(BlogMapper.mapBlogOrmEntityToBlogPostEntity(blogOrmEntity));
        });
        return blogPosts;
    }

    async saveNewBlogPost(blogPost: BlogPostEntity): Promise<BlogPostEntity> 
    {
        const newBlogOrmEntity: BlogOrmEntity = await this._blogRepository.save(BlogMapper.mapBlogPostEntityToBlogOrmEntity(blogPost));
        return BlogMapper.mapBlogOrmEntityToBlogPostEntity(newBlogOrmEntity);
    }

}