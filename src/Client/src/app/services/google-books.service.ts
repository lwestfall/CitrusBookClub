import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MiscService } from '../api/services';

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

    if (response.totalItems === 0) {
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
      // queryStr += `intitle:${title}`;
      queryStr += `"${title}"`;
    }

    if (author) {
      queryStr += `+inauthor:${encodeURIComponent(author)}`;
    }

    const response = await firstValueFrom(
      this.http.get<GoogleBookVolumeResponse>(
        `https://www.googleapis.com/books/v1/volumes?${queryStr}&printType=books&key=${this.token}`
      )
    );

    const volumes = GoogleBooksService.filterDuplicates(response.items ?? []);

    return (
      volumes
        .filter(i => i.volumeInfo.pageCount < MAX_PAGE_COUNT)
        ?.slice(0, maxResults) ?? []
    );
  }

  private static filterDuplicates(
    volumes: GoogleBookVolume[]
  ): GoogleBookVolume[] {
    const seen = new Map<string, GoogleBookVolume>();

    volumes.forEach(volume => {
      const id =
        volume.volumeInfo.title + (volume.volumeInfo.authors?.join(',') || '');
      const existingVolume = seen.get(id);

      if (
        !existingVolume ||
        this.calculateScore(volume) > this.calculateScore(existingVolume)
      ) {
        seen.set(id, volume);
      }
    });

    return Array.from(seen.values());
  }

  private static calculateScore(volume: GoogleBookVolume): number {
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
  items: GoogleBookVolume[];
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
}
