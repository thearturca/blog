export class BlogPostEntity
{
    constructor
    (
        private readonly _timestamp: Date,
        private readonly _body: string,
        private readonly _ownerId: number,
        private readonly _ownerUsername: string,
        private readonly _id?: number,
    ) {}

    get id(): number
    {
        return this._id;
    }

    get timestamp(): Date
    {
        return this._timestamp;
    }

    get body(): string 
    {
        return this._body;
    }

    get ownerId(): number
    {
        return this._ownerId;
    }

    get ownerUsername(): string{
        return this._ownerUsername
    }
}