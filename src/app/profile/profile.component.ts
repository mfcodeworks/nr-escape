import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { BackendService } from '../_services/backend/backend.service';
import { Profile } from '../_models/profile';
import { Post } from '../_models/post';
import { UserService } from '../_services/user/user.service';
import { DarkThemeService } from '../_services/dark-theme/dark-theme.service';
import { AuthService } from '../_services/auth/auth.service';
import { CacheService } from '../_services/cache/cache.service';

declare const $: any;
declare const _: any;

export interface DialogData {
    action: string;
}

@Component({
    selector: 'app-profile-dialog',
    templateUrl: 'profile-dialog.component.html',
})
export class ProfileDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ProfileDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    close(action?: string): void {
        this.dialogRef.close({ action });
    }
}

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
     * - User profile pic sometimes cached incorrectly when changed on other device
     *
     * TODO:
     * - View Blocked
     * - Unblock
     * - Deactivate account
     * - Link following/followers to list view
     * - Change password
     */

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private user: UserService,
        private backend: BackendService,
        public dark: DarkThemeService,
        public auth: AuthService,
        private cache: CacheService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        // Set profile data
        this.route.data.subscribe((data) => {
            this.profile = data.profile;
            this.cache.store(`profile-${data.profile.username}`, data.profile);

            // Merge posts arrays without duplicates
            this.posts = _.union(this.posts, data.posts);
            this.cache.store(`profile-${this.profile.username}-posts`, this.posts);

            // Set is requested
            this.backend.checkFollowRequested(this.profile.id)
            .subscribe(res => this.isRequested = res);

            console.log(this.profile);
        });

        // Set dark mode option
        this.dark.isDarkMode()
        .subscribe((mode: boolean) => {
            this.isDark = mode;
        });

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

    isFollowing() {
        return this.profile.hasOwnProperty('followers')
            ? !!this.profile.followers.find(following => following.user === this.user.profile.id)
            : false;
    }

    isMe() {
        return this.profile.id === this.user.profile.id;
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

    followUser(): void {
        if (this.isFollowing()) {
            this.profile.followers = this.profile.followers.filter(f => f.user !== this.user.profile.id);
            this.backend.unfollowUser(this.profile.id).subscribe(
                () => {
                    this.profile.followers = this.profile.followers.filter(f => f.user !== this.user.profile.id),
                    this.profile.postsCount = '?';
                    this.profile.followersCount = '?';
                    this.profile.followingCount = '?';
                },
                (err: any) => console.warn
            );
        } else {
            this.backend.followUser(this.profile.id).subscribe(
                () => !!this.profile.settings.privateAccount
                    ? this.isRequested = true
                    : this.profile.followers.push({
                        user: this.user.profile.id,
                        followingUser: this.profile.id
                    }),
                (err: any) => console.warn
            );
        }
    }

    fetchMorePosts(): void {
        if (this.fetchingPosts) return;
        console.log('Fetching more posts now, offset id:', this.posts[this.posts.length - 1].id);

        this.fetchingPosts = true;
        this.backend.getProfilePosts(this.profile.username, this.posts[this.posts.length - 1].id).subscribe(posts => {
            if (!posts.length) {
                this.fetchedAllPosts = true;
                return;
            }
            this.posts = _.union(this.posts, posts);
            this.cache.store(`profile-${this.profile.id}-posts`, this.posts);
            console.log(this.posts);
            this.fetchingPosts = false;
        });
    }

    openDialog(): void {
        const profile = this.profile;
        console.log(
            'Opening profile dialog',
            profile
        );
        const dialogRef = this.dialog.open(ProfileDialogComponent, {
            width: '90%',
            data: { profile }
        });

        dialogRef.afterClosed()
        .subscribe((result: string) => {
            console.log('The dialog was closed, result:', result);
            if (result) {
                this.checkDialogAction(result);
            }
        });
    }

    checkDialogAction(result: any) {
        switch (result.action) {
            case 'block':
                // Block profile
                this.backend.blockUser(this.profile.id).subscribe(
                    () => this.router.navigate(['/feed']),
                    () => console.warn
                )
                return;

            case 'report':
                // TODO: Report profile
                this.backend.reportUser(this.profile.id).subscribe(
                    () => console.log,
                    () => console.warn
                )
                return;
        }
    }
}
