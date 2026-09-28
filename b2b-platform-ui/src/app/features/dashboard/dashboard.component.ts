import { Component, signal } from '@angular/core';

interface KpiCard {
  label: string;
  value: string;
  change: string;
  accent: 'blue' | 'orange' | 'purple' | 'green';
  bars: number[];
}

interface PipelineStage {
  name: string;
  count: number;
  value: string;
  width: number;
  accent: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly period = signal('This month');

  readonly kpis: KpiCard[] = [
    { label: 'Pipeline value', value: '₹48.6L', change: '12.5%', accent: 'blue', bars: [18, 24, 21, 31, 26, 35, 30, 41] },
    { label: 'Orders this month', value: '126', change: '8.2%', accent: 'orange', bars: [18, 22, 20, 33, 27, 38, 34, 45] },
    { label: 'New qualified leads', value: '24', change: '18.0%', accent: 'purple', bars: [18, 24, 20, 33, 28, 38, 34, 45] },
    { label: 'Avg. order value', value: '₹38,570', change: '4.1%', accent: 'green', bars: [17, 22, 20, 29, 25, 33, 30, 40] },
  ];

  readonly pipeline: PipelineStage[] = [
    { name: 'New enquiry', count: 18, value: '₹12.4L', width: 73, accent: 'blue' },
    { name: 'Quotation sent', count: 12, value: '₹9.8L', width: 55, accent: 'purple' },
    { name: 'Negotiation', count: 7, value: '₹6.7L', width: 38, accent: 'orange' },
    { name: 'Won', count: 9, value: '₹11.2L', width: 47, accent: 'green' },
  ];

  readonly priorityActions = [
    { title: 'Follow up on overdue quote', detail: 'Varma Electricals · ₹2.85L', icon: '!', tone: 'red' },
    { title: 'Review low stock items', detail: '6 products below reorder level', icon: '◫', tone: 'yellow' },
    { title: 'Respond to new lead', detail: 'Shreeji Constructions · 2h ago', icon: '♙', tone: 'blue' },
  ];

  readonly orders = [
    { id: '#SO-10482', time: 'Today, 10:42 AM', initials: 'V', customer: 'Varma Electricals', amount: '₹1,24,800', status: 'Paid', tone: 'paid' },
    { id: '#SO-10481', time: 'Today, 09:18 AM', initials: 'SC', customer: 'Shreeji Constructions', amount: '₹68,450', status: 'Pending', tone: 'pending' },
    { id: '#SO-10480', time: 'Yesterday, 4:30 PM', initials: 'AR', customer: 'Arora Infra', amount: '₹2,16,000', status: 'Processing', tone: 'processing' },
  ];

  setPeriod(value: string): void {
    this.period.set(value);
  }
}
