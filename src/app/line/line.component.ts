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
    // this.ctx.arc(75,75,50,0,Math.PI*2,true); // Внешняя окружность
    // this.ctx.moveTo(110,75);
    // this.ctx.arc(75,75,35,0,Math.PI,false);  // рот (по часовой стрелке)
    // this.ctx.moveTo(65,65);
    // this.ctx.arc(60,65,5,0,Math.PI*2,true);  // Левый глаз
    // this.ctx.moveTo(95,65);
    // this.ctx.arc(90,65,5,0,Math.PI*2,true);  // Правый глаз
    // this.ctx.stroke();
  }
  draw(){
    this.ctx.beginPath();
    for (var i = 0; i < this.coord.length; i++) {
      // Ставим точку на исходную позицию
      if (i == 0) {
        this.ctx.moveTo(this.coord[i][1], this.coord[i][0]);
      }else{
        // Рисуем линии от точки к точке
        this.ctx.lineTo(this.coord[i][1], this.coord[i][0]);
      }
      // Задаем цвет заливки в формате RGBA
      // this.ctx.fillStyle = "rgba(255,128,128,0.5)";
      // Зальем полученный многоугольник цветом
      
    }
    this.ctx.closePath()
    this.ctx.stroke();
  }
}
