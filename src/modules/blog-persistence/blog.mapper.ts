import { BlogPostEntity } from "../blog/blog-post.entity";
import { BlogOrmEntity } from "./blog.orm-entity";

export class BlogMapper
{
    static mapBlogOrmEntityToBlogPostEntity(blogOrmEntity: BlogOrmEntity, username: string): BlogPostEntity
    {
        return new BlogPostEntity(blogOrmEntity.timestamp, blogOrmEntity.body, blogOrmEntity.ownerId, username, blogOrmEntity.id);
    }

    static mapBlogPostEntityToBlogOrmEntity(blogPost: BlogPostEntity): BlogOrmEntity
    {
        const blogOrmEntity: BlogOrmEntity = new BlogOrmEntity();
        blogOrmEntity.body = blogPost.body;
        blogOrmEntity.ownerId = blogPost.ownerId;
        blogOrmEntity.timestamp = blogPost.timestamp;
        blogOrmEntity.id = blogPost.id;
        return blogOrmEntity;
    }
}