import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Deal, DealStage, UserRole, DEAL_STAGES, SalesPerson, Team, Activity, Notification, CAR_MODELS } from '@/data/dummyData';
import { api } from '@/lib/api';

interface DashboardContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUserId: string;
  setCurrentUserId: (id: string) => void;
  deals: Deal[];
  addDeal: (dealData: Partial<Deal>) => Promise<void>;
  updateDealStage: (dealId: string, newStage: DealStage) => void;
  updateDealStatus: (dealId: string, newStatus: string) => void;
  selectedDeal: Deal | null;
  setSelectedDeal: (deal: Deal | null) => void;
  showDealModal: boolean;
  setShowDealModal: (show: boolean) => void;
  showNewDealForm: boolean;
  setShowNewDealForm: (show: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  stageFilter: DealStage | 'All' | 'Booking';
  setStageFilter: (stage: DealStage | 'All' | 'Booking') => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  salespeople: SalesPerson[];
  teams: Team[];
  activities: Activity[];
  notifications: Notification[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('salesmanager');
  const [currentUserId, setCurrentUserId] = useState<string>('sm-1');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [salespeople, setSalespeople] = useState<SalesPerson[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [d, sp, t, act, note] = await Promise.all([
          api.getDeals(),
          api.getSalespeople(),
          api.getTeams(),
          api.getActivities(),
          api.getNotifications()
        ]);
        setDeals(d);
        setSalespeople(sp);
        setTeams(t);
        setActivities(act);
        setNotifications(note);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    fetchData();
  }, []);
  const [showDealModal, setShowDealModal] = useState(false);
  const [showNewDealForm, setShowNewDealForm] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<DealStage | 'All' | 'Booking'>('All');
  const [statusFilter, setStatusFilter] = useState('all');

  const updateDealStatus = useCallback(async (dealId: string, newStatus: string) => {
    try {
      await api.updateDeal(dealId, { status: newStatus as any });
      setDeals(prev => prev.map(d => d.id === dealId ? { ...d, status: newStatus as any } : d));
    } catch (err) {
      console.error("Failed to update deal status", err);
    }
  }, []);

  const addDeal = useCallback(async (dealData: Partial<Deal>) => {
    // Get incentive from car model
    const carModel = CAR_MODELS.find(m => m.model === dealData.carModel);
    const incentiveAmount = carModel?.incentive || 5000;

    // Get staff info
    const sp = salespeople.find(s => s.id === currentUserId);
    
    const newDeal: any = {
      ...dealData,
      id: `D-${Date.now()}`,
      salespersonId: currentUserId,
      teamId: sp?.teamId || 'team-rajkot-1',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      status: 'active',
      stage: 'Account',
      incentiveAmount,
      incentiveStatus: 'Pending',
      rtoNumberPlateIssued: false,
      stageProgress: {
        Account: { completed: true, date: new Date().toISOString().split('T')[0] },
      }
    };

    try {
      const savedDeal = await api.createDeal(newDeal);
      setDeals(prev => [savedDeal, ...prev]);
    } catch (err) {
      console.error("Failed to add deal", err);
    }
  }, [currentUserId, salespeople]);

  const updateDealStage = useCallback(async (dealId: string, newStage: DealStage) => {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    const newStageProgress = { ...deal.stageProgress };
    const newIndex = DEAL_STAGES.indexOf(newStage);
    
    // Mark all previous stages as completed
    DEAL_STAGES.forEach((stage, i) => {
      if (i < newIndex) {
        newStageProgress[stage] = { completed: true, date: new Date().toISOString().split('T')[0], notes: `${stage} completed` };
      } else if (i === newIndex) {
        newStageProgress[stage] = { completed: false, notes: `Currently in ${stage} stage` };
      }
    });

    const updatedData: any = {
      stage: newStage,
      stageProgress: newStageProgress,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    // Auto-trigger RTO and Incentive counts based on pipeline stage
    if (newStage === 'PDI' || newStage === 'Accessories') {
      updatedData.rtoNumberPlateIssued = true;
      updatedData.incentiveStatus = 'Counted';
    }

    try {
      await api.updateDeal(dealId, updatedData);
      setDeals(prev => prev.map(d => d.id === dealId ? { ...d, ...updatedData } : d));
    } catch (err) {
      console.error("Failed to update deal stage", err);
    }
  }, [deals]);

  return (
    <DashboardContext.Provider value={{
      currentRole, setCurrentRole,
      currentUserId, setCurrentUserId,
      deals, addDeal, updateDealStage, updateDealStatus,
      selectedDeal, setSelectedDeal,
      showDealModal, setShowDealModal,
      showNewDealForm, setShowNewDealForm,
      sidebarCollapsed, setSidebarCollapsed,
      activeView, setActiveView,
      searchQuery, setSearchQuery,
      stageFilter, setStageFilter,
      statusFilter, setStatusFilter,
      salespeople, teams, activities, notifications
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within DashboardProvider');
  return context;
};
