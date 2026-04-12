import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import {
  LayoutDashboard, Car, Users, BarChart3, FileText, Settings, Bell,
  ChevronLeft, ChevronRight, LogOut, Shield, UserCircle, Briefcase,
  Target, TrendingUp, Wallet, Package, Landmark, Truck, Users2, 
  ReceiptText, PackageSearch, Gavel, FileCheck, Hash, CreditCard, 
  Umbrella, Calculator, History, Layers, ShoppingCart, Wrench, 
  PieChart, FileSignature, Banknote, ShieldCheck, ClipboardList, 
  Camera, CheckCircle, Globe, Zap, DollarSign, Dna, LayoutGrid, BarChartHorizontal, Map, UserCheck, Flame, Activity
} from 'lucide-react';

const roleConfig = {
  salesperson: { label: 'Sales Executive', color: '#3b82f6', icon: UserCircle },
  teamleader: { label: 'Team Leader', color: '#8b5cf6', icon: Shield },
  salesmanager: { label: 'Sales Manager', color: '#ff6b35', icon: Briefcase },
  accounts: { label: 'Accounts & Finance', color: '#10b981', icon: Wallet },
  rto: { label: 'RTO Department', color: '#6366f1', icon: Gavel },
  insurance: { label: 'Insurance Dept.', color: '#0ea5e9', icon: ShieldCheck },
  accessories: { label: 'Accessories Dept.', color: '#f43f5e', icon: Package },
  finance: { label: 'Finance Dept.', color: '#8b5cf6', icon: Landmark },
  pdi: { label: 'PDI Workshop', color: '#10b981', icon: ShieldCheck },
  ceo: { label: 'CEO & Owner', color: '#1a202c', icon: Globe },
  groupceo: { label: 'Group CEO', color: '#1a202c', icon: LayoutGrid },
  owner: { label: 'Dealer Principal', color: '#0f172a', icon: Shield },
};

const menuItems = [
  { id: 'today_tasks', label: 'Today Tasks', icon: ClipboardList },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'deals', label: 'Leads', icon: Car },
  { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'targets', label: 'Targets', icon: Target },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  // Account Specific
  { id: 'acc_sales_leads', label: 'Sales Lead', icon: Users2 },
  { id: 'acc_showroom_expenses', label: 'Showroom Expenses', icon: Wallet },
  { id: 'acc_sales_reports', label: 'Sales Report', icon: ReceiptText },
  { id: 'acc_stock_inventory', label: 'Stock Inventory', icon: PackageSearch },
  // RTO Specific
  { id: 'rto_workspace', label: 'RTO Workspace', icon: ClipboardList },
  { id: 'rto_tax', label: 'Tax & Challans', icon: CreditCard },
  { id: 'rto_hsrp', label: 'HSRP Tracker', icon: Hash },
  { id: 'rto_vault', label: 'Document Vault', icon: FileCheck },
  // Insurance Specific
  { id: 'ins_issuance', label: 'Policy Issuance', icon: ShieldCheck },
  { id: 'ins_calculator', label: 'Premium Calculator', icon: Calculator },
  { id: 'ins_renewals', label: 'Renewals', icon: History },
  { id: 'ins_claims', label: 'Claims Desk', icon: Umbrella },
  // Accessories Specific
  { id: 'acc_fitment_queue', label: 'Fitment Queue', icon: Wrench },
  { id: 'acc_inventory', label: 'Inventory Stock', icon: Package },
  { id: 'acc_combos', label: 'Combo Packages', icon: Layers },
  { id: 'acc_procurement', label: 'Stock Procurement', icon: ShoppingCart },
  // Finance Specific
  { id: 'fin_loans', label: 'Loan Applications', icon: FileSignature },
  { id: 'fin_schemes', label: 'Bank Schemes', icon: Landmark },
  { id: 'fin_payouts', label: 'Payout Tracker', icon: PieChart },
  { id: 'fin_noc', label: 'NOC & Closure', icon: Banknote },
  // PDI Specific
  { id: 'pdi_queue', label: 'Inspection Queue', icon: Truck },
  { id: 'pdi_checklist', label: '100-Point Checklist', icon: ClipboardList },
  { id: 'pdi_rectification', label: 'Rectification Log', icon: Wrench },
  { id: 'pdi_ready_delivery', label: 'Ready for Delivery', icon: CheckCircle },
  // CEO Specific
  { id: 'ceo_summary', label: 'Executive Summary', icon: LayoutDashboard },
  { id: 'ceo_inventory', label: 'Inventory Valuation', icon: DollarSign },
  { id: 'ceo_throughput', label: 'Department Throughput', icon: BarChart3 },
  { id: 'ceo_marketing', label: 'Marketing & ROI', icon: Zap },
  { id: 'ceo_audit', label: 'Audit Logs', icon: FileText },
  // Group CEO Specific
  { id: 'gceo_consolidated', label: 'All Showrooms', icon: LayoutGrid },
  { id: 'gceo_analytics', label: 'Brand Comparison', icon: BarChartHorizontal },
  { id: 'gceo_funds', label: 'Paisa In-Out', icon: DollarSign },
  { id: 'gceo_hr', label: 'Staff & Salary', icon: UserCheck },
  { id: 'gceo_risk', label: 'Checking & Reports', icon: ShieldCheck },
  // Owner Specific
  { id: 'owner_command', label: 'CEO Command Center', icon: LayoutDashboard },
  { id: 'owner_profit', label: 'Profitability Analytics', icon: BarChart3 },
  { id: 'owner_funnel', label: 'Delivery Funnel', icon: Activity },
  { id: 'owner_discounts', label: 'Discount Approvals', icon: Flame },
  { id: 'owner_csat', label: 'Customer Satisfaction', icon: Target },
];

