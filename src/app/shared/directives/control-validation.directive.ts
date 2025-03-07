import { Attribute, Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

import { BOOLEAN_NOOP } from "../constants/boolean-noop";

type ControlValidationLogic = (value: unknown | null) => boolean;


@Directive({
  selector: '[controlValidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ControlValidationDirective,
      multi: true,
    }
  ]
})

export class ControlValidationDirective implements Validator {
  @Input('controlValidation') validationLogic: ControlValidationLogic = BOOLEAN_NOOP;

  @Attribute('customErrorMessageKey') errorMessageKey: string = 'error.common-error';

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control?.value ?? null;

    if (!value || !this.validationLogic) {
      return null;
    }

    return !this.validationLogic(value)
      ? {
        [this.errorMessageKey]: true,
      }
      : null
  }
}
