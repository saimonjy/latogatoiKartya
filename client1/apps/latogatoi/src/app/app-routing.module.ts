import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { CardDataComponent } from './card-data/card-data.component';
import { NewCardComponent } from './new-card/new-card.component';
import { PrintViewComponent } from './print-view/print-view.component';
import { TakePhotoComponent } from './take-photo/take-photo.component';
import { WebCamComponent } from './web-cam/web-cam.component';

const routes: Routes = [
  {path:'', component: CardListComponent},
  {path:'kartya_adatok', component: CardDataComponent},
  {path:'kartya/:id', component: NewCardComponent},
  {path:'kartya', component: NewCardComponent},
  {path:'nyomtatas',component: PrintViewComponent},
  {path:'foto',component: TakePhotoComponent},
  {path:'webcam',component: WebCamComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AppRoutingModule { }
