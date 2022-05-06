import { ApiProperty } from '@nestjs/swagger';

export class NewUserEntity 
{
    constructor
    (
        private readonly _username: string,
        private _userSecret: string,
        private readonly _fullName: string
    ) {}

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