import { BlogPostEntity } from "./blog-post.entity";

export interface BlogPort
{
    loadAllBlogPosts(): Promise<BlogPostEntity[]>;
    saveNewBlogPost(blogPost: BlogPostEntity): Promise<BlogPostEntity>;
}