export class Comment {
    id: number;
    author: number;
    text: string;
    media: string;
    replyTo: number;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
