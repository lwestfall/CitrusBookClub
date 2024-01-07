import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbCollapseModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BookCardComponent } from './book-card/book-card.component';
import { BookCreatorComponent } from './book-creator/book-creator.component';
import { BooksPageComponent } from './books-page/books-page.component';
import { BooksEffects } from './state/books.effects';
import { booksReducer } from './state/books.reducer';

@NgModule({
  imports: [
    CommonModule,
    NgbCollapseModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    StoreModule.forFeature('books', booksReducer),
    EffectsModule.forFeature([BooksEffects]),
  ],
  declarations: [BookCardComponent, BooksPageComponent, BookCreatorComponent],
  exports: [BookCardComponent],
})
export class BooksModule {}
