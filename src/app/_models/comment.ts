import { Profile } from './profile';

export class Comment {
    id: number;
    author: Profile;
    createdAt: number;
    text: any;
    media: string;
    replyTo: number;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
