import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardListComponent } from './kartyak/card-list/card-list.component';
import { NewCardComponent } from './kartyak/new-card/new-card.component';
import { PrintViewComponent } from './kartyak/print-view/print-view.component';

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
