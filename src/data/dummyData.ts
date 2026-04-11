// Types
export type DealStage = 'Account' | 'Finance' | 'RTO' | 'PDI' | 'Accessories';
export type DealStatus = 'active' | 'completed' | 'pending' | 'blocked';
export type UserRole = 'salesperson' | 'teamleader' | 'salesmanager' | 'accounts' | 'rto' | 'insurance' | 'accessories' | 'finance' | 'pdi' | 'ceo';

export interface Deal {
  id: string;
  customerName: string;
  customerPhone: string;
  carModel: string;
  carVariant: string;
  color: string;
  stage: DealStage;
  status: DealStatus;
  amount: number;
  downPayment: number;
  salespersonId: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  expectedDelivery: string;
  notes: string;
  stageProgress: Record<DealStage, { completed: boolean; date?: string; notes?: string }>;
  // New operational fields
  financeType?: 'In-house' | '3rd Party';
  financePartner?: string;
  financeStatus?: 'Pending' | 'Approved' | 'Rejected' | 'Disbursed' | 'Searching';
  insuranceType?: string;
  extendedWarranty?: boolean;
  accessoriesAmount?: number;
  isExchange?: boolean;
  // New incentive and RTO fields
  incentiveAmount?: number;
  incentiveStatus?: 'Pending' | 'Counted';
  rtoNumberPlateIssued?: boolean;
  exchangeCarDetails?: string;
  nextFollowUpDate?: string;
  nextFollowUpTask?: string;
}

export interface SalesPerson {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  teamId: string;
  monthlyTarget: number;
  achieved: number;
  dealsCount: number;
  conversionRate: number;
  rating: number;
  joinedDate: string;
}

export interface Team {
  id: string;
  name: string;
  leaderId: string;
  leaderName: string;
  leaderAvatar: string;
  memberCount: number;
  monthlyTarget: number;
  achieved: number;
  color: string;
}

export interface Activity {
  id: string;
  type: 'deal_created' | 'stage_moved' | 'deal_completed' | 'deal_blocked' | 'note_added' | 'approval_requested';
  message: string;
  user: string;
  timestamp: string;
  dealId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
}

// Dummy Data
export const DEAL_STAGES: DealStage[] = ['Account', 'Finance', 'RTO', 'PDI', 'Accessories'];

export const STAGE_COLORS: Record<DealStage, string> = {
  Account: '#3b82f6',
  Finance: '#8b5cf6',
  RTO: '#f59e0b',
  PDI: '#10b981',
  Accessories: '#ff6b35',
};

export const CAR_MODELS = [
  { model: 'TATA Safari', variants: ['Smart', 'Pure', 'Adventure', 'Accomplished'], basePrice: 1600000, incentive: 15000 },
  { model: 'TATA Harrier', variants: ['Smart', 'Pure', 'Adventure', 'Accomplished'], basePrice: 1500000, incentive: 12000 },
  { model: 'TATA Nexon', variants: ['Smart', 'Pure', 'Creative', 'Fearless'], basePrice: 800000, incentive: 8000 },
  { model: 'TATA Punch', variants: ['Pure', 'Adventure', 'Accomplished', 'Creative'], basePrice: 600000, incentive: 5000 },
  { model: 'TATA Altroz', variants: ['XE', 'XM', 'XT', 'XZ', 'XZ+'], basePrice: 660000, incentive: 4000 },
  { model: 'TATA Tiago', variants: ['XE', 'XM', 'XT', 'XZ'], basePrice: 560000, incentive: 3500 },
  { model: 'TATA Tigor', variants: ['XE', 'XM', 'XT', 'XZ'], basePrice: 630000, incentive: 4000 },
];

export const COLORS = ['Phantom Black', 'Polar White', 'Titan Grey', 'Fiery Red', 'Atlas White', 'Abyss Black', 'Robust Emerald', 'Starry Night'];

export const teams: Team[] = [
  { id: 'team-1', name: 'Alpha Squad', leaderId: 'tl-1', leaderName: 'Rajesh Kumar', leaderAvatar: 'RK', memberCount: 5, monthlyTarget: 5000000, achieved: 3850000, color: '#3b82f6' },
  { id: 'team-2', name: 'Beta Force', leaderId: 'tl-2', leaderName: 'Priya Sharma', leaderAvatar: 'PS', memberCount: 4, monthlyTarget: 4500000, achieved: 3200000, color: '#8b5cf6' },
  { id: 'team-3', name: 'Gamma Elite', leaderId: 'tl-3', leaderName: 'Amit Patel', leaderAvatar: 'AP', memberCount: 6, monthlyTarget: 6000000, achieved: 5100000, color: '#10b981' },
  { id: 'team-4', name: 'Delta Stars', leaderId: 'tl-4', leaderName: 'Sneha Reddy', leaderAvatar: 'SR', memberCount: 4, monthlyTarget: 4000000, achieved: 2800000, color: '#f59e0b' },
];

