import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { LookupItem, Product } from '../../shared/models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private readonly productService = inject(ProductService);
  products: Product[] = [];
  categories: LookupItem[] = [];
  brands: LookupItem[] = [];
  search = '';
  categoryId?: number;
  brandId?: number;
  page = 0;
  totalPages = 0;
  totalElements = 0;
  loading = false;
  error = '';

  ngOnInit(): void {
    this.productService.getCategories().subscribe(v => this.categories = v);
    this.productService.getBrands().subscribe(v => this.brands = v);
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';
    this.productService.getProducts(this.page, 10, this.search, this.categoryId, this.brandId).subscribe({
      next: result => {
        this.products = result.content;
        this.totalPages = result.totalPages;
        this.totalElements = result.totalElements;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load products. Is the Spring Boot API running?';
        this.loading = false;
      },
    });
  }

  resetFilters(): void {
    this.search = '';
    this.categoryId = undefined;
    this.brandId = undefined;
    this.page = 0;
    this.loadProducts();
  }

  previous(): void { if (this.page > 0) { this.page--; this.loadProducts(); } }
  next(): void { if (this.page + 1 < this.totalPages) { this.page++; this.loadProducts(); } }

  deleteProduct(product: Product): void {
    if (!confirm(`Delete ${product.name}?`)) return;
    this.productService.deleteProduct(product.id).subscribe(() => this.loadProducts());
  }

  stockClass(quantity: number): string {
    if (quantity === 0) return 'stock stock--out';
    if (quantity < 10) return 'stock stock--low';
    return 'stock stock--good';
  }
}
