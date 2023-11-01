import { PostGatewayInterface } from '../../domain/posts/port/post-gateway-interface.ts';
import { Post } from '../../domain/posts/models/post.model.ts';
import { InfiniteResponse } from '../../domain/core/models/infiniteResponse.ts';
import { Tips } from '../../domain/tips/models/tips.model.ts';

export default class PostGatewayInMemory implements PostGatewayInterface {
    public posts: Post[] | [] = [];
    public throwError = false;

    simulateServerError() {
        this.throwError = true;
    }
    getPosts(start: number, length: number): Promise<InfiniteResponse<Post>> {
        if (this.throwError) {
            throw new Error('Internal Server Error');
        }

        const postsInPage = this.posts.slice(start, start + length);

        const response: InfiniteResponse<Post> = {
            start: start,
            length: length,
            data: postsInPage,
        };
        return Promise.resolve(response);
    }

    setPosts(posts: Post[]): void {
        this.posts = posts;
    }

    async saveTips(post: Post): Promise<Tips> {
        if (this.throwError) {
            throw new Error('Internal Server Error');
        }
        return {
            id: post.id,
            user_id: post.user_id,
            title: post.title,
            command: post.command,
            description: post.description,
            published_at: post.published_at,
            created_at: post.created_at,
            updated_at: post.updated_at,
            tags: post.tags || [],
        };
    }
}
