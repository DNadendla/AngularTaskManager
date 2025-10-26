import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appProjectNameValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ProjectNameValidatorDirective,
      multi: true,
    },
  ],
  standalone: false,
})
export class ProjectNameValidatorDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.includes('test')) {
      return { invalidProjectName: true };
    }
    return null;
  }
}
