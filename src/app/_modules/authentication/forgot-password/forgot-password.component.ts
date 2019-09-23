import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BackendService } from '../../../_services/backend/backend.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    globalError: string = null;
    processing = false;
    complete = false;

    forgotForm = this.fb.group({
        email: ['',
            [
                Validators.required,
                Validators.email
            ]
        ],
    });

    constructor(
        private backend: BackendService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {}

    getErrors(control: string) {
        switch (true) {
            case this.forgotForm.get(control).hasError('required'):
                return `${this.prettyCapitalize(control)} is required`;

            case this.forgotForm.get(control).hasError('email'):
                    return `${this.prettyCapitalize(control)} is not an email`;
        }
    }

    doReset(email: string) {
        // Reset error
        this.globalError = null;

        // Validate form before submission
        this.forgotForm.markAllAsTouched();
        if (this.forgotForm.invalid) { return; }

        // Submit request to API
        this.processing = true;
        this.backend
        .forgotPassword(email)
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
                    this.globalError = (error.error.validator) ?
                        Object.keys(error.error.validator).map(errorText => {
                            return `${error.error.validator[errorText]}<br />`;
                        }).join('') : error.error.error;
                    break;
            }

            // End processing
            this.processing = false;
        });
    }

    prettyCapitalize(text: string) {
        return text[0].toUpperCase() + text.substring(1);
    }
}
