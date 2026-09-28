import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    CustomerCreditResponse,
    Order,
    OrderPageResponse,
    OrderRequest,
    OrderStatus
} from '../../shared/models/order.model';
import { API_URL } from '../../app.config';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private readonly http = inject(HttpClient);

    private readonly apiUrl =
        `${API_URL}/orders`;

    getOrders(
        page = 0,
        size = 10,
        search = ''
    ): Observable<OrderPageResponse> {

        const params = new HttpParams()
            .set('page', page)
            .set('size', size)
            .set('search', search);

        return this.http.get<OrderPageResponse>(
            this.apiUrl,
            { params }
        );
    }

    getOrder(id: number): Observable<Order> {
        return this.http.get<Order>(
            `${this.apiUrl}/${id}`
        );
    }

    createOrder(
        request: OrderRequest
    ): Observable<Order> {
        return this.http.post<Order>(
            this.apiUrl,
            request
        );
    }

    updateOrder(
        id: number,
        request: OrderRequest
    ): Observable<Order> {
        return this.http.put<Order>(
            `${this.apiUrl}/${id}`,
            request
        );
    }

    deleteOrder(id: number): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/${id}`
        );
    }

    updateStatus(id: number, status: OrderStatus): Observable<Order> {
        return this.http.patch<Order>(
            `${this.apiUrl}/${id}/status`,
            { status }
        );
    }

    getCustomerCredit(
        customerId: number,
        orderAmount: number
    ): Observable<CustomerCreditResponse> {

        return this.http.get<CustomerCreditResponse>(
            `${this.apiUrl}/credit`,
            {
                params: {
                    customerId,
                    orderAmount
                }
            }
        );
    }
}