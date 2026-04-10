import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { teams, salespeople, activities, formatCurrency, DEAL_STAGES, STAGE_COLORS, monthlyRevenueData, stageDistribution } from '@/data/dummyData';
import MetricsCard from './MetricsCard';
import DealCard from './DealCard';
import TeamCard from './TeamCard';
import TeamMemberCard from './TeamMemberCard';
import { PipelineSummary } from './PipelineTracker';
import ActivityTimeline from './ActivityTimeline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend, Area, AreaChart } from 'recharts';
import { Building2, IndianRupee, Users, Car, TrendingUp, Target, Award, Plus, BarChart3, ArrowUpRight, Crown } from 'lucide-react';

const CHART_COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ff6b35'];

const SalesManagerDashboard: React.FC = () => {
  const { searchQuery, stageFilter, setStageFilter, setShowNewDealForm, deals } = useDashboard();
  const [activeTab, setActiveTab] = useState<'overview' | 'teams' | 'deals' | 'analytics'>('overview');

  const totalRevenue = teams.reduce((sum, t) => sum + t.achieved, 0);
  const totalTarget = teams.reduce((sum, t) => sum + t.monthlyTarget, 0);
  const overallProgress = Math.round((totalRevenue / totalTarget) * 100);
  const totalDeals = deals.length;
  const activeDeals = deals.filter(d => d.status === 'active').length;
  const blockedDeals = deals.filter(d => d.status === 'blocked').length;
  const completedDeals = deals.filter(d => d.status === 'completed').length;
  const totalSalespeople = salespeople.length;

  // Top performers across all teams
  const topPerformers = [...salespeople].sort((a, b) => b.achieved - a.achieved).slice(0, 5);

  // Team comparison data for charts
  const teamComparisonData = teams.map(t => ({
    name: t.name.split(' ')[0],
    target: t.monthlyTarget / 100000,
    achieved: t.achieved / 100000,
    progress: Math.round((t.achieved / t.monthlyTarget) * 100),
  }));

  const filteredDeals = deals.filter(deal => {
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
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full -mb-24" />
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">AutoDesk Showroom</h2>
                  <p className="text-orange-100 text-sm">Sales Manager Dashboard • April 2026</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <p className="text-orange-100 text-xs">Total Revenue</p>
                <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="text-center">
                <p className="text-orange-100 text-xs">Overall Target</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-32 h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${overallProgress}%` }} />
                  </div>
                  <span className="text-lg font-bold">{overallProgress}%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-orange-100 text-xs">Teams</p>
                <p className="text-3xl font-bold">{teams.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'teams', label: 'Teams', icon: Users },
          { id: 'deals', label: 'All Deals', icon: Car },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
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
              title="Total Revenue"
              value={formatCurrency(totalRevenue)}
              subtitle={`Target: ${formatCurrency(totalTarget)}`}
              trend={12}
              icon={<IndianRupee className="w-5 h-5" />}
              color="#10b981"
            />
            <MetricsCard
              title="Active Deals"
              value={String(activeDeals)}
              subtitle={`${blockedDeals} blocked`}
              trend={8}
              icon={<Car className="w-5 h-5" />}
              color="#3b82f6"
            />
            <MetricsCard
              title="Sales Team"
              value={String(totalSalespeople)}
              subtitle={`${teams.length} teams`}
              icon={<Users className="w-5 h-5" />}
              color="#8b5cf6"
            />
            <MetricsCard
              title="Completed"
              value={String(completedDeals)}
              subtitle="This month"
              trend={15}
              icon={<Target className="w-5 h-5" />}
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
              <PipelineSummary deals={deals} onStageClick={(stage) => { setStageFilter(stage); setActiveTab('deals'); }} />
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
                <TeamCard key={team.id} team={team} onClick={() => setActiveTab('teams')} />
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
              <TeamCard key={team.id} team={team} />
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
          <PipelineSummary deals={deals} onStageClick={(stage) => setStageFilter(stage)} />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">All Deals ({filteredDeals.length})</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 overflow-x-auto">
                  <button
                    onClick={() => setStageFilter('All')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                      stageFilter === 'All' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    All
                  </button>
                  {DEAL_STAGES.map(stage => (
                    <button
                      key={stage}
                      onClick={() => setStageFilter(stage)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap hidden md:block ${
                        stageFilter === stage ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowNewDealForm(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Deal</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDeals.map(deal => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
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
    </div>
  );
};

export default SalesManagerDashboard;
