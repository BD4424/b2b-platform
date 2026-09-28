import {Component, OnInit, inject} from '@angular/core';

import {CommonModule} from '@angular/common';

import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import {ActivatedRoute, Router, RouterLink} from '@angular/router';

import {LeadSource, LeadStatus, LeadRequest} from '../../../shared/models/lead.model';

import {LeadService} from '../../../core/services/lead.service';


@Component({
  standalone: true,

  selector: 'app-lead-form',

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl:
    './lead-form.component.html',

  styleUrl:
    './lead-form.component.scss'
})
export class LeadFormComponent
  implements OnInit {

  private readonly fb =
    inject(FormBuilder);

  private readonly service =
    inject(LeadService);

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);


  editing = false;

  leadId?: number;

  loading = false;

  saving = false;

  error = '';


  readonly statuses: LeadStatus[] = [

    'NEW',
    'CONTACTED',
    'QUALIFIED',
    'PROPOSAL',
    'WON',
    'LOST'

  ];


  readonly sources: LeadSource[] = [

    'WEBSITE',
    'REFERRAL',
    'PHONE',
    'EMAIL',
    'WALK_IN',
    'SOCIAL_MEDIA',
    'ADVERTISEMENT',
    'OTHER'

  ];


  form =
    this.fb.nonNullable.group({

      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(150)
        ]
      ],

      company: [
        '',
        Validators.maxLength(150)
      ],

      phone: [
        '',
        Validators.maxLength(30)
      ],

      email: [
        '',
        [
          Validators.email,
          Validators.maxLength(150)
        ]
      ],

      status: [
        'NEW' as LeadStatus,
        Validators.required
      ],

      source: [
        null as LeadSource | null
      ],

      expectedValue: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      expectedCloseDate: [
        ''
      ],

      notes: [
        '',
        Validators.maxLength(1000)
      ]

    });


  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.editing = true;

      this.leadId =
        Number(id);

      this.loadLead(
        this.leadId
      );

    }

  }


  loadLead(
    id: number
  ): void {

    this.loading = true;

    this.service
      .getLead(id)
      .subscribe({

        next: lead => {

          this.form.patchValue({

            name:
              lead.name,

            company:
              lead.company ?? '',

            phone:
              lead.phone ?? '',

            email:
              lead.email ?? '',

            status:
              lead.status,

            source:
              lead.source,

            expectedValue:
              lead.expectedValue ?? 0,

            expectedCloseDate:
              lead.expectedCloseDate ?? '',

            notes:
              lead.notes ?? ''

          });

          this.loading = false;

        },

        error: () => {

          this.error =
            'Lead could not be loaded.';

          this.loading = false;

        }

      });

  }


  save(): void {

    this.error = '';

    this.form.markAllAsTouched();


    if (this.form.invalid) {
      return;
    }


    const value =
      this.form.getRawValue();


    const request: LeadRequest = {

      name:
        value.name.trim(),

      company:
        value.company.trim(),

      phone:
        value.phone.trim(),

      email:
        value.email.trim(),

      status:
        value.status,

      source:
        value.source,

      expectedValue:
        Number(
          value.expectedValue || 0
        ),

      expectedCloseDate:
        value.expectedCloseDate || null,

      notes:
        value.notes.trim()

    };


    this.saving = true;


    const operation =
      this.editing && this.leadId
        ? this.service.updateLead(
            this.leadId,
            request
          )
        : this.service.createLead(
            request
          );


    operation.subscribe({

      next: () => {

        this.router.navigate([
          '/leads'
        ]);

      },

      error: err => {

        this.error =
          err?.error?.detail ||
          err?.error?.message ||
          'Could not save lead.';

        this.saving = false;

      }

    });

  }


  formatStatus(
    status: string
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
    source: string
  ): string {

    return source
      .toLowerCase()
      .replace('_', ' ')
      .replace(
        /\b\w/g,
        char => char.toUpperCase()
      );

  }

}