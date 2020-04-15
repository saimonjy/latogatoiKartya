import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardListComponent } from './kartyak/card-list/card-list.component';
import { NewCardComponent } from './kartyak/new-card/new-card.component';
import { PrintViewComponent } from './kartyak/print-view/print-view.component';
import { ListaComponent } from './latogatoi-csoportok/lista/lista.component';
import { UjComponent } from './latogatoi-csoportok/uj/uj.component';
import { RegisztracioComponent } from './felhasznalok/regisztracio/regisztracio.component';
import { AuthGuard } from './felhasznalok/auth/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: CardListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'kartya/:id',
    component: NewCardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'kartya',
    component: NewCardComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'nyomtatas/:id',
    component: PrintViewComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'latogatoi-csoportok',
    component: ListaComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'uj-latogatoi-csoport/:id',
    component: UjComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'uj-latogatoi-csoport',
    component: UjComponent,
    canActivate: [AuthGuard],
  },
  { path: 'regisztracio', component: RegisztracioComponent },
  { path: 'login', component: RegisztracioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
