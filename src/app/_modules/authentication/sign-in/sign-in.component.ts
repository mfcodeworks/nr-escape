import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BackendService } from '../../../_services/backend/backend.service';
import { AuthService } from '../../../_services/auth/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    hide = true;
    globalError: string = null;
    processing = false;

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

    getErrors(control: string) {
        switch (true) {
            case this.loginForm.get(control).hasError('required'):
                return `${this.prettyCapitalize(control)} is required`;

            case this.loginForm.get(control).hasError('mustMatch'):
                return `${this.prettyCapitalize(control)} must match`;
        }
    }

    doSignIn(username: string, password: string) {
        // Reset error
        this.globalError = null;

        // Validate form before submission
        this.loginForm.markAllAsTouched();
        if (this.loginForm.invalid) { return; }

        // Submit request to API
        this.processing = true;
        this.backend
        .signIn(username, password)
        .subscribe((response: any) => {
            // Do sign in action
            this.auth.doSignIn(response);

            // Navigate to feed
            this.router.navigate(['']);
        }, (error: any) => {
            // DEBUG: Log error
            console.warn(error);

            // Switch error and display friendly message
            switch (typeof error) {
                // If error is a string attempt to friendlify string
                case 'string':
                    switch (true) {
                        case error.indexOf('Unauthorized') > -1:
                            this.globalError = 'Username or password incorrect';
                            break;

                        default:
                            this.globalError = error;
                            break;
                    }
                    break;

                // If error is an object check for validators, otherwise display error text
                default:
                    this.globalError = (error.error.validator) ?
                        Object.keys(error.error.validator).map(errorText => {
                            return `${error.error.validator[errorText]}<br />`;
                        }).join('') : error.error.error;
                    break;
            }
            
            // End processing
            this.processing = false;
        }, () => {
            // End processing
            this.processing = false;
        });
    }

    prettyCapitalize(text: string) {
        return text[0].toUpperCase() + text.substring(1);
    }
}
