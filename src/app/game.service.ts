import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  items: any = [];
  observableItems = new BehaviorSubject<any[]>(this.items);
  items$ = this.observableItems.asObservable();

  lines: any = [];
  observableLines = new BehaviorSubject<any[]>(this.lines);
  lines$ = this.observableLines.asObservable();

  areaWidth: number = 800;
  areaHeight: number = 800;

  itemsLength: number = null;
  tileLength: number = null;

  minItems: number = 3;
  maxItems: number = 6;
  minItemTile:number = 3;
  maxItemTile:number = 8;

  tileSize:number = 20;

  selectItem: any = null;
  compareItem: any = null;

  constructor() {
    this.newGame();
  }

  getIndexTileByParams(fTop,fLeft,fInd):number{
    return this.items.findIndex(el=>el.top===fTop && el.y===fLeft && el.ind===fInd )
  }
  getIndexTileById(fId):number{
    return this.items.findIndex(el=>el.id===fId)
  }

  newGame(){
    this.generateItems()
    this.generateLines()
    console.log(this.lines);
  }

  onClickTile(top,left,ind,id){
    if(this.selectItem === null){
      this.selectItem = { top,left,ind,id }
    }else{
      this.compareItem = { top,left,ind,id }
      this.replaceTile();
      this.resetChecked();
      this.generateLines();
    }
  }

  replaceTile(){
    let firstItem = this.getIndexTileById(this.selectItem.id),
        secondItem = this.getIndexTileById(this.compareItem.id);

    this.items[secondItem].top = this.selectItem.top;
    this.items[secondItem].left = this.selectItem.left;
    this.items[firstItem].top = this.compareItem.top;
    this.items[firstItem].left = this.compareItem.left;


  }
  resetChecked(){
    this.selectItem = null;
    this.compareItem = null;
  }

  generateItems(){
    let id = 0;
    this.itemsLength = this.randomFromMinToMax(this.minItems, this.maxItems);
    for (let i = 1; i <= this.itemsLength; i++) {

      this.tileLength = this.randomFromMinToMax(this.minItemTile, this.maxItemTile);
      for (let j = 1; j <= this.tileLength; j++) {
        let top = null,
            left = null;
        do {
          top = this.randomFromMinToMax(0, this.areaHeight);
          left = this.randomFromMinToMax(0, this.areaWidth);
        } while ( this.checkAround(top,left) === true);
        
        let item = { top: top, left: left, ind: i, id: id};
        id++;
        this.items.push(item);
      }
    }
  }

 generateLines(){
   this.lines = [];
   for (let i = 1; i <= this.itemsLength; i++) {
     let arr = this.items.filter(el=>el.ind===i);
     let coordArr = [];
     arr.forEach(el=>{
       coordArr.push([el.top,el.left])
     });
     this.lines.push(coordArr);
   }
   this.observableLines.next(this.lines);
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