const Sidebar: React.FC = () => {
  const { sidebarCollapsed, setSidebarCollapsed, activeView, setActiveView, currentRole } = useDashboard();
  const role = roleConfig[currentRole as keyof typeof roleConfig] || roleConfig.salesmanager;
  const RoleIcon = role.icon;

  return (
    <>
      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full bg-[#0f172a] text-white z-50 transition-all duration-300 flex flex-col ${sidebarCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'
          }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
              <Car className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-base font-bold">AutoDesk</h1>
                <p className="text-[10px] text-gray-400">Sales Management</p>
              </div>
            )}
          </div>
        </div>

        <div className={`mx-3 mt-4 mb-2 p-3 rounded-xl shadow-lg border border-white/10 ${sidebarCollapsed ? 'flex justify-center' : ''}`} style={{ backgroundColor: role.color }}>
          <div className="flex items-center gap-2">
            <RoleIcon className="w-5 h-5 flex-shrink-0 text-white" />
            {!sidebarCollapsed && (
              <span className="text-xs font-bold text-white uppercase tracking-wider">{role.label}</span>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {menuItems
            .filter(item => {
              const isAccLeadItem = item.id.startsWith('acc_') && !['acc_fitment_queue', 'acc_inventory', 'acc_combos', 'acc_procurement'].includes(item.id);
              const isRTOItem = item.id.startsWith('rto_');
              const isInsItem = item.id.startsWith('ins_');
              const isAccessoriesItem = ['acc_fitment_queue', 'acc_inventory', 'acc_combos', 'acc_procurement'].includes(item.id);
              const isFinanceItem = item.id.startsWith('fin_');

              // 1. Account Role Logic
              if (currentRole === 'accounts') {
                if (isAccLeadItem || item.id === 'dashboard') return true;
                return false;
              }

              // 2. RTO Role Logic
              if (currentRole === 'rto') {
                if (isRTOItem || item.id === 'dashboard') return true;
                return false;
              }

              // 3. Insurance Role Logic
              if (currentRole === 'insurance') {
                if (isInsItem || item.id === 'dashboard') return true;
                return false;
              }

              // 4. Accessories Role Logic
              if (currentRole === 'accessories') {
                if (isAccessoriesItem || item.id === 'dashboard') return true;
                return false;
              }

              // 5. Finance Role Logic
              if (currentRole === 'finance') {
                if (isFinanceItem || item.id === 'dashboard') return true;
                return false;
              }

              const isPDIItem = item.id.startsWith('pdi_');
              // 6. PDI Role Logic
              if (currentRole === 'pdi') {
                if (isPDIItem || item.id === 'dashboard') return true;
                return false;
              }

              const isCEOItem = item.id.startsWith('ceo_');
              // 7. CEO Role Logic
              if (currentRole === 'ceo') {
                if (isCEOItem || item.id === 'dashboard' || item.id === 'reports') return true;
                return false;
              }

              const isGCEOItem = item.id.startsWith('gceo_');
              // 8. Group CEO Role Logic
              if (currentRole === 'groupceo') {
                if (isGCEOItem || item.id === 'dashboard' || item.id === 'reports') return true;
                return false;
              }

              const isOwnerItem = item.id.startsWith('owner_');
              // 9. Owner Role Logic
              if (currentRole === 'owner') {
                if (isOwnerItem || item.id === 'dashboard' || item.id === 'reports') return true;
                return false;
              }

              // 10. Hide specialized items for everyone else
              if (isAccLeadItem || isRTOItem || isInsItem || isAccessoriesItem || isFinanceItem || isPDIItem || isCEOItem || isGCEOItem || isOwnerItem) return false;

              // 11. Today Tasks for Salesperson ONLY
              if (item.id === 'today_tasks') {
                return currentRole === 'salesperson';
              }

              // 12. Salesperson exclusions
              if (currentRole === 'salesperson') {
                return !['team', 'targets', 'reports'].includes(item.id);
              }

              // 13. Default visibility for all other roles (TL, SM, etc.)
              return true;
            })
            .map(item => {
              const isActive = activeView === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    } ${sidebarCollapsed ? 'justify-center' : ''}`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-orange-400' : ''}`} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Settings</span>}
          </button>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!sidebarCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
