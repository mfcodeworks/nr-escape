import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

    username = new FormControl('', {
        validators: Validators.required
    });
    password = new FormControl('', {
        validators: Validators.required
    });

    constructor(
        private backend: BackendService,
        private auth: AuthService,
        private router: Router,
    ) {}

    ngOnInit() {}

    getUsernameError() {
        return this.username.hasError('required') ? 'Please enter a username' :
            this.username.hasError('username') ? 'Not a valid username' : '';
    }

    getPasswordError() {
        return this.username.hasError('required') ? 'Please enter a password' :
            this.password.hasError('password') ? 'Not a valid password' : '';
    }

    public doSignIn() {
        const username = this.username.value;
        const password = this.password.value;

        if ((!username) || (!password)) { return; }

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
