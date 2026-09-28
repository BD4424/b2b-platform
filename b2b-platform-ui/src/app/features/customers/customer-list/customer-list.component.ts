import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../shared/models/customer.model';

@Component({
  standalone: true,
  selector: 'app-customer-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent implements OnInit {

  private readonly customerService =
    inject(CustomerService);

  customers: Customer[] = [];

  search = '';

  page = 0;
  totalPages = 0;
  totalElements = 0;

  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.error = '';

    this.customerService
      .getCustomers(
        this.page,
        10,
        this.search
      )
      .subscribe({
        next: result => {
          this.customers = result.content;
          this.totalPages = result.totalPages;
          this.totalElements = result.totalElements;
          this.loading = false;
        },

        error: () => {
          this.error =
            'Unable to load customers. Is the Spring Boot API running?';

          this.loading = false;
        }
      });
  }

  searchCustomers(): void {
    this.page = 0;
    this.loadCustomers();
  }

  resetFilters(): void {
    this.search = '';
    this.page = 0;
    this.loadCustomers();
  }

  previous(): void {
    if (this.page > 0) {
      this.page--;
      this.loadCustomers();
    }
  }

  next(): void {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.loadCustomers();
    }
  }

  deleteCustomer(customer: Customer): void {
    if (!confirm(`Delete ${customer.name}?`)) {
      return;
    }

    this.customerService
      .deleteCustomer(customer.id)
      .subscribe({
        next: () => {
          if (
            this.customers.length === 1 &&
            this.page > 0
          ) {
            this.page--;
          }

          this.loadCustomers();
        },

        error: () => {
          this.error =
            'Unable to delete customer.';
        }
      });
  }

  outstandingClass(amount: number): string {
    if (amount <= 0) {
      return 'outstanding outstanding--clear';
    }

    return 'outstanding outstanding--due';
  }
}