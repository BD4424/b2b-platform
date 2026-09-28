import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import {
  LookupItem,
  ProductRequest,
  ProductSpecification,
  ProductSpecificationRequest
} from '../../shared/models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  categories: LookupItem[] = [];
  brands: LookupItem[] = [];

  editing = false;
  productId?: number;

  saving = false;
  error = '';

  // -----------------------------
  // Specifications
  // -----------------------------

  specifications: ProductSpecification[] = [];

  specificationName = '';
  specificationValue = '';

  specificationsLoading = false;
  specificationSaving = false;
  specificationError = '';

  specificationPage = 0;
  readonly specificationPageSize = 10;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    sku: ['', [Validators.required, Validators.maxLength(80)]],
    unit: ['pcs', Validators.maxLength(50)],
    sellingPrice: [0, [Validators.required, Validators.min(0)]],
    costPrice: [0, [Validators.min(0)]],
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
    salesNotes: ['', Validators.maxLength(1000)],
    categoryId: [0, [Validators.required, Validators.min(1)]],
    brandId: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.service.getCategories().subscribe(v => this.categories = v);
    this.service.getBrands().subscribe(v => this.brands = v);

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editing = true;
      this.productId = Number(id);

      this.service.getProduct(this.productId).subscribe({
        next: p => this.form.patchValue({
          name: p.name,
          sku: p.sku,
          unit: p.unit,
          sellingPrice: p.sellingPrice,
          costPrice: p.costPrice ?? 0,
          stockQuantity: p.stockQuantity,
          salesNotes: p.salesNotes ?? '',
          categoryId: p.categoryId,
          brandId: p.brandId,
        }),
        error: () => this.error = 'Product could not be loaded.',
      });

      this.loadSpecifications();
    }
  }

  // -----------------------------
  // Specification pagination
  // -----------------------------

  get paginatedSpecifications(): ProductSpecification[] {
    const start = this.specificationPage * this.specificationPageSize;

    return this.specifications.slice(
      start,
      start + this.specificationPageSize
    );
  }

  get specificationTotalPages(): number {
    return Math.ceil(
      this.specifications.length / this.specificationPageSize
    );
  }

  get specificationStartIndex(): number {
    if (this.specifications.length === 0) {
      return 0;
    }

    return this.specificationPage * this.specificationPageSize + 1;
  }

  get specificationEndIndex(): number {
    return Math.min(
      (this.specificationPage + 1) * this.specificationPageSize,
      this.specifications.length
    );
  }

  previousSpecificationPage(): void {
    if (this.specificationPage > 0) {
      this.specificationPage--;
    }
  }

  nextSpecificationPage(): void {
    if (this.specificationPage + 1 < this.specificationTotalPages) {
      this.specificationPage++;
    }
  }

  // -----------------------------
  // Load specifications
  // -----------------------------

  loadSpecifications(): void {
    if (!this.productId) return;

    this.specificationsLoading = true;
    this.specificationError = '';

    this.service.getSpecifications(this.productId).subscribe({
      next: specifications => {
        this.specifications = specifications;
        this.specificationPage = 0;
        this.specificationsLoading = false;
      },
      error: () => {
        this.specificationError =
          'Unable to load product specifications.';
        this.specificationsLoading = false;
      },
    });
  }

  // -----------------------------
  // Add specification
  // -----------------------------

  addSpecification(): void {
    if (!this.productId) return;

    const name = this.specificationName.trim();
    const value = this.specificationValue.trim();

    if (!name || !value) {
      this.specificationError =
        'Specification name and value are required.';
      return;
    }

    if (name.length > 100) {
      this.specificationError =
        'Specification name cannot exceed 100 characters.';
      return;
    }

    if (value.length > 100) {
      this.specificationError =
        'Specification value cannot exceed 100 characters.';
      return;
    }

    this.specificationSaving = true;
    this.specificationError = '';

    const request: ProductSpecificationRequest = {
      specificationName: name,
      specificationValue: value,
    };

    this.service.addSpecification(this.productId, request).subscribe({
      next: specification => {
        this.specifications = [
          ...this.specifications,
          specification
        ];

        this.specificationName = '';
        this.specificationValue = '';
        this.specificationSaving = false;

        // Move to the last page so the newly added specification
        // is immediately visible.
        this.specificationPage =
          Math.max(0, this.specificationTotalPages - 1);
      },

      error: err => {
        this.specificationError =
          err?.error?.detail ||
          err?.error?.message ||
          'Could not add specification.';

        this.specificationSaving = false;
      },
    });
  }

  // -----------------------------
  // Delete specification
  // -----------------------------

  deleteSpecification(
    specification: ProductSpecification
  ): void {
    if (!confirm(`Delete ${specification.specificationName}?`)) {
      return;
    }

    this.service.deleteSpecification(specification.id).subscribe({
      next: () => {
        this.specifications = this.specifications.filter(
          item => item.id !== specification.id
        );

        // If deleting the last item on the current page
        // makes that page invalid, move back one page.
        if (
          this.specificationPage > 0 &&
          this.specificationPage >= this.specificationTotalPages
        ) {
          this.specificationPage--;
        }
      },

      error: err => {
        this.specificationError =
          err?.error?.detail ||
          err?.error?.message ||
          'Could not delete specification.';
      },
    });
  }

  // -----------------------------
  // Save product
  // -----------------------------

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.error = '';

    const request =
      this.form.getRawValue() as ProductRequest;

    const operation =
      this.editing && this.productId
        ? this.service.updateProduct(this.productId, request)
        : this.service.createProduct(request);

    operation.subscribe({
      next: product => {
        if (!this.editing) {
          this.router.navigate([
            '/products',
            product.id,
            'edit'
          ]);
        } else {
          this.router.navigate(['/products']);
        }
      },

      error: err => {
        this.error =
          err?.error?.detail ||
          err?.error?.message ||
          'Could not save product.';

        this.saving = false;
      },
    });
  }
}