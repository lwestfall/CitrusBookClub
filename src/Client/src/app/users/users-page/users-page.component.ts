import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { firstValueFrom } from 'rxjs';
import { UserDto } from '../../api/models';
import { UsersService } from '../../api/services';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
  imports: [CommonModule, UserCardComponent],
  standalone: true,
})
export class UsersPageComponent implements OnInit {
  users: UserDto[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.fetchAllUsers();
  }

  async fetchAllUsers(): Promise<void> {
    const users = await firstValueFrom(this.usersService.getUsers());

    this.users = _.orderBy(users, ['firstName', 'lastName']);

    console.log(this.users);
  }
}
