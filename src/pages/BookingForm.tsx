import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Car, Upload, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';
import { Deal } from '@/data/dummyData';

const BookingForm = () => {
  const { id: dealId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const spId = searchParams.get('sp');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deal, setDeal] = useState<Deal | null>(null);

  const [formData, setFormData] = useState({
    bookingAmount: 50000,
    customerEmail: '',
    customerAltPhone: '',
    customerAddress: '',
    panNumber: '',
    aadhaarNumber: '',
  });
  
  const [uploads, setUploads] = useState<File[]>([]);

  useEffect(() => {
    const fetchDeal = async () => {
      if (!dealId) return;
      try {
        const data = await api.getDeal(dealId);
        setDeal(data);
        if (data.customerEmail) setFormData(prev => ({ ...prev, customerEmail: data.customerEmail || '' }));
        if (data.customerAddress) setFormData(prev => ({ ...prev, customerAddress: data.customerAddress || '' }));
      } catch (err) {
        console.error("Failed to fetch deal", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [dealId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setUploads(prev => [...prev, ...selectedFiles]);
    }
  };
  
  const removeUploadedFile = (index: number) => {
    setUploads(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Manual validation for file uploads
    if (uploads.length === 0) {
      alert("Please upload at least one KYC document (e.g., PAN, Aadhaar).");
      return;
    }

    if (!deal) return;
    setSubmitting(true);
    
    // Simulate file upload logic by just storing file names as dummy URLs
    const kycDocumentsUrls = uploads.map(file => URL.createObjectURL(file));

    try {
      const updateData: Partial<Deal> = {
        ...formData,
        kycDocuments: kycDocumentsUrls,
        bookingDate: new Date().toISOString(),
        bookingSubmittedViaWhatsApp: true,
        // Upgrade stage to "Account" when booking form is submitted
        stage: 'Account',
      };
      
      await api.updateDeal(deal.id, updateData);
      setSuccess(true);
    } catch (err) {
      console.error("Failed to submit booking", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!deal) return <div className="min-h-screen flex items-center justify-center">Deal not found</div>;

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-6">Thank you, {deal.customerName}. Your booking details and documents have been successfully submitted. Our team will contact you shortly.</p>
          <button 
            onClick={() => navigate('/')} 
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors w-full"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-indigo-900 p-8 text-white relative h-48 flex flex-col justify-end">
          <div className="absolute top-8 right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight mb-2">Vehicle Booking Form</h1>
            <p className="text-indigo-200 text-sm font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Secure Form for {deal.customerName}
            </p>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Selected Vehicle */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Selected Vehicle</p>
              <h3 className="text-xl font-black text-blue-900 flex items-center gap-2">
                <Car className="w-5 h-5" /> {deal.carModel}
              </h3>
              <p className="text-sm font-bold text-blue-700 mt-1">{deal.carVariant} • {deal.color}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Booking Amount</p>
              <h3 className="text-2xl font-black text-blue-900">₹{formData.bookingAmount.toLocaleString()}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Personal Details</h4>
              
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Full Name</label>
                <input type="text" disabled value={deal.customerName} className="w-full px-4 py-3 bg-gray-100 border border-transparent rounded-xl text-sm font-bold text-gray-500" />
              </div>
              
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Primary Phone</label>
                <input type="text" disabled value={deal.customerPhone} className="w-full px-4 py-3 bg-gray-100 border border-transparent rounded-xl text-sm font-bold text-gray-500" />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Email Address</label>
                <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Enter email" />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Alternate Phone</label>
                <input type="text" name="customerAltPhone" value={formData.customerAltPhone} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Optional" />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Residential Address</label>
                <textarea name="customerAddress" value={formData.customerAddress} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none h-24" placeholder="Full address" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">KYC Documents</h4>
              
              <div>
                <label className="block text-xs font-black text-gray-800 uppercase tracking-widest mb-1">PAN Number</label>
                <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all uppercase" placeholder="ABCDE1234F" />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Aadhaar Number</label>
                <input type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="1234 5678 9012" />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Upload Documents</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors bg-gray-50/50">
                  <input type="file" id="kycFiles" multiple className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
                  <label htmlFor="kycFiles" className="cursor-pointer flex flex-col items-center justify-center">
                    <Upload className="w-8 h-8 text-indigo-400 mb-3" />
                    <span className="text-sm font-bold text-indigo-600 mb-1">Click to upload documents</span>
                    <span className="text-[10px] text-gray-400">Upload PAN, Aadhaar, etc. (JPEG, PNG, or PDF max 5MB)</span>
                  </label>
                </div>
                
                {/* Uploaded Files Preview */}
                {uploads.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selected Files</p>
                    <div className="flex flex-col gap-2">
                      {uploads.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                            <span className="text-xs font-bold text-indigo-900 truncate">{file.name}</span>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => removeUploadedFile(idx)}
                            className="text-[10px] font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-end">
            <button 
              type="submit" 
              disabled={submitting}
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-black flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-gray-900/20 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {submitting ? 'Submitting...' : 'Submit Booking'}
              {!submitting && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
