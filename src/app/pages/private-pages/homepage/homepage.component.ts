import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { UserService } from '@core/services/user-service/user-service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
  providers: [
    UserService,
  ]
})
export class HomePageComponent {
  private ngUnsubscribe = new Subject<void>();

  public personalInformationFormSection = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
    ]),
    surname: new FormControl<string>('', [
      Validators.required,
    ]),
    email: new FormControl<string>('', [
      Validators.email,
    ]),
    age: new FormControl<number | null>(null, [
      Validators.min(0),
      Validators.max(200)
    ])
  });

  public paymentFormSection = new FormGroup({
    cardNumber: new FormControl<string>('', [
      Validators.required,
    ]),
    hasCredits: new FormControl<boolean>(false),
  })

  public formGroup = new FormGroup({
    personalInfo: this.personalInformationFormSection,
    paymentInfo: this.paymentFormSection,
  });

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
    this.ngUnsubscribe.unsubscribe();
  }

  public getControl(path: string) {
    return this.formGroup.get(path) as FormControl;
  }
}