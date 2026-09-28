import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerRequest } from '../../../shared/models/customer.model';


@Component({
  standalone: true,
  selector: 'app-customer-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly service = inject(CustomerService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  editing = false;
  customerId?: number;

  saving = false;
  error = '';

  readonly customerTypes = [
    'Dealer',
    'Distributor',
    'Retailer',
    'Contractor',
    'Builder',
    'Other'
  ];

  form = this.fb.nonNullable.group({

    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(200)
      ]
    ],

    customerType: [
      '',
      Validators.required
    ],

    phone: [
      '',
      Validators.maxLength(50)
    ],

    email: [
      '',
      [
        Validators.email,
        Validators.maxLength(150)
      ]
    ],

    address: [
      '',
      Validators.maxLength(500)
    ],

    city: [
      '',
      Validators.maxLength(100)
    ],

    state: [
      '',
      Validators.maxLength(100)
    ],

    postalCode: [
      '',
      Validators.maxLength(20)
    ],

    creditLimit: [
      0,
      [
        Validators.required,
        Validators.min(0)
      ]
    ]
  });

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.editing = true;
    this.customerId = Number(id);

    this.service
      .getCustomer(this.customerId)
      .subscribe({

        next: customer => {

          this.form.patchValue({
            name: customer.name,
            customerType: customer.customerType,
            phone: customer.phone ?? '',
            email: customer.email ?? '',
            address: customer.address ?? '',
            city: customer.city ?? '',
            state: customer.state ?? '',
            postalCode: customer.postalCode ?? '',
            creditLimit: customer.creditLimit
          });

        },

        error: () => {
          this.error =
            'Customer could not be loaded.';
        }

      });
  }

  save(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.error = '';

    const request =
      this.form.getRawValue() as CustomerRequest;

    const operation =
      this.editing && this.customerId
        ? this.service.updateCustomer(
            this.customerId,
            request
          )
        : this.service.createCustomer(request);

    operation.subscribe({

      next: () => {
        this.router.navigate([
          '/customers'
        ]);
      },

      error: err => {

        this.error =
          err?.error?.detail ||
          err?.error?.message ||
          'Could not save customer.';

        this.saving = false;
      }

    });
  }
}