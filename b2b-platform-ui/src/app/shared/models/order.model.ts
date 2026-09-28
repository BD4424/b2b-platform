export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED';

export type OrderDiscountType =
  | 'AMOUNT'
  | 'PERCENTAGE';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: number;
  orderNumber: string;

  customerId: number;
  customerName: string;

  orderDate: string;

  status: OrderStatus;

  subtotal: number;

  discountType: OrderDiscountType;
  discountValue: number;
  discountAmount: number;

  totalAmount: number;

  notes: string;

  items: OrderItem[];
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface OrderRequest {
  customerId: number;
  orderDate: string;

  discountType: OrderDiscountType;
  discountValue: number;

  notes: string;

  items: OrderItemRequest[];
}

export interface OrderPageResponse {
  content: Order[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface CustomerCreditResponse {
  customerId: number;
  creditLimit: number;
  currentOutstanding: number;
  availableCredit: number;
  orderAmount: number;
  availableCreditAfterOrder: number;
  creditExceeded: boolean;
  creditLow: boolean;
}