export type LoanStage = 'Login Done' | 'Queries Pending' | 'Sanctioned' | 'DO Received' | 'Disbursed';

export interface LoanLead {
  id: string;
  customerName: string;
  carModel: string;
  dealValue: number;
  downPayment: number;
  loanRequired: number;
  bankName: string;
  stage: LoanStage;
  tatDays: number;
  documents: {
    bankStatement: boolean;
    salarySlips: boolean;
    ecsMandate: boolean;
  };
  doNumber?: string;
  disbursedAmount?: number;
}

export interface BankScheme {
  bankName: string;
  roi: number; // Rate of Interest
  ltv: number; // Loan to Value ratio
  tenureMax: number; // in months
  processingFee: number;
  type: 'Fixed' | 'Floating';
}

export interface PayoutRecord {
  id: string;
  customerName: string;
  bankName: string;
  loanAmount: number;
  commissionPercent: number;
  payoutAmount: number;
  status: 'Pending' | 'Received' | 'Reconciled';
}
