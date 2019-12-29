import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignedInGuard } from './_helpers/signed-in.guard';
import { FeedResolver } from './_helpers/feed.resolver';
import { RecommendationsResolver } from './_helpers/recommendations.resolver';
import { HashtagResolver } from './_helpers/hashtag.resolver';
import { NotificationsResolver } from './_helpers/notifications.resolver';
import { ProfileResolver } from './_helpers/profile.resolver';
import { PostResolver } from './_helpers/post.resolver';
import { NewPostResolver } from './_helpers/new-post.resolver';
import { FeedComponent } from './feed/feed.component';
import { NewPostComponent } from './new-post/new-post.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component';
import { HashtagListingComponent } from './hashtag-listing/hashtag-listing.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { FollowersResolver } from './_helpers/followers.resolver';
import { FollowingResolver } from './_helpers/following.resolver';
import { BlockedProfilesResolver } from './_helpers/blocked-profiles.resolver';
import { ProfilePostsResolver } from './_helpers/profile-posts.resolver';

export const routes: Routes = [
    {
        path: '',
        canActivateChild: [ SignedInGuard ],
        children: [
            {
                path: '',
                component: FeedComponent,
                resolve: { posts: FeedResolver },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'recommendations',
                component: RecommendationsComponent,
                resolve: { recommendations: RecommendationsResolver },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'search',
                component: SearchComponent,
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'hashtag/:hashtag',
                component: HashtagListingComponent,
                resolve: { posts: HashtagResolver },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'new-post',
                component: NewPostComponent,
                resolve: { repost: NewPostResolver },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'post/:postId',
                component: PostComponent,
                resolve: { post: PostResolver },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'notifications',
                component: NotificationsComponent,
                resolve: { notifications: NotificationsResolver },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'profile/:profile',
                component: ProfileComponent,
                resolve: {
                    profile: ProfileResolver,
                    posts: ProfilePostsResolver
                },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'profile/:profile/edit',
                component: ProfileEditComponent,
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'profile/:profile/following',
                component: ProfileListComponent,
                resolve: { profiles: FollowingResolver },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'profile/:profile/followers',
                component: ProfileListComponent,
                resolve: { profiles: FollowersResolver },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'settings',
                component: SettingsComponent,
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'following',
                component: ProfileListComponent,
                resolve: { profiles: FollowingResolver },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'followers',
                component: ProfileListComponent,
                resolve: { profiles: FollowersResolver },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'blocked',
                component: ProfileListComponent,
                resolve: { profiles: BlockedProfilesResolver },
                runGuardsAndResolvers: 'always'
            }
        ]
    }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(routes);
