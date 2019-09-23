import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from '../../../_services/backend/backend.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    hide = true;
    globalError: string = null;
    processing = false;
    complete = false;
    resetToken: string;
    email: string;
    resetForm: FormGroup;

    constructor(
        private backend: BackendService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        // Get email from query params
        this.route.queryParamMap
        .subscribe((params: any) => {
            console.log(params);
            this.email = params.params.email;
            console.log(this.email);
        });

        // Get reset token from URL
        this.route.paramMap
        .subscribe((params: any) => {
            console.log(params);
            this.resetToken = params.params.token;
            console.log(this.resetToken);
        });

        this.resetForm = this.fb.group({
            email: [this.email, Validators.required],
            password: ['', Validators.required],
            password2: ['', Validators.required]
        }, {
            validator: this.MustMatch('password', 'password2')
        });
    }

    getErrors(control: string) {
        switch (true) {
            case this.resetForm.get(control).hasError('required'):
                return `${this.prettyCapitalize(control.replace(/[0-9]/g, ''))} is required`;

            case this.resetForm.get(control).hasError('mustMatch'):
                return `${this.prettyCapitalize(control.replace(/[0-9]/g, ''))} must match`;
        }
    }

    doReset(password: string, password2: string) {
        // Reset error
        this.globalError = null;

        // Validate form before submission
        this.resetForm.markAllAsTouched();
        if (this.resetForm.invalid) { return; }

        // Submit request to API
        this.processing = true;
        this.backend
        .resetPassword(this.resetToken, this.email, password, password2)
        .subscribe((response: any) => {
            // End processing
            this.processing = false;

            // Set complete as true
            this.complete = true;
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
                    this.globalError = (!!error.error.validator) ?
                        Object.keys(error.error.validator).map(errorText => {
                            return `${error.error.validator[errorText]}<br />`;
                        }).join('') : error.error.error.email;
                    break;
            }

            // End processing
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

    prettyCapitalize(text: string) {
        return text[0].toUpperCase() + text.substring(1);
    }
}
