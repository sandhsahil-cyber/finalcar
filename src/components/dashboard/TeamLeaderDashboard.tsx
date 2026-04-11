import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { teams, salespeople, formatCurrency, DEAL_STAGES, Deal } from '@/data/dummyData';
import MetricsCard from './MetricsCard';
import DealCard from './DealCard';
import TeamMemberCard from './TeamMemberCard';
import { PipelineSummary } from './PipelineTracker';
import ActivityTimeline from './ActivityTimeline';
import { Users, IndianRupee, Target, TrendingUp, Car, Plus, Award, ArrowUpRight, ShieldCheck, Layers, Zap, BarChart3, Filter, ClipboardList, Package, Clock, Shield, ArrowRight, ChevronRight, Check, QrCode, X } from 'lucide-react';
import FollowUpModal from './FollowUpModal';
import NewDealForm from './NewDealForm';

const TeamLeaderDashboard: React.FC = () => {
  const { searchQuery, stageFilter, setStageFilter, setShowNewDealForm, showNewDealForm, deals, currentUserId, teams, salespeople, activities } = useDashboard();
  const [viewMode, setViewMode] = useState<'deals' | 'team'>('deals');
  const [selectedMonth, setSelectedMonth] = useState('2026-04');
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedFollowUpDeal, setSelectedFollowUpDeal] = useState<Deal | null>(null);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);

  // Find if current user is a team leader
  const teamManaged = teams.find(t => t.leaderId === currentUserId) || teams[0]; // Fallback to team-1 for demo
  const team = teamManaged;
  const teamMembers = salespeople.filter(sp => sp.teamId === team.id);
  const teamDeals = deals.filter(d => d.teamId === team.id && d.createdAt.startsWith(selectedMonth));

  // Sort members by achieved revenue for leaderboard
  const sortedMembers = [...teamMembers].sort((a, b) => b.achieved - a.achieved);

  const filteredDeals = teamDeals.filter(deal => {
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

  const pendingApprovals = teamDeals.filter(d => d.status === 'pending' || d.status === 'blocked');
  const teamActivities = activities.filter(a =>
    teamMembers.some(m => m.name === a.user) || a.user === 'Rajesh Kumar'
  ).slice(0, 8);

  // Advanced Metrics Aggregation
  const totalLeads = teamDeals.length;
  const totalBookings = teamDeals.filter(d => d.stage && d.stage !== 'General').length;
  const totalDeliveries = teamDeals.filter(d => d.status === 'completed').length;

  const financeInHouse = teamDeals.filter(d => d.financeType === 'In-house').length;
  const financeApproved = teamDeals.filter(d => d.financeStatus === 'Approved' || d.financeStatus === 'Disbursed').length;

  const accessoriesTotal = teamDeals.reduce((sum, d) => sum + (d.accessoriesAmount || 0), 0);
  const exchangeCount = teamDeals.filter(d => d.isExchange === true).length;
  const insuranceInHouseCount = teamDeals.filter(d => d.insuranceType === 'In-house').length;
  const insuranceSelfCount = teamDeals.filter(d => d.insuranceType === 'Self').length;

  const rtoDoneCount = teamDeals.filter(d =>
    d.rtoNumberPlateIssued === true || d.stage === 'PDI' || d.stage === 'Accessories'
  ).length;

  const ewCount = teamDeals.filter(d => d.extendedWarranty === true).length;
  const conversionRate = Math.round((totalDeliveries / (totalLeads || 1)) * 100);

  const finance3rdParty = teamDeals.filter(d => d.financeType === '3rd Party').length;
  const financeApprovalRate = teamDeals.length > 0 ? Math.round((financeApproved / (teamDeals.filter(d => d.financeType).length || 1)) * 100) : 0;

  const accessoriesGoal = 1000000; // 10L Team Goal
  const accessoriesProgress = Math.min(100, Math.round((accessoriesTotal / accessoriesGoal) * 100));

  const incentiveDeals = teamDeals.filter(d =>
    d.incentiveStatus === 'Counted' ||
    d.rtoNumberPlateIssued === true ||
    d.stage === 'PDI' ||
    d.stage === 'Accessories'
  );
  const totalEarnedIncentive = incentiveDeals.reduce((sum, d) => sum + (d.incentiveAmount || 0), 0);
  const totalIncentiveUnits = incentiveDeals.length;

  const CAR_TARGET = team.monthlyTarget / 80000; // Derived target
  const progressPercent = Math.round((totalDeliveries / (CAR_TARGET || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Team Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-purple-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/5 rounded-full -mb-32 blur-2xl" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-3xl font-black backdrop-blur-md border border-white/30 shadow-inner">
                RK
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight leading-none mb-2">Welcome back, {team.leaderName}!</h2>
                <div className="flex items-center gap-4">
                  <p className="text-purple-100 text-base font-bold flex items-center gap-2">
                    {team.name} <span className="w-1.5 h-1.5 bg-purple-300 rounded-full" /> Team Leader
                  </p>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <option value="2026-03" className="text-gray-900">March 2026</option>
                    <option value="2026-04" className="text-gray-900">April 2026</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-8 sm:gap-12">
              <div className="space-y-1">
                <p className="text-[10px] text-purple-200 font-black uppercase tracking-widest">Team Target</p>
                <p className="text-2xl font-black flex items-baseline gap-1">
                  {Math.round(CAR_TARGET)} <span className="text-xs font-bold text-purple-200 ml-1">Units</span>
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-purple-200 font-black uppercase tracking-widest">Cars Sold</p>
                <p className="text-2xl font-black flex items-baseline gap-1">
                  {totalDeliveries} <span className="text-xs font-bold text-purple-200 ml-1">Units</span>
                </p>
              </div>
              <div className="flex-1 min-w-[200px] space-y-2">
                <p className="text-[10px] text-purple-200 font-black uppercase tracking-widest">Month Progress</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden border border-white/10 p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-purple-300 to-white rounded-full transition-all duration-1000"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-sm font-black text-white">{progressPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-80 shrink-0">
            <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-6 border border-white/20 shadow-2xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award className="w-20 h-20 text-white" />
              </div>
              <p className="text-[10px] text-purple-100 font-black uppercase tracking-widest mb-4">Total Team Incentive ({totalIncentiveUnits} Units)</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xl font-bold text-purple-200">₹</span>
                <span className="text-5xl font-black tracking-tighter">{formatCurrency(totalEarnedIncentive).replace('₹', '')}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-purple-100 bg-white/10 w-fit px-3 py-1.5 rounded-full border border-white/10">
                <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                <span>Unlocked by Sales Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Car Sales Funnel */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Car Sales Funnel</p>
          <div className="flex items-center justify-between relative">
            <div className="text-center relative z-10">
              <p className="text-2xl font-black text-gray-900">{totalLeads}</p>
              <p className="text-[9px] font-bold text-gray-400 uppercase">All Leads</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-200" />
            <div className="text-center relative z-10">
              <p className="text-2xl font-black text-blue-600">{totalBookings}</p>
              <p className="text-[9px] font-bold text-gray-400 uppercase">Bookings</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-200" />
            <div className="text-center relative z-10">
              <p className="text-2xl font-black text-emerald-500">{totalDeliveries}</p>
              <p className="text-[9px] font-bold text-gray-400 uppercase">Deliveries</p>
            </div>
          </div>
        </div>

        {/* Finance Processing */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Finance Processing</p>
            <div className="bg-blue-50 p-2 rounded-xl">
              <Shield className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-2xl font-black text-gray-900">{String(financeInHouse).padStart(2, '0')}</span>
                <span className="text-xl font-bold text-gray-300">|</span>
                <span className="text-xl font-bold text-gray-400">{String(finance3rdParty).padStart(2, '0')}</span>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-tight text-gray-400">
                <span>In-house</span>
                <span>3rd Party</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-blue-600">{financeApprovalRate}%</p>
              <p className="text-[9px] font-black text-gray-400 uppercase">Approved</p>
            </div>
          </div>
        </div>

        {/* Accessories Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Accessories Revenue</p>
            <div className="bg-orange-50 p-2 rounded-xl">
              <Package className="w-4 h-4 text-orange-500" />
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-2xl font-black text-gray-900">{formatCurrency(accessoriesTotal)}</h4>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Goal: {formatCurrency(accessoriesGoal)}</p>
          </div>
          <div className="h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all"
              style={{ width: `${accessoriesProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Detailed Counting Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="All Leads"
          value={String(totalLeads)}
          subtitle="Team total"
          icon={<Users className="w-5 h-5" />}
          color="#6366f1"
        />
        <MetricsCard
          title="Bookings"
          value={String(totalBookings)}
          subtitle="Active pipeline"
          trend={12}
          icon={<ClipboardList className="w-5 h-5" />}
          color="#8b5cf6"
        />
        <MetricsCard
          title="Deliveries"
          value={String(totalDeliveries)}
          subtitle="Retail units"
          trend={8}
          icon={<Package className="w-5 h-5" />}
          color="#10b981"
        />
        <MetricsCard
          title="Exchange"
          value={String(exchangeCount)}
          subtitle="Old car intake"
          trend={5}
          icon={<TrendingUp className="w-5 h-5" />}
          color="#f59e0b"
        />
        <MetricsCard
          title="Insurance"
          value={`In-house: ${insuranceInHouseCount}`}
          subtitle={`Self: ${insuranceSelfCount}`}
          trend={5}
          icon={<ShieldCheck className="w-5 h-5" />}
          color="#ec4899"
        />
        <MetricsCard
          title="RTO / EW"
          value={`${rtoDoneCount} / ${ewCount}`}
          subtitle="RTO Done / Ext. Warranty"
          icon={<Layers className="w-5 h-5" />}
          color="#ff6b35"
        />
        <MetricsCard
          title="Conversion"
          value={`${conversionRate}%`}
          subtitle="Leads to Retail"
          trend={2}
          icon={<Zap className="w-5 h-5" />}
          color="#3b82f6"
        />
        <MetricsCard
          title="Month Progress"
          value={`${progressPercent}%`}
          subtitle="Target Achievement"
          icon={<BarChart3 className="w-5 h-5" />}
          color="#000000"
        />
      </div>

      {/* Pending Approvals */}
      {pendingApprovals.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-amber-800 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Pending Approvals & Blocked Deals
          </h3>
          <div className="space-y-2">
            {pendingApprovals.map(deal => (
              <DealCard key={deal.id} deal={deal} compact />
            ))}
          </div>
        </div>
      )}

      {/* View Toggle */}
      <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1 w-fit">
        <button
          onClick={() => setViewMode('deals')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${viewMode === 'deals' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          <Car className="w-4 h-4 inline mr-1.5" />
          Deals
        </button>
        <button
          onClick={() => setViewMode('team')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${viewMode === 'team' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          <Users className="w-4 h-4 inline mr-1.5" />
          Team Performance
        </button>
      </div>

      {viewMode === 'deals' ? (
        <>
          {/* Pipeline */}
          <PipelineSummary deals={teamDeals} onStageClick={(stage) => setStageFilter(stage)} />

          {/* Deals */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              My Leads <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">{filteredDeals.length}</span>
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setStageFilter('All')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${stageFilter === 'All' ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-500'
                    }`}
                >
                  All Leads
                </button>
                <button
                  onClick={() => setStageFilter('Booking')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${stageFilter === 'Booking' ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-500'
                    }`}
                >
                  Booking Leads
                </button>
                <div className="w-px h-4 bg-gray-200 mx-1" />
                {DEAL_STAGES.filter(s => s !== 'General').map(stage => (
                  <button
                    key={stage}
                    onClick={() => setStageFilter(stage)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${stageFilter === stage ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowQRModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-all border border-indigo-100"
                >
                  <QrCode className="w-4 h-4" />
                  <span className="hidden sm:inline">Walking Lead</span>
                </button>
                <button
                  onClick={() => setShowNewDealForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lead</span>
                </button>
              </div>
            </div>
          </div>

          {stageFilter === 'All' ? (
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left min-w-[1000px]">
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      <th className="px-6 py-5">Customer</th>
                      <th className="px-6 py-5">Vehicle Detail</th>
                      <th className="px-6 py-5">Stage</th>
                      <th className="px-6 py-5">Status</th>
                      <th className="px-6 py-5">Next Task</th>
                      <th className="px-6 py-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredDeals.map(deal => (
                      <tr key={deal.id} className="group hover:bg-blue-50/30 transition-all">
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-gray-900">{deal.customerName}</p>
                          <p className="text-[11px] text-gray-400 font-medium">{deal.customerPhone || deal.id}</p>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-blue-600">TATA {deal.carModel.replace('Hyundai ', '')}</p>
                          <p className="text-[11px] text-gray-500 font-medium">{deal.carVariant} • {deal.color}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter bg-gray-100 text-gray-600">
                            {deal.stage}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${deal.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                            <span className="text-[11px] font-bold text-gray-700 capitalize">{deal.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="max-w-[200px]">
                            <p className="text-[11px] text-gray-600 italic font-medium leading-relaxed">
                              "{deal.nextFollowUpTask || 'Follow up required'}"
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1 font-bold">{deal.nextFollowUpDate || 'TBD'}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedFollowUpDeal(deal);
                                setShowFollowUpModal(true);
                              }}
                              className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredDeals.length === 0 && (
                <div className="text-center py-24 bg-white">
                  <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <Filter className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900">No leads found</h3>
                  <p className="text-sm text-gray-400 max-w-[200px] mx-auto">Try switching the month or adjusting your filters</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDeals.map(deal => (
                <DealCard key={deal.id} deal={deal} />
              ))}
              {filteredDeals.length === 0 && (
                <div className="col-span-full text-center py-24 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Filter className="w-10 h-10 text-gray-200" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900">No active bookings found</h3>
                  <p className="text-sm text-gray-400">There are no deals currently in this stage</p>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Team Leaderboard */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Team Leaderboard</h3>
            <p className="text-sm text-gray-500 mb-4">Performance ranking for April 2026</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {sortedMembers.map((member, i) => (
                <TeamMemberCard key={member.id} member={member} rank={i + 1} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Activity */}
      <ActivityTimeline activities={teamActivities.length > 0 ? teamActivities : activities.slice(0, 6)} />
      {/* Modals */}
      {showQRModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <div className="p-8 text-center pt-12">
              <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Registration QR</h2>
              <p className="text-gray-500 text-sm mb-8 px-4">
                Let the customer scan this to fill in their own basic details
              </p>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 mb-8 aspect-square flex items-center justify-center">
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

      {showNewDealForm && <NewDealForm onClose={() => setShowNewDealForm(false)} />}

      {showFollowUpModal && selectedFollowUpDeal && (
        <FollowUpModal
          deal={selectedFollowUpDeal}
          onClose={() => {
            setShowFollowUpModal(false);
            setSelectedFollowUpDeal(null);
          }}
        />
      )}
    </div>
  );
};

export default TeamLeaderDashboard;
