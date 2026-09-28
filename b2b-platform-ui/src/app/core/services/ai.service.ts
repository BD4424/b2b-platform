import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    'http://localhost:8080/api/ai';

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