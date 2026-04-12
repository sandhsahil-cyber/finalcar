export type PolicyStage = 'Quote Requested' | 'Premium Paid' | 'Policy Issued' | 'Soft Copy Sent';

export interface InsuranceLead {
  id: string;
  customerName: string;
  carModel: string;
  engineNumber: string;
  chassisNumber: string;
  stage: PolicyStage;
  provider?: string;
  premiumAmount: number;
  idv: number;
  ncbTransfer: number; // Percentage
  addOns: {
    zeroDep: boolean;
    engineProtect: boolean;
    returnToInvoice: boolean;
    consumables: boolean;
  };
  cashlessTieUp: boolean;
  policyNumber?: string;
  coverNoteNumber?: string;
  isRenewed?: boolean;
  expiryDays?: number;
}

export interface ClaimRecord {
  id: string;
  policyNumber: string;
  customerName: string;
  carModel: string;
  claimDate: string;
  estimatedAmount: number;
  approvalStatus: 'Pending' | 'Approved' | 'Rejected' | 'In-Progress';
  garageType: 'Cashless' | 'Reimbursement';
}

export interface QuoteComparison {
  provider: string;
  premium: number;
  idv: number;
  benefits: string[];
  isRecommended?: boolean;
}
