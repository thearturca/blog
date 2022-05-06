import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogPostDTO
{
    @ApiProperty()
    readonly body: string;
}