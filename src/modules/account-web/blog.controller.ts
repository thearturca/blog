import { Body, Controller, Get, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserReq } from "../auth/req.user";
import { BlogPostEntity } from "../blog/blog-post.entity";
import { BlogService } from "../blog/blog.service";
import { UsersService } from "../users/users.service";
import { BlogPostDTO } from "./blog-post.DTO";
import { NewBlogPostDTO } from "./new-blog-post.DTO";

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
            const username = await this._usersService.findUsernameByUserId(post.ownerId);
            blogPostDTO.ownerUsername = username;
            return blogPostsDTO.push(blogPostDTO);
        }));
        return blogPostsDTO;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async savePost(@Body() newBlogPostDTO: NewBlogPostDTO, @Req() req: UserReq)
    {
        const newBlogPostEntity = new BlogPostEntity(new Date(), newBlogPostDTO.body, req.user.id);
        return this._blogService.saveBlogPost(newBlogPostEntity);
    }
}