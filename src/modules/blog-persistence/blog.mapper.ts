import { BlogPostEntity, FileEntity, fileTypes } from "../blog/blog-post.entity";
import { BlogFilesOrmEntity } from "./blog-files.orm-entity";
import { BlogOrmEntity } from "./blog.orm-entity";

export class BlogMapper
{
    static mapBlogOrmEntityToBlogPostEntity(blogOrmEntity: BlogOrmEntity, username: string, filesOrmEntity: BlogFilesOrmEntity[]): BlogPostEntity
    {
        const files: FileEntity[] = filesOrmEntity.map((fileOrmEntity): FileEntity =>
        {
            return this.mapFileOrmEntityToFile(fileOrmEntity)
        })
        return new BlogPostEntity(blogOrmEntity.timestamp, blogOrmEntity.body, blogOrmEntity.ownerId, username, files, blogOrmEntity.id);
    }

    static mapBlogPostEntityToBlogOrmEntity(blogPost: BlogPostEntity): BlogOrmEntity
    {
        const blogOrmEntity: BlogOrmEntity = new BlogOrmEntity();
        blogOrmEntity.body = blogPost.body;
        blogOrmEntity.ownerId = blogPost.ownerId;
        blogOrmEntity.timestamp = blogPost.timestamp;
        blogOrmEntity.id = blogPost.id;
        return blogOrmEntity;
    }

    static mapFileToFileOrmEntity(file: FileEntity, blogOrmEntity: BlogOrmEntity): BlogFilesOrmEntity
    {
            const fileOrmEntity: BlogFilesOrmEntity = new BlogFilesOrmEntity() ;
            fileOrmEntity.ownerId = blogOrmEntity.ownerId;
            fileOrmEntity.path = file.path;
            fileOrmEntity.postId = blogOrmEntity.id;
            fileOrmEntity.type = file.type;
            fileOrmEntity.id = file.fileId;
            return fileOrmEntity;
    }

    static mapFileOrmEntityToFile(fileOrmEntity: BlogFilesOrmEntity): FileEntity
    {
        return {path: fileOrmEntity.path, type: fileOrmEntity.type as fileTypes, fileId: fileOrmEntity.id}
    }
}