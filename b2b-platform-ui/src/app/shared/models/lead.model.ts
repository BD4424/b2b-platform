export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL'
  | 'WON'
  | 'LOST';


export type LeadSource =
  | 'WEBSITE'
  | 'REFERRAL'
  | 'PHONE'
  | 'EMAIL'
  | 'WALK_IN'
  | 'SOCIAL_MEDIA'
  | 'ADVERTISEMENT'
  | 'OTHER';


export interface Lead {

  id: number;

  name: string;

  company: string | null;

  phone: string | null;

  email: string | null;

  status: LeadStatus;

  source: LeadSource | null;

  expectedValue: number;

  expectedCloseDate: string | null;

  notes: string | null;

  createdAt: string;

  updatedAt: string;
}


export interface LeadRequest {

  name: string;

  company: string;

  phone: string;

  email: string;

  status: LeadStatus;

  source: LeadSource | null;

  expectedValue: number;

  expectedCloseDate: string | null;

  notes: string;
}


export interface LeadPageResponse {

  content: Lead[];

  totalElements: number;

  totalPages: number;

  number: number;

  size: number;
}