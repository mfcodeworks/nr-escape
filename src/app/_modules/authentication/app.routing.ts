import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'password/reset/:token',
        component: ResetPasswordComponent
    },
    {
        path: 'password/reset',
        component: ForgotPasswordComponent
    },
    {
        path: 'login',
        redirectTo: '/sign-in',
        pathMatch: 'full'
    }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(routes);
