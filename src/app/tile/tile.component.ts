import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TileComponent implements OnInit {

  @Input() top: number;
  @Input() left: number;
  @Input() ind: number;
  @Input() id: number;

  // colors: any = ["#92BBCA", "#DEAC8E", "#E96346", "#87CAA5", "#B33F72", "#271B33", "#577A86"];
  colors: any = ["blue", "orange", "red", "green", "pink", "black", "grey"];
  color: string = null;

  @Input() selected: boolean;

  textInd: number = null;

  constructor(private service: GameService) { }

  ngOnInit(): void {

    switch (this.service.gameMode) {
      case "easy":
        // this.textInd = this.ind;
        this.color = this.colors[this.ind];
        break;
      case "medium":
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        break;
      case "hard":
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        break;
      default:
        this.color = this.colors[this.ind];
    }
  }

  onClick(){
    // this.selected = !this.selected;
    this.service.onClickTile(this.top,this.left,this.ind,this.id);
  }

}
