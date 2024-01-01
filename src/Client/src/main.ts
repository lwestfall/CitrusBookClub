/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { polyfill } from 'mobile-drag-drop';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
// optional import of scroll behaviour
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';

polyfill({
  // use this to make use of the scroll behaviour
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});

// workaround to make scroll prevent work in iOS Safari >= 10
try {
  window.addEventListener('touchmove', function () {}, { passive: false });
} catch (e) {
  /* empty */
}

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
