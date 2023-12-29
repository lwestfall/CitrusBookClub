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
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${this.token}`
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
      queryStr += `intitle:${encodeURIComponent(title)}`;
    }

    if (author) {
      queryStr += `+inauthor:${encodeURIComponent(author)}`;
    }

    const response = await firstValueFrom(
      this.http.get<GoogleBookVolumeResponse>(
        `https://www.googleapis.com/books/v1/volumes?q=${queryStr}&key=${this.token}`
      )
    );

    return (
      response.items
        ?.filter(i => i.volumeInfo.pageCount < MAX_PAGE_COUNT)
        ?.slice(0, maxResults) ?? []
    );
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
