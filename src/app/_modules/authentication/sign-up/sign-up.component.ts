import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { BackendService } from '../../../_services/backend/backend.service';
import { AuthService } from '../../../_services/auth/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
    hide = true;
    globalError: string = null;
    processing = false;

    registerForm = this.fb.group({
        username: ['', Validators.required],
        email: ['',
            [
                Validators.required,
                Validators.email
            ]
        ],
        password: ['', Validators.required],
        password2: ['', Validators.required]
    }, {
        validator: this.MustMatch('password', 'password2')
    });

    constructor(
        private backend: BackendService,
        private auth: AuthService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit() {}

    getErrors(control: string): string {
        switch (true) {
            case this.registerForm.get(control).hasError('required'):
                return `${this.prettyCapitalize(control.replace(/[0-9]/g, ''))} is required`;

            case this.registerForm.get(control).hasError('mustMatch'):
                return `${this.prettyCapitalize(control.replace(/[0-9]/g, ''))} must match`;

            case this.registerForm.get(control).hasError('email'):
                    return `${this.prettyCapitalize(control)} is not an email`;
        }
    }

    doRegister(username: string, email: string, password: string) {
        // Reset error
        this.globalError = null;

        // Validate form before submission
        this.registerForm.markAllAsTouched();
        if (this.registerForm.invalid) { return; }

        // Submit request to API
        this.processing = true;
        this.backend
        .signUp(username, password, email)
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
        }, () => {
            this.processing = false;
        });
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }

    prettyCapitalize(text: string): string {
        return text[0].toUpperCase() + text.substring(1);
    }
}
