import {PostGatewayInterface} from "../../domain/posts/port/post-gateway-interface.ts";
import {Post} from "../../domain/posts/models/post.model.ts";
import {InfiniteResponse} from "../../domain/core/models/infiniteResponse.ts";

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
        }
        return Promise.resolve(response);
    }

    setTips(posts: Post[]): void {
        this.posts = posts;
    }
}