import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { NewCardComponent } from './new-card/new-card.component';
import { PrintViewComponent } from './print-view/print-view.component';

@NgModule({
  declarations: [
    CardListComponent, 
    NewCardComponent, 
    PrintViewComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class KartyakModule { }
