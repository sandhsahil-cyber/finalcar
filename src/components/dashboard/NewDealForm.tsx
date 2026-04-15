import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { CAR_MODELS, COLORS, Deal, DEAL_STAGES } from '@/data/dummyData';
import { X, Car, User, Phone, CreditCard, FileText, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const NewDealForm: React.FC = () => {
  const { showNewDealForm, setShowNewDealForm, addDeal } = useDashboard();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    carModel: '',
    carVariant: '',
    color: '',
    amount: '1000000', // Default or hidden
    downPayment: '0',
    expectedDelivery: '',
    notes: '',
    isExchange: false,
    exchangeCarDetails: '',
    nextFollowUpDate: '',
    nextFollowUpTask: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!showNewDealForm) return null;

  const selectedCar = CAR_MODELS.find(c => c.model === formData.carModel);
  const variants = selectedCar?.variants || [];

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const dealData = {
      ...formData,
      amount: parseFloat(formData.amount) || 1000000,
      downPayment: parseFloat(formData.downPayment) || 0,
      expectedDelivery: formData.nextFollowUpDate, // Use follow up date as a proxy for delivery expectation
    };
    
    await addDeal(dealData);
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowNewDealForm(false);
      setStep(1);
      setFormData({ 
        customerName: '', 
        customerPhone: '', 
        carModel: '', 
        carVariant: '', 
        color: '', 
        amount: '1000000', 
        downPayment: '0', 
        expectedDelivery: '', 
        notes: '',
        isExchange: false,
        exchangeCarDetails: '',
        nextFollowUpDate: '',
        nextFollowUpTask: '',
      });
    }, 2000);
  };

  const canProceed = () => {
    if (step === 1) return formData.customerName && formData.customerPhone;
    if (step === 2) return formData.carModel && formData.carVariant && formData.color;
    if (step === 3) {
      const basicFollowup = formData.nextFollowUpDate && formData.nextFollowUpTask;
      if (formData.isExchange) return basicFollowup && formData.exchangeCarDetails;
      return basicFollowup;
    }
    return true;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowNewDealForm(false)}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Customer Added!</h3>
            <p className="text-sm text-gray-500 mt-2">The customer has been added to your list</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Add New Customer</h2>
                <p className="text-xs text-gray-500">Step {step} of 3</p>
              </div>
              <button onClick={() => setShowNewDealForm(false)} className="p-2 rounded-full hover:bg-gray-100">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Progress */}
            <div className="flex gap-1 px-5 pt-4">
              {[1, 2, 3].map(s => (
                <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-orange-500' : 'bg-gray-200'}`} />
              ))}
            </div>

            {/* Form */}
            <div className="p-5 space-y-4">
              {step === 1 && (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-orange-500" />
                    <h3 className="text-sm font-semibold text-gray-700">Customer Details</h3>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Customer Name *</label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={e => handleChange('customerName', e.target.value)}
                      placeholder="Enter customer name"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.customerPhone}
                      onChange={e => handleChange('customerPhone', e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <Car className="w-4 h-4 text-orange-500" />
                    <h3 className="text-sm font-semibold text-gray-700">Vehicle Selection</h3>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Car Model *</label>
                    <select
                      value={formData.carModel}
                      onChange={e => { handleChange('carModel', e.target.value); handleChange('carVariant', ''); }}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 bg-white"
                    >
                      <option value="">Select model</option>
                      {CAR_MODELS.map(c => <option key={c.model} value={c.model}>{c.model}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Variant *</label>
                    <select
                      value={formData.carVariant}
                      onChange={e => handleChange('carVariant', e.target.value)}
                      disabled={!formData.carModel}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 bg-white disabled:opacity-50"
                    >
                      <option value="">Select variant</option>
                      {variants.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Color *</label>
                    <select
                      value={formData.color}
                      onChange={e => handleChange('color', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 bg-white"
                    >
                      <option value="">Select color</option>
                      {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-orange-500" />
                    <h3 className="text-sm font-semibold text-gray-700">Exchange & Next Steps</h3>
                  </div>
                  
                  {/* Exchange Section */}
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold text-gray-800">Trade-in Old Car?</p>
                        <p className="text-[10px] text-gray-500">Is the customer trading in their current vehicle?</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleChange('isExchange', !formData.isExchange)}
                        className={`w-12 h-6 rounded-full transition-all relative ${formData.isExchange ? 'bg-orange-500' : 'bg-gray-300'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isExchange ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>
 
                    {formData.isExchange && (
                      <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Old Car Details (Model, Year, Kms) *</label>
                        <input
                          type="text"
                          value={formData.exchangeCarDetails}
                          onChange={e => handleChange('exchangeCarDetails', e.target.value)}
                          placeholder="e.g. Swift 2018 VXI, 45k kms"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400"
                        />
                      </div>
                    )}
                  </div>

                  {/* Follow-up Section */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Next Contact Date *</label>
                      <input
                        type="date"
                        value={formData.nextFollowUpDate}
                        onChange={e => handleChange('nextFollowUpDate', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">What to do next? *</label>
                      <textarea
                        value={formData.nextFollowUpTask}
                        onChange={e => handleChange('nextFollowUpTask', e.target.value)}
                        placeholder="What is the next action needed? (e.g., Talk to customer, Home Visit, Collect papers)"
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 resize-none"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between p-5 border-t border-gray-100">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="flex items-center gap-1 px-5 py-2.5 text-sm font-semibold text-white bg-orange-500 rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="flex items-center gap-1 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 disabled:opacity-50 transition-colors"
                >
                  <Check className="w-4 h-4" /> Add Customer
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewDealForm;
