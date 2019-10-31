import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignedInGuard } from './_helpers/signed-in.guard';
import { NotFound404Component } from './not-found404/not-found404.component';

export const routes: Routes = [
    {
        path: 'feed',
        canActivate: [ SignedInGuard ],
        loadChildren: './main.module#MainModule',
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'sign-in',
        loadChildren: './_modules/authentication/authentication.module#AuthenticationModule'
    },
    {
        path: 'login',
        redirectTo: '/sign-in',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFound404Component
    }
];

const options: ExtraOptions = {
    useHash: false,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
};

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes, options);
