export enum fileTypes
{
    img = "img",
    video = "video"
}

export interface FileEntity
{
    type: fileTypes,
    path: string
    fileId?: number,
}

export class BlogPostEntity
{
    constructor
    (
        private readonly _timestamp: Date,
        private readonly _body: string,
        private readonly _ownerId: number,
        private readonly _ownerUsername: string,
        private readonly _files: FileEntity[],
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
        return this._ownerUsername;
    }

    get files(): FileEntity[]
    {
        return this._files;
    }
}