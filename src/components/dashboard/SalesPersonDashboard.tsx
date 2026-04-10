import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { salespeople, deals as allDeals, activities, formatCurrency, DEAL_STAGES, STAGE_COLORS, DealStage } from '@/data/dummyData';
import MetricsCard from './MetricsCard';
import DealCard from './DealCard';
import { PipelineSummary } from './PipelineTracker';
import ActivityTimeline from './ActivityTimeline';
import { Car, Target, TrendingUp, Plus, Filter, Clock, Users, ClipboardList } from 'lucide-react';

const SalesPersonDashboard: React.FC = () => {
  const { searchQuery, stageFilter, setStageFilter, setShowNewDealForm, deals } = useDashboard();

  // Current salesperson: Vikram Singh (sp-1)
  const currentSP = salespeople.find(sp => sp.id === 'sp-1')!;
  const myDeals = deals.filter(d => d.salespersonId === 'sp-1');
  const CAR_TARGET = 15; // Defining car target
  const progressPercent = Math.round((currentSP.dealsCount / CAR_TARGET) * 100);

  const filteredDeals = myDeals.filter(deal => {
    const matchesSearch = !searchQuery ||
      deal.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'All' || deal.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const myActivities = activities.filter(a => a.user === 'Vikram Singh').slice(0, 6);

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
                  VS
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Welcome back, Vikram!</h2>
                  <p className="text-blue-200 text-sm font-medium">Alpha Squad • Sales Executive</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 items-end">
                <div>
                  <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest mb-1">Car Target</p>
                  <p className="text-2xl font-black">{CAR_TARGET} <span className="text-sm font-medium opacity-60">Units</span></p>
                </div>
                <div>
                  <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest mb-1">Cars Sold</p>
                  <p className="text-2xl font-black">{currentSP.dealsCount} <span className="text-sm font-medium opacity-60">Units</span></p>
                </div>
                <div>
                  <p className="text-blue-100/60 text-[10px] font-bold uppercase tracking-widest mb-1">Month Progress</p>
                  <div className="flex items-center gap-3 mt-1 bg-white/10 px-3 py-2 rounded-xl border border-white/10">
                    <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
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
              <p className="text-blue-100/80 text-[10px] font-black uppercase tracking-widest mb-2">Total Incentive</p>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-emerald-400">₹</span>
                <span className="text-4xl font-black text-white tracking-tighter">
                  {formatCurrency(28500).replace('₹', '').replace('.00', '')}
                </span>
              </div>
              <p className="text-[9px] text-blue-200/60 mt-2 font-medium">Earned this month</p>
            </div>
          </div>
        </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="All Leads"
          value={String(myDeals.length)}
          subtitle="Total enquiries"
          trend={12}
          icon={<Users className="w-5 h-5" />}
          color="#3b82f6"
        />
        <MetricsCard
          title="Total Bookings"
          value={String(myDeals.filter(d => d.stage !== 'Account').length)}
          subtitle="Booked units"
          trend={8}
          icon={<ClipboardList className="w-5 h-5" />}
          color="#8b5cf6"
        />
        <MetricsCard
          title="Total Delivery"
          value={String(myDeals.filter(d => d.status === 'completed').length)}
          subtitle="Cars delivered"
          trend={5}
          icon={<Car className="w-5 h-5" />}
          color="#10b981"
        />
        <MetricsCard
          title="Month Progress"
          value={`${progressPercent}%`}
          subtitle={`${CAR_TARGET - currentSP.dealsCount} cars remaining`}
          trend={-3}
          icon={<Target className="w-5 h-5" />}
          color="#ff6b35"
        />
      </div>

      {/* Pipeline Summary */}
      <PipelineSummary deals={myDeals} onStageClick={(stage) => setStageFilter(stage)} />

      {/* Deals Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">My Deals ({filteredDeals.length})</h3>
          <div className="flex items-center gap-2">
            {/* Stage Filter */}
            <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
              <button
                onClick={() => setStageFilter('All')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${stageFilter === 'All' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                All
              </button>
              {DEAL_STAGES.map(stage => (
                <button
                  key={stage}
                  onClick={() => setStageFilter(stage)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all hidden md:block ${stageFilter === stage ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {stage}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowNewDealForm(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
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

        {filteredDeals.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No deals found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Activity and Incentives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityTimeline activities={myActivities.length > 0 ? myActivities : activities.slice(0, 5)} />
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" /> Incentive Earnings
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">LIVE TRACKING</span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Incentive Earned</p>
              <p className="text-2xl font-black">₹{formatCurrency(28500).replace('₹', '')}</p>
              <p className="text-[9px] text-gray-400 mt-1">Estimated for current month deliveries</p>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Model-wise Earnings</p>
              {[
                { model: 'Grand Vitara', count: 3, incentive: 5000, color: 'blue' },
                { model: 'Fronx', count: 2, incentive: 3500, color: 'indigo' },
                { model: 'Swift', count: 3, incentive: 2000, color: 'orange' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-${item.color}-100 flex items-center justify-center`}>
                      <Car className={`w-4 h-4 text-${item.color}-600`} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{item.model}</p>
                      <p className="text-[9px] text-gray-500">{item.count} Deliveries</p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-emerald-600">+{formatCurrency(item.count * item.incentive)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 border border-dashed border-gray-200 rounded-2xl">
              <p className="text-[10px] text-gray-500 text-center italic">"Deliver 2 more Fronx to unlock an extra ₹5,000 bonus!"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPersonDashboard;
