import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';


@NgModule({
  declarations: [RegisztracioComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
})
export class FelhasznalokModule { }