export const salespeople: SalesPerson[] = [
  { id: 'sp-1', name: 'Vikram Singh', avatar: 'VS', phone: '+91 98765 43210', email: 'vikram@showroom.com', teamId: 'team-1', monthlyTarget: 1000000, achieved: 850000, dealsCount: 8, conversionRate: 72, rating: 4.5, joinedDate: '2024-03-15' },
  { id: 'sp-2', name: 'Anita Desai', avatar: 'AD', phone: '+91 98765 43211', email: 'anita@showroom.com', teamId: 'team-1', monthlyTarget: 1000000, achieved: 920000, dealsCount: 9, conversionRate: 78, rating: 4.8, joinedDate: '2023-11-20' },
  { id: 'sp-3', name: 'Rahul Verma', avatar: 'RV', phone: '+91 98765 43212', email: 'rahul@showroom.com', teamId: 'team-1', monthlyTarget: 1000000, achieved: 680000, dealsCount: 6, conversionRate: 65, rating: 4.2, joinedDate: '2024-06-01' },
  { id: 'sp-4', name: 'Meera Joshi', avatar: 'MJ', phone: '+91 98765 43213', email: 'meera@showroom.com', teamId: 'team-1', monthlyTarget: 1000000, achieved: 750000, dealsCount: 7, conversionRate: 70, rating: 4.3, joinedDate: '2024-01-10' },
  { id: 'sp-5', name: 'Karan Malhotra', avatar: 'KM', phone: '+91 98765 43214', email: 'karan@showroom.com', teamId: 'team-1', monthlyTarget: 1000000, achieved: 650000, dealsCount: 5, conversionRate: 60, rating: 4.0, joinedDate: '2024-08-15' },
  { id: 'sp-6', name: 'Deepa Nair', avatar: 'DN', phone: '+91 98765 43215', email: 'deepa@showroom.com', teamId: 'team-2', monthlyTarget: 1100000, achieved: 980000, dealsCount: 10, conversionRate: 82, rating: 4.9, joinedDate: '2023-06-10' },
  { id: 'sp-7', name: 'Arjun Mehta', avatar: 'AM', phone: '+91 98765 43216', email: 'arjun@showroom.com', teamId: 'team-2', monthlyTarget: 1100000, achieved: 720000, dealsCount: 7, conversionRate: 68, rating: 4.1, joinedDate: '2024-02-20' },
  { id: 'sp-8', name: 'Pooja Gupta', avatar: 'PG', phone: '+91 98765 43217', email: 'pooja@showroom.com', teamId: 'team-2', monthlyTarget: 1100000, achieved: 850000, dealsCount: 8, conversionRate: 75, rating: 4.6, joinedDate: '2023-09-05' },
  { id: 'sp-9', name: 'Suresh Iyer', avatar: 'SI', phone: '+91 98765 43218', email: 'suresh@showroom.com', teamId: 'team-2', monthlyTarget: 1200000, achieved: 650000, dealsCount: 5, conversionRate: 58, rating: 3.8, joinedDate: '2024-07-01' },
  { id: 'sp-10', name: 'Nisha Kapoor', avatar: 'NK', phone: '+91 98765 43219', email: 'nisha@showroom.com', teamId: 'team-3', monthlyTarget: 1000000, achieved: 1100000, dealsCount: 12, conversionRate: 88, rating: 4.9, joinedDate: '2022-12-01' },
  { id: 'sp-11', name: 'Rohit Saxena', avatar: 'RS', phone: '+91 98765 43220', email: 'rohit@showroom.com', teamId: 'team-3', monthlyTarget: 1000000, achieved: 950000, dealsCount: 9, conversionRate: 76, rating: 4.5, joinedDate: '2023-04-15' },
  { id: 'sp-12', name: 'Kavita Rao', avatar: 'KR', phone: '+91 98765 43221', email: 'kavita@showroom.com', teamId: 'team-3', monthlyTarget: 1000000, achieved: 880000, dealsCount: 8, conversionRate: 73, rating: 4.4, joinedDate: '2023-08-20' },
  { id: 'sp-13', name: 'Manish Tiwari', avatar: 'MT', phone: '+91 98765 43222', email: 'manish@showroom.com', teamId: 'team-3', monthlyTarget: 1000000, achieved: 780000, dealsCount: 7, conversionRate: 69, rating: 4.2, joinedDate: '2024-01-25' },
  { id: 'sp-14', name: 'Swati Bhatt', avatar: 'SB', phone: '+91 98765 43223', email: 'swati@showroom.com', teamId: 'team-3', monthlyTarget: 1000000, achieved: 690000, dealsCount: 6, conversionRate: 64, rating: 4.0, joinedDate: '2024-05-10' },
  { id: 'sp-15', name: 'Anil Chopra', avatar: 'AC', phone: '+91 98765 43224', email: 'anil@showroom.com', teamId: 'team-3', monthlyTarget: 1000000, achieved: 700000, dealsCount: 6, conversionRate: 66, rating: 4.1, joinedDate: '2024-04-01' },
  { id: 'sp-16', name: 'Divya Menon', avatar: 'DM', phone: '+91 98765 43225', email: 'divya@showroom.com', teamId: 'team-4', monthlyTarget: 1000000, achieved: 820000, dealsCount: 8, conversionRate: 74, rating: 4.5, joinedDate: '2023-10-15' },
  { id: 'sp-17', name: 'Sanjay Pillai', avatar: 'SP', phone: '+91 98765 43226', email: 'sanjay@showroom.com', teamId: 'team-4', monthlyTarget: 1000000, achieved: 710000, dealsCount: 7, conversionRate: 67, rating: 4.2, joinedDate: '2024-03-01' },
  { id: 'sp-18', name: 'Ritu Agarwal', avatar: 'RA', phone: '+91 98765 43227', email: 'ritu@showroom.com', teamId: 'team-4', monthlyTarget: 1000000, achieved: 640000, dealsCount: 5, conversionRate: 62, rating: 4.0, joinedDate: '2024-06-20' },
  { id: 'sp-19', name: 'Gaurav Pandey', avatar: 'GP', phone: '+91 98765 43228', email: 'gaurav@showroom.com', teamId: 'team-4', monthlyTarget: 1000000, achieved: 630000, dealsCount: 5, conversionRate: 60, rating: 3.9, joinedDate: '2024-09-01' },
];

