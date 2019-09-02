import { Profile } from './profile';
import { Comment } from './comment';
import { map } from 'rxjs/operators';

export class Post {
    id: number;
    author: Profile;
    datetime: number;
    type: string;
    media: string;
    caption: string;
    repost: boolean;
    repostOf: Post;
    comments: Comment[];
    likes: number[];

    constructor(values: any = {}) {
        this.id = values.id;
        this.author = new Profile(values.author);
        this.datetime = values.created_at;
        this.type = values.type;
        this.media = values.media;
        this.caption = values.caption;
        this.repost = values.repost;
        this.repostOf = values.repost_of;
        if (values.recent_comments) {
            values.recent_comments.map(comment =>
                new Comment(comment)
            );
        }
        this.comments = values.recent_comments;
        this.likes = values.likes;
    }
}
