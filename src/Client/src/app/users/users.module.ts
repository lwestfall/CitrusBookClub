import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersEffects } from './state/users.effects';
import { usersReducer } from './state/users.reducer';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersPageComponent } from './users-page/users-page.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  declarations: [UsersPageComponent, UserCardComponent],
})
export class UsersModule {}
