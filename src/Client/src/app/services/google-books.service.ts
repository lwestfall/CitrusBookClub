import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MiscService } from '../api/services';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  constructor(
    private miscService: MiscService,
    private http: HttpClient
  ) {}

  async getBookVolumeByIsbn(isbn: string): Promise<GoogleBookVolume | null> {
    const token = await firstValueFrom(this.miscService.googleApiKey());

    if (!token) {
      throw new Error('Google API key unavailable');
    }

    const response = await firstValueFrom(
      this.http.get<GoogleBookVolumeResponse>(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${token}`
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
    const token = await firstValueFrom(this.miscService.googleApiKey());

    if (!token) {
      throw new Error('Google API key unavailable');
    }

    let queryStr = 'q=';

    if (title) {
      queryStr += `intitle:${encodeURIComponent(title)}`;
    }

    if (author) {
      queryStr += `+inauthor:${encodeURIComponent(author)}`;
    }

    const response = await firstValueFrom(
      this.http.get<GoogleBookVolumeResponse>(
        `https://www.googleapis.com/books/v1/volumes?q=${queryStr}&maxResults=${maxResults}&key=${token}`
      )
    );

    return response.items ?? [];
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
