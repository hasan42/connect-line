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
    this.resetIntersectsLines();
    this.takeLine()
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
    this.resetIntersectsLines();
      this.takeLine()
    console.log(this.lines);
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
        
        let item = { top: top, left: left, ind: i, id: id, selected: null};
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
        let obj = {top: el.top, left: el.left, id: i, intersects: null}
        coordArr.push(obj)
      });
      this.lines.push(coordArr);
    }
    this.observableLines.next(this.lines);
  }

  resetIntersectsLines(){
    this.lines.forEach(ael=>{
      ael.forEach(bel=>{
        bel.intersects = false;
      });
    });
  }

  takeLine(){
    for(let i=0;i<=this.lines.length-1;i++){
      let startLine = null,
          endLine = null;
      if( Array.isArray(this.lines[i]) ){
        for(let j=0;j<=this.lines[i].length-1;j++){
          let a = this.lines[i][j].top;
          let b = this.lines[i][j].left;
          let next = j === this.lines[i].length - 1 ? 0 : j+1;
          let c = this.lines[i][next].top;
          let d = this.lines[i][next].left;
          
          this.lines[i][j].intersects = this.checkIntersectsLine(a,b,c,d)
        }
      }
    }
  }
  checkIntersectsLine(a,b,c,d){
    for(let i=0;i<=this.lines.length-1;i++){
      let startLine = null,
          endLine = null,
          intersects = null;

          // console.log(this.lines[i]);
      if( Array.isArray(this.lines[i]) ){
        for(let j=0;j<=this.lines[i].length-1;j++){
          // console.log(i, j);
          let p = this.lines[i][j].top;
          let q = this.lines[i][j].left;
          let next = j === this.lines[i].length - 1 ? 0 : j+1;
          // console.log(j, this.lines[i].length, next, this.lines[i][next]);
          let r = this.lines[i][next].top;
          let s = this.lines[i][next].left;

          if( a!==p && b!==q && c!==r && d!==s){
            intersects = this.intersects(a,b,c,d,p,q,r,s)
          }else{
            intersects = false
          }
          // console.log(intersects);
          if(intersects === true){
            return true;
          }
        }
      }
      
    }
    return false;
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
  
  intersects(a,b,c,d,p,q,r,s) {
    let det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  }
}
