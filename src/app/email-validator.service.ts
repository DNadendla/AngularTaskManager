import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service.service';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  constructor(
    private http: HttpClient,
    private userServiceService: UserService
  ) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    // Don’t call backend if input is empty
    if (!email) {
      return of(null);
    }
    return this.userServiceService.getUser(email).pipe(
      delay(1000),
      map((user) => {
        console.log('User fetched for validation:', user);
        // if user exists, return an error
        return user ? { emailTaken: true } : null;
      }),
      catchError(() => of(null))
    );
  }
}

// return null;

// Simulate API call — replace URL with your actual endpoint
/* return this.http
      .get<{ exists: boolean }>(
        `https://api.example.com/users/check-email?email=${email}`
      )
      .pipe(
        delay(800), // optional: simulate network delay for UX demo
        map((response) => (response.exists ? { emailTaken: true } : null)),
        catchError(() => of(null)) // in case of backend failure, consider it valid
      ); */
