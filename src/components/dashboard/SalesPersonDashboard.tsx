import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { formatCurrency, DEAL_STAGES, STAGE_COLORS, DealStage, Deal, activities } from '@/data/dummyData';
import MetricsCard from './MetricsCard';
import DealCard from './DealCard';
import { PipelineSummary } from './PipelineTracker';
import ActivityTimeline from './ActivityTimeline';
import NewDealForm from './NewDealForm';
import FollowUpModal from './FollowUpModal';
import { Car, Target, TrendingUp, Plus, Filter, Clock, Users, ClipboardList, Shield, Package, ArrowRight, QrCode, X, ShieldCheck, FileCheck, Award, CheckCircle } from 'lucide-react';

const SalesPersonDashboard: React.FC = () => {
  const { searchQuery, stageFilter, setStageFilter, setShowNewDealForm, deals, currentUserId, salespeople, teams } = useDashboard();
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('2026-04');
  const [selectedFollowUpDeal, setSelectedFollowUpDeal] = useState<Deal | null>(null);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);

  // Find if current user is an executive or team leader
  const executive = salespeople.find(sp => sp.id === currentUserId);
  const teamManaged = teams.find(t => t.leaderId === currentUserId);

  let myDeals = [];
  let userDisplayName = "";
  let userRoleLabel = "";
  let userAvatar = "";
  let currentStats = { dealsCount: 0, conversionRate: 0 };

  if (teamManaged) {
    // Current user is a Team Leader
    myDeals = deals.filter(d => d.teamId === teamManaged.id && d.createdAt.startsWith(selectedMonth));
    userDisplayName = teamManaged.leaderName;
    userRoleLabel = `${teamManaged.name} • Team Leader`;
    userAvatar = teamManaged.leaderAvatar;
    currentStats = {
      dealsCount: myDeals.filter(d => d.status === 'completed').length,
      conversionRate: Math.round((myDeals.filter(d => d.status === 'completed').length / (myDeals.length || 1)) * 100)
    };
  } else if (executive) {
    // Current user is a Sales Executive
    myDeals = deals.filter(d => d.salespersonId === executive.id && d.createdAt.startsWith(selectedMonth));
    userDisplayName = executive.name;
    const team = teams.find(t => t.id === executive.teamId);
    userRoleLabel = team ? `${team.name} • Sales Executive` : "Sales Executive";
    userAvatar = executive.avatar;
    currentStats = { dealsCount: executive.dealsCount, conversionRate: executive.conversionRate };
  } else {
    // Fallback for demo
    const fallbackSP = salespeople[0] || { name: 'Vikram Singh', id: 'sp-1', avatar: 'VS', dealsCount: 8, conversionRate: 75 };
    myDeals = deals.filter(d => d.salespersonId === fallbackSP.id && d.createdAt.startsWith(selectedMonth));
    userDisplayName = fallbackSP.name;
    userRoleLabel = "Sales Executive";
    userAvatar = fallbackSP.avatar;
    currentStats = { dealsCount: fallbackSP.dealsCount, conversionRate: fallbackSP.conversionRate };
  }

  const CAR_TARGET = teamManaged ? teamManaged.monthlyTarget / 80000 : 15; // Estimate units based on 8L avg
  const progressPercent = Math.round((currentStats.dealsCount / CAR_TARGET) * 100);

  // Derived metrics with robust filtering
  const totalLeads = myDeals.length;
  const totalBookings = myDeals.filter(d => d.stage && d.stage !== 'General').length;
  const totalDeliveries = myDeals.filter(d => d.status === 'completed').length;

  const financeInHouse = myDeals.filter(d => d.financeType === 'In-house').length;
  const finance3rdParty = myDeals.filter(d => d.financeType === '3rd Party').length;
  const financeApproved = myDeals.filter(d => d.financeStatus === 'Approved' || d.financeStatus === 'Disbursed').length;
  const financeApprovalRate = myDeals.length > 0 ? Math.round((financeApproved / (myDeals.filter(d => d.financeType).length || 1)) * 100) : 0;

  const accessoriesTotal = myDeals.reduce((sum, d) => sum + (d.accessoriesAmount || 0), 0);
  const accessoriesTarget = 500000;
  const accessoriesProgress = Math.min(100, Math.round((accessoriesTotal / accessoriesTarget) * 100));

  const exchangeCount = myDeals.filter(d => d.isExchange === true).length;
  const insuranceInHouseCount = myDeals.filter(d => d.insuranceType === 'In-house').length;
  const insuranceSelfCount = myDeals.filter(d => d.insuranceType === 'Self').length;

  // Logic Fix: Any deal in PDI or Accessories MUST be counted as RTO Done
  const rtoDoneCount = myDeals.filter(d =>
    d.rtoNumberPlateIssued === true || d.stage === 'PDI' || d.stage === 'Accessories'
  ).length;

  const ewCount = myDeals.filter(d => d.extendedWarranty === true).length;

  // Incentive calculation: Include deals explicitly counted OR those in RTO done stages
  const incentiveDeals = myDeals.filter(d =>
    d.incentiveStatus === 'Counted' ||
    d.rtoNumberPlateIssued === true ||
    d.stage === 'PDI' ||
    d.stage === 'Accessories'
  );

  const totalEarnedIncentive = incentiveDeals.reduce((sum, d) => sum + (d.incentiveAmount || 0), 0);
  const totalIncentiveUnits = incentiveDeals.length;

  const totalPendingIncentive = myDeals
    .filter(d => !incentiveDeals.find(id => id.id === d.id))
    .reduce((sum, d) => sum + (d.incentiveAmount || 0), 0);

  const filteredDeals = myDeals.filter(deal => {
    const matchesSearch = !searchQuery ||
      deal.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.id.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStage = false;
    if (stageFilter === 'All') {
      matchesStage = deal.stage === 'General'; // Show ONLY general leads
    } else if (stageFilter === 'Booking') {
      matchesStage = deal.stage !== 'General'; // Show ONLY booking leads
    } else {
      matchesStage = deal.stage === stageFilter;
    }

    return matchesSearch && matchesStage;
  });

  // Activities: For TL, show team activities. For Executive, show personal.
  const teamMemberNames = teamManaged ? salespeople.filter(sp => sp.teamId === teamManaged.id).map(sp => sp.name) : [];
  const myActivities = activities.filter(a => {
    if (teamManaged) return teamMemberNames.includes(a.user);
    return a.user === userDisplayName;
  }).slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-white/5 rounded-full -mb-20" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold backdrop-blur-md border border-white/30 shadow-inner">
                {userAvatar}
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">Welcome back, {userDisplayName}!</h2>
                <p className="text-blue-200 text-sm font-medium">{userRoleLabel}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 items-end">
              <div>
                <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest mb-1">Monthly Goal</p>
                <p className="text-2xl font-black">{CAR_TARGET} <span className="text-sm font-medium opacity-60">Units</span></p>
              </div>
              <div>
                <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest mb-1">Cars Sold So Far</p>
                <p className="text-2xl font-black">{currentStats.dealsCount} <span className="text-sm font-medium opacity-60">Units</span></p>
              </div>
              {teamManaged && (
                <div>
                  <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest mb-1">Team Size</p>
                  <p className="text-2xl font-black">{teamManaged.memberCount} <span className="text-sm font-medium opacity-60">Executives</span></p>
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest">My Progress</p>
                  <p className="text-[10px] text-blue-100 font-bold uppercase tracking-tight">
                    {currentStats.dealsCount} Sold of {CAR_TARGET} Goal
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-1 bg-white/10 px-3 py-2 rounded-xl border border-white/10">
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <span className="text-xs font-black">{progressPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[2rem] border border-white/20 flex flex-col items-center justify-center min-w-[180px] text-center shadow-2xl relative">
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-blue-100/80 text-[10px] font-black uppercase tracking-widest mb-2">Live Earnings ({totalIncentiveUnits} Units)</p>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-emerald-400">₹</span>
              <span className="text-4xl font-black text-white tracking-tighter">
                {formatCurrency(totalEarnedIncentive).replace('₹', '').replace('.00', '')}
              </span>
            </div>
            <p className="text-[9px] text-blue-200/60 mt-2 font-medium">Paid after target achieved</p>
          </div>
        </div>
      </div>

      {/* Operational Metrics Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Block 1: Sales Funnel Summary */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Car Sale Progress</p>
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-2xl font-black text-gray-900">{totalLeads}</p>
              <p className="text-[10px] text-gray-500 font-bold">ALL CUSTOMERS</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-200" />
            <div className="text-center flex-1">
              <p className="text-2xl font-black text-blue-600">{totalBookings}</p>
              <p className="text-[10px] text-gray-500 font-bold">BOOKED</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-200" />
            <div className="text-center flex-1">
              <p className="text-2xl font-black text-emerald-600">{totalDeliveries}</p>
              <p className="text-[10px] text-gray-500 font-bold">DELIVERED</p>
            </div>
          </div>
        </div>

        {/* Block 2: Finance Status */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Car Loans</p>
            <div className="flex items-center gap-4 mt-2">
              <div>
                <p className="text-xl font-black text-indigo-700">{String(financeInHouse).padStart(2, '0')}</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase">From Shop</p>
              </div>
              <div className="h-8 w-px bg-gray-100" />
              <div>
                <p className="text-xl font-black text-gray-400">{String(finance3rdParty).padStart(2, '0')}</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase">Outside Bank</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs font-black text-gray-900">{financeApprovalRate}%</p>
                <p className="text-[8px] text-gray-400 uppercase font-bold">Approved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Block 3: Accessories Performance */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6 text-orange-500" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Car Fittings Sold</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xl font-black text-orange-600">{myDeals.filter(d => (d.accessoriesAmount || 0) > 0).length} Cars</p>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Goal: 12 Units</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: `${Math.min(100, (myDeals.filter(d => (d.accessoriesAmount || 0) > 0).length / 12) * 100)}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Individual Lead Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="All Customers"
          value={String(myDeals.length)}
          subtitle="Total enquiries"
          trend={15}
          icon={<Users className="w-5 h-5" />}
          color="#6366f1"
        />
        <MetricsCard
          title="Booked Customers"
          value={String(myDeals.filter(d => d.stage !== 'General').length)}
          subtitle="Cars booked"
          trend={12}
          icon={<ClipboardList className="w-5 h-5" />}
          color="#8b5cf6"
        />
        <MetricsCard
          title="Units Delivered"
          value={String(totalDeliveries)}
          subtitle="Finalized sales"
          trend={5}
          icon={<Car className="w-5 h-5" />}
          color="#10b981"
        />
        <MetricsCard
          title="Car Exchange"
          value={String(exchangeCount)}
          subtitle="Deals with exchange"
          trend={10}
          icon={<Car className="w-5 h-5" />}
          color="#3b82f6"
        />
        <MetricsCard
          title="Insurance"
          value={String(insuranceInHouseCount + insuranceSelfCount)}
          subtitle={`In-house: ${insuranceInHouseCount} • Self: ${insuranceSelfCount}`}
          trend={5}
          icon={<ShieldCheck className="w-5 h-5" />}
          color="#6366f1"
        />
        <MetricsCard
          title="RTO Done"
          value={String(rtoDoneCount)}
          subtitle="Plates Issued"
          trend={rtoDoneCount > 5 ? 12 : -2}
          icon={<FileCheck className="w-5 h-5" />}
          color="#10b981"
        />
        <MetricsCard
          title="EW Done"
          value={String(ewCount)}
          subtitle="Ext. Warranty Sold"
          trend={10}
          icon={<Award className="w-5 h-5" />}
          color="#f43f5e"
        />
        <MetricsCard
          title="My Money Track"
          value={`${currentStats.conversionRate}%`}
          subtitle="Lead to sale"
          trend={5}
          icon={<TrendingUp className="w-5 h-5" />}
          color="#f59e0b"
        />
        <MetricsCard
          title="My Progress"
          value={`${progressPercent}%`}
          subtitle={`${CAR_TARGET - currentStats.dealsCount} cars remaining`}
          trend={-3}
          icon={<Target className="w-5 h-5" />}
          color="#ff6b35"
        />
      </div>
      <PipelineSummary deals={myDeals} onStageClick={(stage) => setStageFilter(stage)} />

      {/* Leads Section */}
      <div id="leads-section" className="px-4 lg:px-0">
        {/* HEADER CONTAINER 
    - flex-wrap: allows children to drop to a new line
    - justify-between: keeps title left and controls right
  */}
        <div className="flex flex-wrap items-center justify-between gap-y-6 gap-x-4 mb-8">

          {/* TITLE SECTION (Always Row 1) */}
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">My Customers</h3>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-black rounded-full border border-blue-100 shadow-sm">
              {filteredDeals.length}
            </span>
          </div>

          {/* CONTROLS WRAPPER 
      - w-full: Forces this entire block to Row 2 on mobile
      - lg:w-auto: Pulls it back to Row 1 on large screens
    */}
          {/* Parent Container forced to flex-col to ensure 2 rows */}
          {/* Parent Container forced to flex-col to ensure 2 rows */}
          <div className="flex flex-col gap-4 w-full lg:w-auto items-end">

            {/* ROW 1: FILTER GROUP (Month & Stages) */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              >
                <option value="2026-03">March 2026</option>
                <option value="2026-04">April 2026</option>
              </select>

              {/* Swipeable Stage Filter Container */}
              <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 overflow-x-auto no-scrollbar flex-1 md:flex-none">
                <button
                  onClick={() => setStageFilter('All')}
                  className={`whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${stageFilter === 'All' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  All Leads
                </button>
                <button
                  onClick={() => setStageFilter('Booking')}
                  className={`whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${stageFilter === 'Booking' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Booking Leads
                </button>

                <div className="w-px h-4 bg-gray-200 mx-1 hidden md:block" />

                {DEAL_STAGES.filter(stage => stage !== 'General').map(stage => (
                  <button
                    key={stage}
                    onClick={() => setStageFilter(stage)}
                    className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${stageFilter === stage ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* ROW 2: ACTION BUTTON GROUP */}
            {!teamManaged && (
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={() => setShowQRModal(true)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-600 text-sm font-bold rounded-xl hover:bg-indigo-100 transition-all border border-indigo-100 shadow-sm"
                  >
                    <QrCode className="w-4 h-4" />
                    <span className="whitespace-nowrap">Walk-in Customer</span>
                  </button>
                  <button
                    onClick={() => setShowNewDealForm(true)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="whitespace-nowrap">Add Customer</span>
                  </button>
              </div>
            )}
          </div>
        </div>
        {/* CONTENT GRID / TABLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {stageFilter === 'All' ? (
            <div className="col-span-full bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Vehicle Detail</th>
                      <th className="px-6 py-4">Stage</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Next Task</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredDeals.map(deal => (
                      <tr key={deal.id} className="group hover:bg-blue-50/30 transition-all cursor-pointer">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-gray-900">{deal.customerName}</p>
                          <p className="text-[10px] text-gray-400">{deal.customerPhone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-blue-600">{deal.carModel}</p>
                          <p className="text-[10px] text-gray-500 font-medium">{deal.carVariant} • {deal.color}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter bg-gray-100 text-gray-600">
                            {deal.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${deal.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                            <span className="text-[10px] font-bold text-gray-600 capitalize">{deal.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-[200px]">
                          <p className="text-[11px] text-gray-600 truncate italic">"{deal.nextFollowUpTask || 'No pending task'}"</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">{deal.nextFollowUpDate || '-'}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFollowUpDeal(deal);
                                setShowFollowUpModal(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            filteredDeals.map(deal => (
              <DealCard key={deal.id} deal={deal} />
            ))
          )}

          {/* EMPTY STATE */}
          {filteredDeals.length === 0 && (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No deals found</h3>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Walk-in Customer QR Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group"
            >
              <X className="w-5 h-5 text-gray-500 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="p-8 text-center pt-12">
              <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Registration QR</h2>
              <p className="text-gray-500 text-sm mb-8 px-4">
                Let the customer scan this to fill in their own basic details and interest
              </p>

              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 mb-8 aspect-square flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[2rem] z-10 backdrop-blur-[2px]">
                  <span className="text-xs font-black text-indigo-600 bg-white px-4 py-2 rounded-full shadow-lg">SCAN TO START</span>
                </div>
                <img
                  src="/lead_registration_qr_1775851859990.png"
                  alt="Registration QR Code"
                  className="w-full h-full object-contain rounded-2xl mix-blend-multiply"
                />
              </div>

              <button
                onClick={() => setShowQRModal(false)}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity and Incentives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ActivityTimeline activities={myActivities.length > 0 ? myActivities : activities.slice(0, 5)} />

          {teamManaged && (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" /> Team Performance (10 Members)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                      <th className="text-left pb-4">Executive</th>
                      <th className="text-center pb-4">Leads</th>
                      <th className="text-center pb-4">Bookings</th>
                      <th className="text-center pb-4">Delivered</th>
                      <th className="text-right pb-4">Incentive</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {salespeople.filter(sp => sp.teamId === teamManaged.id).map(sp => {
                      const spDeals = deals.filter(d => d.salespersonId === sp.id);
                      const delivered = spDeals.filter(d => d.status === 'completed').length;
                      const earnedIncentive = spDeals
                        .filter(d => d.incentiveStatus === 'Counted' || d.stage === 'PDI' || d.stage === 'Accessories')
                        .reduce((sum, d) => sum + (d.incentiveAmount || 0), 0);

                      return (
                        <tr key={sp.id} className="group hover:bg-gray-50/50 transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                                {sp.avatar}
                              </div>
                              <p className="text-sm font-bold text-gray-900">{sp.name}</p>
                            </div>
                          </td>
                          <td className="text-center py-4 text-sm font-medium text-gray-600">{spDeals.length}</td>
                          <td className="text-center py-4 text-sm font-medium text-gray-600">{spDeals.filter(d => d.stage !== 'General').length}</td>
                          <td className="text-center py-4">
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${delivered > 5 ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                              {delivered} Units
                            </span>
                          </td>
                          <td className="text-right py-4 text-sm font-black text-gray-900">₹{formatCurrency(earnedIncentive).replace('₹', '')}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm overflow-hidden h-fit">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-500" /> Daily Sales Tasks
              </h3>
              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">TODAY</span>
            </div>

            <div className="space-y-3">
              {myDeals.filter(d => d.nextFollowUpDate).slice(0, 4).map((deal, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-[1.25rem] border border-gray-100/50 hover:bg-orange-50/30 transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{deal.customerName}</p>
                    <span className="text-[9px] font-medium text-gray-400">{deal.nextFollowUpDate}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 line-clamp-2 leading-relaxed italic">"{deal.nextFollowUpTask}"</p>
                  {deal.isExchange && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <Car className="w-2.5 h-2.5 text-blue-500" />
                      <span className="text-[9px] font-bold text-blue-600 uppercase">Exchange: {deal.exchangeCarDetails}</span>
                    </div>
                  )}
                </div>
              ))}
              {myDeals.filter(d => d.nextFollowUpDate).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-xs text-gray-400">No tasks for today</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm overflow-hidden h-fit">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" /> Cash Rewards Earnings
              </h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">MONEY TRACKING</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white shadow-lg border border-white/10">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Incentive Earned</p>
                  <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full">{totalIncentiveUnits} UNITS</span>
                </div>
                <p className="text-2xl font-black">
                  {formatCurrency(totalEarnedIncentive)}
                </p>
                <p className="text-[9px] text-gray-400 mt-1">Confirmed payouts for RTO cleared units</p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Pending Payouts</p>
                <p className="text-xl font-black text-blue-900">
                  {formatCurrency(totalPendingIncentive)}
                </p>
                <p className="text-[9px] text-blue-400 mt-1">Awaiting RTO Plate Issuance</p>
              </div>

              <div className="space-y-3 pt-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Model-wise Deliveries</p>
                {[
                  { name: 'Toyota Fortuner', brand: 'Toyota', color: 'blue' },
                  { name: 'MG Hector', brand: 'MG', color: 'indigo' },
                  { name: 'TATA Safari', brand: 'TATA', color: 'orange' }
                ].map((item, i) => {
                  const count = myDeals.filter(d => d.carModel === item.name && d.status === 'completed').length;
                  return (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-${item.color}-100 flex items-center justify-center`}>
                          <Car className={`w-4 h-4 text-${item.color}-600`} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">{item.name}</p>
                          <p className="text-[9px] text-gray-500">{count} Units Delivered</p>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-emerald-600">Active Pipeline</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 border border-dashed border-gray-200 rounded-2xl">
                <p className="text-[10px] text-gray-500 text-center italic">"Total leads handled in your team: {myDeals.length}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewDealForm />

      {showFollowUpModal && selectedFollowUpDeal && (
        <FollowUpModal
          deal={selectedFollowUpDeal}
          onClose={() => {
            setShowFollowUpModal(false);
            setSelectedFollowUpDeal(null);
          }}
          salespersonName={userDisplayName || 'Sales Executive'}
        />
      )}
    </div>
  );
};

export default SalesPersonDashboard;
