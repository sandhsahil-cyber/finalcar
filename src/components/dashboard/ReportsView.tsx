import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { teams, salespeople, formatCurrency, monthlyRevenueData, stageDistribution, STAGE_COLORS, DEAL_STAGES } from '@/data/dummyData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Download, Calendar, Filter, BarChart3, PieChart as PieIcon, TrendingUp, Activity } from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ff6b35', '#ec4899', '#06b6d4', '#84cc16'];

const ReportsView: React.FC = () => {
  const { deals, currentRole } = useDashboard();
  const [dateRange, setDateRange] = useState('month');
  const [chartType, setChartType] = useState<'revenue' | 'deals' | 'conversion' | 'pipeline'>('revenue');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
          <p className="text-xs font-semibold text-gray-900">{label}</p>
          {payload.map((entry: any, i: number) => (
            <p key={i} className="text-xs mt-1" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Team performance radar data
  const radarData = teams.map(t => ({
    team: t.name.split(' ')[0],
    revenue: Math.round((t.achieved / t.monthlyTarget) * 100),
    deals: Math.round(Math.random() * 40 + 60),
    conversion: Math.round(Math.random() * 30 + 60),
    satisfaction: Math.round(Math.random() * 20 + 75),
  }));

  // Daily deals data
  const dailyData = Array.from({ length: 10 }, (_, i) => ({
    day: `Apr ${i + 1}`,
    newDeals: Math.floor(Math.random() * 4 + 1),
    completed: Math.floor(Math.random() * 3),
    revenue: Math.floor(Math.random() * 3000000 + 500000),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-sm text-gray-500">Comprehensive business insights</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
            {['week', 'month', 'quarter', 'year'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize ${
                  dateRange === range ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 w-fit overflow-x-auto">
        {[
          { id: 'revenue', label: 'Revenue', icon: TrendingUp },
          { id: 'deals', label: 'Deals', icon: BarChart3 },
          { id: 'conversion', label: 'Conversion', icon: Activity },
          { id: 'pipeline', label: 'Pipeline', icon: PieIcon },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setChartType(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                chartType === tab.id ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {chartType === 'revenue' && (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Revenue Trend</h3>
            <p className="text-sm text-gray-500 mb-6">Monthly revenue performance</p>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyRevenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ff6b35" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#ff6b35" strokeWidth={2.5} fill="url(#revGrad)" name="Revenue (INR)" />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}

        {chartType === 'deals' && (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Daily Deal Activity</h3>
            <p className="text-sm text-gray-500 mb-6">New deals and completions</p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={dailyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="newDeals" fill="#3b82f6" radius={[4, 4, 0, 0]} name="New Deals" />
                <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {chartType === 'conversion' && (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Team Performance Radar</h3>
            <p className="text-sm text-gray-500 mb-6">Multi-dimensional comparison</p>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={[
                { metric: 'Revenue', ...Object.fromEntries(radarData.map(r => [r.team, r.revenue])) },
                { metric: 'Deals', ...Object.fromEntries(radarData.map(r => [r.team, r.deals])) },
                { metric: 'Conversion', ...Object.fromEntries(radarData.map(r => [r.team, r.conversion])) },
                { metric: 'Satisfaction', ...Object.fromEntries(radarData.map(r => [r.team, r.satisfaction])) },
              ]}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                {radarData.map((team, i) => (
                  <Radar key={team.team} name={team.team} dataKey={team.team} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.15} strokeWidth={2} />
                ))}
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </>
        )}

        {chartType === 'pipeline' && (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Pipeline Distribution</h3>
            <p className="text-sm text-gray-500 mb-6">Deals across stages</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={stageDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="count" nameKey="stage">
                    {stageDistribution.map((entry, i) => (
                      <Cell key={entry.stage} fill={Object.values(STAGE_COLORS)[i]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col justify-center space-y-3">
                {stageDistribution.map((item, i) => (
                  <div key={item.stage} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: Object.values(STAGE_COLORS)[i] }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{item.stage}</span>
                        <span className="text-sm font-bold text-gray-900">{item.count} deals</span>
                      </div>
                      <p className="text-xs text-gray-400">Value: {formatCurrency(item.value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Top Revenue Generators</h4>
          <div className="space-y-2">
            {[...salespeople].sort((a, b) => b.achieved - a.achieved).slice(0, 5).map((sp, i) => (
              <div key={sp.id} className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[8px] font-bold">
                  {sp.avatar}
                </div>
                <span className="text-sm text-gray-700 flex-1 truncate">{sp.name}</span>
                <span className="text-sm font-bold text-gray-900">{formatCurrency(sp.achieved)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Best Conversion Rates</h4>
          <div className="space-y-2">
            {[...salespeople].sort((a, b) => b.conversionRate - a.conversionRate).slice(0, 5).map((sp, i) => (
              <div key={sp.id} className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-[8px] font-bold">
                  {sp.avatar}
                </div>
                <span className="text-sm text-gray-700 flex-1 truncate">{sp.name}</span>
                <span className="text-sm font-bold text-emerald-600">{sp.conversionRate}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Most Active (Deals)</h4>
          <div className="space-y-2">
            {[...salespeople].sort((a, b) => b.dealsCount - a.dealsCount).slice(0, 5).map((sp, i) => (
              <div key={sp.id} className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-[8px] font-bold">
                  {sp.avatar}
                </div>
                <span className="text-sm text-gray-700 flex-1 truncate">{sp.name}</span>
                <span className="text-sm font-bold text-purple-600">{sp.dealsCount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
