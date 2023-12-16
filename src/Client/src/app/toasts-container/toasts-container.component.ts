import { Component, OnInit } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from '../services/toasts.service';

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.css'],
  imports: [NgbToastModule],
  standalone: true,
})
export class ToastsContainerComponent implements OnInit {
  constructor(public toastsService: ToastsService) {}

  ngOnInit() {}
}
