import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../blog/blog-post.entity';

export class BlogPostDTO
{
    @ApiProperty()
    id: number;

    @ApiProperty()
    timestamp: Date;

    @ApiProperty()
    body: string;

    @ApiProperty()
    ownerId: number;

    @ApiProperty()
    ownerUsername: string;

    @ApiProperty()
    files: FileEntity[]
}