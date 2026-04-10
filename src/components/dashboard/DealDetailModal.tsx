import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { DEAL_STAGES, STAGE_COLORS, formatFullCurrency, DealStage } from '@/data/dummyData';
import { X, Car, User, Phone, Calendar, FileText, CheckCircle2, Circle, ArrowRight, MapPin, CreditCard, Clock, AlertTriangle } from 'lucide-react';

const DealDetailModal: React.FC = () => {
  const { selectedDeal, showDealModal, setShowDealModal, updateDealStage } = useDashboard();

  if (!showDealModal || !selectedDeal) return null;

  const currentStageIndex = DEAL_STAGES.indexOf(selectedDeal.stage);

  const handleMoveStage = (stage: DealStage) => {
    updateDealStage(selectedDeal.id, stage);
  };

  const statusColors = {
    active: 'bg-emerald-500',
    completed: 'bg-blue-500',
    pending: 'bg-amber-500',
    blocked: 'bg-red-500',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowDealModal(false)}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 pb-4" style={{ background: `linear-gradient(135deg, ${STAGE_COLORS[selectedDeal.stage]}15, ${STAGE_COLORS[selectedDeal.stage]}05)` }}>
          <button
            onClick={() => setShowDealModal(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-mono text-gray-500">{selectedDeal.id}</span>
            <div className={`w-2 h-2 rounded-full ${statusColors[selectedDeal.status]}`} />
            <span className="text-sm font-medium text-gray-600 capitalize">{selectedDeal.status}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{selectedDeal.customerName}</h2>
          <p className="text-gray-500 flex items-center gap-1 mt-1">
            <Phone className="w-3.5 h-3.5" /> {selectedDeal.customerPhone}
          </p>
        </div>

        {/* Pipeline Progress */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Deal Progress</h3>
          <div className="flex items-center justify-between">
            {DEAL_STAGES.map((stage, i) => {
              const isCompleted = i < currentStageIndex;
              const isCurrent = i === currentStageIndex;
              const color = STAGE_COLORS[stage];

              return (
                <React.Fragment key={stage}>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => i <= currentStageIndex + 1 && handleMoveStage(stage)}
                      disabled={i > currentStageIndex + 1}
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                        isCompleted || isCurrent ? 'hover:scale-110' : i === currentStageIndex + 1 ? 'hover:scale-110 opacity-60 hover:opacity-100' : 'opacity-30'
                      }`}
                      style={{
                        backgroundColor: isCompleted || isCurrent ? color : '#e5e7eb',
                        boxShadow: isCurrent ? `0 0 0 4px ${color}30` : 'none',
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <Circle className={`w-5 h-5 ${isCurrent ? 'text-white' : 'text-gray-400'}`} />
                      )}
                    </button>
                    <div className="text-center">
                      <span className={`text-xs font-semibold ${isCurrent ? 'text-gray-900' : isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                        {stage}
                      </span>
                      {selectedDeal.stageProgress[stage]?.date && (
                        <p className="text-[10px] text-gray-400">{selectedDeal.stageProgress[stage].date}</p>
                      )}
                    </div>
                  </div>
                  {i < DEAL_STAGES.length - 1 && (
                    <div className="flex-1 mx-2">
                      <div className={`h-0.5 rounded-full ${i < currentStageIndex ? 'bg-gray-400' : 'bg-gray-200'}`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Car Details */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Vehicle Details</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-white rounded-lg shadow-sm">
                <Car className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-base font-bold text-gray-900">{selectedDeal.carModel}</p>
                <p className="text-sm text-gray-500">{selectedDeal.carVariant} • {selectedDeal.color}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-400">Total Amount</p>
                <p className="text-lg font-bold text-gray-900">{formatFullCurrency(selectedDeal.amount)}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-400">Down Payment</p>
                <p className="text-lg font-bold text-emerald-600">{formatFullCurrency(selectedDeal.downPayment)}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-400">Balance</p>
                <p className="text-lg font-bold text-amber-600">{formatFullCurrency(selectedDeal.amount - selectedDeal.downPayment)}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-400">Expected Delivery</p>
                <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {selectedDeal.expectedDelivery}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Notes</h3>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
            <FileText className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">{selectedDeal.notes}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex flex-wrap gap-2">
          {selectedDeal.status === 'active' && currentStageIndex < DEAL_STAGES.length - 1 && (
            <button
              onClick={() => handleMoveStage(DEAL_STAGES[currentStageIndex + 1])}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: STAGE_COLORS[DEAL_STAGES[currentStageIndex + 1]] }}
            >
              <ArrowRight className="w-4 h-4" />
              Move to {DEAL_STAGES[currentStageIndex + 1]}
            </button>
          )}
          <button
            onClick={() => setShowDealModal(false)}
            className="px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealDetailModal;
