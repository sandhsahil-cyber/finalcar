export type RTOStage = 'Awaiting Filing' | 'Tax Paid' | 'Number Allotted' | 'Plate Fitted';

export interface RTOLead {
  id: string;
  chassisNumber: string;
  customerName: string;
  carModel: string;
  paymentStatus: 'Pending' | 'Cleared';
  registrationStage: RTOStage;
  isFinanced: boolean;
  bankName?: string;
  forms: {
    form20: boolean;
    form21: boolean;
    form22: boolean;
  };
  hsrp: {
    laserCode?: string;
    isFitted: boolean;
  };
  taxAmount: number;
}

export interface TaxChallan {
  id: string;
  leadId: string;
  receiptNumber: string;
  amount: number;
  date: string;
  type: 'Road Tax' | 'Counter Tax' | 'Challan';
}

export interface HSRPStatus {
  totalOrders: number;
  pendingFitting: number;
  readyForDelivery: number;
}
