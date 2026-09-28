export interface Product {
  id: number;
  name: string;
  sku: string;
  unit: string;
  sellingPrice: number;
  costPrice: number | null;
  stockQuantity: number;
  salesNotes: string | null;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
}

export interface ProductRequest {
  name: string;
  sku: string;
  unit: string;
  sellingPrice: number;
  costPrice: number | null;
  stockQuantity: number;
  salesNotes: string;
  categoryId: number;
  brandId: number;
}

export interface LookupItem {
  id: number;
  name: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface ProductSpecification {
  id: number;
  specificationName: string;
  specificationValue: string;
}

export interface ProductSpecificationRequest {
  specificationName: string;
  specificationValue: string;
}