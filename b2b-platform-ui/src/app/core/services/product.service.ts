import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupItem, PageResponse, Product, ProductRequest, ProductSpecification, ProductSpecificationRequest } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/products';
  private readonly specificationApiUrl = 'http://localhost:8080/api/products-specification';

  getProducts(page = 0, size = 10, search = '', categoryId?: number, brandId?: number): Observable<PageResponse<Product>> {
    let params = new HttpParams().set('page', page).set('size', size).set('search', search);
    if (categoryId) params = params.set('categoryId', categoryId);
    if (brandId) params = params.set('brandId', brandId);
    return this.http.get<PageResponse<Product>>(this.apiUrl, { params });
  }

  getProduct(id: number): Observable<Product> { return this.http.get<Product>(`${this.apiUrl}/${id}`); }
  createProduct(request: ProductRequest): Observable<Product> { return this.http.post<Product>(this.apiUrl, request); }
  updateProduct(id: number, request: ProductRequest): Observable<Product> { return this.http.put<Product>(`${this.apiUrl}/${id}`, request); }
  deleteProduct(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
  getCategories(): Observable<LookupItem[]> { return this.http.get<LookupItem[]>(`${this.apiUrl}/lookups/categories`); }
  getBrands(): Observable<LookupItem[]> { return this.http.get<LookupItem[]>(`${this.apiUrl}/lookups/brands`); }



  getSpecifications(productId: number): Observable<ProductSpecification[]> {
    return this.http.get<ProductSpecification[]>(
      `${this.specificationApiUrl}/${productId}/specifications`
    );
  }

  addSpecification(
    productId: number,
    request: ProductSpecificationRequest
  ): Observable<ProductSpecification> {
    return this.http.post<ProductSpecification>(
      `${this.specificationApiUrl}/${productId}`,
      request
    );
  }

  deleteSpecification(specificationId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.specificationApiUrl}/${specificationId}`
    );
  }

}
