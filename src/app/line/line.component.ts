import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  @Input() coord: any;

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  intersects: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.checkIntersects()
    this.draw();
  }
  draw(){
    if(this.intersects === true){
      this.ctx.strokeStyle = 'red';
    }else{
      this.ctx.strokeStyle = 'blue';
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
}
