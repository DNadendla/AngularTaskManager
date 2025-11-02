import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { EmailValidatorService } from '../email-validator.service';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  userForm: FormGroup;
  // submitted = false;

  constructor(
    private fb: FormBuilder,
    private emailValidator: EmailValidatorService,
    private userService: UserService
  ) {
    this.userForm = this.fb.group(
      {
        // name: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[a-zA-Z ]+$'),
          ],
        ],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern('^[6-9]\\d{9}$'), // Indian mobile number format (10 digits, starts with 6–9)
          ],
        ],

        // password: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
        // phone: ['', Validators.required],
        terms: ['', Validators.requiredTrue],
        /* email: [
          '',
          [Validators.required, Validators.email],
          [this.emailValidator.validate.bind(this.emailValidator)],
        ], */
        email: [
          '',
          [Validators.required, Validators.email],
          [this.emailValidator.validate.bind(this.emailValidator)],
        ],

        skills: this.fb.array([this.createSkillControl()]), // Initialize with one default skill
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Helper to create a skill control
  createSkillControl(): FormControl {
    // return this.fb.control('', Validators.required);
    return this.fb.control('');
  }

  // Getter for easy access in template
  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  // Add skill
  addSkill(): void {
    this.skills.push(this.createSkillControl());
  }

  // Remove skill
  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  // Submit
  /* onSubmit(): void {
    this.userService.addUser(this.userForm.value).subscribe((response) => {
      console.log('User added successfully:', response);
    });
    console.log(this.userForm.value);
  } */

  onSubmit(): void {
    // 1️⃣ Mark all fields as touched to trigger validation messages
    this.userForm.markAllAsTouched();

    // 2️⃣ Prevent submission if form is invalid
    if (this.userForm.invalid) {
      console.warn('❌ Form is invalid. Please correct the errors.');
      return;
    }

    // 3️⃣ Proceed only if form is valid
    console.log('✅ Form Submitted:', this.userForm.value);

    // 4️⃣ Make backend API call
    this.userService.addUser(this.userForm.value).subscribe({
      next: (response) => {
        console.log('🎉 User added successfully:', response);
        alert('User Registered Successfully!');

        // 5️⃣ Reset form and FormArray
        this.userForm.reset();
        this.skills.clear();
        this.skills.push(this.createSkillControl());
      },
      error: (err) => {
        console.error('⚠️ Error adding user:', err);
        alert('Something went wrong while adding user. Please try again.');
      },
    });
  }
}
