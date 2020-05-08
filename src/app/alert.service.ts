import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert = new Subject<string>()

  constructor() { }

  callAlert(text: string) {
    this.alert.next(text)
  }
}
