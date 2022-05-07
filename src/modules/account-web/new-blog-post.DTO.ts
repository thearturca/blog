import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../blog/blog-post.entity';

export class NewBlogPostDTO
{
     @ApiProperty()
     readonly body: string;

     @ApiProperty()
     readonly files: FileEntity[] =  [];
}