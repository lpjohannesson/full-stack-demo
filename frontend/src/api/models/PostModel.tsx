export class PostModel {
    id: number | undefined;
    date: string | undefined;
    title: string | undefined;
    content: string | undefined;
    user: { id: string, userName: string } | undefined;
    likes: number | undefined;
    dislikes: number | undefined;
    userReaction: number | undefined;
}