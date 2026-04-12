export type FitmentStage = 'Order Received' | 'Stock Allocated' | 'Installation In-Progress' | 'Quality Checked';

export interface AccessoryItem {
  sku: string;
  name: string;
  category: 'Internal' | 'External' | 'Electrical';
  price: number;
  gst: number;
  laborCost: number;
  stockLevel: number;
  lowStockThreshold: number;
  compatibleModels: string[];
}

export interface AccessoryPackage {
  id: string;
  name: string;
  description: string;
  items: string[];
  totalPrice: number;
}

export interface FitmentOrder {
  id: string;
  customerName: string;
  carModel: string;
  vin: string;
  stage: FitmentStage;
  accessories: {
    sku: string;
    status: 'Pending' | 'Stock Allocated' | 'Installed' | 'Verified';
  }[];
  dateReceived: string;
  jobCardId?: string;
}
