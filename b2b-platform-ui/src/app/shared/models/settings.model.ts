export type CurrencyCode =
  | 'INR'
  | 'USD'
  | 'EUR'
  | 'GBP';


export type OrderDiscountType =
  | 'AMOUNT'
  | 'PERCENTAGE';


export interface AppSettings {

  /* Business */

  businessName: string;

  businessPhone: string;

  businessEmail: string;

  businessAddress: string;

  businessCity: string;

  businessState: string;

  businessPostalCode: string;

  taxNumber: string;


  /* Sales */

  allowCreditLimitOverride: boolean;

  creditWarningThreshold: number;

  defaultDiscountType: OrderDiscountType;


  /* Inventory */

  lowStockThreshold: number;

  allowNegativeStock: boolean;

  deductStockOnCompletion: boolean;


  /* Notifications */

  lowStockNotifications: boolean;

  creditLimitNotifications: boolean;

  leadFollowUpNotifications: boolean;


  /* Appearance */

  currency: CurrencyCode;

  compactTables: boolean;
}