import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  text: string
  subscription: Subscription

  constructor(private serv: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.serv.alert.subscribe(alert => {
      this.text = alert

      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text = ''
      }, 2000)
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }


}
