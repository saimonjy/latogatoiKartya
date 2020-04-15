import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';


import { ListaComponent } from './lista/lista.component';
import { UjComponent } from './uj/uj.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ListaComponent, UjComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
  ]
})
export class LatogatoiCsoportokModule { }
