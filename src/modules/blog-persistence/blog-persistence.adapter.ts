import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlogPostEntity, FileEntity } from "../blog/blog-post.entity";
import { BlogPort } from "../blog/blog.port";
import { UsersService } from "../users/users.service";
import { BlogFilesOrmEntity } from "./blog-files.orm-entity";
import { BlogMapper } from "./blog.mapper";
import { BlogOrmEntity } from "./blog.orm-entity";

@Injectable()
export class BlogPersistenceAdapter implements BlogPort
{
    constructor(@InjectRepository(BlogOrmEntity) private readonly _blogRepository: Repository<BlogOrmEntity>,
    @InjectRepository(BlogFilesOrmEntity)  private readonly _filesRepository: Repository<BlogFilesOrmEntity>,
    @Inject(UsersService) private readonly _userService: UsersService){}

    async loadAllBlogPosts(): Promise<BlogPostEntity[]> 
    {
        const blogPostOrmEntities: BlogOrmEntity[] = await this._blogRepository.find();
        const blogPosts: BlogPostEntity[] = [];
        await Promise.all(blogPostOrmEntities.map(async (blogOrmEntity) =>
        {
            const filesOrmEntity: BlogFilesOrmEntity[] = await this._filesRepository.find({postId: blogOrmEntity.id});
            const blogPostOwnerUsername: string = await this._userService.findUsernameByUserId(blogOrmEntity.ownerId);
            return blogPosts.push(BlogMapper.mapBlogOrmEntityToBlogPostEntity(blogOrmEntity, blogPostOwnerUsername, filesOrmEntity));
        }));
        return blogPosts;
    }

    async saveNewBlogPost(blogPost: BlogPostEntity): Promise<BlogPostEntity> 
    {
        const newBlogOrmEntity: BlogOrmEntity = await this._blogRepository.save(BlogMapper.mapBlogPostEntityToBlogOrmEntity(blogPost));
        await Promise.all(blogPost.files.map(async (file)=>
        {
            await this._filesRepository.save(BlogMapper.mapFileToFileOrmEntity(file, newBlogOrmEntity))
        }));
        const filesOrmEntity: BlogFilesOrmEntity[] = await this._filesRepository.find({postId: newBlogOrmEntity.id});
        const blogPostOwnerUsername: string = await this._userService.findUsernameByUserId(blogPost.ownerId);
        return BlogMapper.mapBlogOrmEntityToBlogPostEntity(newBlogOrmEntity, blogPostOwnerUsername, filesOrmEntity);
    }

    async loadBlogPost(blogPostId: number): Promise<BlogPostEntity> 
    {
        const blogOrmEntity: BlogOrmEntity = await this._blogRepository.findOne({id:blogPostId});
        const filesOrmEntity: BlogFilesOrmEntity[] = await this._filesRepository.find({postId: blogOrmEntity.id});
        const blogPostOwnerUsername: string = await this._userService.findUsernameByUserId(blogOrmEntity.ownerId);
        return BlogMapper.mapBlogOrmEntityToBlogPostEntity(blogOrmEntity, blogPostOwnerUsername, filesOrmEntity);
    }

    async removeBlogPost(blogPostId: number): Promise<BlogPostEntity> 
    {
        const blogOrmEntity: BlogOrmEntity = await this._blogRepository.findOne({id:blogPostId});
        const blogPostOwnerUsername: string = await this._userService.findUsernameByUserId(blogOrmEntity.ownerId);
        const filesOrmEntity: BlogFilesOrmEntity[] = await this._filesRepository.find({postId: blogOrmEntity.id});
        const removedOrmEntity = await this._blogRepository.remove(blogOrmEntity);
        const removedFiles: BlogFilesOrmEntity[] = [];
        await Promise.all(filesOrmEntity.map(async (file) =>
        {
            return removedFiles.push(await this._filesRepository.remove(file));
        }))
        return BlogMapper.mapBlogOrmEntityToBlogPostEntity(removedOrmEntity, blogPostOwnerUsername, removedFiles)
    }

    async uploadBlogFile(fileEntity: FileEntity, blogPostId: number): Promise<FileEntity> 
    {   
        const blogPostOrmEntity: BlogOrmEntity = await this._blogRepository.findOne({id: blogPostId});
        const savedFileOrmEntity: BlogFilesOrmEntity = await this._filesRepository.save(BlogMapper.mapFileToFileOrmEntity(fileEntity, blogPostOrmEntity));    
        return BlogMapper.mapFileOrmEntityToFile(savedFileOrmEntity);
    }

}