import { ApiProperty } from "@nestjs/swagger"

export class UserEntity 
{
    constructor
    (
        private readonly _id: number,
        private readonly _username: string,
        private readonly _userSecret: string,
        private readonly _fullName: string,
    ) {}

    @ApiProperty()
    get id(): number 
    {
        return this._id;
    }

    @ApiProperty()
    get username(): string 
    {
        return this._username;
    }
    
    @ApiProperty()
    get userSecret(): string 
    {
        return this._userSecret;
    }

    @ApiProperty()
    get fullName(): string 
    {
        return this._fullName;
    }
}