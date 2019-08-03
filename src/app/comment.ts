export class Comment {
    id: number;
    author: any;
    text: string;
    media: string;
    replyTo: number;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
