import { AccountAPI } from "./AccountAPI";
import type { PostModel } from "./models/PostModel";
import type { PostRequestModel } from "./models/PostRequestModel";

export class PostAPI {
    static async getPosts(): Promise<PostModel[] | null> {
        const response = await fetch('/api/Post');

        if (!response.ok) {
            return null;
        }

        const responseJson = await response.json();
        return responseJson;
    }

    static async createPost(body: PostRequestModel) {
        await fetch('/api/Post', {
            method: 'POST',
            headers: AccountAPI.getRequestHeaders(),
            body: JSON.stringify(body)
        });
    }
}