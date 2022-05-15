import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

    posts: Post[] = []
    searchStr = ''
    pSub!: Subscription
    dSub: Map<string, Subscription> = new Map()

    constructor(private postsService: PostsService) {}

    ngOnInit() {
        this.pSub = this.postsService.getAll().subscribe(posts => this.posts = posts)
    }

    ngOnDestroy() {
        if (this.pSub) {
            this.pSub.unsubscribe()
        }
        if (this.dSub.size) {
            this.dSub.forEach(sub => sub.unsubscribe())
            this.dSub.clear()
        }
    }

    remove(id: string | undefined) {
        const sub = this.postsService.remove(id as string).subscribe(() => {
            this.posts = this.posts.filter(post => post.id !== id)
        })
        this.dSub.set(id as string, sub)
    }
}
