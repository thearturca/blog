import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccountPersistenceAdapter } from "../account-persistence/account-persistence.adapter";
import { BlogPostEntity } from "../blog/blog-post.entity";
import { BlogPort } from "../blog/blog.port";
import { UsersService } from "../users/users.service";
import { BlogMapper } from "./blog.mapper";
import { BlogOrmEntity } from "./blog.orm-entity";

@Injectable()
export class BlogPersistenceAdapter implements BlogPort
{
    constructor(@InjectRepository(BlogOrmEntity) private readonly _blogRepository: Repository<BlogOrmEntity>,
    @Inject(UsersService) private readonly _userService: UsersService){}

    async loadAllBlogPosts(): Promise<BlogPostEntity[]> 
    {
        const blogPostOrmEntities: BlogOrmEntity[] = await this._blogRepository.find();
        const blogPosts: BlogPostEntity[] = [];
        await Promise.all(blogPostOrmEntities.map(async (blogOrmEntity) =>
        {
            const blogPostOwnerUsername: string = await this._userService.findUsernameByUserId(blogOrmEntity.ownerId);
            return blogPosts.push(BlogMapper.mapBlogOrmEntityToBlogPostEntity(blogOrmEntity, blogPostOwnerUsername));
        }));
        return blogPosts;
    }

    async saveNewBlogPost(blogPost: BlogPostEntity): Promise<BlogPostEntity> 
    {
        const newBlogOrmEntity: BlogOrmEntity = await this._blogRepository.save(BlogMapper.mapBlogPostEntityToBlogOrmEntity(blogPost));
        const blogPostOwnerUsername: string = await this._userService.findUsernameByUserId(blogPost.ownerId);
        return BlogMapper.mapBlogOrmEntityToBlogPostEntity(newBlogOrmEntity, blogPostOwnerUsername);
    }

    async loadBlogPost(blogPostId: number): Promise<BlogPostEntity> 
    {
        const blogOrmEntity: BlogOrmEntity = await this._blogRepository.findOne({id:blogPostId});
        const blogPostOwnerUsername: string = await this._userService.findUsernameByUserId(blogOrmEntity.ownerId);
        return BlogMapper.mapBlogOrmEntityToBlogPostEntity(blogOrmEntity, blogPostOwnerUsername);
    }

    async removeBlogPost(blogPostId: number): Promise<BlogPostEntity> 
    {
        const blogOrmEntity: BlogOrmEntity = await this._blogRepository.findOne({id:blogPostId});
        const blogPostOwnerUsername: string = await this._userService.findUsernameByUserId(blogOrmEntity.ownerId);
        const removedOrmentity = await this._blogRepository.remove(blogOrmEntity);
        return BlogMapper.mapBlogOrmEntityToBlogPostEntity(removedOrmentity, blogPostOwnerUsername )
    }

}