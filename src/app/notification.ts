export class Notification {
    id: number;
    forAuthor: number;
    fromUser: number;
    postId: number;
    type: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
