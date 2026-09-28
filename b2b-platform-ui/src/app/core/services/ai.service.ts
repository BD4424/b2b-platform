import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.config';

export interface AiChatRequest {
  message: string;
}

export interface AiChatResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private readonly baseUrl =
    `${API_URL}/ai`;

  constructor(
    private http: HttpClient
  ) {}

  chat(message: string): Observable<AiChatResponse> {

    return this.http.post<AiChatResponse>(
      `${this.baseUrl}/chat`,
      {
        message
      }
    );
  }
}