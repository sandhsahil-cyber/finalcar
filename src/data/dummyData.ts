// Types
export type DealStage = 'General' | 'Account' | 'Finance' | 'Insurance' | 'RTO' | 'PDI' | 'Accessories';
export type DealStatus = 'active' | 'completed' | 'pending' | 'blocked';
export type UserRole = 'salesperson' | 'teamleader' | 'salesmanager' | 'accounts' | 'rto' | 'insurance' | 'accessories' | 'finance' | 'pdi' | 'ceo' | 'groupceo' | 'owner';

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
  departmentStatus?: Partial<Record<DealStage, 'Not Sent' | 'In Progress' | 'Completed'>>;
  // New operational fields
  financeType?: 'In-house' | '3rd Party';
  financePartner?: string;
  financeStatus?: 'Pending' | 'Approved' | 'Rejected' | 'Disbursed' | 'Searching';
  insuranceType?: string;
  insurancePartner?: string;
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
  
  // Follow-up interaction tracking
  testDriveTaken?: boolean;
  homeVisit?: boolean;
  bookingFormSent?: boolean;
  priceModelSent?: boolean;
  brochureSent?: boolean;
  lastFollowUpNotes?: string;
  brandId?: string;
  brandName?: string;
  // Booking form fields
  bookingAmount?: number;
  customerEmail?: string;
  customerAltPhone?: string;
  customerAddress?: string;
  panNumber?: string;
  aadhaarNumber?: string;
  kycDocuments?: string[];
  bookingDate?: string;
  bookingSubmittedViaWhatsApp?: boolean;
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
  city?: string;
  brandId?: string;
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
export const DEAL_STAGES: DealStage[] = ['General', 'Account', 'Finance', 'Insurance', 'RTO', 'PDI', 'Accessories'];

export const STAGE_COLORS: Record<DealStage, string> = {
  General: '#94a3b8',
  Account: '#3b82f6',
  Finance: '#8b5cf6',
  Insurance: '#ec4899',
  RTO: '#f59e0b',
  PDI: '#10b981',
  Accessories: '#ff6b35',
};

