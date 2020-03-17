import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  items: any = [];
  observableItems = new BehaviorSubject<any[]>(this.items);
  items$ = this.observableItems.asObservable();

  areaWidth: number = 800;
  areaHeight: number = 800;

  minItems: number = 3;
  maxItems: number = 6;
  minItemTile:number = 3;
  maxItemTile:number = 8;

  tileSize:number = 20;

  constructor() {
    this.newGame();
  }

  newGame(){
    this.generateItems()
  }

  onClickTile(){
  }

  generateItems(){
    let itemsLength = this.randomFromMinToMax(this.minItems, this.maxItems);
    for (let i = 1; i <= itemsLength; i++) {

      let tileLength = this.randomFromMinToMax(this.minItemTile, this.maxItemTile);
      for (let j = 1; j <= tileLength; j++) {
        let top = null,
            left = null;
        do {
          top = this.randomFromMinToMax(0, this.areaHeight);
          left = this.randomFromMinToMax(0, this.areaWidth);
        } while ( this.checkAround(top,left) === true);
        
        let item = { top: top, left: left, ind: i};
        this.items.push(item);
      }

    }
  }

  randomFromMinToMax(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  checkAround(top,left){
    let arr = null;
    arr = this.items.filter(x=> top >= x.top-30 && top <= x.top+30 && left >= x.left-30 && left <= x.left+30 );
    if(arr.length >= 1){
      return true
    }else{
      return false
    }
  }
}
