import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { WebcamModule } from 'ngx-webcam';

import { CardListComponent } from './card-list/card-list.component';
import { NewCardComponent } from './new-card/new-card.component';
import { PrintViewComponent } from './print-view/print-view.component';

@NgModule({
  declarations: [CardListComponent, NewCardComponent, PrintViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    WebcamModule,
    RouterModule,
  ]
})
export class KartyakModule {}
