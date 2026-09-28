import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Lead,
  LeadPageResponse,
  LeadRequest,
  LeadStatus
} from '../../shared/models/lead.model';
import { API_URL } from '../../app.config';


@Injectable({
  providedIn: 'root'
})
export class LeadService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl =
    `${API_URL}/leads`;


  getLeads(
    page: number = 0,
    size: number = 10,
    search: string = '',
    status?: LeadStatus
  ): Observable<LeadPageResponse> {

    let params =
      new HttpParams()
        .set('page', page)
        .set('size', size);

    if (search.trim()) {

      params =
        params.set(
          'search',
          search.trim()
        );
    }

    if (status) {

      params =
        params.set(
          'status',
          status
        );
    }

    return this.http.get<LeadPageResponse>(
      this.baseUrl,
      { params }
    );
  }


  getLead(
    id: number
  ): Observable<Lead> {

    return this.http.get<Lead>(
      `${this.baseUrl}/${id}`
    );
  }


  createLead(
    request: LeadRequest
  ): Observable<Lead> {

    return this.http.post<Lead>(
      this.baseUrl,
      request
    );
  }


  updateLead(
    id: number,
    request: LeadRequest
  ): Observable<Lead> {

    return this.http.put<Lead>(
      `${this.baseUrl}/${id}`,
      request
    );
  }


  deleteLead(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );
  }
}