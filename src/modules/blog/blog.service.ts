import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { BlogPersistenceAdapter } from "../blog-persistence/blog-persistence.adapter";
import { BlogPostEntity, FileEntity } from "./blog-post.entity";
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

    async updateBlogPost(blogPostId: number, body: string, blogPostOwnerId: number): Promise<BlogPostEntity>
    {
        const currentBlogPost: BlogPostEntity = await this._blogPort.loadBlogPost(blogPostId);
        if (currentBlogPost.ownerId !== blogPostOwnerId)
        {
            throw new HttpException("Forbidden", HttpStatus.CONFLICT)
        }
        const updatedBlogPost: BlogPostEntity = new BlogPostEntity(currentBlogPost.timestamp, body, currentBlogPost.ownerId, currentBlogPost.ownerUsername, currentBlogPost.files, currentBlogPost.id);
        return await this._blogPort.saveNewBlogPost(updatedBlogPost);
    }

    async removeBlogPost(blogPostId: number, blogPostOwnerId: number): Promise<BlogPostEntity>
    {
        const currentBlogPost: BlogPostEntity = await this._blogPort.loadBlogPost(blogPostId);
        if (currentBlogPost.ownerId !== blogPostOwnerId)
        {
            throw new HttpException("Forbidden", HttpStatus.CONFLICT)
        }
        return await this._blogPort.removeBlogPost(blogPostId);
    }

    async uploadFile(file: FileEntity, blogPostId: number, ownerId: number): Promise<FileEntity>
    {
        return await this._blogPort.uploadBlogFile(file, blogPostId);
    }
}