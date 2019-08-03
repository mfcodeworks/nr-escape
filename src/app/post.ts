export class Post {
    id: number;
    author: any;
    type: string;
    media: string;
    caption: string;
    repost: boolean;
    comments: number[];
    likes: number[];

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
