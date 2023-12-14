import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    LoginComponent,
    NgbNavModule,
    AsyncPipe,
    RouterModule,
    NgbCollapseModule,
  ],
  standalone: true,
})
export class NavbarComponent {
  verified = false;
  admin = false;
  isCollapsed = true;

  verifiedLinks = [
    { title: 'Books', fragment: 'books', disabled: true },
    { title: 'Meetings', fragment: 'meetings', disabled: true },
  ];

  adminLinks = [{ title: 'Admin', fragment: 'admin' }];

  constructor(
    private authService: AuthService,
    public route: ActivatedRoute
  ) {
    authService.apiUser$.subscribe(() => {
      this.verified = authService.hasRole('Verified');
      this.admin = authService.hasRole('Admin');
    });
  }
}
