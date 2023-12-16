import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SnowFlakeComponent } from '../snow-flake/snow-flake.component';

@Component({
  selector: 'app-snow-generator',
  templateUrl: './snow-generator.component.html',
  styleUrls: ['./snow-generator.component.css'],
  imports: [CommonModule, SnowFlakeComponent],
  standalone: true,
})
export class SnowGeneratorComponent implements OnInit {
  snowFlakes: SnowFlakeConfig[] = [];

  constructor() {
    for (var i = 1; i <= 150; i++) {
      this.snowFlakes.push({
        depth: this.randRange(1, 5),
        left: this.randRange(0, 100),
        speed: this.randRange(1, 5),
      });
    }
  }

  ngOnInit() {}

  private randRange(min: number, max: number): number {
    var range = max - min;
    return min + Math.round(Math.random() * range);
  }
}

interface SnowFlakeConfig {
  depth: number;
  left: number;
  speed: number;
}
