import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

import { HomePageComponent } from './homepage.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardNumberValidationDirective } from '../../shared/directives/card-number-validation.directive';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    CardNumberValidationDirective,
  ],
  exports: [
    RouterModule,
  ]
})

export class HomepageModule { }