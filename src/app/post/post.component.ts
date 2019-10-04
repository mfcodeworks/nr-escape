import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { Post } from '../_models/post';
import { Comment } from '../_models/comment';
import { BackendService } from '../_services/backend/backend.service';
import { UserService } from '../_services/user/user.service';

declare const $: any;

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, AfterViewInit {
    @Input() preview = false;
    @ViewChild('comment', { static: false }) comment: ElementRef;
    post: Post = null;
    comments: Comment[] = [];
    sending = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private errorToast: MatSnackBar,
        private backend: BackendService,
        private user: UserService,
        protected location: Location
    ) {}

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
                const offset = 300; // Unsure why this is needed
                window.scrollTo({
                    top: y + offset,
                    behavior: 'smooth'
                });
                $(element).addClass('highlight');
            }
        }
    }

    // Post comment to server
    postComment() {
        const input = this.comment.nativeElement.value;
        if (input.length < 1) { return; }

        this.sending = true;
        this.comment.nativeElement.value = '';

        this.backend.addComment(
            new Comment({
                author: this.user.profile.id,
                text: input,
                reply_to: this.post.id
            })
        ).subscribe((response: any) => {
            console.log(response);
            this.post.comments.push(response);
            $('html, body').animate({ scrollTop: $(document).height() }, 1000);
        }, (error: any) => {
            // TODO: Handle Error
            console.warn(error);
        }, () => {
            this.sending = false;
        });
    }
}
