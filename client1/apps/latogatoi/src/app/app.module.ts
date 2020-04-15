import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LatogatoiCsoportokModule } from './latogatoi-csoportok/latogatoi-csoportok.module';
import { KartyakModule } from './kartyak/kartyak.module';
import { FelhasznalokModule } from './felhasznalok/felhasznalok.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LatogatoiCsoportokModule,
    KartyakModule,
    FelhasznalokModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
