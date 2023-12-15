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
}

interface GoogleBookVolumeResponse {
  totalItems: number;
  items: GoogleBookVolume[];
}

interface GoogleBookVolume {
  volumeInfo: GoogleBookVolumeInfo;
}

interface GoogleBookVolumeInfo {
  title: string;
  authors: string[];
  description: string;
  pageCount: number;
  imageLinks: { smallThumbnail: string; thumbnail: string };
}
