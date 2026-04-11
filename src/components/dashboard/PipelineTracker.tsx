import React from 'react';
import { DEAL_STAGES, STAGE_COLORS, DealStage, Deal } from '@/data/dummyData';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

interface PipelineTrackerProps {
  deal?: Deal;
  compact?: boolean;
}

const PipelineTracker: React.FC<PipelineTrackerProps> = ({ deal, compact = false }) => {
  if (!deal) return null;

  const displayStages = DEAL_STAGES.filter(s => s !== 'General');
  const displayIndex = (displayStages as string[]).indexOf(deal.stage);

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {displayStages.map((stage, i) => {
          const iPos = i; // Current stage in visual list
          
          return (
            <React.Fragment key={stage}>
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  displayIndex !== -1 && iPos < displayIndex ? 'scale-100' : 
                  displayIndex !== -1 && iPos === displayIndex ? 'scale-125' : 'scale-75 opacity-40'
                }`}
                style={{
                  backgroundColor: displayIndex !== -1 && iPos <= displayIndex ? STAGE_COLORS[stage] : '#d1d5db',
                }}
                title={stage}
              />
              {i < displayStages.length - 1 && (
                <div className={`w-3 h-0.5 ${displayIndex !== -1 && iPos < displayIndex ? 'bg-gray-400' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full">
      {displayStages.map((stage, i) => {
        const iPos = i;
        const isCompleted = displayIndex !== -1 && iPos < displayIndex;
        const isCurrent = displayIndex !== -1 && iPos === displayIndex;
        const color = STAGE_COLORS[stage];

        return (
          <React.Fragment key={stage}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                  isCompleted ? 'ring-2 ring-offset-2' : isCurrent ? 'ring-2 ring-offset-2 animate-pulse' : 'opacity-40'
                }`}
                style={{
                  backgroundColor: isCompleted || isCurrent ? color : '#e5e7eb',
                  boxShadow: isCompleted || isCurrent ? `0 0 0 2px white, 0 0 0 4px ${color}` : 'none',
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <Circle className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-gray-400'}`} />
                )}
              </div>
              <span className={`text-[10px] font-medium ${isCurrent ? 'text-gray-900' : isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                {stage}
              </span>
            </div>
            {i < displayStages.length - 1 && (
              <div className="flex-1 mx-1">
                <div className={`h-0.5 rounded-full ${isCompleted ? 'bg-gray-400' : 'bg-gray-200'}`} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Pipeline Summary showing deal counts per stage
export const PipelineSummary: React.FC<{ deals: Deal[]; onStageClick?: (stage: DealStage) => void }> = ({ deals, onStageClick }) => {
  const displayStages = DEAL_STAGES.filter(s => s !== 'General');
  const stageCounts = displayStages.map(stage => ({
    stage,
    count: deals.filter(d => d.stage === stage).length,
    value: deals.filter(d => d.stage === stage).reduce((sum, d) => sum + d.amount, 0),
    color: STAGE_COLORS[stage],
  }));

  const totalDeals = deals.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-5">Deal Pipeline</h3>
      <div className="flex items-end gap-2 md:gap-4">
        {stageCounts.map((item, i) => {
          const height = totalDeals > 0 ? Math.max(20, (item.count / totalDeals) * 100) : 20;
          return (
            <div
              key={item.stage}
              className="flex-1 flex flex-col items-center cursor-pointer group"
              onClick={() => onStageClick?.(item.stage)}
            >
              <span className="text-xs font-bold text-gray-700 mb-1">{item.count}</span>
              <div
                className="w-full rounded-t-lg transition-all duration-300 group-hover:opacity-80 min-h-[20px]"
                style={{ backgroundColor: item.color, height: `${height}px` }}
              />
              <div className="w-full h-1 rounded-b-lg" style={{ backgroundColor: `${item.color}40` }} />
              <span className="mt-2 text-[10px] md:text-xs font-medium text-gray-500 text-center">{item.stage}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between">
        {stageCounts.map((item, i) => (
          <React.Fragment key={item.stage}>
            <div className="flex-1 text-center">
              <ArrowRight className={`w-4 h-4 mx-auto ${i < stageCounts.length - 1 ? 'text-gray-300' : 'text-transparent'}`} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PipelineTracker;
