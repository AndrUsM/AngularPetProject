
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: false,
})
export class HomePageComponent {
  personalInformationFormSection = new FormGroup({
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

  formGroup = new FormGroup({
    personalInfo: this.personalInformationFormSection,
  })

  constructor() { }

  ngOnInit() { }

  public getControl(path: string) {
    return this.formGroup.get(path) as FormControl;
  }
}