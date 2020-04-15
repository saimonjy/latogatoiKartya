import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardListComponent } from './kartyak/card-list/card-list.component';
import { NewCardComponent } from './kartyak/new-card/new-card.component';
import { PrintViewComponent } from './kartyak/print-view/print-view.component';
import { ListaComponent } from './latogatoi-csoportok/lista/lista.component';
import { UjComponent } from './latogatoi-csoportok/uj/uj.component';
import { RegisztracioComponent } from './felhasznalok/regisztracio/regisztracio.component';

const routes: Routes = [
  {path:'', component: CardListComponent},
  {path:'kartya/:id', component: NewCardComponent},
  {path:'kartya', component: NewCardComponent},
  {path:'nyomtatas/:id',component: PrintViewComponent},
  {path:'latogatoi-csoportok', component: ListaComponent},
  {path:'uj-latogatoi-csoport/:id', component: UjComponent},
  {path:'uj-latogatoi-csoport', component: UjComponent},
  {path:'regisztracio', component: RegisztracioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AppRoutingModule { }
