import { Profile } from './profile';
import { Post } from './post';
import { Comment } from './comment';

export class Notification {
    id: number;
    createdAt: number;
    for: Profile;
    forAuthor: number;
    from: Profile;
    fromUser: number;
    postId?: number;
    commentId?: number;
    post?: Post;
    comment?: Comment;
    type: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
