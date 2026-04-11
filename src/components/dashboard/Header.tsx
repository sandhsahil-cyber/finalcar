import React, { useState, useEffect } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, notifications as allNotifications } from '@/data/dummyData';
import {
  Search, Bell, Menu, ChevronDown, UserCircle, Shield, Briefcase,
  X, Check, AlertTriangle, Info, CheckCircle2, AlertCircle, LogIn, Wallet,
  ClipboardList,
  ShieldCheck,
  Package,
  Landmark,
  Truck,
  TrendingUp
} from 'lucide-react';

const roles: { value: UserRole; label: string; sublabel: string; icon: React.ElementType; color: string }[] = [
  { value: 'salesmanager', label: 'Sales Manager', sublabel: 'Vikash Oberoi', icon: Briefcase, color: '#ff6b35' },
  { value: 'teamleader', label: 'Team Leader', sublabel: 'Rajesh Kumar (Alpha Squad)', icon: Shield, color: '#8b5cf6' },
  { value: 'salesperson', label: 'Sales Executive', sublabel: 'Vikram Singh', icon: UserCircle, color: '#3b82f6' },
  { value: 'accounts', label: 'Accounts & Finance', sublabel: 'Mehta Ji (Fin-Head)', icon: Wallet, color: '#10b981' },
  { value: 'rto', label: 'RTO Department', sublabel: 'Sharma Ji (Reg. Specialist)', icon: ClipboardList, color: '#6366f1' },
  { value: 'insurance', label: 'Insurance Dept.', sublabel: 'Verma Ji (Policy Expert)', icon: ShieldCheck, color: '#0ea5e9' },
  { value: 'accessories', label: 'Accessories Dept.', sublabel: 'Suresh Pal (Fit-Lead)', icon: Package, color: '#f43f5e' },
  { value: 'finance', label: 'Finance Dept.', sublabel: 'HDFC & SBI Partners', icon: Landmark, color: '#8b5cf6' },
  { value: 'pdi', label: 'PDI Workshop', sublabel: 'Quality Assurance', icon: Truck, color: '#10b981' },
  { value: 'ceo', label: 'CEO & Owner', sublabel: 'Group Executive', icon: TrendingUp, color: '#1a202c' }
];

const Header: React.FC = () => {
  const { currentRole, setCurrentRole, setCurrentUserId, searchQuery, setSearchQuery, sidebarCollapsed, setSidebarCollapsed, salespeople, teams } = useDashboard();
  const { isAuthenticated, profile, setShowLoginModal, isLoading } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifs, setNotifs] = useState(allNotifications);

  // Sync role from auth profile
  useEffect(() => {
    if (isAuthenticated && profile?.role) {
      setCurrentRole(profile.role);
    }
  }, [isAuthenticated, profile, setCurrentRole]);

  const currentRoleConfig = roles.find(r => r.value === currentRole)!;
  const RoleIcon = currentRoleConfig.icon;
  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const notifIcons = {
    info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
    warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
    success: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    error: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  };

  const displayName = isAuthenticated && profile ? profile.full_name : currentRoleConfig.sublabel;
  const displayRole = isAuthenticated && profile ? roles.find(r => r.value === profile.role)?.label || currentRoleConfig.label : currentRoleConfig.label;

  const handleRoleChange = (roleValue: UserRole) => {
    setCurrentRole(roleValue);
    
    // Auto-switch UserID dynamically based on seeded data
    if (roleValue === 'salesperson') {
      const firstSP = salespeople.find(sp => sp.id.includes('rajkot')) || salespeople[0];
      if (firstSP) setCurrentUserId(firstSP.id);
    } 
    else if (roleValue === 'teamleader') {
      const firstTeam = teams.find(t => t.id.includes('rajkot')) || teams[0];
      if (firstTeam) setCurrentUserId(firstTeam.leaderId);
    }
    else {
      setCurrentUserId('sm-1');
    }
    
    setShowRoleMenu(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        <div className="flex items-center gap-3 flex-1">
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors lg:hidden">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative hidden sm:block max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search deals, customers, cars..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Auth status indicator */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-semibold text-emerald-700">Live</span>
            </div>
          )}

          {/* Login Button (when not authenticated) */}
          {!isAuthenticated && !isLoading && (
            <button onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => { setShowNotifications(!showNotifications); setShowRoleMenu(false); }}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                  <button onClick={markAllRead} className="text-xs text-orange-500 font-medium hover:text-orange-600">Mark all read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifs.map(n => {
                    const config = notifIcons[n.type];
                    const NIcon = config.icon;
                    return (
                      <div key={n.id} className={`flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-orange-50/30' : ''}`}>
                        <div className={`p-1.5 rounded-lg ${config.bg} flex-shrink-0`}><NIcon className={`w-3.5 h-3.5 ${config.color}`} /></div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!n.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{n.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                        </div>
                        {!n.read && <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher / User Profile */}
          <div className="relative">
            <button onClick={() => { setShowRoleMenu(!showRoleMenu); setShowNotifications(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors">
              {isAuthenticated && profile ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                  {profile.avatar_initials}
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${currentRoleConfig.color}15` }}>
                  <RoleIcon className="w-4 h-4" style={{ color: currentRoleConfig.color }} />
                </div>
              )}
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-gray-900">{displayName}</p>
                <p className="text-[10px] text-gray-500">{displayRole}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-gray-200">
                {isAuthenticated && profile && (
                  <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-bold text-gray-900">{profile.full_name}</p>
                    <p className="text-xs text-gray-500">{profile.email}</p>
                    <p className="text-[10px] mt-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-semibold w-fit capitalize">{profile.role === 'salesmanager' ? 'Sales Manager' : profile.role === 'teamleader' ? 'Team Leader' : 'Sales Executive'}</p>
                  </div>
                )}
                <div className="p-3 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Demio Multi-Role Switcher
                  </p>
                </div>
                {roles.map(role => {
                  const Icon = role.icon;
                  const isActive = currentRole === role.value;
                  return (
                    <button key={role.value} onClick={() => handleRoleChange(role.value)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${isActive ? 'bg-gray-50' : ''}`}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: `${role.color}15` }}>
                        <Icon className="w-4 h-4" style={{ color: role.color }} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-semibold text-gray-900">{role.label}</p>
                        <p className="text-xs text-gray-500">{role.sublabel}</p>
                      </div>
                      {isActive && <Check className="w-4 h-4 text-emerald-500" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-3 sm:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
