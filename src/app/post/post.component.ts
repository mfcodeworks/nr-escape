import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Post } from '../_models/post';
import { Comment } from '../_models/comment';
import { BackendService } from '../_services/backend/backend.service';

declare const $: any;

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, AfterViewInit {
    post: Post = null;
    comments: Comment[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private backend: BackendService,
        private errorToast: MatSnackBar
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data) => {
            if (data.post instanceof Object) {
                this.post = data.post;
                this.comments = this.post.comments;
            } else {
                this.errorToast.open(data.post, 'close', {
                    duration: 3000
                });
            }
        });
    }

    ngAfterViewInit() {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
            const element = document.querySelector(`#${tree.fragment}`);
            if (element) {
                const y = element.getBoundingClientRect().top + window.pageYOffset;
                const offset = 300; // Unsure why this exists
                window.scrollTo({
                    top: y + offset,
                    behavior: 'smooth'
                });
                $(element).addClass('highlight');
            }
        }
    }

    postComment(input: string) {
        console.log(input);
    }
}