export const CAR_MODELS = [
  { model: 'TATA Safari', variants: ['Smart', 'Pure', 'Adventure', 'Accomplished'], basePrice: 1600000, incentive: 15000, brandId: 'brand-3' },
  { model: 'TATA Harrier', variants: ['Smart', 'Pure', 'Adventure', 'Accomplished'], basePrice: 1500000, incentive: 12000, brandId: 'brand-3' },
  { model: 'TATA Nexon', variants: ['Smart', 'Pure', 'Creative', 'Fearless'], basePrice: 800000, incentive: 8000, brandId: 'brand-3' },
  { model: 'TATA Punch', variants: ['Pure', 'Adventure', 'Accomplished', 'Creative'], basePrice: 600000, incentive: 5000, brandId: 'brand-3' },
  { model: 'TATA Altroz', variants: ['XE', 'XM', 'XT', 'XZ', 'XZ+'], basePrice: 660000, incentive: 4000, brandId: 'brand-3' },
  { model: 'TATA Tiago', variants: ['XE', 'XM', 'XT', 'XZ'], basePrice: 560000, incentive: 3500, brandId: 'brand-3' },
  { model: 'TATA Tigor', variants: ['XE', 'XM', 'XT', 'XZ'], basePrice: 630000, incentive: 4000, brandId: 'brand-3' },
  // Hyundai Models
  { model: 'Hyundai Creta', variants: ['EX', 'S', 'SX', 'SX(O)'], basePrice: 1100000, incentive: 10000, brandId: 'brand-2' },
  { model: 'Hyundai Venue', variants: ['S', 'S+', 'SX', 'SX(O)'], basePrice: 790000, incentive: 7000, brandId: 'brand-2' },
  { model: 'Hyundai Verna', variants: ['S', 'SX', 'SX(O)', 'Turbo'], basePrice: 1090000, incentive: 9000, brandId: 'brand-2' },
  { model: 'Hyundai i20', variants: ['Era', 'Magna', 'Sportz', 'Asta'], basePrice: 700000, incentive: 6000, brandId: 'brand-2' },
  // Toyota Models
  { model: 'Toyota Fortuner', variants: ['Leader', 'Legender', 'GR-S'], basePrice: 3343000, incentive: 25000, brandId: 'brand-1' },
  { model: 'Toyota Innova Hycross', variants: ['GX', 'VX', 'ZX'], basePrice: 1977000, incentive: 18000, brandId: 'brand-1' },
  { model: 'Toyota Glanza', variants: ['E', 'S', 'G', 'V'], basePrice: 681000, incentive: 5000, brandId: 'brand-1' },
  { model: 'Toyota Hilux', variants: ['Standard', 'High'], basePrice: 3040000, incentive: 20000, brandId: 'brand-1' },
  // Mahindra Models
  { model: 'Mahindra XUV700', variants: ['MX', 'AX3', 'AX5', 'AX7'], basePrice: 1399000, incentive: 15000, brandId: 'brand-4' },
  { model: 'Mahindra Scorpio-N', variants: ['Z2', 'Z4', 'Z6', 'Z8'], basePrice: 1326000, incentive: 14000, brandId: 'brand-4' },
  { model: 'Mahindra Thar', variants: ['AX Opt', 'LX'], basePrice: 1098000, incentive: 12000, brandId: 'brand-4' },
  { model: 'Mahindra Bolero', variants: ['B4', 'B6', 'B6 Opt'], basePrice: 979000, incentive: 8000, brandId: 'brand-4' },
  // Maruti Models
  { model: 'Maruti Swift', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], basePrice: 640000, incentive: 4000, brandId: 'brand-5' },
  { model: 'Maruti Baleno', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], basePrice: 680000, incentive: 5000, brandId: 'brand-5' },
  { model: 'Maruti Brezza', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], basePrice: 840000, incentive: 7000, brandId: 'brand-5' },
  { model: 'Maruti Ertiga', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], basePrice: 890000, incentive: 6000, brandId: 'brand-5' },
  { model: 'Maruti Grand Vitara', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], basePrice: 1080000, incentive: 9000, brandId: 'brand-5' },
];

export const COLORS = ['Phantom Black', 'Polar White', 'Titan Grey', 'Fiery Red', 'Atlas White', 'Abyss Black', 'Robust Emerald', 'Starry Night'];

