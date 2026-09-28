import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { OrderService } from '../../../core/services/order.service';

import {
  Order,
  OrderStatus
} from '../../../shared/models/order.model';


@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);

  order: Order | null = null;

  loading = true;
  updatingStatus = false;
  errorMessage = '';


  ngOnInit(): void {

    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    if (!id) {

      this.errorMessage =
        'Invalid order.';

      this.loading = false;

      return;
    }

    this.loadOrder(id);
  }


  loadOrder(id: number): void {

    this.loading = true;
    this.errorMessage = '';

    this.orderService
      .getOrder(id)
      .subscribe({

        next: order => {

          this.order = order;

          this.loading = false;
        },

        error: error => {

          console.error(
            'Unable to load order:',
            error
          );

          this.errorMessage =
            'Unable to load order details.';

          this.loading = false;
        }

      });
  }


  changeStatus(
    status: OrderStatus
  ): void {

    if (
      !this.order ||
      this.updatingStatus
    ) {
      return;
    }

    if (
      status === this.order.status
    ) {
      return;
    }


    this.updatingStatus = true;
    this.errorMessage = '';


    this.orderService
      .updateStatus(
        this.order.id,
        status
      )
      .subscribe({

        next: updatedOrder => {

          this.order =
            updatedOrder;

          this.updatingStatus =
            false;
        },

        error: error => {

          console.error(
            'Unable to update status:',
            error
          );

          this.errorMessage =
            error?.error?.message ||
            error?.error?.detail ||
            'Unable to update order status.';

          this.updatingStatus =
            false;
        }

      });
  }


  getAvailableStatuses(): OrderStatus[] {

    if (!this.order) {
      return [];
    }


    switch (
      this.order.status
    ) {

      case 'PENDING':

        return [
          'PENDING',
          'CONFIRMED',
          'CANCELLED'
        ];


      case 'CONFIRMED':

        return [
          'CONFIRMED',
          'COMPLETED',
          'CANCELLED'
        ];


      case 'COMPLETED':

        return [
          'COMPLETED'
        ];


      case 'CANCELLED':

        return [
          'CANCELLED'
        ];


      default:

        return [
          this.order.status
        ];
    }
  }


  statusClass(
    status: OrderStatus
  ): string {

    return status.toLowerCase();
  }


  formatStatus(
    status: OrderStatus
  ): string {

    return (
      status.charAt(0) +
      status
        .slice(1)
        .toLowerCase()
    );
  }


  trackByItemId(
    index: number,
    item: Order['items'][number]
  ): number {

    return item.id;
  }

}