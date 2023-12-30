import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-snow-flake',
  templateUrl: './snow-flake.component.html',
  styleUrls: ['./snow-flake.component.css'],
  standalone: true,
})
export class SnowFlakeComponent implements OnInit {
  @Input() depth = 1;
  @Input() speed = 1;

  flakeOpacity = 1;
  flakeSize = 1;
  horizontalDuration = 5;
  horizontalDelay = 0;
  verticalDelay = 0;
  verticalDuration = 3;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(): void {
    switch (this.speed) {
      case 1:
        this.verticalDuration = 5;
        this.horizontalDuration = 3;
        break;
      case 2:
        this.verticalDuration = 6;
        this.horizontalDuration = 3;
        break;
      case 3:
        this.verticalDuration = 8;
        this.horizontalDuration = 3.5;
        break;
      case 4:
        this.verticalDuration = 10;
        this.horizontalDuration = 4;
        break;
      case 5:
        this.verticalDuration = 15;
        this.horizontalDuration = 5;
        break;
    }

    // Choose a random offset for the animation so that we fill the screen with snow
    // flakes rather than having them all start together at the top.
    this.verticalDelay = Math.random() * -this.verticalDuration;
    this.horizontalDelay = Math.random() * -this.horizontalDuration;

    switch (this.depth) {
      case 1:
        this.flakeSize = 1;
        this.flakeOpacity = 1;
        break;
      case 2:
        this.flakeSize = 2;
        this.flakeOpacity = 1;
        break;
      case 3:
        this.flakeSize = 3;
        this.flakeOpacity = 0.9;
        break;
      case 4:
        this.flakeSize = 5;
        this.flakeOpacity = 0.5;
        break;
      case 5:
        this.flakeSize = 10;
        this.flakeOpacity = 0.2;
        break;
    }
  }
}
