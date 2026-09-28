import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Customer,
  CustomerPageResponse,
  CustomerRequest
} from '../../shared/models/customer.model';
import { API_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${API_URL}/customers`;

  getCustomers(
    page = 0,
    size = 10,
    search = ''
  ): Observable<CustomerPageResponse> {

    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('search', search);

    return this.http.get<CustomerPageResponse>(
      this.apiUrl,
      { params }
    );
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(
      `${this.apiUrl}/${id}`
    );
  }

  createCustomer(
    request: CustomerRequest
  ): Observable<Customer> {
    return this.http.post<Customer>(
      this.apiUrl,
      request
    );
  }

  updateCustomer(
    id: number,
    request: CustomerRequest
  ): Observable<Customer> {
    return this.http.put<Customer>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}