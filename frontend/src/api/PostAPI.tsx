import { AccountAPI } from "./AccountAPI";
import type { PostModel } from "./models/PostModel";
import type { PostRequestModel } from "./models/PostRequestModel";

export class PostAPI {
    static async getPosts(): Promise<PostModel[] | null> {
        const response = await fetch('/api/Post', {
            method: 'GET',
            headers: AccountAPI.getRequestHeaders()
        });

        if (!response.ok) {
            return null;
        }

        const responseJson = await response.json();
        return responseJson;
    }

    static async getPost(id: number): Promise<PostModel | null> {
        const response = await fetch(`/api/Post/${id}`, {
            method: 'GET',
            headers: AccountAPI.getRequestHeaders()
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    }

    static async createPost(body: PostRequestModel) {
        await fetch('/api/Post', {
            method: 'POST',
            headers: AccountAPI.getRequestHeaders(),
            body: JSON.stringify(body)
        });
    }

    static async editPost(id: number, body: PostRequestModel) {
        await fetch(`/api/Post/${id}`, {
            method: 'PUT',
            headers: AccountAPI.getRequestHeaders(),
            body: JSON.stringify(body)
        });
    }

    static async deletePost(id: number) {
        await fetch(`/api/Post/${id}`, {
            method: 'DELETE',
            headers: AccountAPI.getRequestHeaders()
        });
    }
}