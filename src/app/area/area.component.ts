import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

	items: any;
  private subscriptionItems: Subscription;
  lines: any;
  private subscriptionLines: Subscription;

  constructor(private service: GameService) { }

  ngOnInit(): void {
    this.subscriptionItems = this.service.observableItems.subscribe(
        value => {
          this.items = value;
        },
        error => console.log(error)
      );
    this.subscriptionLines = this.service.observableLines.subscribe(
        value => {
          this.lines = value;
        },
        error => console.log(error)
      );
  }

}
