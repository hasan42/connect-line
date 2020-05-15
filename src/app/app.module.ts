import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AreaComponent } from './area/area.component';
import { TileComponent } from './tile/tile.component';
import { StatComponent } from './stat/stat.component';
import { LineComponent } from './line/line.component';
import { SettingsComponent } from './settings/settings.component';
import { AlertComponent } from './alert/alert.component';
import { NightModeComponent } from './night-mode/night-mode.component';

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    TileComponent,
    StatComponent,
    LineComponent,
    SettingsComponent,
    AlertComponent,
    NightModeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
