export interface BusinessKPIs {
  revenue: number;
  revenueTarget: number;
  unitsDelivered: number;
  unitTarget: number;
  netProfit: number;
  marginPercent: number;
}

export interface InventoryReport {
  totalUnits: number;
  valuation: number;
  aging: {
    under30: number;
    days30to60: number;
    days60to90: number;
    over90: number;
  };
}

export interface RevenueLeakage {
  discountsApproved: number;
  insuranceCommission: number;
  financePayout: number;
  accessoryProfit: number;
}

export interface DepartmentThroughput {
  department: string;
  avgDays: number;
  pendingUnits: number;
  efficiency: number; // 0-100
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  department: string;
  action: string;
  amount?: number;
  status: 'Flagged' | 'Approved' | 'Review';
}
