import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../_models/post';
import { Comment } from '../_models/comment';
import { BackendService } from '../_services/backend/backend.service';
import { UserService } from '../_services/user/user.service';
import { BehaviorSubject } from 'rxjs';
import { CacheService } from '../_services/cache/cache.service';

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
    mentionConfig: BehaviorSubject<any> = new BehaviorSubject<any>(
        {
            mentions: [
                {
                    items: [],
                    triggerChar: '#',
                    dropUp: true,
                    disableSearch: true,
                },
                {
                    items: [],
                    triggerChar: '@',
                    dropUp: true,
                    disableSearch: true,
                }
            ]
        }
    );

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private backend: BackendService,
        private user: UserService,
        public location: Location,
        private cache: CacheService
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data) => {
            if (data.post instanceof Object) {
                this.post = data.post;
                this.cache.store(`post-${data.post.id}`, data.post);
                this.comments = this.post.comments;
            } else {
                // Handle error
                console.warn(data);
            }
        });
    }

    ngAfterViewInit() {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
            const element = document.getElementById(`${tree.fragment}`);
            if (element) {
                // DEBUG: Test scrollIntoView
                element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

                // const y = element.getBoundingClientRect().top + window.pageYOffset;
                // const offset = 300; // Unsure why this is needed
                // window.scrollTo({
                //     top: y + offset,
                //     behavior: 'smooth'
                // });
                // element.classList.add('highlight');
            }
        }
    }

    mention(search: string) {
        if (!search) {
            this.mentionConfig.next({
                mentions: [
                    {
                        items: [],
                        triggerChar: '#',
                        dropUp: true,
                        disableSearch: true
                    },
                    {
                        items: [],
                        triggerChar: '@',
                        dropUp: true,
                        disableSearch: true
                    }
                ]
            });
            return;
        }

        console.log('Mention trigger', search);
        this.backend.search(search).subscribe(
            (result: any) => {
                console.log(result);
                const config = {
                    mentions: [
                        {
                            items: result.hashtags,
                            triggerChar: '#',
                            dropUp: true,
                            disableSearch: true,
                            mentionSelect: (item: any) => `${item.label} `
                        },
                        {
                            items: result.users.map(user => `@${user.username}`),
                            triggerChar: '@',
                            dropUp: true,
                            disableSearch: true,
                            mentionSelect: (item: any) => `${item.label} `
                        }
                    ]
                }
                console.log(config);
                this.mentionConfig.next(config);
            },
            (error) => console.warn(error),
            () => console.log('Mentions loaded')
        );
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

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, (error: any) => {
            // Handle Error
            console.warn(error);
        }, () => {
            this.sending = false;
        });
    }
}
