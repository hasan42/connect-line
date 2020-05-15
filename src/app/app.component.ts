import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'connect-line';
  nightMode:boolean = false

  onChangeNightMode(nightMode){
    this.nightMode = nightMode
  }
}
