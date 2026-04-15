import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { DEAL_STAGES, STAGE_COLORS, formatFullCurrency, DealStage } from '@/data/dummyData';
import { X, Car, User, Phone, Calendar, FileText, CheckCircle2, Circle, ArrowRight, MapPin, CreditCard, Clock, AlertTriangle } from 'lucide-react';

const DealDetailModal: React.FC = () => {
  const { selectedDeal, showDealModal, setShowDealModal, sendToDepartment, updateDepartmentStatus } = useDashboard();

  if (!showDealModal || !selectedDeal) return null;

  // We exclude 'General' and 'Account' from manual send routing if desired, or just list the operational ones.
  const OPERATIONAL_DEPARTMENTS: DealStage[] = ['Account', 'Finance', 'Insurance', 'RTO', 'PDI', 'Accessories'];

  const getDeptStatus = (dept: DealStage) => {
    return selectedDeal.departmentStatus?.[dept] || 'Not Sent';
  };

  const statusColors = {
    active: 'bg-emerald-500',
    completed: 'bg-blue-500',
    pending: 'bg-amber-500',
    blocked: 'bg-red-500', // Stuck
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
            <span className="text-sm font-medium text-gray-600 capitalize">{selectedDeal.status === 'blocked' ? 'stuck' : selectedDeal.status}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{selectedDeal.customerName}</h2>
          <p className="text-gray-500 flex items-center gap-1 mt-1">
            <Phone className="w-3.5 h-3.5" /> {selectedDeal.customerPhone}
          </p>
        </div>

        {/* Department Routing */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-50" /> Department Routing
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {OPERATIONAL_DEPARTMENTS.map((dept) => {
              const status = getDeptStatus(dept);
              const isSent = status === 'In Progress';
              const isCompleted = status === 'Completed' || selectedDeal.stageProgress?.[dept]?.completed;
              const color = STAGE_COLORS[dept] || '#cbd5e1';

              return (
                <div key={dept} className="flex flex-col gap-2 p-3 bg-white border border-gray-200 rounded-xl shadow-sm items-center text-center relative overflow-hidden transition-all">
                  <span className="text-xs font-black text-gray-900 tracking-tight">{dept}</span>
                  
                  {isCompleted ? (
                    <div className="flex flex-col items-center gap-1 w-full mt-1">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600">Done</span>
                    </div>
                  ) : isSent ? (
                    <div 
                      className="mt-1 w-full flex items-center justify-center gap-1 py-1.5 px-2 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase transition-colors opacity-80 cursor-default"
                    >
                      <Clock className="w-3 h-3" /> In Process
                    </div>
                  ) : (
                    <button 
                      onClick={() => sendToDepartment(selectedDeal.id, dept)}
                      className="mt-1 w-full py-1.5 px-2 rounded text-[10px] font-bold uppercase transition-colors text-white"
                      style={{ backgroundColor: color }}
                    >
                      Process Lead
                    </button>
                  )}
                </div>
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
        <div className="px-6 py-4 flex flex-wrap justify-end gap-2 bg-gray-50">
          <button
            onClick={() => setShowDealModal(false)}
            className="px-6 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealDetailModal;
