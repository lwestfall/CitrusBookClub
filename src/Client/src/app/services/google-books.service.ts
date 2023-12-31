import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MiscService } from '../api/services';

const MIN_PAGE_COUNT = 75;
const MAX_PAGE_COUNT = 600;

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  token: string | null = null;

  constructor(
    private miscService: MiscService,
    private http: HttpClient
  ) {
    this.miscService.googleApiKey().subscribe(token => {
      this.token = token;
    });
  }

  async getBookVolumeByIsbn(isbn: string): Promise<GoogleBookVolume | null> {
    if (!this.token) {
      throw new Error('Google API key unavailable');
    }

    const response = await firstValueFrom(
      this.http.get<GoogleBookVolumeResponse>(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&printType=books&key=${this.token}`
      )
    );

    if (response.totalItems === 0 || !response.items) {
      return null;
    }

    return response.items[0];
  }

  async getBookVolumeFuzzy(
    title: string | null | undefined,
    author: string | null | undefined,
    maxResults: number
  ): Promise<GoogleBookVolume[]> {
    if (!this.token) {
      throw new Error('Google API key unavailable');
    }

    let queryStr = 'q=';

    if (title) {
      queryStr += `"${title.replace(/\s+/g, '+')}"`;
    }

    if (author) {
      queryStr += `+inauthor:${encodeURIComponent(author)}`;
    }

    const response = await firstValueFrom(
      this.http.get<GoogleBookVolumeResponse>(
        `https://www.googleapis.com/books/v1/volumes?${queryStr}&printType=books&key=${this.token}`
      )
    );

    if (response.totalItems === 0 || !response.items) {
      return [];
    }

    const searchTitleWords = title?.toLocaleLowerCase().split(' ') ?? [];

    let volumes = response.items
      .filter(
        i =>
          i.volumeInfo.pageCount < MAX_PAGE_COUNT &&
          i.volumeInfo.pageCount > MIN_PAGE_COUNT
      )
      .filter(i => i.volumeInfo.language === 'en')
      .filter(i =>
        i.volumeInfo.title
          .toLocaleLowerCase()
          .split(' ')
          .some(w => searchTitleWords.some(w2 => w2 === w) ?? false)
      );

    volumes = GoogleBooksService.filterDuplicates(volumes);

    return (
      volumes
        .sort(
          (a, b) =>
            GoogleBooksService.calculateSortingScore(b, title, author) -
            GoogleBooksService.calculateSortingScore(a, title, author)
        )
        .slice(0, maxResults) ?? []
    );
  }

  private static filterDuplicates(
    volumes: GoogleBookVolume[]
  ): GoogleBookVolume[] {
    const seen = new Map<string, GoogleBookVolume>();

    const nonAlphas = /\W/g;

    volumes.forEach(volume => {
      const title = volume.volumeInfo.title
        .replaceAll(nonAlphas, '')
        .toLowerCase();
      const authors = volume.volumeInfo.authors
        .map(a => a.replaceAll(nonAlphas, ''))
        .join(',')
        .toLowerCase();

      const id = title + authors;
      const existingVolume = seen.get(id);

      if (
        !existingVolume ||
        this.calculateDuplicateScore(volume) >
          this.calculateDuplicateScore(existingVolume)
      ) {
        seen.set(id, volume);
      }
    });

    return Array.from(seen.values());
  }

  private static calculateSortingScore(
    volume: GoogleBookVolume,
    searchTitle: string | null | undefined,
    searchAuthor: string | null | undefined
  ): number {
    if (!searchTitle && !searchAuthor) {
      return 0;
    }

    if (!volume.volumeInfo.title) {
      return -100;
    }
    if (!volume.volumeInfo.authors.length) {
      return -100;
    }

    const searchTitleTerm =
      searchTitle?.toLowerCase() ?? 'NO TITLE **** XXX YYY';
    const searchAuthorTerm =
      searchAuthor?.toLowerCase() ?? 'NO AUTHOR **** XXX YYY';

    let score = 0;
    const title = volume.volumeInfo.title?.toLowerCase() ?? '';

    if (title.includes(searchTitleTerm)) {
      score += 100;
    }

    if (title.startsWith(searchTitleTerm)) {
      score += 50;
    }

    if (title === searchTitleTerm) {
      score += 200;
    }

    if (!searchTitleTerm.includes('summary') && title.includes('summary')) {
      score -= 500;
    }

    if (
      volume.volumeInfo.authors.some(a =>
        a.toLowerCase().includes(searchAuthorTerm)
      )
    ) {
      score += 100;
    }

    if (
      !volume.volumeInfo.industryIdentifiers.some(i => i.type.includes('ISBN'))
    ) {
      return -200;
    }
    return score;
  }

  private static calculateDuplicateScore(volume: GoogleBookVolume): number {
    let score = 0;
    score += volume.volumeInfo.title ? 1 : 0;
    score += volume.volumeInfo.authors ? 1 : 0;
    score += volume.volumeInfo.description ? 1 : 0;
    score += volume.volumeInfo.pageCount ? 1 : 0;
    score += volume.volumeInfo.imageLinks ? 1 : 0;

    return score;
  }
}

interface GoogleBookVolumeResponse {
  totalItems: number;
  items?: GoogleBookVolume[];
}

interface GoogleBookVolume {
  volumeInfo: GoogleBookVolumeInfo;
}

export interface GoogleBookVolumeInfo {
  title: string;
  authors: string[];
  description: string;
  pageCount: number;
  industryIdentifiers: { type: string; identifier: string }[];
  imageLinks: { smallThumbnail: string; thumbnail: string };
  language: string;
}
