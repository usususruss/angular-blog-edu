import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent {

    form: FormGroup

    constructor(private postsService: PostsService) {
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

        this.postsService.create(post).subscribe(() => {
            this.form.reset()
        })
    }
}
