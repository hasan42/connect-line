import { Component, OnInit, AfterViewChecked, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';
// import lodash from 'lodash';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit, AfterViewChecked {

  @Input() coord: any;
  // oldCoord

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  intersects: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.checkIntersects();
    this.draw();
    // this.oldCoord = [...this.coord]
  }
  ngAfterViewChecked() {
    // const arr = lodash.differenceWith(this.oldCoord, this.coord, lodash.isEqual);
    // if(arr.length > 0){
    //   this.oldCoord = [...this.coord]
      this.checkIntersects();
      this.clearDraw();
      this.draw();
    // }
  }
  draw(){
    if(this.intersects === true){
      this.ctx.strokeStyle = '#A5606E';
    }else{
      this.ctx.strokeStyle = '#8898B8';
    }
    this.ctx.beginPath();
    for (var i = 0; i < this.coord.length; i++) {
      if (i == 0) {
        this.ctx.moveTo(this.coord[i].left, this.coord[i].top);
      }else{
        this.ctx.lineTo(this.coord[i].left, this.coord[i].top);
      }
    }
    this.ctx.closePath()
    this.ctx.stroke();
  }
  checkIntersects(){
    let arr = this.coord.filter(el=>el.intersects===true)
    this.intersects = arr.length > 0 ? true : false;
  }
  clearDraw(){
    this.ctx.clearRect(0, 0, 800, 800);
  }
  compareArray(){
    // let newArr = 
    const comparer = (otherArray) => (current) => otherArray.filter((other) => 
      other.value == current.value && other.display == current.display
      ).length == 0;
  }
}
