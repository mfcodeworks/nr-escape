import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from '../_services/backend/backend.service';
import { Profile } from '../_models/profile';
import { Post } from '../_models/post';
import { UserService } from '../_services/user/user.service';
import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';
import { AuthService } from '../_services/auth/auth.service';
import { CacheService } from '../_services/cache/cache.service';
import { debounceTime } from 'rxjs/operators';

declare const $: any;
declare const _: any;

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
    isRequested = false;
    settings: any = {};
    editing = false;
    fetchingPosts = false;
    fetchedAllPosts = false;
    displayLikes = new FormControl(this.user.settings.displayLikes);
    privateAccount = new FormControl(this.user.settings.privateAccount);
    unknownDevices = new FormControl(this.user.settings.unknownDevices);

    /**
     * DEBUG:
     * - Navigating directly between profiles (Other user to bottom right profile button) not reloading page
     * 
     * TODO:
     * - Block User Option
     * - View Blocked
     * - Unblock
     * - Deactivate account & logout
     * - Link following/followers to list view
     * - Edit Profile view
     * - Change password
     * - Follow user
     */

    constructor(
        private route: ActivatedRoute,
        private user: UserService,
        private backend: BackendService,
        protected dark: DarkThemeService,
        protected auth: AuthService,
        private cache: CacheService,
    ) {}

    ngOnInit() {
        // Set profile data
        this.route.data.subscribe((data) => {
            if (data.profile instanceof Object) {
                this.profile = data.profile;
                this.cache.store(`profile-${data.profile.username}`, data.profile);
            } else {
                // Handle error
                console.warn(data);
            }
        });
        console.log(this.profile);

        // Get profile posts
        this.backend.getProfilePosts(this.profile.id).subscribe((data) => {
            // Merge posts arrays without duplicates
            this.posts = _.union(this.posts, data);
            this.cache.store(`profile-${this.profile.id}-posts`, this.posts);
        });

        // Set dark mode option
        this.dark.isDarkMode()
        .subscribe((mode: boolean) => {
            this.isDark = mode;
        });

        // Set is requested
        this.backend.checkFollowRequested(this.profile.id)
        .subscribe(res => this.isRequested = res);

        // Change options with debounce to prevent mistakes
        this.privateAccount.valueChanges
            .pipe(debounceTime(1200))
            .subscribe(() => this.updateSettings());
        this.displayLikes.valueChanges
            .pipe(debounceTime(1200))
            .subscribe(() => this.updateSettings());
    }

    ngAfterViewInit(): void {
        // Get toolbar height
        this.topBarHeight = $('mat-toolbar.top-bar')[0].offsetHeight;
    }

    isFollowing(id: number) {
        return this.user.profile.following.includes(id);
    }

    isMe() {
        return this.profile.id === this.user.profile.id;
    }

    editProfile() {
    }

    updateSettings() {
        const newSettings = {
            unknown_devices: this.unknownDevices.value || false,
            private_account: this.privateAccount.value || false,
            display_likes: this.displayLikes.value || false
        };
        console.log('New settings', newSettings);

        // Set new settings
        Object.assign(this.user.profile.settings, newSettings);
        this.backend.updateUser(this.user.profile).subscribe(
            (user) => {
                console.log('User updated', user);
                this.user.settings = user.settings;
                this.user.profile = user;
                this.user.cacheUser();
            },
            (error) => console.warn(error),
            () => console.log('Settings updated', this.user.settings)
        );
    }

    followUser(id: number) {
        this.user.profile.following.push(id);
    }

    fetchMorePosts(): void {
        console.log('Fetching more posts now, offset id:', this.posts[this.posts.length - 1].id);

        this.backend.getProfilePosts(this.profile.id, this.posts[this.posts.length - 1].id).subscribe(posts => {
            if (!posts.length) {
                this.fetchedAllPosts = true;
                return;
            }
            this.posts = _.union(this.posts, posts);
            this.cache.store(`profile-${this.profile.id}-posts`, this.posts);
            console.log(this.posts);
        });
    }
}
