import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {WebcamModule} from 'ngx-webcam';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardListComponent } from './card-list/card-list.component';
import { NewCardComponent } from './new-card/new-card.component';
import { CardDataComponent } from './card-data/card-data.component';
import { TakePhotoComponent } from './take-photo/take-photo.component';
import { PrintViewComponent } from './print-view/print-view.component';
import { WebCamComponent } from './web-cam/web-cam.component';


import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent, 
    CardListComponent, 
    NewCardComponent, 
    CardDataComponent, 
    TakePhotoComponent, 
    PrintViewComponent,
    WebCamComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    WebcamModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
