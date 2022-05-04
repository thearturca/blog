
export class UserEntity 
{
    constructor
    (
        private readonly _id: number,
        private readonly _username: string,
        private readonly _userSecret: string,
        private readonly _fullName: string,
    ) {}

    get id(): number 
    {
        return this._id;
    }

    get username(): string 
    {
        return this._username;
    }
    
    get userSecret(): string 
    {
        return this._userSecret;
    }

    get fullName(): string 
    {
        return this._fullName;
    }
}