function createStageProgress(currentStage: DealStage): Record<DealStage, { completed: boolean; date?: string; notes?: string }> {
  const stageIndex = DEAL_STAGES.indexOf(currentStage);
  const progress: any = {};
  DEAL_STAGES.forEach((stage, i) => {
    if (i < stageIndex) {
      progress[stage] = { completed: true, date: `2026-03-${10 + i}`, notes: `${stage} completed successfully` };
    } else if (i === stageIndex) {
      progress[stage] = { completed: false, notes: `Currently in ${stage} stage` };
    } else {
      progress[stage] = { completed: false };
    }
  });
  return progress;
}

export const deals: Deal[] = [
  // Team 1 - Alpha Squad
  { id: 'D-1001', customerName: 'Arun Krishnan', customerPhone: '+91 99887 76655', carModel: 'Hyundai Creta', carVariant: 'SX(O)', color: 'Phantom Black', stage: 'Finance', status: 'active', amount: 1450000, downPayment: 400000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-03-28', updatedAt: '2026-04-08', expectedDelivery: '2026-04-20', notes: 'Customer prefers bank loan from SBI', stageProgress: createStageProgress('Finance'), financeType: '3rd Party', financePartner: 'SBI', financeStatus: 'Pending', accessoriesAmount: 25000 },
  { id: 'D-1002', customerName: 'Lakshmi Venkat', customerPhone: '+91 99887 76656', carModel: 'Hyundai Venue', carVariant: 'SX+', color: 'Polar White', stage: 'PDI', status: 'active', amount: 1120000, downPayment: 350000, salespersonId: 'sp-2', teamId: 'team-1', createdAt: '2026-03-15', updatedAt: '2026-04-07', expectedDelivery: '2026-04-15', notes: 'PDI scheduled for tomorrow', stageProgress: createStageProgress('PDI'), financeType: 'In-house', financePartner: 'HDFC', financeStatus: 'Approved', insurancePartner: 'HDFC Ergo' },
  { id: 'D-1003', customerName: 'Manoj Sharma', customerPhone: '+91 99887 76657', carModel: 'Hyundai Tucson', carVariant: 'Signature', color: 'Titan Grey', stage: 'Account', status: 'active', amount: 3200000, downPayment: 1000000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-04-08', updatedAt: '2026-04-08', expectedDelivery: '2026-05-01', notes: 'Premium customer, needs priority handling', stageProgress: createStageProgress('Account'), isExchange: true },
  { id: 'D-1004', customerName: 'Sunita Devi', customerPhone: '+91 99887 76658', carModel: 'Hyundai i20', carVariant: 'Asta', color: 'Fiery Red', stage: 'Accessories', status: 'active', amount: 980000, downPayment: 300000, salespersonId: 'sp-3', teamId: 'team-1', createdAt: '2026-03-10', updatedAt: '2026-04-06', expectedDelivery: '2026-04-12', notes: 'Wants floor mats and body cover', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 45000 },
  { id: 'D-1005', customerName: 'Rajiv Menon', customerPhone: '+91 99887 76659', carModel: 'Hyundai Verna', carVariant: 'Turbo', color: 'Atlas White', stage: 'RTO', status: 'active', amount: 1380000, downPayment: 450000, salespersonId: 'sp-4', teamId: 'team-1', createdAt: '2026-03-20', updatedAt: '2026-04-05', expectedDelivery: '2026-04-18', notes: 'RTO documents submitted', stageProgress: createStageProgress('RTO'), financeType: 'In-house', financeStatus: 'Approved' },
  { id: 'D-1019', customerName: 'Sumit Gupta', customerPhone: '+91 99887 76673', carModel: 'Hyundai Creta', carVariant: 'EX', color: 'Atlas White', stage: 'Account', status: 'active', amount: 1150000, downPayment: 200000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-04-02', updatedAt: '2026-04-02', expectedDelivery: '2026-04-25', notes: 'Waiting for token amount', stageProgress: createStageProgress('Account') },
  { id: 'D-1020', customerName: 'Preeti Singh', customerPhone: '+91 99887 76674', carModel: 'Hyundai Venue', carVariant: 'S', color: 'Abyss Black', stage: 'Account', status: 'active', amount: 820000, downPayment: 150000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-04-05', updatedAt: '2026-04-05', expectedDelivery: '2026-04-30', notes: 'Interested in extended warranty', stageProgress: createStageProgress('Account') },
  { id: 'D-1021', customerName: 'Kailash Nath', customerPhone: '+91 99887 76675', carModel: 'Hyundai Verna', carVariant: 'SX', color: 'Starry Night', stage: 'Account', status: 'active', amount: 1280000, downPayment: 300000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-04-09', updatedAt: '2026-04-09', expectedDelivery: '2026-05-15', notes: 'Documentation pending', stageProgress: createStageProgress('Account') },

  // Team 2 - Beta Force
  { id: 'D-1006', customerName: 'Priyanka Das', customerPhone: '+91 99887 76660', carModel: 'Hyundai Creta', carVariant: 'N Line', color: 'Abyss Black', stage: 'Finance', status: 'pending', amount: 1650000, downPayment: 500000, salespersonId: 'sp-6', teamId: 'team-2', createdAt: '2026-04-01', updatedAt: '2026-04-09', expectedDelivery: '2026-04-25', notes: 'Waiting for loan approval from HDFC', stageProgress: createStageProgress('Finance'), financeType: 'In-house', financePartner: 'HDFC', financeStatus: 'Pending' },
  { id: 'D-1007', customerName: 'Gopal Reddy', customerPhone: '+91 99887 76661', carModel: 'Hyundai Alcazar', carVariant: 'Platinum', color: 'Robust Emerald', stage: 'Account', status: 'active', amount: 2100000, downPayment: 700000, salespersonId: 'sp-7', teamId: 'team-2', createdAt: '2026-04-07', updatedAt: '2026-04-07', expectedDelivery: '2026-05-05', notes: 'New walk-in customer', stageProgress: createStageProgress('Account') },
  { id: 'D-1008', customerName: 'Fatima Sheikh', customerPhone: '+91 99887 76662', carModel: 'Hyundai Exter', carVariant: 'SX(O)', color: 'Starry Night', stage: 'PDI', status: 'active', amount: 850000, downPayment: 250000, salespersonId: 'sp-8', teamId: 'team-2', createdAt: '2026-03-18', updatedAt: '2026-04-08', expectedDelivery: '2026-04-14', notes: 'PDI completed, awaiting customer confirmation', stageProgress: createStageProgress('PDI'), accessoriesAmount: 12000 },
  { id: 'D-1009', customerName: 'Dinesh Choudhary', customerPhone: '+91 99887 76663', carModel: 'Hyundai Grand i10 Nios', carVariant: 'Sportz', color: 'Polar White', stage: 'Accessories', status: 'completed', amount: 720000, downPayment: 200000, salespersonId: 'sp-6', teamId: 'team-2', createdAt: '2026-03-05', updatedAt: '2026-04-04', expectedDelivery: '2026-04-10', notes: 'Delivery scheduled', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 8500 },
  { id: 'D-1022', customerName: 'Rohini Iyer', customerPhone: '+91 99887 76676', carModel: 'Hyundai i20', carVariant: 'Sportz', color: 'Fiery Red', stage: 'Finance', status: 'active', amount: 880000, downPayment: 250000, salespersonId: 'sp-6', teamId: 'team-2', createdAt: '2026-03-25', updatedAt: '2026-04-05', expectedDelivery: '2026-04-18', notes: 'Loan sanctioned by ICICI', stageProgress: createStageProgress('Finance'), financeType: '3rd Party', financePartner: 'ICICI', financeStatus: 'Approved' },
  { id: 'D-1023', customerName: 'Manish Rawat', customerPhone: '+91 99887 76677', carModel: 'Hyundai Venue', carVariant: 'SX', color: 'Titan Grey', stage: 'RTO', status: 'active', amount: 1050000, downPayment: 300000, salespersonId: 'sp-6', teamId: 'team-2', createdAt: '2026-03-10', updatedAt: '2026-04-02', expectedDelivery: '2026-04-22', notes: 'RTO tax paid', stageProgress: createStageProgress('RTO'), financeType: 'In-house', financeStatus: 'Approved' },

  // Team 3 - Gamma Elite
  { id: 'D-1010', customerName: 'Neha Agarwal', customerPhone: '+91 99887 76664', carModel: 'Hyundai Creta', carVariant: 'SX', color: 'Titan Grey', stage: 'RTO', status: 'blocked', amount: 1350000, downPayment: 400000, salespersonId: 'sp-10', teamId: 'team-3', createdAt: '2026-03-22', updatedAt: '2026-04-06', expectedDelivery: '2026-04-22', notes: 'Address proof mismatch - needs resolution', stageProgress: createStageProgress('RTO'), financeType: '3rd Party', financePartner: 'Axis Bank', financeStatus: 'Approved' },
  { id: 'D-1011', customerName: 'Vijay Prakash', customerPhone: '+91 99887 76665', carModel: 'Hyundai Venue', carVariant: 'N Line', color: 'Phantom Black', stage: 'Finance', status: 'active', amount: 1250000, downPayment: 380000, salespersonId: 'sp-11', teamId: 'team-3', createdAt: '2026-04-02', updatedAt: '2026-04-09', expectedDelivery: '2026-04-28', notes: 'Finance approved, documentation pending', stageProgress: createStageProgress('Finance'), financeType: 'In-house', financePartner: 'HDFC', financeStatus: 'Approved' },
  { id: 'D-1012', customerName: 'Asha Kumari', customerPhone: '+91 99887 76666', carModel: 'Hyundai i20', carVariant: 'N Line', color: 'Fiery Red', stage: 'Account', status: 'active', amount: 1150000, downPayment: 350000, salespersonId: 'sp-12', teamId: 'team-3', createdAt: '2026-04-09', updatedAt: '2026-04-09', expectedDelivery: '2026-05-10', notes: 'Test drive completed, booking confirmed', stageProgress: createStageProgress('Account') },
  { id: 'D-1013', customerName: 'Ramesh Babu', customerPhone: '+91 99887 76667', carModel: 'Hyundai Verna', carVariant: 'SX(O)', color: 'Atlas White', stage: 'PDI', status: 'active', amount: 1420000, downPayment: 420000, salespersonId: 'sp-13', teamId: 'team-3', createdAt: '2026-03-12', updatedAt: '2026-04-07', expectedDelivery: '2026-04-16', notes: 'Minor scratch found during PDI', stageProgress: createStageProgress('PDI'), insurancePartner: 'ICICI Lombard' },
  { id: 'D-1014', customerName: 'Shalini Mishra', customerPhone: '+91 99887 76668', carModel: 'Hyundai Alcazar', carVariant: 'Signature', color: 'Abyss Black', stage: 'Accessories', status: 'active', amount: 2450000, downPayment: 800000, salespersonId: 'sp-10', teamId: 'team-3', createdAt: '2026-03-01', updatedAt: '2026-04-05', expectedDelivery: '2026-04-11', notes: 'Premium accessories package selected', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 115000 },
  { id: 'D-1024', customerName: 'Amit Bansal', customerPhone: '+91 99887 76678', carModel: 'Hyundai Creta', carVariant: 'SX(O)', color: 'Robust Emerald', stage: 'Finance', status: 'active', amount: 1780000, downPayment: 500000, salespersonId: 'sp-10', teamId: 'team-3', createdAt: '2026-03-20', updatedAt: '2026-04-01', expectedDelivery: '2026-04-15', notes: 'Corporate purchase', stageProgress: createStageProgress('Finance'), financeType: 'In-house', financePartner: 'HDFC', financeStatus: 'Approved' },
  { id: 'D-1025', customerName: 'Deepak Tyagi', customerPhone: '+91 99887 76679', carModel: 'Hyundai Exter', carVariant: 'SX', color: 'Starry Night', stage: 'PDI', status: 'active', amount: 920000, downPayment: 250000, salespersonId: 'sp-10', teamId: 'team-3', createdAt: '2026-03-15', updatedAt: '2026-04-08', expectedDelivery: '2026-04-20', notes: 'Wash needed', stageProgress: createStageProgress('PDI') },

  // Team 4 - Delta Stars
  { id: 'D-1015', customerName: 'Pankaj Dubey', customerPhone: '+91 99887 76669', carModel: 'Hyundai Exter', carVariant: 'S', color: 'Polar White', stage: 'Finance', status: 'active', amount: 720000, downPayment: 200000, salespersonId: 'sp-16', teamId: 'team-4', createdAt: '2026-04-03', updatedAt: '2026-04-08', expectedDelivery: '2026-04-30', notes: 'First-time buyer, needs guidance', stageProgress: createStageProgress('Finance'), financeType: '3rd Party', financePartner: 'Kotak', financeStatus: 'Pending' },
  { id: 'D-1016', customerName: 'Geeta Rani', customerPhone: '+91 99887 76670', carModel: 'Hyundai Creta', carVariant: 'EX', color: 'Robust Emerald', stage: 'Account', status: 'active', amount: 1200000, downPayment: 360000, salespersonId: 'sp-17', teamId: 'team-4', createdAt: '2026-04-10', updatedAt: '2026-04-10', expectedDelivery: '2026-05-08', notes: 'Referred by existing customer', stageProgress: createStageProgress('Account') },
  { id: 'D-1017', customerName: 'Harish Chandra', customerPhone: '+91 99887 76671', carModel: 'Hyundai Grand i10 Nios', carVariant: 'Asta', color: 'Starry Night', stage: 'RTO', status: 'active', amount: 780000, downPayment: 230000, salespersonId: 'sp-18', teamId: 'team-4', createdAt: '2026-03-25', updatedAt: '2026-04-07', expectedDelivery: '2026-04-20', notes: 'RTO processing in progress', stageProgress: createStageProgress('RTO'), insurancePartner: 'Bajaj Allianz' },
  { id: 'D-1018', customerName: 'Usha Patil', customerPhone: '+91 99887 76672', carModel: 'Hyundai Venue', carVariant: 'SX', color: 'Titan Grey', stage: 'PDI', status: 'active', amount: 1050000, downPayment: 320000, salespersonId: 'sp-19', teamId: 'team-4', createdAt: '2026-03-14', updatedAt: '2026-04-06', expectedDelivery: '2026-04-13', notes: 'PDI scheduled for today', stageProgress: createStageProgress('PDI'), accessoriesAmount: 18000 },
  { id: 'D-1026', customerName: 'Satish Negi', customerPhone: '+91 99887 76680', carModel: 'Hyundai Venue', carVariant: 'S', color: 'Fiery Red', stage: 'Finance', status: 'active', amount: 840000, downPayment: 150000, salespersonId: 'sp-16', teamId: 'team-4', createdAt: '2026-03-30', updatedAt: '2026-04-05', expectedDelivery: '2026-04-25', notes: 'Self-employed profile', stageProgress: createStageProgress('Finance'), financeType: '3rd Party', financePartner: 'Union Bank', financeStatus: 'Approved' },
  
  // Completed Deliveries (Last 30 days)
  { id: 'D-2001', customerName: 'Kishore Kumar', customerPhone: '+91 99887 76681', carModel: 'Hyundai Creta', carVariant: 'SX', color: 'Abyss Black', stage: 'Accessories', status: 'completed', amount: 1580000, downPayment: 400000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-02-15', updatedAt: '2026-03-15', expectedDelivery: '2026-03-15', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), financeType: 'In-house', financeStatus: 'Disbursed', accessoriesAmount: 32000 },
  { id: 'D-2002', customerName: 'Anjali Sharma', customerPhone: '+91 99887 76682', carModel: 'Hyundai Venue', carVariant: 'SX(O)', color: 'Polar White', stage: 'Accessories', status: 'completed', amount: 1220000, downPayment: 300000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-02-20', updatedAt: '2026-03-20', expectedDelivery: '2026-03-20', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 28000 },
  { id: 'D-2003', customerName: 'Rohan Mehra', customerPhone: '+91 99887 76683', carModel: 'Hyundai i20', carVariant: 'Asta', color: 'Titan Grey', stage: 'Accessories', status: 'completed', amount: 1050000, downPayment: 250000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-03-01', updatedAt: '2026-03-25', expectedDelivery: '2026-03-25', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), financeType: '3rd Party', financePartner: 'SBI', accessoriesAmount: 15000 },
  { id: 'D-2004', customerName: 'Sita Ram', customerPhone: '+91 99887 76684', carModel: 'Hyundai Exter', carVariant: 'SX', color: 'Khaki', stage: 'Accessories', status: 'completed', amount: 890000, downPayment: 200000, salespersonId: 'sp-2', teamId: 'team-1', createdAt: '2026-03-05', updatedAt: '2026-03-30', expectedDelivery: '2026-03-30', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 12000 },
  { id: 'D-2005', customerName: 'Zoya Khan', customerPhone: '+91 99887 76685', carModel: 'Hyundai Creta', carVariant: 'SX', color: 'Atlas White', stage: 'Accessories', status: 'completed', amount: 1550000, downPayment: 500000, salespersonId: 'sp-6', teamId: 'team-2', createdAt: '2026-02-10', updatedAt: '2026-03-10', expectedDelivery: '2026-03-10', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 25000 },
  { id: 'D-2006', customerName: 'Aryan Dev', customerPhone: '+91 99887 76686', carModel: 'Hyundai Verna', carVariant: 'SX', color: 'Abyss Black', stage: 'Accessories', status: 'completed', amount: 1320000, downPayment: 300000, salespersonId: 'sp-10', teamId: 'team-3', createdAt: '2026-02-28', updatedAt: '2026-03-28', expectedDelivery: '2026-03-28', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 18000 },
  { id: 'D-2007', customerName: 'Ishani Roy', customerPhone: '+91 99887 76687', carModel: 'Hyundai Alcazar', carVariant: 'Platinum', color: 'Titan Grey', stage: 'Accessories', status: 'completed', amount: 2150000, downPayment: 600000, salespersonId: 'sp-10', teamId: 'team-3', createdAt: '2026-03-05', updatedAt: '2026-04-02', expectedDelivery: '2026-04-02', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 45000 },
  { id: 'D-2008', customerName: 'Kabir Singh', customerPhone: '+91 99887 76688', carModel: 'Hyundai Creta', carVariant: 'SX', color: 'Abyss Black', stage: 'Accessories', status: 'completed', amount: 1550000, downPayment: 400000, salespersonId: 'sp-10', teamId: 'team-3', createdAt: '2026-03-08', updatedAt: '2026-04-05', expectedDelivery: '2026-04-05', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 35000 },
  
  // Extra Data for sp-1 (Sales Executive Pipeline)
  { id: 'D-3001', customerName: 'Amit Verma', customerPhone: '+91 98765 43210', carModel: 'Hyundai Tucson', carVariant: 'GLS', color: 'Amazon Grey', stage: 'Account', status: 'active', amount: 2850000, downPayment: 0, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-04-10', updatedAt: '2026-04-10', expectedDelivery: '2026-05-01', notes: 'Waiting for token amount and finance docs', stageProgress: createStageProgress('Account'), financeStatus: 'Searching' },
  { id: 'D-3002', customerName: 'Sneha Kapur', customerPhone: '+91 98765 43211', carModel: 'Hyundai Creta', carVariant: 'SX(O)', color: 'Atlas White', stage: 'Account', status: 'active', amount: 1850000, downPayment: 50000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-04-05', updatedAt: '2026-04-08', expectedDelivery: '2026-04-25', notes: 'Partial DP paid, loan in process', stageProgress: createStageProgress('Account'), financeType: 'In-house', financePartner: 'HDFC', financeStatus: 'Pending' },
  { id: 'D-3003', customerName: 'Vikram Seth', customerPhone: '+91 98765 43212', carModel: 'Hyundai Verna', carVariant: 'SX', color: 'Starry Night', stage: 'Account', status: 'active', amount: 1450000, downPayment: 1450000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-03-28', updatedAt: '2026-04-09', expectedDelivery: '2026-04-15', notes: 'Full payment received. Finance approved.', stageProgress: createStageProgress('Account'), financeType: 'In-house', financePartner: 'SBI', financeStatus: 'Approved' },
  { id: 'D-3004', customerName: 'Priya Mani', customerPhone: '+91 98765 43213', carModel: 'Hyundai Venue', carVariant: 'S+', color: 'Fiery Red', stage: 'Accessories', status: 'completed', amount: 950000, downPayment: 950000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-03-15', updatedAt: '2026-04-02', expectedDelivery: '2026-04-02', notes: 'Delivered last week', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 15000 },
  { id: 'D-3005', customerName: 'Rahul Dravid', customerPhone: '+91 98765 43214', carModel: 'Hyundai Alcazar', carVariant: 'Prestige', color: 'Titan Grey', stage: 'Accessories', status: 'completed', amount: 2100000, downPayment: 2100000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-03-01', updatedAt: '2026-03-28', expectedDelivery: '2026-03-28', notes: 'Corporation delivery', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 45000 },
];

export const activities: Activity[] = [
  { id: 'act-1', type: 'deal_created', message: 'New deal created for Geeta Rani - Hyundai Creta EX', user: 'Sanjay Pillai', timestamp: '2026-04-10T14:30:00', dealId: 'D-1016' },
  { id: 'act-2', type: 'stage_moved', message: 'Deal D-1002 moved from RTO to PDI stage', user: 'Anita Desai', timestamp: '2026-04-10T12:15:00', dealId: 'D-1002' },
  { id: 'act-3', type: 'approval_requested', message: 'Finance approval requested for D-1006 - ₹16.5L', user: 'Deepa Nair', timestamp: '2026-04-10T11:45:00', dealId: 'D-1006' },
  { id: 'act-4', type: 'deal_completed', message: 'Deal D-1009 completed - Grand i10 Nios delivered', user: 'Deepa Nair', timestamp: '2026-04-10T10:00:00', dealId: 'D-1009' },
  { id: 'act-5', type: 'deal_blocked', message: 'Deal D-1010 blocked - Address proof mismatch', user: 'Nisha Kapoor', timestamp: '2026-04-09T16:30:00', dealId: 'D-1010' },
  { id: 'act-6', type: 'note_added', message: 'Added note to D-1013 - Minor scratch found during PDI', user: 'Manish Tiwari', timestamp: '2026-04-09T15:00:00', dealId: 'D-1013' },
  { id: 'act-7', type: 'stage_moved', message: 'Deal D-1014 moved from PDI to Accessories', user: 'Nisha Kapoor', timestamp: '2026-04-09T14:00:00', dealId: 'D-1014' },
  { id: 'act-8', type: 'stage_moved', message: 'Deal D-1011 moved from Account to Finance', user: 'Rohit Saxena', timestamp: '2026-04-09T11:30:00', dealId: 'D-1011' },
  { id: 'act-9', type: 'deal_created', message: 'New deal created for Asha Kumari - Hyundai i20 N Line', user: 'Kavita Rao', timestamp: '2026-04-09T10:00:00', dealId: 'D-1012' },
  { id: 'act-10', type: 'approval_requested', message: 'RTO approval requested for D-1017', user: 'Ritu Agarwal', timestamp: '2026-04-08T17:00:00', dealId: 'D-1017' },
  { id: 'act-11', type: 'stage_moved', message: 'Deal D-1008 moved from RTO to PDI', user: 'Pooja Gupta', timestamp: '2026-04-08T14:30:00', dealId: 'D-1008' },
  { id: 'act-12', type: 'deal_created', message: 'New deal created for Manoj Sharma - Hyundai Tucson', user: 'Vikram Singh', timestamp: '2026-04-08T09:00:00', dealId: 'D-1003' },
];

export const notifications: Notification[] = [
  { id: 'n-1', title: 'Finance Approval Pending', message: 'Deal D-1006 requires finance approval', type: 'warning', read: false, timestamp: '2026-04-10T11:45:00' },
  { id: 'n-2', title: 'Deal Completed', message: 'D-1009 - Grand i10 Nios delivered successfully', type: 'success', read: false, timestamp: '2026-04-10T10:00:00' },
  { id: 'n-3', title: 'Deal Blocked', message: 'D-1010 blocked due to address proof mismatch', type: 'error', read: false, timestamp: '2026-04-09T16:30:00' },
  { id: 'n-4', title: 'New High-Value Deal', message: 'Tucson Signature deal worth ₹32L created', type: 'info', read: true, timestamp: '2026-04-08T09:00:00' },
  { id: 'n-5', title: 'Monthly Target Update', message: 'Gamma Elite has achieved 85% of monthly target', type: 'success', read: true, timestamp: '2026-04-07T18:00:00' },
];

export const monthlyRevenueData = [
  { month: 'Oct', revenue: 12500000, deals: 18 },
  { month: 'Nov', revenue: 14200000, deals: 21 },
  { month: 'Dec', revenue: 18500000, deals: 28 },
  { month: 'Jan', revenue: 15800000, deals: 23 },
  { month: 'Feb', revenue: 16900000, deals: 25 },
  { month: 'Mar', revenue: 19200000, deals: 30 },
  { month: 'Apr', revenue: 14950000, deals: 18 },
];

export const stageDistribution = [
  { stage: 'Account', count: 4, value: 7750000 },
  { stage: 'Finance', count: 4, value: 5470000 },
  { stage: 'RTO', count: 3, value: 3510000 },
  { stage: 'PDI', count: 4, value: 4440000 },
  { stage: 'Accessories', count: 3, value: 4150000 },
];

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
}

export function formatFullCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export const staffPayroll = [
  { role: 'Sales Team', count: 12, totalPayout: 450000 },
  { role: 'Service & Workshop', count: 8, totalPayout: 280000 },
  { role: 'Administration', count: 4, totalPayout: 120000 },
  { role: 'Accounts & Finance', count: 2, totalPayout: 90000 },
];

export const showroomExpenses = [
  { id: 'exp-1', label: 'Showroom Rent', category: 'Fixed', amount: 350000, status: 'Paid' },
  { id: 'exp-2', label: 'Electricity & Water', category: 'Utility', amount: 45000, status: 'Paid' },
  { id: 'exp-3', label: 'Digital Marketing', category: 'Marketing', amount: 80000, status: 'Pending' },
  { id: 'exp-4', label: 'Housekeeping', category: 'General', amount: 25000, status: 'Paid' },
  { id: 'exp-5', label: 'Internet & Software', category: 'Utility', amount: 15000, status: 'Pending' },
];
