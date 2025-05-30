export class PostModel {
    id: number | undefined;
    title: string | undefined;
    content: string | undefined;
    user: { id: string, userName: string } | undefined;
}