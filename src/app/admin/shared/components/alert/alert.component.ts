import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

    @Input() delay = 5000

    public text = ''
    public type = 'success'

    private aSub!: Subscription
    private timerId?: number

    constructor(private alertService: AlertService) {}

    ngOnInit(): void {
        this.aSub = this.alertService.alert$.subscribe((alert: Alert) => {
            this.text = alert.text
            this.type = alert.type

            if (typeof this.timerId === 'number') {
                window.clearTimeout(this.timerId)
                this.timerId = undefined
            }

            this.timerId = window.setTimeout(() => {
                window.clearTimeout(this.timerId)
                this.text = ''
            }, this.delay)
        })
    }

    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe()
        }
    }
}
