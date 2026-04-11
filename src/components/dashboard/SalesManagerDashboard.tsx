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
import { Building2, IndianRupee, Users, Car, TrendingUp, Target, Award, Plus, BarChart3, ArrowUpRight, Crown, CheckCircle2, ClipboardList, Package, ShieldCheck, Layers, Zap, Filter, X, ArrowRight, ChevronRight } from 'lucide-react';

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
  const overallProgress = Math.round((totalRevenue / totalTarget) * 100);
  
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
      {/* Manager Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full -mb-24 blur-2xl" />
        
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight leading-none mb-2">
                    {selectedTeam ? `${selectedTeam.name} Overview` : 'Rajkot TATA Moters Outlet'}
                  </h2>
                  <div className="flex items-center gap-3">
                    <p className="text-orange-100 text-sm font-bold opacity-90">
                      {selectedTeam ? `Team performance under ${selectedTeam.leaderName}` : 'Sales Manager Dashboard Overview'}
                    </p>
                    <div className="w-1.5 h-1.5 bg-orange-200 rounded-full" />
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                      <option value="2026-03" className="text-gray-900">March 2026</option>
                      <option value="2026-04" className="text-gray-900">April 2026</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-8 lg:gap-12">
              <div className="text-center">
                <p className="text-orange-100 text-[10px] font-black uppercase tracking-widest mb-1">Monthly Progress</p>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-3 bg-white/20 rounded-full overflow-hidden border border-white/10 p-0.5">
                    <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${leadToTargetProgress}%` }} />
                  </div>
                  <span className="text-xl font-black">{leadToTargetProgress}%</span>
                </div>
              </div>
              <div className="h-12 w-px bg-white/10 hidden lg:block" />
              <div className="text-center group cursor-pointer" onClick={() => setSelectedTeamId(null)}>
                <p className="text-orange-100 text-[10px] font-black uppercase tracking-widest mb-1">Dealership Status</p>
                <p className="text-2xl font-black flex items-center gap-2 group-hover:scale-105 transition-transform">
                   {selectedTeamId ? <X className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                   {selectedTeamId ? 'Exit Drill-down' : 'Global View'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Density Command Center Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <MetricsCard
          title="Leads"
          value={metrics.totalLeads}
          icon={<Users className="w-4 h-4" />}
          color="#3b82f6"
        />
        <MetricsCard
          title="Bookings"
          value={metrics.bookings}
          icon={<ClipboardList className="w-4 h-4" />}
          color="#8b5cf6"
        />
        <MetricsCard
          title="Delivered"
          value={metrics.delivered}
          icon={<Package className="w-4 h-4" />}
          color="#10b981"
        />
        <MetricsCard
          title="Blocks"
          value={metrics.blocked}
          icon={<X className="w-4 h-4" />}
          color="#f43f5e"
        />
        <MetricsCard
          title="Finance"
          value={metrics.financeInhouse}
          subtitle="In-house"
          icon={<ShieldCheck className="w-4 h-4" />}
          color="#ec4899"
        />
        <MetricsCard
          title="Accessories"
          value={metrics.accessoriesCount}
          subtitle={formatCurrency(metrics.accessoriesTotal)}
          icon={<Layers className="w-4 h-4" />}
          color="#ff6b35"
        />
        <MetricsCard
          title="Exchange"
          value={metrics.exchangeCount}
          icon={<TrendingUp className="w-4 h-4" />}
          color="#f59e0b"
        />
        <MetricsCard
          title="Incentives"
          value={formatCurrency(metrics.totalIncentives)}
          icon={<IndianRupee className="w-4 h-4" />}
          color="#6366f1"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'teams', label: 'Teams', icon: Users },
          { id: 'deals', label: 'All Deals', icon: Car },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'incentives', label: 'Incentives', icon: IndianRupee },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Lead to Target"
              value={`${leadToTargetProgress}%`}
              subtitle={`${metrics.delivered} of ${metrics.totalLeads} Delivered`}
              trend={leadToTargetProgress > 20 ? 12 : -2}
              icon={<Target className="w-5 h-5" />}
              color="#10b981"
            />
            <MetricsCard
              title="All Leads"
              value={String(metrics.totalLeads)}
              subtitle="Total pipeline"
              icon={<Users className="w-5 h-5" />}
              color="#3b82f6"
            />
            <MetricsCard
              title="Booking Vehicle"
              value={String(metrics.bookings)}
              subtitle={`${metrics.blocked} blocked`}
              trend={8}
              icon={<Car className="w-5 h-5" />}
              color="#8b5cf6"
            />
            <MetricsCard
              title="Delivered"
              value={String(metrics.delivered)}
              subtitle="This month"
              trend={15}
              icon={<CheckCircle2 className="w-5 h-5" />}
              color="#ff6b35"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Revenue Trend</h3>
              <p className="text-sm text-gray-500 mb-4">Last 7 months</p>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyRevenueData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ff6b35" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="#ff6b35" strokeWidth={2.5} fill="url(#revenueGrad)" name="Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Team Comparison */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Team Comparison</h3>
              <p className="text-sm text-gray-500 mb-4">Target vs Achieved (in Lakhs)</p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={teamComparisonData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Target" />
                  <Bar dataKey="achieved" fill="#ff6b35" radius={[4, 4, 0, 0]} name="Achieved" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pipeline + Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PipelineSummary deals={filteredDealsByContext} onStageClick={(stage) => { setStageFilter(stage); setActiveTab('deals'); }} />
            </div>
            
            {/* Top Performers */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500" />
                Top Performers
              </h3>
              <p className="text-sm text-gray-500 mb-4">By revenue this month</p>
              <div className="space-y-3">
                {topPerformers.map((sp, i) => {
                  const team = teams.find(t => t.id === sp.teamId);
                  return (
                    <div key={sp.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                        i === 0 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                        i === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                        i === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {i + 1}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                        {sp.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{sp.name}</p>
                        <p className="text-[10px] text-gray-400">{team?.name}</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(sp.achieved)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Teams Overview */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Teams Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {teams.map(team => (
                <TeamCard 
                  key={team.id} 
                  team={team} 
                  onClick={() => {
                    setSelectedTeamId(team.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                />
              ))}
            </div>
          </div>

          {/* Activity */}
          <ActivityTimeline activities={activities} />
        </>
      )}

      {activeTab === 'teams' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {teams.map(team => (
              <TeamCard 
                key={team.id} 
                team={team} 
                onClick={() => {
                  setSelectedTeamId(team.id);
                  setActiveTab('overview');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>

          {/* All Team Members */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">All Sales Executives</h3>
            <p className="text-sm text-gray-500 mb-4">Performance across all teams</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {[...salespeople].sort((a, b) => b.achieved - a.achieved).map((sp, i) => (
                <TeamMemberCard key={sp.id} member={sp} rank={i + 1} />
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'deals' && (
        <>
          <PipelineSummary deals={filteredDealsByContext} onStageClick={(stage) => setStageFilter(stage)} />
          
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                {selectedTeam ? `${selectedTeam.name} Leads` : 'Dealership Leads Hub'} 
                <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                  {filteredDeals.length}
                </span>
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 overflow-x-auto scrollbar-hide">
                  <button
                    onClick={() => setStageFilter('All')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                      stageFilter === 'All' ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-500'
                    }`}
                  >
                    All Hub
                  </button>
                  {DEAL_STAGES.map(stage => (
                    <button
                      key={stage}
                      onClick={() => setStageFilter(stage)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap hidden md:block ${
                        stageFilter === stage ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-500'
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowNewDealForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Lead</span>
                </button>
              </div>
            </div>

            {stageFilter === 'All' ? (
              <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left min-w-[1000px]">
                    <thead>
                      <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                        <th className="px-6 py-5">Customer & Model</th>
                        <th className="px-6 py-5">Team & Executive</th>
                        <th className="px-6 py-5">Stage</th>
                        <th className="px-6 py-5">Value</th>
                        <th className="px-6 py-5">Created</th>
                        <th className="px-6 py-5 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredDeals.map(deal => {
                        const team = teams.find(t => t.id === deal.teamId);
                        const salesperson = salespeople.find(sp => sp.id === deal.salespersonId);
                        return (
                          <tr key={deal.id} className="group hover:bg-orange-50/30 transition-all">
                            <td className="px-6 py-5">
                              <p className="text-sm font-bold text-gray-900">{deal.customerName}</p>
                              <p className="text-[11px] text-gray-500 font-medium">{deal.carModel} • {deal.carVariant}</p>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                  {salesperson?.avatar}
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-gray-700">{salesperson?.name}</p>
                                  <p className="text-[10px] text-gray-400">{team?.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span 
                                className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter"
                                style={{ backgroundColor: `${STAGE_COLORS[deal.stage as keyof typeof STAGE_COLORS]}15`, color: STAGE_COLORS[deal.stage as keyof typeof STAGE_COLORS] }}
                              >
                                {deal.stage}
                              </span>
                            </td>
                            <td className="px-6 py-5 font-bold text-sm text-gray-900">
                              {formatCurrency(deal.amount)}
                            </td>
                            <td className="px-6 py-5 text-xs text-gray-500 font-medium">
                              {deal.createdAt}
                            </td>
                            <td className="px-6 py-5 text-right">
                              <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all">
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {filteredDeals.length === 0 && (
                  <div className="text-center py-24 bg-white">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                      <Filter className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-black text-gray-900">No leads found</h3>
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-black opacity-40">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDeals.map(deal => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'analytics' && (
        <>
          {/* Stage Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Stage Distribution</h3>
              <p className="text-sm text-gray-500 mb-4">Deals by pipeline stage</p>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stageDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="count"
                    nameKey="stage"
                  >
                    {stageDistribution.map((entry, i) => (
                      <Cell key={entry.stage} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Monthly Deals</h3>
              <p className="text-sm text-gray-500 mb-4">Number of deals per month</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="deals" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Deals" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue by Team */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Revenue by Team</h3>
            <p className="text-sm text-gray-500 mb-4">Target vs Achievement comparison</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamComparisonData} layout="vertical" barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="target" fill="#e5e7eb" radius={[0, 4, 4, 0]} name="Target (L)" />
                <Bar dataKey="achieved" fill="#10b981" radius={[0, 4, 4, 0]} name="Achieved (L)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Conversion Funnel</h3>
            <p className="text-sm text-gray-500 mb-6">Deal progression through stages</p>
            <div className="flex flex-col items-center gap-2">
              {stageDistribution.map((item, i) => {
                const maxCount = Math.max(...stageDistribution.map(s => s.count));
                const widthPercent = Math.max(30, (item.count / maxCount) * 100);
                return (
                  <div key={item.stage} className="w-full flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600 w-24 text-right">{item.stage}</span>
                    <div className="flex-1">
                      <div
                        className="h-10 rounded-xl flex items-center px-4 transition-all duration-500"
                        style={{
                          width: `${widthPercent}%`,
                          backgroundColor: STAGE_COLORS[item.stage as keyof typeof STAGE_COLORS],
                        }}
                      >
                        <span className="text-white text-sm font-bold">{item.count} deals</span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-20">{formatCurrency(item.value)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {activeTab === 'incentives' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Payouts</p>
              <h3 className="text-2xl font-black text-gray-900">{formatCurrency(pendingIncentives + countedIncentives)}</h3>
              <p className="text-[10px] text-gray-500 mt-2">Combined pending & Counted</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 shadow-sm">
              <p className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">Pending Incentives</p>
              <h3 className="text-2xl font-black text-amber-600">{formatCurrency(pendingIncentives)}</h3>
              <p className="text-[10px] text-amber-500 mt-2">Awaiting RTO Plate Issue</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
              <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">Counted Incentives</p>
              <h3 className="text-2xl font-black text-emerald-600">{formatCurrency(countedIncentives)}</h3>
              <p className="text-[10px] text-emerald-500 mt-2">Reflected in Payroll</p>
            </div>
          </div>

          {/* Incentive Table */}
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <h3 className="font-bold text-gray-900">Incentive Status by Executive</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="px-6 py-4">Executive</th>
                    <th className="px-6 py-4 text-center">Total Leads</th>
                    <th className="px-6 py-4 text-center">RTO Completed</th>
                    <th className="px-6 py-4 text-center">Pending</th>
                    <th className="px-6 py-4 text-right">Confirmed Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {(selectedTeamId ? salespeople.filter(sp => sp.teamId === selectedTeamId) : salespeople).map(sp => {
                    const spDeals = filteredDealsByContext.filter(d => d.salespersonId === sp.id);
                    const pending = spDeals.filter(d => d.incentiveStatus === 'Pending').reduce((sum, d) => sum + (d.incentiveAmount || 0), 0);
                    const counted = spDeals.filter(d => d.incentiveStatus === 'Counted').reduce((sum, d) => sum + (d.incentiveAmount || 0), 0);
                    const rtoDone = spDeals.filter(d => d.rtoNumberPlateIssued).length;
                    
                    if (spDeals.length === 0) return null;

                    return (
                      <tr key={sp.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-900">{sp.name}</p>
                          <p className="text-[10px] text-gray-500">Employee ID: {sp.id}</p>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-600">{spDeals.length}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-bold">{rtoDone} Cars</span>
                        </td>
                        <td className="px-6 py-4 text-center text-amber-600 font-bold">{formatCurrency(pending)}</td>
                        <td className="px-6 py-4 text-right text-emerald-600 font-black">{formatCurrency(counted)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesManagerDashboard;
