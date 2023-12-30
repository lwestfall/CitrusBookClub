import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDto } from '../../api/models';
import { AppState } from '../../app-state';
import { getAllUsers } from '../state/users.actions';
import { selectAllUsers } from '../state/users.selectors';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  users$: Observable<UserDto[]>;

  constructor(private store: Store<AppState>) {
    this.users$ = this.store.select(selectAllUsers);
  }

  ngOnInit() {
    this.store.dispatch(getAllUsers());
  }
}
