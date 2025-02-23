import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

import { HomePageComponent } from './homepage.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    RouterModule,
  ]
})

export class HomepageModule { }