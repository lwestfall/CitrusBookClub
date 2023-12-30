import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserDto } from '../../api/models';
import { AppState } from '../../app-state';
import { updateUserRoles } from '../state/users.actions';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input({ required: true }) user!: UserDto;

  verified = false;
  admin = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.verified = this.user.roles!.includes('Verified');
    this.admin = this.user.roles!.includes('Admin');
  }

  removeRole(user: UserDto, role: string): void {
    const roles = user.roles!.filter(r => r !== role);

    this.store.dispatch(
      updateUserRoles({ b64Email: btoa(this.user.emailAddress!), roles })
    );
  }

  addRole(user: UserDto, role: string): void {
    const roles = user.roles!.concat(role);

    this.store.dispatch(
      updateUserRoles({ b64Email: btoa(this.user.emailAddress!), roles })
    );
  }
}
