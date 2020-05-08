import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private service: GameService) { }

  ngOnInit(): void {
  }

  onSelectGameMode(mode:string):void{
    this.service.selectGameMode(mode);
  }

}
