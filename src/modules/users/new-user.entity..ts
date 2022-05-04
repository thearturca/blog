
export class NewUserEntity 
{
    constructor
    (
        private readonly _username: string,
        private _userSecret: string,
        private readonly _fullName: string
    ) {}

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