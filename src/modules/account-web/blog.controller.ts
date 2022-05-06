import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserReq } from "../auth/req.user";
import { BlogPostEntity } from "../blog/blog-post.entity";
import { BlogService } from "../blog/blog.service";
import { UsersService } from "../users/users.service";
import { BlogPostDTO } from "./blog-post.DTO";
import { NewBlogPostDTO } from "./new-blog-post.DTO";
import { UpdateBlogPostDTO } from "./update-blog-post.DTO";

@Controller("/blog")
export class BlogController
{
    constructor(@Inject(BlogService) private readonly _blogService: BlogService,
    @Inject(UsersService) private readonly _usersService: UsersService) {}

    @Get()
    async loadAllPosts()
    {
        const blogPostsDTO: BlogPostDTO[] = [];
        const blogPostsEntities: BlogPostEntity[] = await this._blogService.loadBlogPosts();
        await Promise.all(blogPostsEntities.map(async (post) =>
        {
            const blogPostDTO: BlogPostDTO = new BlogPostDTO();
            blogPostDTO.body = post.body;
            blogPostDTO.id = post.id;
            blogPostDTO.ownerId = post.ownerId;
            blogPostDTO.timestamp = post.timestamp;
            blogPostDTO.ownerUsername = post.ownerUsername;
            return blogPostsDTO.push(blogPostDTO);
        }));
        return blogPostsDTO;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async savePost(@Body() newBlogPostDTO: NewBlogPostDTO, @Req() req: UserReq)
    {
        const newBlogPostEntity = new BlogPostEntity(new Date(), newBlogPostDTO.body, req.user.id, req.user.username);
        const savedBlogPostEntity = await this._blogService.saveBlogPost(newBlogPostEntity);
        const blogPostDTO: BlogPostDTO = new BlogPostDTO();
        blogPostDTO.body = savedBlogPostEntity.body;
        blogPostDTO.id = savedBlogPostEntity.id;
        blogPostDTO.ownerId = savedBlogPostEntity.ownerId;
        blogPostDTO.timestamp = savedBlogPostEntity.timestamp;
        blogPostDTO.ownerUsername = savedBlogPostEntity.ownerUsername;
        return blogPostDTO;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updatePost(@Body() updateBlogPostDTO: UpdateBlogPostDTO, @Req() req: UserReq, @Param() params: {id: string})
    {
        const blogPostId: number = Number(params.id);
        if (blogPostId === NaN)
        {
            return null;
        }
        const updatedBlogPost = await this._blogService.updateBlogPost(blogPostId, updateBlogPostDTO.body, req.user.id);
        const blogPostDTO: BlogPostDTO = new BlogPostDTO();
        blogPostDTO.body = updatedBlogPost.body;
        blogPostDTO.id = updatedBlogPost.id;
        blogPostDTO.ownerId = updatedBlogPost.ownerId;
        blogPostDTO.timestamp = updatedBlogPost.timestamp;
        blogPostDTO.ownerUsername = updatedBlogPost.ownerUsername;
        return blogPostDTO;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removePost(@Req() req: UserReq, @Param() params: {id: string})
    {
        const blogPostId: number = Number(params.id);
        if (blogPostId === NaN)
        {
            return null;
        }
        const removedBlogPost = await this._blogService.removeBlogPost(blogPostId, req.user.id);
        const blogPostDTO: BlogPostDTO = new BlogPostDTO();
        blogPostDTO.body = removedBlogPost.body;
        blogPostDTO.id = removedBlogPost.id;
        blogPostDTO.ownerId = removedBlogPost.ownerId;
        blogPostDTO.timestamp = removedBlogPost.timestamp;
        blogPostDTO.ownerUsername = removedBlogPost.ownerUsername;
        return blogPostDTO;
    }
}