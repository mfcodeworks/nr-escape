import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/_models/post';
import { Profile } from 'src/app/_models/profile';

@Component({
    selector: 'app-post-likes',
    templateUrl: './post-likes.component.html',
    styleUrls: ['./post-likes.component.css']
})
export class PostLikesComponent implements OnInit {
    @Input() post: Post;
    @Input() user: Profile;

    constructor() { }

    ngOnInit() {

    }

    isMe(): boolean {
        return this.user.id === this.post.author.id;
    }
}
