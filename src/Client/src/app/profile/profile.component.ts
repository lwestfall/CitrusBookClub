import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDto } from '../api/models';
import { AppState } from '../app-state';
import { ToastsService } from '../services/toasts.service';
import { updateUser, updateUserSuccess } from '../users/state/users.actions';
import { selectAuthenticatedUser } from '../users/state/users.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule],
  standalone: true,
})
export class ProfileComponent {
  user$: Observable<UserDto | null>;
  form = this.fb.group({
    firstName: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
    ],
    emailAddress: ['', [Validators.required]],
  });

  constructor(
    private store: Store<AppState>,
    private fb: NonNullableFormBuilder,
    private toastsService: ToastsService,
    private actions$: Actions
  ) {
    this.user$ = store.select(selectAuthenticatedUser);

    this.user$.subscribe(user => {
      if (user) {
        this.form.patchValue(user);
      }
    });

    this.actions$.pipe(ofType(updateUserSuccess)).subscribe(() => {
      this.form.markAsPristine();
      this.toastsService.showSuccess('Profile Updated!');
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const userDto = {
      firstName: this.form.value!.firstName!,
      lastName: this.form.value!.lastName!,
    };

    this.store.dispatch(
      updateUser({
        b64Email: btoa(this.form.value!.emailAddress!),
        userDto,
      })
    );
  }
}
