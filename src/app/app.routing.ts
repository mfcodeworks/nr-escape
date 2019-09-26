import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignedInGuard } from './_helpers/signed-in.guard';
import { FeedResolver } from './_helpers/feed.resolver';
import { ProfileResolver } from './_helpers/profile.resolver';
import { PostResolver } from './_helpers/post.resolver';
import { FeedComponent } from './feed/feed.component';
import { NewPostComponent } from './new-post/new-post.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [ SignedInGuard ],
        children: [
            {
                path: '',
                component: FeedComponent,
                resolve: { posts: FeedResolver },
            },
            { path: 'recommendations',  component: RecommendationsComponent },
            {
                path: 'search',
                redirectTo: '',
                pathMatch: 'full'
            },
            { path: 'search', component: SearchComponent },
            { path: 'new-post', component: NewPostComponent },
            {
                path: 'post/:postId',
                component: PostComponent,
                resolve: { post: PostResolver }
            },
            { path: 'notifications', component: NotificationsComponent },
            {
                path: 'profile/:profileId',
                component: ProfileComponent,
                resolve: { profile: ProfileResolver }
            },
            { path: 'settings', component: SettingsComponent },
        ]
    },
    { path: 'sign-in', loadChildren: './_modules/authentication/authentication.module#AuthenticationModule' },
    {
        path: 'login',
        redirectTo: '/sign-in',
        pathMatch: 'full'
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
