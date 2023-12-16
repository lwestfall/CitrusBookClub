import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { UserDto } from '../../api/models';
import { UsersService } from '../../api/services';
import { ToastsService } from '../../services/toasts.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  imports: [CommonModule, NgbDropdownModule],
  standalone: true,
})
export class UserCardComponent implements OnInit {
  @Input({ required: true }) user!: UserDto;
  @Output() rolesChanged = new EventEmitter<UserDto>();

  verified = false;
  admin = false;

  constructor(
    private usersService: UsersService,
    private toastsService: ToastsService
  ) {}

  ngOnInit() {
    this.verified = this.user.roles!.includes('Verified');
    this.admin = this.user.roles!.includes('Admin');
  }

  private updateRoles(roles: string[]): Observable<UserDto> {
    return this.usersService.updateUserRoles({
      b64Email: btoa(this.user.emailAddress!),
      body: roles,
    });
  }

  removeRole(user: UserDto, role: string): void {
    const newRoles = user.roles!.filter(r => r !== role);

    this.updateRoles(newRoles).subscribe({
      next: user => {
        this.rolesChanged.emit(user);

        this.toastsService.show({
          classname: 'text-bg-success text-light',
          header: 'Role Removed',
          body: `Removed ${role} role from ${user.firstName} ${user.lastName}`,
        });
      },
      error: () => {
        this.toastsService.show({
          header: 'Error',
          body: `Failed to remove ${role} role from ${user.firstName} ${user.lastName}`,
        });
      },
    });
  }

  addRole(user: UserDto, role: string): void {
    const newRoles = user.roles!.concat(role);

    this.updateRoles(newRoles).subscribe({
      next: user => {
        this.rolesChanged.emit(user);

        this.toastsService.show({
          header: 'Role Added',
          body: `Added ${role} role to ${user.firstName} ${user.lastName}`,
        });
      },
      error: () => {
        this.toastsService.show({
          header: 'Error',
          body: `Failed to add ${role} role to ${user.firstName} ${user.lastName}`,
        });
      },
    });
  }
}
