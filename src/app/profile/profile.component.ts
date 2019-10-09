import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';

import { BackendService } from '../_services/backend/backend.service';
import { Profile } from '../_models/profile';
import { Post } from '../_models/post';
import { UserService } from '../_services/user/user.service';
import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';
import { AuthService } from '../_services/auth/auth.service';

declare const $: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
    profile: Profile = null;
    posts: Post[] = [];
    topBarHeight = 56;
    isDark: boolean;
    editing = false;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private backend: BackendService,
        private errorToast: MatSnackBar,
        protected dark: DarkThemeService,
        protected auth: AuthService
    ) {}

    ngOnInit() {
        // Set profile data TODO: Sort posts newest to oldest
        this.route.data.subscribe((data) => {
            if (data.profile instanceof Object) {
                this.profile = data.profile;
            } else {
                this.errorToast.open(data.profile, 'close', {
                    duration: 3000
                });
            }
        });
        console.log(this.profile);

        // Get profile posts
        this.backend.getProfilePosts(this.profile.id).subscribe((data) => {
            // Merge posts arrays without duplicates
            this.posts = _.union(this.posts, data);
        });

        this.dark.isDarkMode()
        .subscribe((mode: boolean) => {
            this.isDark = mode;
        });
    }

    ngAfterViewInit(): void {
        // Get toolbar height
        this.topBarHeight = $('mat-toolbar.top-bar')[0].offsetHeight;
    }

    isFollowing(id: number) {
        return this.userService.profile.following.includes(id);
    }

    isMe() {
        return this.profile.id === this.userService.profile.id;
    }

    editProfile() {
        // TODO:
    }

    followUser(id: number) {
        this.userService.profile.following.push(id);
    }
}
