import {Component, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Lead, LeadStatus} from '../../../shared/models/lead.model';
import {LeadService} from '../../../core/services/lead.service';


@Component({
  standalone: true,

  selector: 'app-lead-list',

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl:
    './lead-list.component.html',

  styleUrl:
    './lead-list.component.scss'
})
export class LeadListComponent
  implements OnInit {

  private readonly service =
    inject(LeadService);

  private readonly router =
    inject(Router);


  leads: Lead[] = [];
  loading = false;
  error = '';
  search = '';
  selectedStatus: LeadStatus | '' = '';
  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;

  readonly statuses: LeadStatus[] = [

    'NEW',
    'CONTACTED',
    'QUALIFIED',
    'PROPOSAL',
    'WON',
    'LOST'

  ];


  ngOnInit(): void {
    this.loadLeads();
  }


  loadLeads(): void {

    this.loading = true;
    this.error = '';

    this.service
      .getLeads(
        this.page,
        this.size,
        this.search,
        this.selectedStatus || undefined
      )
      .subscribe({

        next: result => {

          this.leads =
            result.content;

          this.totalPages =
            result.totalPages;

          this.totalElements =
            result.totalElements;

          this.loading = false;

        },

        error: () => {

          this.error =
            'Unable to load leads.';

          this.loading = false;

        }

      });

  }


  onSearch(
    event?: KeyboardEvent
  ): void {

    if (
      event &&
      event.key !== 'Enter'
    ) {
      return;
    }

    this.page = 0;

    this.loadLeads();

  }


  onStatusChange(): void {
    this.page = 0;
    this.loadLeads();
  }


  reset(): void {
    this.search = '';
    this.selectedStatus = '';
    this.page = 0;
    this.loadLeads();
  }


  previousPage(): void {

    if (this.page <= 0) {
      return;
    }

    this.page--;
    this.loadLeads();
  }


  nextPage(): void {

    if (
      this.page >=
      this.totalPages - 1
    ) {
      return;
    }

    this.page++;
    this.loadLeads();
  }


  openLead(
    id: number
  ): void {

    this.router.navigate([
      '/leads',
      id,
      'edit'
    ]);

  }


  deleteLead(
    lead: Lead
  ): void {

    if (
      !confirm(
        `Delete lead "${lead.name}"?`
      )
    ) {
      return;
    }


    this.service
      .deleteLead(lead.id)
      .subscribe({

        next: () => {

          this.loadLeads();

        },

        error: () => {

          this.error =
            'Unable to delete lead.';

        }

      });

  }


  statusClass(
    status: LeadStatus
  ): string {

    return status.toLowerCase();

  }


  formatStatus(
    status: LeadStatus
  ): string {

    return status
      .toLowerCase()
      .replace('_', ' ')
      .replace(
        /\b\w/g,
        char => char.toUpperCase()
      );

  }


  formatSource(
    source: string | null
  ): string {

    if (!source) {
      return '—';
    }

    return source
      .toLowerCase()
      .replace('_', ' ')
      .replace(
        /\b\w/g,
        char => char.toUpperCase()
      );

  }


  formatDate(
    date: string | null
  ): string {

    if (!date) {
      return '—';
    }

    return new Date(date)
      .toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }
      );

  }

}