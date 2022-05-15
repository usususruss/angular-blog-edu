import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

    form: FormGroup
    submitted = false
    message: string = ''

    constructor(
        public auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['loginAgain']) {
                this.message = 'Please sing in again'
            }
            if (params['authFailed']) {
                this.message = 'Session expired, please sing in again'
            }
        })

        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ])
        })
    }

    get email() {
        return this.form.get('email') as AbstractControl
    }

    get password() {
        return this.form.get('password') as AbstractControl
    }

    submit() {
        if (this.form.invalid) {
            return
        }

        this.submitted = true

        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password,
        }

        this.auth.login(user).subscribe({
            next: () => {
                this.form.reset()
                this.router.navigate(['/admin', 'dashboard'])
                this.submitted = false
            },
            error: () => { this.submitted = false }
        })
    }
}
