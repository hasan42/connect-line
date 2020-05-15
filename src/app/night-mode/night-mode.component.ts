import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-night-mode',
  templateUrl: './night-mode.component.html',
  styleUrls: ['./night-mode.component.scss']
})
export class NightModeComponent implements OnInit {

  @Output() nightMode = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  goNightMode($event) {
    this.nightMode.emit($event.target.checked)
  }

}
