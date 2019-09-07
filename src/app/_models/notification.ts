export class Notification {
    id: number;
    datetime: number;
    forAuthor: number;
    fromUser: number;
    postId: number;
    type: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
