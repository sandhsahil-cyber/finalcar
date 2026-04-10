import React, { createContext, useContext, useState, useCallback } from 'react';
import { Deal, DealStage, UserRole, deals as initialDeals, DEAL_STAGES } from '@/data/dummyData';

interface DashboardContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUserId: string;
  setCurrentUserId: (id: string) => void;
  deals: Deal[];
  updateDealStage: (dealId: string, newStage: DealStage) => void;
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
  stageFilter: DealStage | 'All';
  setStageFilter: (stage: DealStage | 'All') => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('salesmanager');
  const [currentUserId, setCurrentUserId] = useState<string>('sm-1');
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showDealModal, setShowDealModal] = useState(false);
  const [showNewDealForm, setShowNewDealForm] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<DealStage | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState('all');

  const updateDealStage = useCallback((dealId: string, newStage: DealStage) => {
    setDeals(prev => prev.map(deal => {
      if (deal.id === dealId) {
        const newStageProgress = { ...deal.stageProgress };
        const currentIndex = DEAL_STAGES.indexOf(deal.stage);
        const newIndex = DEAL_STAGES.indexOf(newStage);
        
        // Mark all previous stages as completed
        DEAL_STAGES.forEach((stage, i) => {
          if (i < newIndex) {
            newStageProgress[stage] = { completed: true, date: new Date().toISOString().split('T')[0], notes: `${stage} completed` };
          } else if (i === newIndex) {
            newStageProgress[stage] = { completed: false, notes: `Currently in ${stage} stage` };
          }
        });

        return {
          ...deal,
          stage: newStage,
          stageProgress: newStageProgress,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return deal;
    }));
  }, []);

  return (
    <DashboardContext.Provider value={{
      currentRole, setCurrentRole,
      currentUserId, setCurrentUserId,
      deals, updateDealStage,
      selectedDeal, setSelectedDeal,
      showDealModal, setShowDealModal,
      showNewDealForm, setShowNewDealForm,
      sidebarCollapsed, setSidebarCollapsed,
      activeView, setActiveView,
      searchQuery, setSearchQuery,
      stageFilter, setStageFilter,
      statusFilter, setStatusFilter,
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
