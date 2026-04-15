import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { DEAL_STAGES, STAGE_COLORS, formatCurrency, salespeople, teams } from '@/data/dummyData';
import DealCard from './DealCard';
import { PipelineSummary } from './PipelineTracker';
import { LayoutGrid, List, Plus, Filter, Search, Car, BarChart3 as TrendingUp } from 'lucide-react';

const DealsView: React.FC = () => {
  const { deals, searchQuery, setSearchQuery, stageFilter, setStageFilter, statusFilter, setStatusFilter, setShowNewDealForm, currentRole } = useDashboard();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [hasInteracted, setHasInteracted] = useState(false);

  // Wrap setStageFilter to track interaction
  const handleStageClick = (stage: any) => {
    setStageFilter(stage);
    setHasInteracted(true);
  };

  const handleStatusClick = (status: string) => {
    setStatusFilter(status);
    setHasInteracted(true);
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = !searchQuery ||
      deal.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'All' || deal.stage === stageFilter;
    const matchesStatus = statusFilter === 'all' || deal.status === statusFilter;
    
    // Role-based filtering
    if (currentRole === 'salesperson') {
      return matchesSearch && matchesStage && matchesStatus && deal.salespersonId === 'sp-1';
    }
    if (currentRole === 'teamleader') {
      return matchesSearch && matchesStage && matchesStatus && deal.teamId === 'team-1';
    }
    return matchesSearch && matchesStage && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Deal Pipeline</h2>
          <p className="text-sm text-gray-500">{filteredDeals.length} customers found</p>
        </div>
        <button
          onClick={() => setShowNewDealForm(true)}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      <PipelineSummary deals={deals} onStageClick={handleStageClick} />

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
        <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 overflow-x-auto flex-shrink-0">
          <button
            onClick={() => handleStageClick('All')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
              stageFilter === 'All' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            }`}
          >
            All Stages
          </button>
          {DEAL_STAGES.map(stage => (
            <button
              key={stage}
              onClick={() => handleStageClick(stage)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                stageFilter === stage ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 flex-shrink-0">
          {['all', 'active', 'pending', 'blocked', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => handleStatusClick(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize whitespace-nowrap ${
                statusFilter === status ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              {status === 'blocked' ? 'stuck' : status}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 ml-auto flex-shrink-0">
          <button
            onClick={() => setViewType('grid')}
            className={`p-1.5 rounded-lg transition-all ${viewType === 'grid' ? 'bg-white shadow-sm' : ''}`}
          >
            <LayoutGrid className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => setViewType('list')}
            className={`p-1.5 rounded-lg transition-all ${viewType === 'list' ? 'bg-white shadow-sm' : ''}`}
          >
            <List className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Deals */}
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredDeals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredDeals.map(deal => (
            <DealCard key={deal.id} deal={deal} compact />
          ))}
        </div>
      )}

      {filteredDeals.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-lg text-gray-500 font-medium">No customers found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search query</p>
          <button
            onClick={() => { setStageFilter('All'); setStatusFilter('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 text-sm font-medium text-orange-500 hover:text-orange-600"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DealsView;
