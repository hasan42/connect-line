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
  private subscription: Subscription;

  constructor(private service: GameService) { }

  ngOnInit(): void {
    this.subscription = this.service.observableItems.subscribe(
        value => {
          this.items = value;
        },
        error => console.log(error)
      );
  }

}
