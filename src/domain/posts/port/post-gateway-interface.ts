import GatewayInterface from "../../core/port/gatewayInterface.ts";
import {Post} from "../models/post.model.ts";
import {InfiniteResponse} from "../../core/models/infiniteResponse.ts";

export interface PostGatewayInterface extends GatewayInterface {
    getPosts(start: number, length: number): Promise<InfiniteResponse<Post>>;
}