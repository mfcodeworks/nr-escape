import { Profile } from './profile';
import { Comment } from './comment';
import { map } from 'rxjs/operators';

export class Post {
    id: number;
    author: Profile;
    ceatedAt: string;
    type: string;
    media: string;
    caption: string;
    repost: boolean;
    repostOf: Post;
    comments: Comment[];
    likes: number[];

    constructor(values: any = {}) {
        Object.assign(this, values);
    }
}
