import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-validation-message',
  standalone: false,
  templateUrl: './form-validation-message.component.html',
  styleUrl: './form-validation-message.component.scss',
})
export class FormValidationMessageComponent {
  @Input() control: AbstractControl | null;
  @Input() controlName: string = ''; // 👈 added input - link from sign-up form -> controlName="username"
  @Input() formGroup?: FormGroup;

  get passwordMismatch(): String | null {
    console.log(
      'Control Name:',
      this.controlName,
      'control errors:',
      this.control?.errors,
      'form group',
      this.formGroup?.errors
    ); // 👈 debug log

    // ✅ Handle cross-field error
    if (
      this.formGroup &&
      this.formGroup.hasError('passwordMismatch') &&
      this.controlName === 'confirmPassword' &&
      this.control?.touched
    ) {
      return 'Passwords do not match.';
    }
    return null;
  }

  get errorMessage(): string | null {
    // console.log('Control Name:', this.controlName); // 👈 debug log
    console.log(
      'Control Name:',
      this.controlName,
      'control errors:',
      this.control?.errors,
      'form group',
      this.formGroup?.errors
    ); // 👈 debug log

    if (
      !this.control ||
      !this.control.errors ||
      !(this.control.touched || this.control.dirty)
    ) {
      return null;
    }

    const errors = this.control.errors;

    // if (errors['required']) return 'This field is required.';

    /* UserName */
    if (this.controlName === 'username' && errors['required']) {
      return 'Username is required.';
    }

    if (this.controlName === 'username' && errors['minlength']) {
      return 'Username must be at least 3 characters long.';
    }

    if (this.controlName === 'username' && errors['pattern']) {
      return 'Only alphabets and spaces are allowed.';
    }

    /* Email */
    // if (errors['email']) return 'Invalid email format.';
    if (this.controlName === 'email' && errors['required']) {
      return 'Email is required.';
    }

    if (this.controlName === 'email' && errors['email']) {
      return 'Invalid email format.';
    }

    /* Async validation error  */
    if (this.controlName === 'email' && errors['emailTaken']) {
      return ' This email is already registered.';
    }

    /* Phone */
    if (this.controlName === 'phone' && errors['required']) {
      return 'Phone number is required.';
    }

    if (this.controlName === 'phone' && errors['pattern']) {
      return 'Enter a valid 10-digit phone number starting with 6–9.';
    }

    /* Skill */
    if (this.controlName === 'skill' && errors['required']) {
      return 'Skill is Required.';
    }

    if (this.controlName === 'skill' && errors['minlength']) {
      return 'Skill name should be atleast 2.';
    }

    if (this.controlName === 'skill' && errors['pattern']) {
      return 'Invalid Skill name.';
    }

    /* Password */
    if (this.controlName === 'password' && errors['required']) {
      return 'Password is required.';
    }

    if (this.controlName === 'password' && errors['minlength']) {
      return 'Password must be at least 8 characters long.';
    }

    if (this.controlName === 'password' && errors['pattern']) {
      return 'Must include one uppercase letter, one number, and one special character.';
    }

    /* Cofirm Password */
    if (this.controlName === 'confirmPassword' && errors['required']) {
      return 'confirm Password is required.';
    }

    /* Terms & Cond */
    if (this.controlName === 'terms' && errors['required']) {
      return 'You must agree to the terms and conditions.';
    }

    /* if (this.controlName === 'confirmPassword' && errors['passwordMismatch']) {
      return 'Passwords do not match.';
    } */

    return null;
  }
}
