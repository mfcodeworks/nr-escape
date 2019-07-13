import { Component } from '@angular/core';

import { posts } from '../test-data/posts';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css'],
})
export class FeedComponent {
    posts = posts;
    liked = false;
}