export const teams: Team[] = [
  // Ahmedabad Outlets
  { id: 'team-1', name: 'Alpha Squad', leaderId: 'tl-1', leaderName: 'Rajesh Kumar', leaderAvatar: 'RK', memberCount: 5, monthlyTarget: 5000000, achieved: 3850000, color: '#3b82f6', city: 'Ahmedabad', brandId: 'brand-2' },
  { id: 'team-2', name: 'Beta Force', leaderId: 'tl-2', leaderName: 'Priya Sharma', leaderAvatar: 'PS', memberCount: 4, monthlyTarget: 4500000, achieved: 3200000, color: '#8b5cf6', city: 'Ahmedabad', brandId: 'brand-1' },
  { id: 'team-3', name: 'Gamma Elite', leaderId: 'tl-3', leaderName: 'Amit Patel', leaderAvatar: 'AP', memberCount: 6, monthlyTarget: 6000000, achieved: 5100000, color: '#10b981', city: 'Ahmedabad', brandId: 'brand-3' },
  { id: 'team-4', name: 'Delta Stars', leaderId: 'tl-4', leaderName: 'Sneha Reddy', leaderAvatar: 'SR', memberCount: 4, monthlyTarget: 4000000, achieved: 2800000, color: '#f59e0b', city: 'Ahmedabad', brandId: 'brand-5' },
  // Surat Outlets
  { id: 'team-5', name: 'Surat Central', leaderId: 'tl-5', leaderName: 'Vikash Jain', leaderAvatar: 'VJ', memberCount: 5, monthlyTarget: 4800000, achieved: 4200000, color: '#06b6d4', city: 'Surat', brandId: 'brand-2' },
  { id: 'team-6', name: 'Surat Express', leaderId: 'tl-6', leaderName: 'Nidhi Shah', leaderAvatar: 'NS', memberCount: 4, monthlyTarget: 4200000, achieved: 3600000, color: '#ec4899', city: 'Surat', brandId: 'brand-5' },
  { id: 'team-7', name: 'Surat West', leaderId: 'tl-7', leaderName: 'Kamal Nath', leaderAvatar: 'KN', memberCount: 4, monthlyTarget: 4500000, achieved: 1800000, color: '#ef4444', city: 'Surat', brandId: 'brand-1' },
  { id: 'team-8', name: 'Surat Ring Road', leaderId: 'tl-8', leaderName: 'Preeti Vora', leaderAvatar: 'PV', memberCount: 3, monthlyTarget: 3800000, achieved: 3100000, color: '#14b8a6', city: 'Surat', brandId: 'brand-4' },
  // Vadodara Outlets
  { id: 'team-9', name: 'Vadodara Hub', leaderId: 'tl-9', leaderName: 'Bharat Patel', leaderAvatar: 'BP', memberCount: 5, monthlyTarget: 5200000, achieved: 4800000, color: '#a855f7', city: 'Vadodara', brandId: 'brand-3' },
  { id: 'team-10', name: 'Vadodara Central', leaderId: 'tl-10', leaderName: 'Heena Desai', leaderAvatar: 'HD', memberCount: 4, monthlyTarget: 4600000, achieved: 4100000, color: '#f97316', city: 'Vadodara', brandId: 'brand-2' },
  { id: 'team-11', name: 'Vadodara East', leaderId: 'tl-11', leaderName: 'Rajan Mehta', leaderAvatar: 'RM', memberCount: 4, monthlyTarget: 4000000, achieved: 3500000, color: '#22c55e', city: 'Vadodara', brandId: 'brand-5' },
  { id: 'team-12', name: 'Vadodara Alkapuri', leaderId: 'tl-12', leaderName: 'Sonal Trivedi', leaderAvatar: 'ST', memberCount: 3, monthlyTarget: 3500000, achieved: 2900000, color: '#eab308', city: 'Vadodara', brandId: 'brand-4' },
  // Rajkot Outlets
  { id: 'team-13', name: 'Rajkot Main', leaderId: 'tl-13', leaderName: 'Dinesh Chauhan', leaderAvatar: 'DC', memberCount: 5, monthlyTarget: 4800000, achieved: 4400000, color: '#0ea5e9', city: 'Rajkot', brandId: 'brand-1' },
  { id: 'team-14', name: 'Rajkot West', leaderId: 'tl-14', leaderName: 'Geeta Rani', leaderAvatar: 'GR', memberCount: 4, monthlyTarget: 4200000, achieved: 1700000, color: '#d946ef', city: 'Rajkot', brandId: 'brand-3' },
  { id: 'team-15', name: 'Rajkot Highway', leaderId: 'tl-15', leaderName: 'Paresh Solanki', leaderAvatar: 'PS', memberCount: 3, monthlyTarget: 3600000, achieved: 3200000, color: '#64748b', city: 'Rajkot', brandId: 'brand-5' },
  { id: 'team-16', name: 'Rajkot Ring Road', leaderId: 'tl-16', leaderName: 'Anand Bhatt', leaderAvatar: 'AB', memberCount: 4, monthlyTarget: 4000000, achieved: 3400000, color: '#84cc16', city: 'Rajkot', brandId: 'brand-4' },
  // Bhavnagar Outlets
  { id: 'team-17', name: 'Bhavnagar Central', leaderId: 'tl-17', leaderName: 'Kiran Joshi', leaderAvatar: 'KJ', memberCount: 4, monthlyTarget: 3800000, achieved: 3300000, color: '#f43f5e', city: 'Bhavnagar', brandId: 'brand-2' },
  { id: 'team-18', name: 'Bhavnagar North', leaderId: 'tl-18', leaderName: 'Mohan Das', leaderAvatar: 'MD', memberCount: 3, monthlyTarget: 3500000, achieved: 1400000, color: '#6366f1', city: 'Bhavnagar', brandId: 'brand-1' },
  { id: 'team-19', name: 'Bhavnagar South', leaderId: 'tl-19', leaderName: 'Rekha Parmar', leaderAvatar: 'RP', memberCount: 4, monthlyTarget: 4000000, achieved: 3000000, color: '#0d9488', city: 'Bhavnagar', brandId: 'brand-3' },
  { id: 'team-20', name: 'Bhavnagar Express', leaderId: 'tl-20', leaderName: 'Sunil Vyas', leaderAvatar: 'SV', memberCount: 3, monthlyTarget: 3400000, achieved: 2600000, color: '#fb923c', city: 'Bhavnagar', brandId: 'brand-5' },
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
  { id: 'D-1001', customerName: 'Arun Krishnan', customerPhone: '+91 99887 76655', carModel: 'Hyundai Creta', carVariant: 'SX(O)', color: 'Phantom Black', stage: 'Finance', status: 'active', amount: 1450000, downPayment: 400000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-03-28', updatedAt: '2026-04-08', expectedDelivery: '2026-04-20', notes: 'Customer prefers bank loan from SBI', stageProgress: createStageProgress('Finance'), financeType: '3rd Party', financePartner: 'SBI', financeStatus: 'Pending', accessoriesAmount: 25000, brandId: 'brand-2' },
  { id: 'D-1002', customerName: 'Lakshmi Venkat', customerPhone: '+91 99887 76656', carModel: 'Hyundai Venue', carVariant: 'SX+', color: 'Polar White', stage: 'PDI', status: 'active', amount: 1120000, downPayment: 350000, salespersonId: 'sp-2', teamId: 'team-1', createdAt: '2026-03-15', updatedAt: '2026-04-07', expectedDelivery: '2026-04-15', notes: 'PDI scheduled for tomorrow', stageProgress: createStageProgress('PDI'), financeType: 'In-house', financePartner: 'HDFC', financeStatus: 'Approved', insurancePartner: 'HDFC Ergo', brandId: 'brand-2' },
  { id: 'D-1003', customerName: 'Manoj Sharma', customerPhone: '+91 99887 76657', carModel: 'Toyota Fortuner', carVariant: 'Legender', color: 'Titan Grey', stage: 'Account', status: 'active', amount: 3800000, downPayment: 1000000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-04-08', updatedAt: '2026-04-08', expectedDelivery: '2026-05-01', notes: 'Premium customer, needs priority handling', stageProgress: createStageProgress('Account'), isExchange: true, brandId: 'brand-1' },
  { id: 'D-1004', customerName: 'Sunita Devi', customerPhone: '+91 99887 76658', carModel: 'Hyundai i20', carVariant: 'Asta', color: 'Fiery Red', stage: 'Accessories', status: 'active', amount: 980000, downPayment: 300000, salespersonId: 'sp-3', teamId: 'team-1', createdAt: '2026-03-10', updatedAt: '2026-04-06', expectedDelivery: '2026-04-12', notes: 'Wants floor mats and body cover', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 45000, brandId: 'brand-2' },
  { id: 'D-1005', customerName: 'Rajiv Menon', customerPhone: '+91 99887 76659', carModel: 'Mahindra XUV700', carVariant: 'AX7', color: 'Atlas White', stage: 'RTO', status: 'active', amount: 2480000, downPayment: 450000, salespersonId: 'sp-4', teamId: 'team-1', createdAt: '2026-03-20', updatedAt: '2026-04-05', expectedDelivery: '2026-04-18', notes: 'RTO documents submitted', stageProgress: createStageProgress('RTO'), financeType: 'In-house', financeStatus: 'Approved', brandId: 'brand-4' },
  { id: 'D-1019', customerName: 'Sumit Gupta', customerPhone: '+91 99887 76673', carModel: 'TATA Safari', carVariant: 'Accomplished', color: 'Atlas White', stage: 'Account', status: 'active', amount: 2650000, downPayment: 200000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-04-02', updatedAt: '2026-04-02', expectedDelivery: '2026-04-25', notes: 'Waiting for token amount', stageProgress: createStageProgress('Account'), financeType: 'In-house', financeStatus: 'Approved', accessoriesAmount: 15000, brandId: 'brand-3' },

  // Team 2 - Beta Force
  { id: 'D-1006', customerName: 'Priyanka Das', customerPhone: '+91 99887 76660', carModel: 'Toyota Innova Hycross', carVariant: 'ZX', color: 'Abyss Black', stage: 'Finance', status: 'pending', amount: 2950000, downPayment: 500000, salespersonId: 'sp-6', teamId: 'team-2', createdAt: '2026-04-01', updatedAt: '2026-04-09', expectedDelivery: '2026-04-25', notes: 'Waiting for loan approval from HDFC', stageProgress: createStageProgress('Finance'), financeType: 'In-house', financePartner: 'HDFC', financeStatus: 'Pending', brandId: 'brand-1' },
  { id: 'D-1007', customerName: 'Gopal Reddy', customerPhone: '+91 99887 76661', carModel: 'Mahindra Scorpio-N', carVariant: 'Z8', color: 'Robust Emerald', stage: 'Account', status: 'active', amount: 2100000, downPayment: 700000, salespersonId: 'sp-7', teamId: 'team-2', createdAt: '2026-04-07', updatedAt: '2026-04-07', expectedDelivery: '2026-05-05', notes: 'New walk-in customer', stageProgress: createStageProgress('Account'), brandId: 'brand-4' },
  { id: 'D-1008', customerName: 'Fatima Sheikh', customerPhone: '+91 99887 76662', carModel: 'TATA Nexon', carVariant: 'Fearless', color: 'Starry Night', stage: 'PDI', status: 'active', amount: 1550000, downPayment: 250000, salespersonId: 'sp-8', teamId: 'team-2', createdAt: '2026-03-18', updatedAt: '2026-04-08', expectedDelivery: '2026-04-14', notes: 'PDI completed, awaiting customer confirmation', stageProgress: createStageProgress('PDI'), accessoriesAmount: 12000, brandId: 'brand-3' },
  
  // Team 3 - Gamma Elite
  { id: 'D-1010', customerName: 'Neha Agarwal', customerPhone: '+91 99887 76664', carModel: 'Toyota Glanza', carVariant: 'V', color: 'Titan Grey', stage: 'RTO', status: 'blocked', amount: 950000, downPayment: 400000, salespersonId: 'sp-10', teamId: 'team-3', createdAt: '2026-03-22', updatedAt: '2026-04-06', expectedDelivery: '2026-04-22', notes: 'Address proof mismatch - needs resolution', stageProgress: createStageProgress('RTO'), financeType: '3rd Party', financePartner: 'Axis Bank', financeStatus: 'Approved', brandId: 'brand-1' },
  { id: 'D-1011', customerName: 'Vijay Prakash', customerPhone: '+91 99887 76665', carModel: 'Mahindra Thar', carVariant: 'LX', color: 'Phantom Black', stage: 'Finance', status: 'active', amount: 1550000, downPayment: 380000, salespersonId: 'sp-11', teamId: 'team-3', createdAt: '2026-04-02', updatedAt: '2026-04-09', expectedDelivery: '2026-04-28', notes: 'Finance approved, documentation pending', stageProgress: createStageProgress('Finance'), financeType: 'In-house', financePartner: 'HDFC', financeStatus: 'Approved', brandId: 'brand-4' },
  
  // Completed Deliveries (Last 30 days)
  { id: 'D-2001', customerName: 'Kishore Kumar', customerPhone: '+91 99887 76681', carModel: 'Toyota Fortuner', carVariant: 'GR-S', color: 'Abyss Black', stage: 'Accessories', status: 'completed', amount: 4850000, downPayment: 400000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-02-15', updatedAt: '2026-03-15', expectedDelivery: '2026-03-15', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), financeType: 'In-house', financeStatus: 'Disbursed', accessoriesAmount: 32000, brandId: 'brand-1' },
  { id: 'D-2002', customerName: 'Anjali Sharma', customerPhone: '+91 99887 76682', carModel: 'Mahindra XUV700', carVariant: 'AX7 L', color: 'Polar White', stage: 'Accessories', status: 'completed', amount: 2650000, downPayment: 300000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-02-20', updatedAt: '2026-03-20', expectedDelivery: '2026-03-20', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 28000, brandId: 'brand-4' },
  { id: 'D-2003', customerName: 'Rohan Mehra', customerPhone: '+91 99887 76683', carModel: 'TATA Safari', carVariant: 'Accomplished', color: 'Titan Grey', stage: 'Accessories', status: 'completed', amount: 2650000, downPayment: 250000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-03-01', updatedAt: '2026-03-25', expectedDelivery: '2026-03-25', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), financeType: '3rd Party', financePartner: 'SBI', accessoriesAmount: 15000, brandId: 'brand-3' },
  { id: 'D-2004', customerName: 'Sita Ram', customerPhone: '+91 99887 76684', carModel: 'Hyundai Creta', carVariant: 'SX', color: 'Khaki', stage: 'Accessories', status: 'completed', amount: 1580000, downPayment: 200000, salespersonId: 'sp-2', teamId: 'team-1', createdAt: '2026-03-05', updatedAt: '2026-03-30', expectedDelivery: '2026-03-30', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 12000, brandId: 'brand-2' },

  // Extra Data for sp-1 (Sales Executive Pipeline)
  { id: 'D-3001', customerName: 'Amit Verma', customerPhone: '+91 98765 43210', carModel: 'Hyundai Tucson', carVariant: 'GLS', color: 'Amazon Grey', stage: 'Account', status: 'active', amount: 2850000, downPayment: 0, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-04-10', updatedAt: '2026-04-10', expectedDelivery: '2026-05-01', notes: 'Waiting for token amount and finance docs', stageProgress: createStageProgress('Account'), financeStatus: 'Searching', brandId: 'brand-2' },
  { id: 'D-3002', customerName: 'Sneha Kapur', customerPhone: '+91 98765 43211', carModel: 'Hyundai Creta', carVariant: 'SX(O)', color: 'Atlas White', stage: 'Account', status: 'active', amount: 1850000, downPayment: 50000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-04-05', updatedAt: '2026-04-08', expectedDelivery: '2026-04-25', notes: 'Partial DP paid, loan in process', stageProgress: createStageProgress('Account'), financeType: 'In-house', financePartner: 'HDFC', financeStatus: 'Pending', brandId: 'brand-2' },
  { id: 'D-3003', customerName: 'Vikram Seth', customerPhone: '+91 98765 43212', carModel: 'Hyundai Verna', carVariant: 'SX', color: 'Starry Night', stage: 'Account', status: 'active', amount: 1450000, downPayment: 1450000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-03-28', updatedAt: '2026-04-09', expectedDelivery: '2026-04-15', notes: 'Full payment received. Finance approved.', stageProgress: createStageProgress('Account'), financeType: 'In-house', financePartner: 'SBI', financeStatus: 'Approved', brandId: 'brand-2' },
  { id: 'D-3004', customerName: 'Priya Mani', customerPhone: '+91 98765 43213', carModel: 'Hyundai Venue', carVariant: 'S+', color: 'Fiery Red', stage: 'Accessories', status: 'completed', amount: 950000, downPayment: 950000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-03-15', updatedAt: '2026-04-02', expectedDelivery: '2026-04-02', notes: 'Delivered last week', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 15000, brandId: 'brand-2' },
  { id: 'D-3005', customerName: 'Rahul Dravid', customerPhone: '+91 98765 43214', carModel: 'Hyundai Alcazar', carVariant: 'Prestige', color: 'Titan Grey', stage: 'Accessories', status: 'completed', amount: 2100000, downPayment: 2100000, salespersonId: 'sp-1', teamId: 'team-1', createdAt: '2026-03-01', updatedAt: '2026-03-28', expectedDelivery: '2026-03-28', notes: 'Corporation delivery', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 45000, brandId: 'brand-2' },

  // Maruti Deals
  { id: 'D-4001', customerName: 'Harsh Patel', customerPhone: '+91 99887 77001', carModel: 'Maruti Swift', carVariant: 'ZXi+', color: 'Pearl White', stage: 'Finance', status: 'active', amount: 920000, downPayment: 200000, salespersonId: 'sp-16', teamId: 'team-4', createdAt: '2026-04-01', updatedAt: '2026-04-10', expectedDelivery: '2026-04-22', notes: 'Finance in progress at SBI', stageProgress: createStageProgress('Finance'), financeType: 'In-house', financePartner: 'SBI', financeStatus: 'Pending', brandId: 'brand-5' },
  { id: 'D-4002', customerName: 'Prachi Desai', customerPhone: '+91 99887 77002', carModel: 'Maruti Baleno', carVariant: 'Alpha', color: 'Celestial Blue', stage: 'RTO', status: 'active', amount: 980000, downPayment: 350000, salespersonId: 'sp-17', teamId: 'team-4', createdAt: '2026-03-20', updatedAt: '2026-04-08', expectedDelivery: '2026-04-18', notes: 'RTO docs submitted', stageProgress: createStageProgress('RTO'), financeType: '3rd Party', financePartner: 'Axis Bank', financeStatus: 'Approved', brandId: 'brand-5' },
  { id: 'D-4003', customerName: 'Chirag Shah', customerPhone: '+91 99887 77003', carModel: 'Maruti Brezza', carVariant: 'ZXi+', color: 'Brave Khaki', stage: 'PDI', status: 'active', amount: 1320000, downPayment: 400000, salespersonId: 'sp-18', teamId: 'team-6', createdAt: '2026-03-25', updatedAt: '2026-04-09', expectedDelivery: '2026-04-16', notes: 'PDI scheduled tomorrow', stageProgress: createStageProgress('PDI'), financeType: 'In-house', financeStatus: 'Approved', accessoriesAmount: 18000, brandId: 'brand-5' },
  { id: 'D-4004', customerName: 'Mitali Vora', customerPhone: '+91 99887 77004', carModel: 'Maruti Grand Vitara', carVariant: 'Alpha', color: 'Arctic White', stage: 'Account', status: 'active', amount: 1580000, downPayment: 100000, salespersonId: 'sp-19', teamId: 'team-6', createdAt: '2026-04-08', updatedAt: '2026-04-10', expectedDelivery: '2026-05-05', notes: 'New walk-in, high-value prospect', stageProgress: createStageProgress('Account'), brandId: 'brand-5' },
  { id: 'D-4005', customerName: 'Nikhil Thakkar', customerPhone: '+91 99887 77005', carModel: 'Maruti Ertiga', carVariant: 'ZXi', color: 'Magma Grey', stage: 'Accessories', status: 'completed', amount: 1150000, downPayment: 1150000, salespersonId: 'sp-16', teamId: 'team-4', createdAt: '2026-02-25', updatedAt: '2026-03-22', expectedDelivery: '2026-03-22', notes: 'Corporate delivery', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 22000, brandId: 'brand-5' },
  { id: 'D-4006', customerName: 'Renu Agarwal', customerPhone: '+91 99887 77006', carModel: 'Maruti Swift', carVariant: 'VXi', color: 'Solid Fire Red', stage: 'Accessories', status: 'completed', amount: 780000, downPayment: 780000, salespersonId: 'sp-17', teamId: 'team-11', createdAt: '2026-03-10', updatedAt: '2026-04-05', expectedDelivery: '2026-04-05', notes: 'Delivered successfully', stageProgress: createStageProgress('Accessories'), accessoriesAmount: 8000, brandId: 'brand-5' },
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
