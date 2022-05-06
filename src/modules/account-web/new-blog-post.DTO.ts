import { ApiProperty } from '@nestjs/swagger';

export class NewBlogPostDTO
{
     @ApiProperty()
     readonly body;
}