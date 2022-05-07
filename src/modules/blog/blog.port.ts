import { BlogPostEntity, FileEntity } from "./blog-post.entity";

export interface BlogPort
{
    loadAllBlogPosts(): Promise<BlogPostEntity[]>;
    saveNewBlogPost(blogPost: BlogPostEntity): Promise<BlogPostEntity>;
    loadBlogPost(blogPostId: number): Promise<BlogPostEntity>;
    removeBlogPost(blogPostId: number): Promise<BlogPostEntity>;
    uploadBlogFile(file: FileEntity, blogPostId: number): Promise<FileEntity>;
}