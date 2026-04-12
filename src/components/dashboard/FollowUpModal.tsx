import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Deal } from '@/data/dummyData';
import { X, Car, MessageCircle, FileText, Send, Calendar, Check, ExternalLink, Smartphone } from 'lucide-react';

interface FollowUpModalProps {
  deal: Deal;
  onClose: () => void;
  salespersonName: string;
}

const FollowUpModal: React.FC<FollowUpModalProps> = ({ deal, onClose, salespersonName }) => {
  const { updateDeal } = useDashboard();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    testDriveTaken: deal.testDriveTaken || false,
    homeVisit: deal.homeVisit || false,
    nextFollowUpDate: deal.nextFollowUpDate || '',
    nextFollowUpTask: deal.nextFollowUpTask || '',
    lastFollowUpNotes: deal.lastFollowUpNotes || '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateDeal(deal.id, {
        ...formData,
        notes: formData.lastFollowUpNotes || deal.notes
      });
      onClose();
    } catch (err) {
      console.error("Failed to save follow-up", err);
    } finally {
      setLoading(false);
    }
  };

  const getBookingUrl = () => {
    return `${window.location.origin}/booking/${deal.id}?sp=${deal.salespersonId}`;
  };

  const generateWhatsAppLink = (type: 'booking' | 'price' | 'brochure') => {
    const baseUrl = "https://autodesk.com"; // Keep for price/brochure for now if needed, or change to origin
    const urls = {
      booking: getBookingUrl(),
      price: `${baseUrl}/price-model/${deal.carModel.replace(/\s+/g, '-').toLowerCase()}`,
      brochure: `${baseUrl}/brochure/${deal.carModel.replace(/\s+/g, '-').toLowerCase()}`,
    };

    const messages = {
      booking: `Hello ${deal.customerName}, I am ${salespersonName} from AutoDesk. Please fill out the booking form for your ${deal.carModel} here: ${urls.booking}`,
      price: `Hi ${deal.customerName}, here is the detailed price model for the ${deal.carModel} you selected: ${urls.price}`,
      brochure: `Hi ${deal.customerName}, here is the official brochure for the ${deal.carModel}: ${urls.brochure}`,
    };

    const encodedMsg = encodeURIComponent(messages[type]);
    const cleanPhone = deal.customerPhone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodedMsg}`;
  };

  const sendAction = async (type: 'booking' | 'price' | 'brochure') => {
    const link = generateWhatsAppLink(type);
    window.open(link, '_blank');

    const updates: any = {};
    if (type === 'booking') updates.bookingFormSent = true;
    if (type === 'price') updates.priceModelSent = true;
    if (type === 'brochure') updates.brochureSent = true;

    await updateDeal(deal.id, updates);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <div
        className="bg-white rounded-t-[2rem] sm:rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom sm:zoom-in duration-300 max-h-[95vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header - Optimized for Mobile */}
        <div className="bg-gradient-to-r from-gray-900 to-indigo-900 p-5 sm:p-6 text-white shrink-0">
          <div className="flex items-start justify-between">
            <div className="pr-8">
              <h2 className="text-lg sm:text-xl font-black tracking-tight leading-tight">{deal.customerName}</h2>
              <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mt-1">Lead Follow-up & Actions</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors absolute right-4 top-4">
              <X className="w-5 h-5 text-indigo-100" />
            </button>
          </div>

          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-4">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-white/10 flex items-center gap-2">
              <Car className="w-3.5 h-3.5 text-indigo-300" />
              <div>
                <p className="text-[8px] sm:text-[10px] text-white/60 font-black uppercase">Vehicle</p>
                <p className="text-xs sm:text-sm font-bold truncate max-w-[120px] sm:max-w-none">{deal.carModel}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-white/10 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: deal.color.toLowerCase() === 'white' ? '#fff' : deal.color }} />
              <div>
                <p className="text-[8px] sm:text-[10px] text-white/60 font-black uppercase">Color</p>
                <p className="text-xs sm:text-sm font-bold">{deal.color}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-5 sm:p-8 overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

            {/* Left Column: Tracking */}
            <div className="space-y-5 sm:space-y-6">
              <div>
                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600" /> Interaction Status
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => handleChange('testDriveTaken', !formData.testDriveTaken)}
                    className={`flex items-center justify-between p-3.5 rounded-xl sm:rounded-2xl border-2 transition-all ${formData.testDriveTaken ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 bg-gray-50'
                      }`}
                  >
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-gray-900">Test Drive Taken?</p>
                      <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium">Customer visited for demo</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${formData.testDriveTaken ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                      {formData.testDriveTaken && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>

                  <button
                    onClick={() => handleChange('homeVisit', !formData.homeVisit)}
                    className={`flex items-center justify-between p-3.5 rounded-xl sm:rounded-2xl border-2 transition-all ${formData.homeVisit ? 'border-orange-500 bg-orange-50/50' : 'border-gray-100 bg-gray-50'
                      }`}
                  >
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-gray-900">Home Visit Done?</p>
                      <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium">Visited customer location</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${formData.homeVisit ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                      {formData.homeVisit && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Next Follow-up
                </h3>
                <div className="space-y-2.5">
                  <input
                    type="date"
                    value={formData.nextFollowUpDate}
                    onChange={e => handleChange('nextFollowUpDate', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <textarea
                    value={formData.nextFollowUpTask}
                    onChange={e => handleChange('nextFollowUpTask', e.target.value)}
                    placeholder="Task or reminder for next time..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl text-sm font-medium text-gray-700 resize-none h-20 sm:h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Actions & Notes */}
            <div className="space-y-5 sm:space-y-6">
              <div>
                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 text-indigo-600" /> Send Documents
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {[ 
                    { id: 'booking', label: 'Send Booking Form', icon: MessageCircle, color: 'emerald', sent: deal.bookingFormSent },
                    { id: 'price', label: 'Send Price Model', icon: FileText, color: 'blue', sent: deal.priceModelSent },
                    { id: 'brochure', label: 'Send Brochure', icon: FileText, color: 'indigo', sent: deal.brochureSent }
                  ].map((btn) => (
                    <div key={btn.id} className={`flex items-center justify-between p-3 rounded-xl bg-${btn.color}-50 text-${btn.color}-700 border border-${btn.color}-100 hover:bg-${btn.color}-100 transition-all group`}>
                      <button 
                        onClick={() => sendAction(btn.id as any)}
                        className="flex items-center gap-3 flex-1 text-left"
                      >
                        <btn.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-tight">{btn.label}</span>
                      </button>
                      <div className="flex items-center gap-2">
                        {btn.id === 'booking' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(getBookingUrl());
                              // You could add a toast here
                            }}
                            className="p-1.5 hover:bg-emerald-200 rounded-lg transition-colors text-emerald-700"
                            title="Copy Booking Link"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                          </button>
                        )}
                        {btn.sent ? <Check className="w-4 h-4" /> : <ExternalLink className="w-3.5 h-3.5 opacity-50 sm:opacity-0 sm:group-hover:opacity-100" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-indigo-600" /> Current Notes
                </h3>
                <textarea
                  value={formData.lastFollowUpNotes}
                  onChange={e => handleChange('lastFollowUpNotes', e.target.value)}
                  placeholder="Notes from last interaction..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl text-sm font-medium text-gray-700 resize-none h-24 sm:h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Sticky at bottom */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-3 text-xs sm:text-sm font-black text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest"
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-[2] sm:flex-none px-6 sm:px-10 py-3 bg-gray-900 text-white text-xs sm:text-sm font-black rounded-xl sm:rounded-2xl hover:bg-black transition-all shadow-lg disabled:opacity-50 uppercase tracking-widest"
          >
            {loading ? 'Saving...' : 'Update Lead'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpModal;