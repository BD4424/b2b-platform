import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormsModule
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { OrderService } from '../../../core/services/order.service';
import { CustomerService } from '../../../core/services/customer.service';
import { ProductService } from '../../../core/services/product.service';

import { Customer } from '../../../shared/models/customer.model';
import { Product } from '../../../shared/models/product.model';

import {
  CustomerCreditResponse,
  OrderDiscountType,
  OrderItemRequest,
  OrderRequest
} from '../../../shared/models/order.model';


interface OrderFormItem {
  productId: number;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}


@Component({
  standalone: true,
  selector: 'app-order-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly orderService = inject(OrderService);
  private readonly customerService = inject(CustomerService);
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);


  customers: Customer[] = [];
  products: Product[] = [];
  credit: CustomerCreditResponse | null = null;
  creditLoading = false;
  items: OrderFormItem[] = [];

  editing = false;
  orderId?: number;

  saving = false;
  loading = false;
  error = '';

  selectedProductId = 0;
  itemQuantity = 1;
  itemUnitPrice = 0;


  form = this.fb.nonNullable.group({

    customerId: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    orderDate: [
      this.today(),
      Validators.required
    ],

    discountType: [
      'AMOUNT' as OrderDiscountType,
      Validators.required
    ],

    discountValue: [
      0,
      [
        Validators.required,
        Validators.min(0)
      ]
    ],

    notes: [
      '',
      Validators.maxLength(1000)
    ]

  });


  ngOnInit(): void {

    this.loadCustomers();
    this.loadProducts();

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.editing = true;
      this.orderId = Number(id);

      this.loadOrder(this.orderId);
    }
    this.form.controls.discountValue.valueChanges
      .subscribe(() => {
        this.refreshCredit();
      });
  }


  loadCustomers(): void {

    this.customerService
      .getCustomers(0, 1000)
      .subscribe({

        next: result => {
          this.customers = result.content;
        },

        error: () => {
          this.error =
            'Unable to load customers.';
        }

      });
  }


  loadProducts(): void {

    this.productService
      .getProducts(0, 1000)
      .subscribe({

        next: result => {
          this.products = result.content;
        },

        error: () => {
          this.error =
            'Unable to load products.';
        }

      });
  }


  loadOrder(id: number): void {

    this.loading = true;

    this.orderService
      .getOrder(id)
      .subscribe({

        next: order => {

          this.form.patchValue({

            customerId:
              order.customerId,

            orderDate:
              order.orderDate,

            discountType:
              order.discountType,

            discountValue:
              order.discountValue,

            notes:
              order.notes ?? ''

          });


          this.items =
            order.items.map(item => ({

              productId:
                item.productId,

              productName:
                item.productName,

              sku:
                item.sku,

              quantity:
                item.quantity,

              unitPrice:
                item.unitPrice

            }));


          this.loading = false;
        },

        error: () => {

          this.error =
            'Order could not be loaded.';

          this.loading = false;
        }

      });
  }


  productChanged(): void {

    const product =
      this.products.find(
        item =>
          item.id === this.selectedProductId
      );


    if (!product) {

      this.itemUnitPrice = 0;

      return;
    }


    this.itemUnitPrice =
      Number(product.sellingPrice);
  }


  addItem(): void {

    this.error = '';


    if (!this.selectedProductId) {

      this.error =
        'Select a product before adding an item.';

      return;
    }


    if (
      !this.itemQuantity ||
      this.itemQuantity <= 0
    ) {

      this.error =
        'Quantity must be greater than zero.';

      return;
    }


    if (
      this.itemUnitPrice === null ||
      this.itemUnitPrice < 0
    ) {

      this.error =
        'Unit price cannot be negative.';

      return;
    }


    const product =
      this.products.find(
        item =>
          item.id === this.selectedProductId
      );


    if (!product) {
      return;
    }


    const existing =
      this.items.find(
        item =>
          item.productId === product.id
      );


    if (existing) {

      existing.quantity +=
        Number(this.itemQuantity);

      existing.unitPrice =
        Number(this.itemUnitPrice);

    } else {

      this.items = [

        ...this.items,

        {
          productId:
            product.id,

          productName:
            product.name,

          sku:
            product.sku,

          quantity:
            Number(this.itemQuantity),

          unitPrice:
            Number(this.itemUnitPrice)
        }

      ];
    }


    this.selectedProductId = 0;
    this.itemQuantity = 1;
    this.itemUnitPrice = 0;
    this.refreshCredit();
  }


  removeItem(index: number): void {

    this.items =
      this.items.filter(
        (_, i) =>
          i !== index
      );
    this.refreshCredit();
  }


  updateQuantity(
    item: OrderFormItem,
    value: number
  ): void {

    const quantity =
      Number(value);

    if (quantity > 0) {
      item.quantity = quantity;
    }
    this.refreshCredit();
  }


  updatePrice(
  item: OrderFormItem,
  value: number
): void {

  const price = Number(value);

  if (price >= 0) {
    item.unitPrice = price;
  }

  this.refreshCredit();
}


  lineTotal(
    item: OrderFormItem
  ): number {

    return (
      item.quantity *
      item.unitPrice
    );
  }


  get subtotal(): number {

    return this.items.reduce(
      (total, item) =>
        total +
        this.lineTotal(item),
      0
    );
  }


  get discountType(): OrderDiscountType {

    return this.form.controls
      .discountType.value;
  }


  get discountValue(): number {

    return Number(
      this.form.controls
        .discountValue.value || 0
    );
  }


  setDiscountType(
    type: OrderDiscountType
  ): void {

    this.form.patchValue({
      discountType: type
    });

    this.form.controls
      .discountValue
      .updateValueAndValidity();

    this.refreshCredit();
  }


  get discountAmount(): number {

    const value =
      this.discountValue;

    if (value <= 0) {
      return 0;
    }


    if (
      this.discountType ===
      'PERCENTAGE'
    ) {

      return Math.min(
        this.subtotal,
        (
          this.subtotal *
          value
        ) / 100
      );
    }


    return Math.min(
      this.subtotal,
      value
    );
  }


  get total(): number {

    return Math.max(
      0,
      this.subtotal -
      this.discountAmount
    );
  }


  save(): void {

    this.error = '';


    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }


    if (this.items.length === 0) {

      this.error =
        'Add at least one product to the order.';

      return;
    }


    const request: OrderRequest = {

      customerId:
        this.form.controls
          .customerId.value,

      orderDate:
        this.form.controls
          .orderDate.value,

      discountType:
        this.form.controls
          .discountType.value,

      discountValue:
        Number(
          this.form.controls
            .discountValue.value || 0
        ),

      notes:
        this.form.controls
          .notes.value,

      items:
        this.items.map(
          (item): OrderItemRequest => ({

            productId:
              item.productId,

            quantity:
              item.quantity,

            unitPrice:
              item.unitPrice

          })
        )

    };


    this.saving = true;


    const operation =
      this.editing && this.orderId
        ? this.orderService.updateOrder(
          this.orderId,
          request
        )
        : this.orderService.createOrder(
          request
        );


    operation.subscribe({

      next: () => {

        this.router.navigate([
          '/orders'
        ]);

      },

      error: err => {

        this.error =
          err?.error?.detail ||
          err?.error?.message ||
          'Could not save order.';

        this.saving = false;
      }

    });
  }


  private today(): string {

    const date =
      new Date();

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        date.getDate()
      ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  refreshCredit(): void {

    const customerId =
      Number(
        this.form.controls.customerId.value
      );

    if (!customerId) {
      this.credit = null;
      return;
    }

    this.creditLoading = true;

    this.orderService
      .getCustomerCredit(
        customerId,
        this.total
      )
      .subscribe({

        next: credit => {

          this.credit = credit;
          this.creditLoading = false;

        },

        error: () => {

          this.credit = null;
          this.creditLoading = false;

        }

      });
  }

}