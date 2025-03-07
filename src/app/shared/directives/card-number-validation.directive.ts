import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

import isCardNumberValid from 'card-validator';

interface ValidatorFn {
  [key: string]: unknown;
}

@Directive({
  selector: '[cardNumberValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CardNumberValidationDirective,
      multi: true,
    }
  ]
})
export class CardNumberValidationDirective implements Validator {
  validate(control: AbstractControl): ValidatorFn | null {
    const value = control?.value ?? null;

    if (!value) {
      return null;
    }

    return isCardNumberValid.number(control?.value ?? '')
      ? { 'errors.card-number-format': true }
      : null
  }
}