export interface BrandPerformance {
  id: string;
  brand: string;
  logo: string;
  mtdRevenue: number;
  mtdRevenueTarget: number;
  ppu: number; // Profit Per Unit
  stockTurnRatio: number;
  efficiency: number; // 0-100
}

export interface GroupLiquidity {
  totalCash: number;
  brandBalances: {
    brand: string;
    balance: number;
    trend: 'up' | 'down';
  }[];
  monthlyBurn: number;
  availableCredit: number;
}

export interface ConsolidatedInventory {
  brand: string;
  totalUnits: number;
  valuation: number;
  locationDistribution: {
    city: string;
    units: number;
  }[];
}

export interface HRPayrollSummary {
  totalHeadcount: number;
  brandDistribution: {
    brand: string;
    count: number;
    incentiveCost: number;
  }[];
  unfilledPositions: number;
}

export interface ComplianceAudit {
  brand: string;
  auditScore: number;
  csat: number;
  pendingResolutions: number;
  status: 'Critical' | 'Healthy' | 'Warning';
}
