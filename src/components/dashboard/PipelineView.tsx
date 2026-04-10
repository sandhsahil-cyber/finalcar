import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { DEAL_STAGES, STAGE_COLORS, formatCurrency, DealStage } from '@/data/dummyData';
import DealCard from './DealCard';
import { Plus, ArrowRight } from 'lucide-react';

const PipelineView: React.FC = () => {
  const { deals, searchQuery, currentRole, setShowNewDealForm } = useDashboard();

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = !searchQuery ||
      deal.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (currentRole === 'salesperson') return matchesSearch && deal.salespersonId === 'sp-1';
    if (currentRole === 'teamleader') return matchesSearch && deal.teamId === 'team-1';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pipeline Board</h2>
          <p className="text-sm text-gray-500">Drag-style view of all deals by stage</p>
        </div>
        <button
          onClick={() => setShowNewDealForm(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Deal
        </button>
      </div>

      {/* Flow indicator */}
      <div className="flex items-center justify-center gap-2 py-2">
        {DEAL_STAGES.map((stage, i) => (
          <React.Fragment key={stage}>
            <div
              className="px-4 py-2 rounded-xl text-xs font-bold text-white"
              style={{ backgroundColor: STAGE_COLORS[stage] }}
            >
              {stage}
            </div>
            {i < DEAL_STAGES.length - 1 && (
              <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {DEAL_STAGES.map(stage => {
          const stageDeals = filteredDeals.filter(d => d.stage === stage);
          const stageValue = stageDeals.reduce((sum, d) => sum + d.amount, 0);

          return (
            <div key={stage} className="bg-gray-50 rounded-2xl p-3">
              {/* Stage Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STAGE_COLORS[stage] }} />
                  <h3 className="text-sm font-bold text-gray-900">{stage}</h3>
                  <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                    {stageDeals.length}
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 px-1 mb-3">Value: {formatCurrency(stageValue)}</p>

              {/* Deal Cards */}
              <div className="space-y-2">
                {stageDeals.map(deal => (
                  <DealCard key={deal.id} deal={deal} compact />
                ))}
                {stageDeals.length === 0 && (
                  <div className="text-center py-8 text-gray-300">
                    <p className="text-xs">No deals</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineView;
