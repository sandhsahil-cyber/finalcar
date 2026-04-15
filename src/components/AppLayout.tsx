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
import GroupCEOdashboard from './dashboard/GroupCEOdashboard';
import OwnerCommandCenter from './dashboard/OwnerCommandCenter';
import OwnerProfitability from './dashboard/OwnerProfitability';
import OwnerDeliveryFunnel from './dashboard/OwnerDeliveryFunnel';
import OwnerDiscountApprovals from './dashboard/OwnerDiscountApprovals';
import OwnerCSAT from './dashboard/OwnerCSAT';
import DealsView from './dashboard/DealsView';
import TeamView from './dashboard/TeamView';
import TodayTasksView from './dashboard/TodayTasksView';
import AccSalesLeads from './dashboard/AccSalesLeads';
import AccShowroomExpenses from './dashboard/AccShowroomExpenses';
import AccSalesReports from './dashboard/AccSalesReports';
import AccStockInventory from './dashboard/AccStockInventory';
import RTOWorkspace from './dashboard/RTOWorkspace';
import RTOTaxChallans from './dashboard/RTOTaxChallans';
import RTOHSRPTracker from './dashboard/RTOHSRPTracker';
import RTODocumentVault from './dashboard/RTODocumentVault';
import InsurancePolicyIssuance from './dashboard/InsurancePolicyIssuance';
import InsurancePremiumCalculator from './dashboard/InsurancePremiumCalculator';
import InsuranceRenewals from './dashboard/InsuranceRenewals';
import InsuranceClaimsDesk from './dashboard/InsuranceClaimsDesk';
import AccFitmentQueue from './dashboard/AccFitmentQueue';
import AccInventoryStock from './dashboard/AccInventoryStock';
import AccComboPackages from './dashboard/AccComboPackages';
import AccStockProcurement from './dashboard/AccStockProcurement';
import FinLoanApplications from './dashboard/FinLoanApplications';
import FinBankSchemes from './dashboard/FinBankSchemes';
import FinPayoutTracker from './dashboard/FinPayoutTracker';
import FinNocClosure from './dashboard/FinNocClosure';
import PDIIngestionQueue from './dashboard/PDIIngestionQueue';
import PDIChecklist from './dashboard/PDIChecklist';
import PDIRectificationLog from './dashboard/PDIRectificationLog';
import PDIReadyForDelivery from './dashboard/PDIReadyForDelivery';
import CEOExecutiveSummary from './dashboard/CEOExecutiveSummary';
import CEOInventoryValuation from './dashboard/CEOInventoryValuation';
import CEODepartmentThroughput from './dashboard/CEODepartmentThroughput';
import CEOMarketingROI from './dashboard/CEOMarketingROI';
import CEOAuditLogs from './dashboard/CEOAuditLogs';
import GCEOConsolidated from './dashboard/GCEOConsolidated';
import GCEOBrandAnalytics from './dashboard/GCEOBrandAnalytics';
import GCEOFundFlow from './dashboard/GCEOFundFlow';
import GCEOHRPayroll from './dashboard/GCEOHRPayroll';
import GCEORiskCompliance from './dashboard/GCEORiskCompliance';
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
      case 'groupceo':
        return <GroupCEOdashboard />;
      case 'owner':
        return <OwnerCommandCenter />;
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
      case 'team':
        return <TeamView />;
      case 'today_tasks':
        return <TodayTasksView />;
      case 'acc_sales_leads':
        return <AccSalesLeads />;
      case 'acc_showroom_expenses':
        return <AccShowroomExpenses />;
      case 'acc_sales_reports':
        return <AccSalesReports />;
      case 'acc_stock_inventory':
        return <AccStockInventory />;
      case 'rto_workspace':
        return <RTOWorkspace />;
      case 'rto_tax':
        return <RTOTaxChallans />;
      case 'rto_hsrp':
        return <RTOHSRPTracker />;
      case 'rto_vault':
        return <RTODocumentVault />;
      case 'ins_issuance':
        return <InsurancePolicyIssuance />;
      case 'ins_calculator':
        return <InsurancePremiumCalculator />;
      case 'ins_renewals':
        return <InsuranceRenewals />;
      case 'ins_claims':
        return <InsuranceClaimsDesk />;
      case 'acc_fitment_queue':
        return <AccFitmentQueue />;
      case 'acc_inventory':
        return <AccInventoryStock />;
      case 'acc_combos':
        return <AccComboPackages />;
      case 'acc_procurement':
        return <AccStockProcurement />;
      case 'fin_loans':
        return <FinLoanApplications />;
      case 'fin_schemes':
        return <FinBankSchemes />;
      case 'fin_payouts':
        return <FinPayoutTracker />;
      case 'fin_noc':
        return <FinNocClosure />;
      case 'pdi_queue':
        return <PDIIngestionQueue />;
      case 'pdi_checklist':
        return <PDIChecklist />;
      case 'pdi_rectification':
        return <PDIRectificationLog />;
      case 'pdi_ready_delivery':
        return <PDIReadyForDelivery />;
      case 'ceo_summary':
        return <CEOExecutiveSummary />;
      case 'ceo_inventory':
        return <CEOInventoryValuation />;
      case 'ceo_throughput':
        return <CEODepartmentThroughput />;
      case 'ceo_marketing':
        return <CEOMarketingROI />;
      case 'ceo_audit':
        return <CEOAuditLogs />;
      case 'gceo_consolidated':
        return <GCEOConsolidated />;
      case 'gceo_analytics':
        return <GCEOBrandAnalytics />;
      case 'gceo_funds':
        return <GCEOFundFlow />;
      case 'gceo_hr':
        return <GCEOHRPayroll />;
      case 'gceo_risk':
        return <GCEORiskCompliance />;
      case 'owner_command':
        return <OwnerCommandCenter />;
      case 'owner_profit':
        return <OwnerProfitability />;
      case 'owner_inventory':
        return <CEOInventoryValuation />;
      case 'owner_csat':
        return <OwnerCSAT />;
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
