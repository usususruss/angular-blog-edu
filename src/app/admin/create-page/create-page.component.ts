import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent {

    form: FormGroup

    constructor() {
        this.form = new FormGroup({
            title: new FormControl(null, Validators.required),
            author: new FormControl(null, Validators.required),
            text: new FormControl(null, Validators.required),
        })
    }

    get title() {
        return this.form.get('title') as FormControl
    }

    get author() {
        return this.form.get('author') as FormControl
    }

    submit() {
        if (this.form.invalid) {
            return
        }

        const post: Post = {
            title: this.form.value.title,
            author: this.form.value.author,
            text: this.form.value.text,
            date: new Date()
        }

        console.log(post)
    }
}
