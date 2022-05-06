import { ApiProperty } from '@nestjs/swagger';

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
}