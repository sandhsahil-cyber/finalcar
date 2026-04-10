import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import {
  LayoutDashboard, Car, Users, BarChart3, FileText, Settings, Bell,
  ChevronLeft, ChevronRight, LogOut, Shield, UserCircle, Briefcase,
  Target, ClipboardList, TrendingUp, Wallet, ShieldCheck, Package,
  Landmark, Truck
} from 'lucide-react';

const roleConfig = {
  salesperson: { label: 'Sales Executive', color: '#3b82f6', icon: UserCircle },
  teamleader: { label: 'Team Leader', color: '#8b5cf6', icon: Shield },
  salesmanager: { label: 'Sales Manager', color: '#ff6b35', icon: Briefcase },
  accounts: { label: 'Accounts & Finance', color: '#10b981', icon: Wallet },
  rto: { label: 'RTO Department', color: '#6366f1', icon: ClipboardList },
  insurance: { label: 'Insurance Dept.', color: '#0ea5e9', icon: ShieldCheck },
  accessories: { label: 'Accessories Dept.', color: '#f43f5e', icon: Package },
  finance: { label: 'Finance Dept.', color: '#8b5cf6', icon: Landmark },
  pdi: { label: 'PDI Workshop', color: '#10b981', icon: Truck },
  ceo: { label: 'CEO & Owner', color: '#1a202c', icon: TrendingUp },
};

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'deals', label: 'Deals', icon: Car },
  { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'targets', label: 'Targets', icon: Target },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
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
        className={`fixed left-0 top-0 h-full bg-[#0f172a] text-white z-50 transition-all duration-300 flex flex-col ${
          sidebarCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'
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

        {/* Role Badge */}
        <div className={`mx-3 mt-4 mb-2 p-3 rounded-xl ${sidebarCollapsed ? 'flex justify-center' : ''}`} style={{ backgroundColor: `${role.color}20` }}>
          <div className="flex items-center gap-2">
            <RoleIcon className="w-5 h-5 flex-shrink-0" style={{ color: role.color }} />
            {!sidebarCollapsed && (
              <span className="text-xs font-semibold" style={{ color: role.color }}>{role.label}</span>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {menuItems.map(item => {
            const isActive = activeView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
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
