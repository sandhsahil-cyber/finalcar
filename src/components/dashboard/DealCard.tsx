import React from 'react';
import { Deal, STAGE_COLORS, formatCurrency, DEAL_STAGES, DealStage } from '@/data/dummyData';
import PipelineTracker from './PipelineTracker';
import { Car, User, Phone, Calendar, ChevronRight, AlertCircle, CheckCircle2, Clock, ArrowRightCircle, TrendingUp } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

interface DealCardProps {
  deal: Deal;
  showActions?: boolean;
  compact?: boolean;
}

const statusConfig = {
  active: { label: 'Active', color: 'bg-emerald-100 text-emerald-700', icon: Clock },
  completed: { label: 'Completed', color: 'bg-blue-100 text-blue-700', icon: CheckCircle2 },
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', icon: Clock },
  blocked: { label: 'Blocked', color: 'bg-red-100 text-red-700', icon: AlertCircle },
};

const DealCard: React.FC<DealCardProps> = ({ deal, showActions = true, compact = false }) => {
  const { setSelectedDeal, setShowDealModal, updateDealStage, updateDealStatus } = useDashboard();
  const status = statusConfig[deal.status];
  const StatusIcon = status.icon;

  const handleViewDetail = () => {
    setSelectedDeal(deal);
    setShowDealModal(true);
  };

  const handleMoveToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = DEAL_STAGES.indexOf(deal.stage);
    if (currentIndex < DEAL_STAGES.length - 1) {
      updateDealStage(deal.id, DEAL_STAGES[currentIndex + 1]);
    }
  };

  if (compact) {
    return (
      <div
        onClick={handleViewDetail}
        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="w-1.5 h-12 rounded-full" style={{ backgroundColor: STAGE_COLORS[deal.stage] }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900 truncate">{deal.customerName}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${status.color}`}>{status.label}</span>
          </div>
          <p className="text-xs text-gray-500 truncate">{deal.carModel} {deal.carVariant} • {deal.id}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-sm font-bold text-gray-900">{formatCurrency(deal.amount)}</p>
          <PipelineTracker deal={deal} compact />
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
      </div>
    );
  }

  return (
    <div
      onClick={handleViewDetail}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Stage indicator bar */}
      <div className="h-1.5 w-full" style={{ backgroundColor: STAGE_COLORS[deal.stage] }} />
      
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400">{deal.id}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${status.color}`}>
                <StatusIcon className="w-3 h-3 inline mr-0.5" />
                {status.label}
              </span>
            </div>
            <h4 className="mt-1 text-base font-bold text-gray-900">{deal.customerName}</h4>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">{formatCurrency(deal.amount)}</p>
            <p className="text-[10px] text-gray-400">Down: {formatCurrency(deal.downPayment)}</p>
          </div>
        </div>

        {/* Car info */}
        <div className="flex items-center gap-2 mb-3 p-2.5 bg-gray-50 rounded-xl">
          <Car className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{deal.carModel} {deal.carVariant}</p>
            <p className="text-xs text-gray-500">{deal.color}</p>
          </div>
        </div>

        {/* Pipeline */}
        <div className="mb-3">
          <PipelineTracker deal={deal} />
        </div>

        {/* Incentive Status */}
        {deal.incentiveAmount && (
          <div className={`mb-3 flex items-center justify-between p-2 rounded-xl text-[10px] font-bold uppercase tracking-wider ${
            deal.incentiveStatus === 'Counted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
          }`}>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Incentive: {formatCurrency(deal.incentiveAmount)}
            </span>
            <span className="flex items-center gap-1">
              {deal.rtoNumberPlateIssued ? (
                <><CheckCircle2 className="w-3 h-3" /> Plate Issued</>
              ) : (
                <><Clock className="w-3 h-3" /> Plate Pending</>
              )}
              ({deal.incentiveStatus})
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>Delivery: {deal.expectedDelivery}</span>
          </div>
          {showActions && (
            <button
              onClick={handleViewDetail}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-primary bg-primary/10 rounded-lg transition-all hover:bg-primary/20"
            >
              Open Lead
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealCard;
