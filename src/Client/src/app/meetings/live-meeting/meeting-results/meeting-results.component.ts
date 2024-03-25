import { Component, Input, OnChanges } from '@angular/core';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartConfiguration,
  ChartData,
  ChartDataset,
  LinearScale,
} from 'chart.js';
import { _DeepPartialArray } from 'chart.js/dist/types/utils';
import { orderBy } from 'lodash-es';
import { BookDto, BookVoteDto, MeetingDto } from '../../../api/models';

@Component({
  selector: 'app-meeting-results',
  templateUrl: './meeting-results.component.html',
  styleUrls: ['./meeting-results.component.css'],
})
export class MeetingResultsComponent implements OnChanges {
  @Input({ required: true }) meeting!: MeetingDto;

  bookVotes: BookVoteDto[] = [];
  lastBook: BookDto | null = null;
  lastBookRatings: number[] = [];
  averageRating: number | null = null;

  votesChartOptions: ChartConfiguration['options'] = {
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 1,
          maxTicksLimit: 100,
        },
      },
      y: {
        ticks: {
          display: true,
          stepSize: 1,
          maxTicksLimit: 100,
        },
      },
    },
  };

  votesChartData: ChartData<'bar'> | null = null;

  ratingChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {
        max: 10,
        min: 0,
        ticks: {
          precision: 1,
        },
      },
      y: {
        min: 0,
        ticks: {
          display: true,
          stepSize: 1,
          maxTicksLimit: 100,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  ratingChartData: ChartData<'bar'> | null = null;

  constructor() {
    Chart.register(CategoryScale);
    Chart.register(LinearScale);
    Chart.register(BarController);
    Chart.register(BarElement);
  }

  ngOnChanges() {
    this.bookVotes = this.meeting.votes;
    this.votesChartData = this.getVotesChartData();
    const maxVotes = this.getMaxVotes();

    this.votesChartOptions!.scales!['x']!.max = maxVotes;

    this.lastBook = this.meeting.previousMeeting?.winningBook ?? null;
    this.lastBookRatings = this.lastBook?.ratings?.map(r => r.rating) ?? [];

    if (this.lastBook && this.lastBookRatings) {
      this.averageRating =
        this.lastBookRatings.reduce((a, b) => a + b, 0)! /
        this.lastBookRatings.length;

      this.ratingChartData = this.getRatingChartData();

      this.ratingChartOptions!.scales!['y']!.max = this.getMaxRatings();
    }
  }

  getVotesChartData(): ChartData<'bar'> {
    const bookVoteMap = new Map<
      string,
      { [rank: number]: number; points: number }
    >();

    this.bookVotes.forEach(v => {
      const voteCounter = bookVoteMap.get(v.book.title);

      if (voteCounter) {
        voteCounter[v.rank] = voteCounter[v.rank] ? voteCounter[v.rank] + 1 : 1;
      } else {
        bookVoteMap.set(v.book.title, { [v.rank]: 1, points: 0 });
      }
    });

    let labels = Array.from(bookVoteMap.keys());

    const datasets: ChartDataset<
      'bar',
      (number | [number, number] | null)[]
    >[] = [];

    const innerLabels: _DeepPartialArray<string> = [];

    const seriesColors = this.getSeriesColors(labels.length);

    for (let lblIndex = 0; lblIndex < labels.length; lblIndex++) {
      const label = labels[lblIndex];
      const voteCounter = bookVoteMap.get(label)!;

      for (let rank = 1; rank <= labels.length; rank++) {
        let count = voteCounter[rank] ?? 0;
        innerLabels.push(`Rank ${rank}`);

        voteCounter.points =
          voteCounter.points + count * (labels.length - rank);

        const dataset = datasets.find(d => d.label === `Rank ${rank}`);

        if (count === 0) {
          count = 0.05;
        }

        if (dataset) {
          dataset.data.push(count);
        } else {
          datasets.push({
            data: [count],
            label: `Rank ${rank}`,
            backgroundColor: seriesColors[rank - 1],
            yAxisID: 'yAxis1',
            barPercentage: 1.0,
            categoryPercentage: 1.0,
          });
        }
      }
    }

    labels = orderBy(labels, lbl => bookVoteMap.get(lbl)!.points, 'desc');

    labels = labels.map(lbl => {
      const voteCounter = bookVoteMap.get(lbl)!;

      return `${lbl} (${voteCounter.points} points)`;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.votesChartOptions!.scales!['y']! as any).labels = innerLabels;

    return {
      labels,
      datasets,
    };
  }

  getRatingChartData(): ChartData<'bar'> {
    const ratingMap = new Map<number, number>();
    const datasets: ChartDataset<
      'bar',
      (number | [number, number] | null)[]
    >[] = [{ data: [], backgroundColor: '#bf00b3' }];

    this.lastBookRatings.forEach(r => {
      const ratingCount = ratingMap.get(r);

      if (ratingCount) {
        ratingMap.set(r, ratingCount + 1);
      } else {
        ratingMap.set(r, 1);
      }
    });

    const ratingKeys = Array.from(ratingMap.keys()).sort((a, b) => a - b);

    ratingKeys.forEach(r => {
      const ratingCount = ratingMap.get(r)!;

      datasets[0].data.push(ratingCount);
    });

    const labels = Array.from(ratingMap.keys())
      .sort((a, b) => a - b)
      .filter(r => r > 0)
      .map(r => `Rating of ${r}`);

    return {
      labels,
      datasets,
    };
  }

  getMaxVotes(): number {
    if (!this.votesChartData?.datasets.length) return 0;

    const voteGroups = this.votesChartData.datasets.map(d =>
      Math.max(...(d.data as number[]))
    );

    return Math.max(...voteGroups);
  }

  getMaxRatings(): number {
    if (!this.ratingChartData?.datasets.length) return 0;

    const ratingGroups = this.ratingChartData.datasets[0].data as number[];

    return Math.max(...ratingGroups);
  }

  getSeriesColors(dataCount: number): string[] {
    const interpolateColor = (
      color1: number[],
      color2: number[],
      factor: number = 0.5
    ): number[] => {
      const result: number[] = color1.slice();
      for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
      }
      return result;
    };

    const hex = (x: number): string => {
      const hexString: string = x.toString(16);
      return hexString.length === 1 ? '0' + hexString : hexString;
    };

    const rgb2hex = (rgb: number[]): string => {
      return `#${hex(rgb[0])}${hex(rgb[1])}${hex(rgb[2])}`;
    };

    const seriesColors: string[] = [];

    for (let i = 0; i < dataCount; i++) {
      const startColor: number[] = [0, 128, 0]; // Dark green
      const endColor: number[] = [128, 0, 0]; // Dark Yellow
      const factor: number = i / (dataCount - 1);
      seriesColors.push(
        rgb2hex(interpolateColor(startColor, endColor, factor))
      );
    }

    return seriesColors;
  }
}
