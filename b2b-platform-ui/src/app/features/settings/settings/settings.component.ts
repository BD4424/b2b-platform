import {Component,OnInit} from '@angular/core';

import { CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';


interface AppSettings {
  businessName: string;
  businessPhone: string;
  businessEmail: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessPostalCode: string;
  taxNumber: string;
  allowCreditLimitOverride: boolean;
  creditWarningThreshold: number;
  defaultDiscountType: 'AMOUNT' | 'PERCENTAGE';
  lowStockThreshold: number;
  allowNegativeStock: boolean;
  deductStockOnCompletion: boolean;
  lowStockNotifications: boolean;
  creditLimitNotifications: boolean;
  leadFollowUpNotifications: boolean;

  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  compactTables: boolean;
}


@Component({
  standalone: true,

  selector: 'app-settings',

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './settings.component.html',

  styleUrl:
    './settings.component.scss'
})
export class SettingsComponent
  implements OnInit {


  settings: AppSettings = {

    businessName: 'SupplyDesk',
    businessPhone: '',
    businessEmail: '',
    businessAddress: '',
    businessCity: '',
    businessState: '',
    businessPostalCode: '',
    taxNumber: '',

    allowCreditLimitOverride: true,
    creditWarningThreshold: 10,
    defaultDiscountType: 'AMOUNT',

    lowStockThreshold: 10,
    allowNegativeStock: false,
    deductStockOnCompletion: true,

    lowStockNotifications: true,
    creditLimitNotifications: true,
    leadFollowUpNotifications: true,

    currency: 'INR',
    compactTables: false

  };


  saving = false;
  saved = false;

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {

    const stored = localStorage.getItem('supplydesk-settings');

    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      this.settings = {...this.settings,...parsed};
    } catch {
      console.warn('Unable to load saved settings.');
    }
  }


  saveSettings(): void {
    this.saving = true;
    this.saved = false;

    localStorage.setItem('supplydesk-settings', JSON.stringify(this.settings));


    setTimeout(() => {
      this.saving = false;
      this.saved = true;

      setTimeout(() => {
        this.saved = false;
      }, 2500);
    }, 350);
  }


  resetSettings(): void {
    if (!confirm('Reset all settings to their defaults?')
    ) {
      return;
    }

    localStorage.removeItem('supplydesk-settings');

    window.location.reload();
  }

  scrollToSection(
  sectionId: string
): void {

  const element =
    document.getElementById(sectionId);

  if (!element) {
    return;
  }

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

}

}