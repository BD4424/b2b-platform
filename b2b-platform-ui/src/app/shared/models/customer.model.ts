export interface Customer {
  id: number;
  name: string;
  customerType: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  creditLimit: number;
  outstandingAmount: number;
}

export interface CustomerRequest {
  name: string;
  customerType: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  creditLimit: number;
}

export interface CustomerPageResponse {
  content: Customer[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}