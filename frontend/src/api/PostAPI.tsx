import type { PostModel } from "./models/PostModel";

export class PostAPI {
    static async getPosts(): Promise<PostModel[] | null> {
        const response = await fetch('/api/Post');

        if (!response.ok) {
            return null;
        }

        const responseJson = await response.json();
        return responseJson;
    }
}