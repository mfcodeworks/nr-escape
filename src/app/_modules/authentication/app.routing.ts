import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: SignInComponent
            },
            {
                path: 'register',
                component: SignUpComponent
            },
            {
                path: 'password/reset/:token',
                component: ResetPasswordComponent
            },
            {
                path: 'password/reset',
                component: ForgotPasswordComponent
            }
        ]
    }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(routes);
