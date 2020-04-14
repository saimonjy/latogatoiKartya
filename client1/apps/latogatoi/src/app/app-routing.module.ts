import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { NewCardComponent } from './new-card/new-card.component';
import { PrintViewComponent } from './print-view/print-view.component';

const routes: Routes = [
  {path:'', component: CardListComponent},
  {path:'kartya/:id', component: NewCardComponent},
  {path:'kartya', component: NewCardComponent},
  {path:'nyomtatas/:id',component: PrintViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AppRoutingModule { }
