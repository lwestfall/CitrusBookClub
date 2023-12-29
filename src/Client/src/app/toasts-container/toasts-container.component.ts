import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from '../services/toasts.service';

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.css'],
  imports: [NgbToastModule, CommonModule],
  standalone: true,
})
export class ToastsContainerComponent {
  constructor(public toastsService: ToastsService) {}
}
