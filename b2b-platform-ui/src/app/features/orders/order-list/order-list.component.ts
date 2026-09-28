import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order, OrderStatus } from '../../../shared/models/order.model';


@Component({
  standalone: true,
  selector: 'app-order-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {

    constructor(
  private orderService: OrderService,
  private router: Router
) {}

  orders: Order[] = [];

  search = '';

  page = 0;
  totalPages = 0;
  totalElements = 0;

  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {

    this.loading = true;
    this.error = '';

    this.orderService
      .getOrders(
        this.page,
        10,
        this.search
      )
      .subscribe({

        next: result => {
          this.orders = result.content;
          this.totalPages = result.totalPages;
          this.totalElements = result.totalElements;
          this.loading = false;
        },

        error: () => {
          this.error =
            'Unable to load orders. Is the Spring Boot API running?';

          this.loading = false;
        }

      });
  }

  searchOrders(): void {
    this.page = 0;
    this.loadOrders();
  }

  resetSearch(): void {
    this.search = '';
    this.page = 0;
    this.loadOrders();
  }

  previous(): void {
    if (this.page > 0) {
      this.page--;
      this.loadOrders();
    }
  }

  next(): void {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.loadOrders();
    }
  }

  deleteOrder(order: Order): void {

    if (
      !confirm(
        `Delete order ${order.orderNumber}?`
      )
    ) {
      return;
    }

    this.orderService
      .deleteOrder(order.id)
      .subscribe({

        next: () => {

          if (
            this.orders.length === 1 &&
            this.page > 0
          ) {
            this.page--;
          }

          this.loadOrders();
        },

        error: err => {
          this.error =
            err?.error?.detail ||
            err?.error?.message ||
            'Unable to delete order.';
        }

      });
  }

  statusClass(status: OrderStatus): string {

    switch (status) {

      case 'CONFIRMED':
        return 'status status--confirmed';

      case 'COMPLETED':
        return 'status status--completed';

      case 'CANCELLED':
        return 'status status--cancelled';

      default:
        return 'status status--pending';
    }
  }

  openOrder(id: number): void {
  this.router.navigate(['/orders', id]);
}

}