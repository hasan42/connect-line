import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AreaComponent } from './area/area.component';
import { TileComponent } from './tile/tile.component';
import { StatComponent } from './stat/stat.component';
import { LineComponent } from './line/line.component';

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    TileComponent,
    StatComponent,
    LineComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
