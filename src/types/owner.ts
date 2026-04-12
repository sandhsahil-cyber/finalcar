export interface ShowroomPerformance {
  netRevenue: number;
  grossMargin: number;
  pipelineValue: number;
  stockValue: number;
  revenueTrend: { date: string; value: number }[];
  modelMarketShare: { model: string; share: number }[];
}

export interface DepartmentHealth {
  department: 'Accounts' | 'Finance' | 'RTO' | 'PDI';
  status: 'Healthy' | 'Warning' | 'Critical';
  metric: string;
  value: string | number;
  stuckUnits: number;
  latentHours: number;
}

export interface ProfitMetrics {
  revenue: number;
  cogs: number; // Cost of Goods Sold
  commissions: number; // Finance/Insurance payouts
  accessoryMargin: number;
  discountsGiven: number;
  netProfit: number;
}

export interface ManagerEscalation {
  id: string;
  timestamp: string;
  manager: string;
  department: string;
  message: string;
  urgency: 'Normal' | 'Urgent' | 'Immediate';
}

export interface DeliveryFunnelStage {
  stage: string;
  count: number;
  avgTime: string;
  efficiency: number;
}
