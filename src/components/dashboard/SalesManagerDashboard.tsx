import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { formatCurrency, DEAL_STAGES, STAGE_COLORS, monthlyRevenueData, stageDistribution } from '@/data/dummyData';
import MetricsCard from './MetricsCard';
import DealCard from './DealCard';
import TeamCard from './TeamCard';
import TeamMemberCard from './TeamMemberCard';
import { PipelineSummary } from './PipelineTracker';
import ActivityTimeline from './ActivityTimeline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend, Area, AreaChart } from 'recharts';
import { Building2, IndianRupee, Users, Car, TrendingUp, Target, Award, Plus, BarChart3, ArrowUpRight, Crown, CheckCircle2, ClipboardList, Package, ShieldCheck, Layers, Zap, Filter, X, ArrowRight, ChevronRight, AlertTriangle, Clock } from 'lucide-react';
import DealsView from '@/components/dashboard/DealsView';

const CHART_COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ff6b35'];

const SalesManagerDashboard: React.FC = () => {
  const { searchQuery, stageFilter, setStageFilter, setShowNewDealForm, deals, teams, salespeople, activities } = useDashboard();
  const [activeTab, setActiveTab] = useState<'overview' | 'teams' | 'deals' | 'analytics' | 'incentives'>('overview');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('2026-04');

  // Filter deals by month and team
  const filteredDealsByContext = deals.filter(d => {
    const matchesMonth = d.createdAt.startsWith(selectedMonth);
    const matchesTeam = !selectedTeamId || d.teamId === selectedTeamId;
    return matchesMonth && matchesTeam;
  });

  const selectedTeam = selectedTeamId ? teams.find(t => t.id === selectedTeamId) : null;

  // Aggregate Metrics for Command Center
  const metrics = {
    totalLeads: filteredDealsByContext.length,
    bookings: filteredDealsByContext.filter(d => d.stage !== 'General').length,
    delivered: filteredDealsByContext.filter(d => d.status === 'completed').length,
    blocked: filteredDealsByContext.filter(d => d.status === 'blocked').length,
    financeInhouse: filteredDealsByContext.filter(d => d.financeType === 'In-house').length,
    accessoriesTotal: filteredDealsByContext.reduce((sum, d) => sum + (d.accessoriesAmount || 0), 0),
    accessoriesCount: filteredDealsByContext.filter(d => (d.accessoriesAmount || 0) > 0).length,
    exchangeCount: filteredDealsByContext.filter(d => d.isExchange === true).length,
    totalIncentives: filteredDealsByContext.reduce((sum, d) => sum + (d.incentiveAmount || 0), 0),
  };

  const totalRevenue = teams.reduce((sum, t) => sum + t.achieved, 0);
  const totalTarget = teams.reduce((sum, t) => sum + t.monthlyTarget, 0);
  const overallProgress = totalTarget > 0 ? Math.round((totalRevenue / totalTarget) * 100) : 0;

  const targetUnits = Math.round(totalTarget / 150000);
  const deliveryProgress = targetUnits > 0 ? Math.round((metrics.delivered / targetUnits) * 100) : 0;

  const leadToTargetProgress = metrics.totalLeads > 0 ? Math.round((metrics.delivered / metrics.totalLeads) * 100) : 0;

  const pendingIncentives = filteredDealsByContext.filter(d => d.incentiveStatus === 'Pending').reduce((sum, d) => sum + (d.incentiveAmount || 0), 0);
  const countedIncentives = filteredDealsByContext.filter(d => d.incentiveStatus === 'Counted').reduce((sum, d) => sum + (d.incentiveAmount || 0), 0);

  const totalSalespeople = selectedTeamId
    ? salespeople.filter(sp => sp.teamId === selectedTeamId).length
    : salespeople.length;

  // Top performers across all teams
  const topPerformers = [...salespeople].sort((a, b) => b.achieved - a.achieved).slice(0, 5);

  // Team comparison data for charts
  const teamComparisonData = teams.map(t => ({
    name: t.name.split(' ')[0],
    target: t.monthlyTarget / 100000,
    achieved: t.achieved / 100000,
    progress: Math.round((t.achieved / t.monthlyTarget) * 100),
  }));

  const filteredDeals = filteredDealsByContext.filter(deal => {
    const matchesSearch = !searchQuery ||
      deal.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'All' || deal.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
          <p className="text-xs font-semibold text-gray-900">{label}</p>
          {payload.map((entry: any, i: number) => (
            <p key={i} className="text-xs mt-1" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' && entry.value > 1000 ? `₹${entry.value}L` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-2xl w-fit">
        {[
          { id: 'overview', label: 'Overview', icon: <Building2 className="w-4 h-4" /> },
          { id: 'teams', label: 'Teams', icon: <Users className="w-4 h-4" /> },
          { id: 'deals', label: 'Pipeline', icon: <Car className="w-4 h-4" /> },
          { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'incentives', label: 'Incentives', icon: <Award className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* 1. Hero Banner */}
          <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -ml-32 -mb-32 blur-3xl opacity-50" />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Building2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black tracking-tight leading-none mb-1">
                        Showroom Main View
                      </h2>
                      <p className="text-blue-100/60 text-sm font-bold">
                        Manager Dashboard • {selectedMonth}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-blue-200/50 tracking-widest mb-1">Cars Target</span>
                      <span className="text-2xl font-black">{Math.round(totalTarget / 150000)} Units</span>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-blue-200/50 tracking-widest mb-1">Finance</span>
                      <span className="text-2xl font-black">{metrics.financeInhouse}</span>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-blue-200/50 tracking-widest mb-1">Insurance</span>
                      <span className="text-2xl font-black">{filteredDealsByContext.filter(d => d.insurancePartner).length}</span>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-red-400/50 tracking-widest mb-1">Stuck Deals</span>
                      <span className="text-2xl font-black text-red-400">{metrics.blocked}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 min-w-[240px]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">Delivery Progress</span>
                    <span className="text-xl font-black">{deliveryProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${deliveryProgress}%` }} />
                  </div>
                  <p className="text-[10px] text-blue-100/50 font-bold text-center">
                    {metrics.delivered} of {targetUnits} Cars Delivered
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 4 Key Numbers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Selling Speed"
              value={`${overallProgress}%`}
              subtitle="Goal vs Result"
              trend={overallProgress > 70 ? 12 : -5}
              icon={<TrendingUp className="w-5 h-5" />}
              color="#3b82f6"
            />
            <MetricsCard
              title="Final Sales"
              value={String(metrics.delivered)}
              subtitle="Final Sales"
              trend={8}
              icon={<Package className="w-5 h-5" />}
              color="#10b981"
            />
            <MetricsCard
              title="Ready Customers"
              value={String(metrics.bookings)}
              subtitle="Booking Done"
              trend={15}
              icon={<Zap className="w-5 h-5" />}
              color="#8b5cf6"
            />
            <MetricsCard
              title="Stuck Deals"
              value={String(metrics.blocked)}
              subtitle="Sales at Risk"
              icon={<AlertTriangle className="w-5 h-5" />}
              color="#f43f5e"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 3. Stuck Deals Alert */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <span className="p-2 bg-red-50 text-red-500 rounded-xl">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  Stuck List
                </h3>
                <span className="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-black rounded-full uppercase">
                  Fix These
                </span>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[500px]">
                {filteredDealsByContext.filter(d => d.status === 'blocked').length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {filteredDealsByContext.filter(d => d.status === 'blocked').map(deal => (
                      <div key={deal.id} className="p-6 hover:bg-gray-50 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-sm font-black text-gray-400">
                            {deal.customerName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{deal.customerName}</p>
                            <p className="text-xs text-gray-500">{deal.carModel} • {deal.stage}</p>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-6">
                          <div className="hidden sm:block">
                            <p className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-lg">Reason: Paper Missing</p>
                          </div>
                          <button className="p-2 text-gray-300 group-hover:text-blue-500 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <p className="text-sm font-bold text-gray-900">All clear! No stuck deals.</p>
                    <p className="text-xs text-gray-400 mt-1">Excellent pipeline management.</p>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Recent Activity */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <span className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                    <Clock className="w-5 h-5" />
                  </span>
                  Recent Activity
                </h3>
              </div>
              <div className="flex-1">
                <ActivityTimeline activities={activities.slice(0, 10)} />
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'deals' && (
        <div className="space-y-6">
          <PipelineSummary deals={deals} onStageClick={setStageFilter} />
          <div className="grid grid-cols-1 gap-6">
            <DealsView />
          </div>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}

      {(activeTab === 'analytics' || activeTab === 'incentives') && (
        <div className="p-12 text-center bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
          <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-black text-gray-900 capitalize">{activeTab} View</p>
          <p className="text-sm text-gray-500 mt-2">This detailed module is currently being optimized with real-time analytics.</p>
        </div>
      )}
    </div>
  );
};

export default SalesManagerDashboard;
