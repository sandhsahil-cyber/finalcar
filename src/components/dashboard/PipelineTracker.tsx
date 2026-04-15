import React from 'react';
import { DEAL_STAGES, STAGE_COLORS, DealStage, Deal } from '@/data/dummyData';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

interface PipelineTrackerProps {
  deal?: Deal;
  compact?: boolean;
}

const PipelineTracker: React.FC<PipelineTrackerProps> = ({ deal, compact = false }) => {
  if (!deal) return null;

  const displayStages: { id: DealStage, label: string }[] = [
    { id: 'General', label: 'GEN' },
    { id: 'Account', label: 'ACC' },
    { id: 'Finance', label: 'FIN' },
    { id: 'Insurance', label: 'INS' },
    { id: 'RTO', label: 'RTO' },
    { id: 'PDI', label: 'PDI' },
    { id: 'Accessories', label: 'ACS' }
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-0.5 justify-end">
        {displayStages.map((stage) => {
          const status = deal.departmentStatus?.[stage.id] || 'Not Sent';
          const isCompleted = status === 'Completed' || deal.stageProgress?.[stage.id]?.completed;
          const isSent = status === 'In Progress';
          
          return (
            <div
              key={stage.id}
              className={`w-2 h-2 rounded-full transition-all ${
                isCompleted ? 'scale-100 opacity-100' : isSent ? 'scale-110 opacity-75 animate-pulse' : 'scale-75 opacity-20'
              }`}
              style={{ backgroundColor: isCompleted || isSent ? STAGE_COLORS[stage.id] : '#d1d5db' }}
              title={`${stage.label}: ${status}`}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full relative">
      <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
      {displayStages.map((stage) => {
        const status = deal.departmentStatus?.[stage.id] || 'Not Sent';
        const isCompleted = status === 'Completed' || deal.stageProgress?.[stage.id]?.completed;
        const isSent = status === 'In Progress';
        const color = STAGE_COLORS[stage.id] || '#cbd5e1';

        return (
          <div key={stage.id} className="flex flex-col items-center gap-1.5 z-10 bg-white">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                isCompleted ? 'ring-2 ring-offset-1' : isSent ? 'ring-2 ring-offset-1 animate-pulse' : 'opacity-40'
              }`}
              style={{
                backgroundColor: isCompleted || isSent ? color : '#f3f4f6',
                boxShadow: isCompleted || isSent ? `0 0 0 2px white, 0 0 0 3px ${color}` : 'none',
              }}
              title={`${stage.label}: ${status}`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-3 h-3 text-white" />
              ) : (
                <Circle className={`w-3 h-3 ${isSent ? 'text-white' : 'text-gray-300'}`} />
              )}
            </div>
            <span className={`text-[9px] font-black tracking-tighter ${isSent ? 'text-gray-900 font-bold' : isCompleted ? 'text-gray-500' : 'text-gray-300'}`}>
              {stage.label}
            </span>
          </div>
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
              <span className="mt-2 text-[10px] md:text-xs font-black text-gray-500 text-center">
                {item.stage === 'General' ? 'GEN' : 
                 item.stage === 'Account' ? 'ACC' : 
                 item.stage === 'Finance' ? 'FIN' : 
                 item.stage === 'Insurance' ? 'INS' : 
                 item.stage === 'RTO' ? 'RTO' : 
                 item.stage === 'PDI' ? 'PDI' : 
                 item.stage === 'Accessories' ? 'ACS' : item.stage}
              </span>
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
