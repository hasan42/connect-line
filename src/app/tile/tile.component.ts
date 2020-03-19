import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() top: number;
  @Input() left: number;
  @Input() ind: number;
  @Input() id: number;

  constructor(private service: GameService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.service.onClickTile(this.top,this.left,this.ind,this.id);
  }

}
