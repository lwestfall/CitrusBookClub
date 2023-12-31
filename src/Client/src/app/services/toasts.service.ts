import { Injectable } from '@angular/core';

export interface ToastInfo {
  header: string;
  classname?: string | null | undefined;
  body?: string | null | undefined;
  autohide?: boolean | undefined;
  delay?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastsService {
  toasts: ToastInfo[] = [];

  show(toast: ToastInfo) {
    this.toasts.push(toast);
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

  showSuccess(
    header: string,
    body?: string,
    autohide?: boolean,
    delay?: number
  ) {
    this.show({
      header,
      body,
      classname: 'bg-success text-light',
      autohide,
      delay,
    });
  }
}
