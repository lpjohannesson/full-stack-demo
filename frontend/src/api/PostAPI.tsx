import type { Post } from "./models/Post";

export class PostAPI {
    static async getPosts(): Promise<Post[] | null> {
        const response = await fetch('/api/Post');

        if (!response.ok) {
            return null;
        }

        const responseJson = await response.json();
        return responseJson;
    }
}