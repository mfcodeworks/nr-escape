import { Profile } from './profile';

export class Comment {
    id: number;
    author: Profile;
    createdAt: number;
    text: string;
    media: string;
    replyTo: number;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
