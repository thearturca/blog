import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserReq } from "../auth/req.user";
import { BlogPostEntity, FileEntity, fileTypes } from "../blog/blog-post.entity";
import { BlogService } from "../blog/blog.service";
import { BlogPostDTO } from "./blog-post.DTO";
import { NewBlogPostDTO } from "./new-blog-post.DTO";
import { UpdateBlogPostDTO } from "./update-blog-post.DTO";
import { ApiResponse } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { saveFileToStorage } from "../blog/file-storage";

@Controller("/blog")
export class BlogController
{
    constructor(@Inject(BlogService) private readonly _blogService: BlogService) {}

    @ApiResponse({type: [BlogPostDTO]})
    @Get()
    async loadAllPosts(): Promise<BlogPostDTO[]>
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
            blogPostDTO.files = post.files;
            return blogPostsDTO.push(blogPostDTO);
        }));
        return blogPostsDTO;
    }

    @ApiResponse({type: BlogPostDTO, description: "Bearer authorization required"})
    @UseGuards(JwtAuthGuard)
    @Post()
    async savePost(@Body() newBlogPostDTO: NewBlogPostDTO, @Req() req: UserReq)
    {
        const newBlogPostEntity = new BlogPostEntity(new Date(), newBlogPostDTO.body, req.user.id, req.user.username, []);
        const savedBlogPostEntity = await this._blogService.saveBlogPost(newBlogPostEntity);
        const blogPostDTO: BlogPostDTO = new BlogPostDTO();
        blogPostDTO.body = savedBlogPostEntity.body;
        blogPostDTO.id = savedBlogPostEntity.id;
        blogPostDTO.ownerId = savedBlogPostEntity.ownerId;
        blogPostDTO.timestamp = savedBlogPostEntity.timestamp;
        blogPostDTO.ownerUsername = savedBlogPostEntity.ownerUsername;
        blogPostDTO.files = savedBlogPostEntity.files;
        return blogPostDTO;
    }

    @ApiResponse({type: BlogPostDTO, description: "Bearer authorization required"})
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
        blogPostDTO.files = updatedBlogPost.files;
        return blogPostDTO;
    }

    @ApiResponse({type: BlogPostDTO, description: "Bearer authorization required"})
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
        blogPostDTO.files = removedBlogPost.files;
        return blogPostDTO;
    }

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor("file", saveFileToStorage))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: UserReq, @Query("postId") postId: number) {
        const fileName = file?.filename;
        if (!fileName) throw new HttpException("invalid file type", HttpStatus.CONFLICT);
        const typeCheck = (): fileTypes => 
        {
            switch(file?.mimetype)
            {
            case 'image/png':
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/gif':
                return fileTypes.img ;

            case 'video/mp4':
            case 'video/webm':
                return fileTypes.video
            }
        }
        const type: fileTypes = typeCheck();
        const fileEntity: FileEntity = 
        {
            path: "./files/"+fileName,
            type: type,
        }
        return this._blogService.uploadFile(fileEntity, +postId, req.user.id);
    }
}