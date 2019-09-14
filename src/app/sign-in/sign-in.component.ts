import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BackendService } from '../_services/backend/backend.service';
import { AuthService } from '../_services/auth/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    hide = true;

    loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor(
        private backend: BackendService,
        private auth: AuthService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit() {}

    getErrorUsername() {
        return this.loginForm.get('username').hasError('required') ? 'Username is required' : '';
    }

    getErrorPassword() {
      return this.loginForm.get('password').hasError('required') ? 'Password is required' : '';
    }

    public doSignIn(username: string, password: string) {
        // Validate form before submission
        this.loginForm.markAllAsTouched();
        if (this.loginForm.invalid) { return; }

        // Submit request to API
        this.backend
        .signIn(username, password)
        .subscribe((response: any) => {
            this.auth.doSignIn(
                response.token,
                response.profile,
                response.email,
                response.settings
            );
            this.router.navigate(['']);
        }, (error: any) => {
            console.log(error);
        });
      }
}
