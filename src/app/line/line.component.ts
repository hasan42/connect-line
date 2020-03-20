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

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.draw();
  }
  draw(){
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
}
