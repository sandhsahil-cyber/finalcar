import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import SalesPersonDashboard from './dashboard/SalesPersonDashboard';
import TeamLeaderDashboard from './dashboard/TeamLeaderDashboard';
import SalesManagerDashboard from './dashboard/SalesManagerDashboard';
import AccountsDashboard from './dashboard/AccountsDashboard';
import RTODashboard from './dashboard/RTODashboard';
import InsuranceDashboard from './dashboard/InsuranceDepartmentDashboard';
import AccessoriesDashboard from './dashboard/AccessoriesDepartmentDashboard';
import FinanceDashboard from './dashboard/FinanceDepartment';
import PDIDashboard from './dashboard/PreDeliveryInspection';
import ExecutiveDashboard from './dashboard/CEO&Owner';
import DealsView from './dashboard/DealsView';
import PipelineView from './dashboard/PipelineView';
import TeamView from './dashboard/TeamView';
import TargetsView from './dashboard/TargetsView';
import ReportsView from './dashboard/ReportsView';
import DealDetailModal from './dashboard/DealDetailModal';
import NewDealForm from './dashboard/NewDealForm';

const AppLayout: React.FC = () => {
  const { currentRole, activeView, sidebarCollapsed } = useDashboard();

  const renderDashboard = () => {
    switch (currentRole) {
      case 'salesperson':
        return <SalesPersonDashboard />;
      case 'teamleader':
        return <TeamLeaderDashboard />;
      case 'salesmanager':
        return <SalesManagerDashboard />;
      case 'accounts':
        return <AccountsDashboard />;
      case 'rto':
        return <RTODashboard />;
      case 'insurance':
        return <InsuranceDashboard />;
      case 'accessories':
        return <AccessoriesDashboard />;
      case 'finance':
        return <FinanceDashboard />;
      case 'pdi':
        return <PDIDashboard />;
      case 'ceo':
        return <ExecutiveDashboard />;
      default:
        return <SalesManagerDashboard />;
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return renderDashboard();
      case 'deals':
        return <DealsView />;
      case 'pipeline':
        return <PipelineView />;
      case 'team':
        return <TeamView />;
      case 'targets':
        return <TargetsView />;
      case 'reports':
        return <ReportsView />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <Header />
        <main className="p-4 md:p-6 max-w-[1600px] mx-auto">
          {renderView()}
        </main>
      </div>

      {/* Modals */}
      <DealDetailModal />
      <NewDealForm />
    </div>
  );
};

export default AppLayout;
