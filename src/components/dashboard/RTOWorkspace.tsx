import React, { useState } from 'react';
import { Search, Filter, Gavel, FileCheck, Hash, CreditCard, ChevronRight, CheckCircle2, AlertCircle, Calculator, Car, Banknote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RTOLead, RTOStage } from '@/types/rto';

// Dummy data for RTO Leads - filtered by paymentStatus: "Cleared"
const INITIAL_LEADS: RTOLead[] = [
  {
    id: 'L-7801',
    chassisNumber: 'WDR56X901234',
    customerName: 'Rajesh Khanna',
    carModel: 'TATA Safari Dark Edition',
    paymentStatus: 'Cleared',
    registrationStage: 'Awaiting Filing',
    isFinanced: true,
    bankName: 'HDFC Bank',
    forms: { form20: true, form21: true, form22: false },
    hsrp: { isFitted: false },
    taxAmount: 185000,
  },
  {
    id: 'L-7802',
    chassisNumber: 'NXN44Z112233',
    customerName: 'Simran Jeet',
    carModel: 'TATA Nexon EV',
    paymentStatus: 'Cleared',
    registrationStage: 'Tax Paid',
    isFinanced: false,
    forms: { form20: true, form21: true, form22: true },
    hsrp: { isFitted: false },
    taxAmount: 0, // EV might have 0 tax in some states
  },
  {
    id: 'L-7803',
    chassisNumber: 'PNC99A778899',
    customerName: 'Vikram Sethi',
    carModel: 'TATA Punch',
    paymentStatus: 'Cleared',
    registrationStage: 'Number Allotted',
    isFinanced: true,
    bankName: 'SBI Finance',
    forms: { form20: true, form21: true, form22: true },
    hsrp: { laserCode: 'HSRP-X882', isFitted: false },
    taxAmount: 45000,
  },
];

const RTOWorkspace: React.FC = () => {
  const [leads, setLeads] = useState<RTOLead[]>(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<RTOLead | null>(null);

  const filteredLeads = leads.filter(l => 
    l.chassisNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const STAGES: RTOStage[] = ['Awaiting Filing', 'Tax Paid', 'Number Allotted', 'Plate Fitted'];

  const getStatusColor = (stage: RTOStage) => {
    switch (stage) {
      case 'Awaiting Filing': return 'text-amber-600 bg-amber-500/10 border-amber-500/20';
      case 'Tax Paid': return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
      case 'Number Allotted': return 'text-purple-600 bg-purple-500/10 border-purple-500/20';
      case 'Plate Fitted': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-gray-600 bg-gray-500/10 border-gray-500/20';
    }
  };

  const notifySales = (lead: RTOLead) => {
    alert(`NOTIFICATION SENT TO SALES EXECUTIVE: Vehicle ${lead.chassisNumber} [${lead.carModel}] is ready for delivery.`);
  };

  const handleStageUpdate = (id: string, nextStage: RTOStage) => {
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        const updated = { ...l, registrationStage: nextStage };
        if (nextStage === 'Plate Fitted') {
            notifySales(updated);
        }
        return updated;
      }
      return l;
    }));
    if (selectedLead?.id === id) {
        setSelectedLead(prev => prev ? ({ ...prev, registrationStage: nextStage }) : null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">RTO Management Workspace</h2>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <Gavel size={16} className="text-primary" /> Centralized Registration & Compliance Queue
          </p>
        </div>
        <div className="flex w-full md:w-auto gap-3">
            <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                    type="text" 
                    placeholder="Search by Chassis / Customer..." 
                    className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-xs font-bold focus:ring-4 ring-primary/5 outline-none shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <button className="p-3 bg-card border border-border rounded-xl shadow-sm hover:bg-muted transition-colors">
                <Filter size={18} />
            </button>
        </div>
      </div>

      {/* STAGE QUEUE TABLE */}
      <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border bg-muted/5 flex justify-between items-center">
            <h3 className="font-black text-lg tracking-tight">Stage-Based Registration Queue</h3>
            <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-amber-500" /> Awaiting
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" /> Fitted
                </span>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Vehicle Details</th>
                <th className="px-8 py-5">Customer info</th>
                <th className="px-8 py-5">Hypothecation</th>
                <th className="px-8 py-5">Current Stage</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/30 transition-all group cursor-pointer" onClick={() => setSelectedLead(lead)}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                            <Car size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{lead.carModel}</p>
                            <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase opacity-70">CH: {lead.chassisNumber}</p>
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black">{lead.customerName}</p>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 rounded-md text-[8px] font-black uppercase">PAID CLEARED</span>
                  </td>
                  <td className="px-8 py-6">
                    {lead.isFinanced ? (
                        <div className="flex items-center gap-2">
                            <Banknote size={14} className="text-primary" />
                            <span className="text-xs font-black">{lead.bankName}</span>
                        </div>
                    ) : (
                        <span className="text-xs font-bold text-muted-foreground italic uppercase opacity-50">CASH / FULL</span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(lead.registrationStage)}`}>
                        {lead.registrationStage}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-all">
                        <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROAD TAX CALCULATOR CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0f172a] p-8 rounded-[32px] text-white shadow-xl md:col-span-1 border border-white/10">
              <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/20 rounded-xl text-primary"><Calculator size={20}/></div>
                  <h4 className="font-black text-sm uppercase tracking-widest">Road Tax Estimator</h4>
              </div>
              <div className="space-y-4">
                  <div>
                      <label className="text-[10px] font-black uppercase opacity-60 block mb-2 tracking-widest">Vehicle Category</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 ring-primary/40">
                          <option>SUV</option>
                          <option>Sedan</option>
                          <option>Hatchback</option>
                      </select>
                  </div>
                  <div>
                      <label className="text-[10px] font-black uppercase opacity-60 block mb-2 tracking-widest">Fuel Type</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 ring-primary/40">
                          <option>Petrol</option>
                          <option>Diesel</option>
                          <option>Electric (EV)</option>
                      </select>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/10">
                      <p className="text-[10px] font-black opacity-50 uppercase tracking-widest">Predicted Tax Amount</p>
                      <h3 className="text-2xl font-black mt-1">₹1,42,850*</h3>
                      <p className="text-[8px] mt-2 opacity-50 italic">*Subject to state government cess</p>
                  </div>
              </div>
          </div>

          <div className="md:col-span-2 bg-card border border-border rounded-[32px] p-8 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-black text-lg tracking-tight">Plate Management (HSRP)</h3>
                    <div className="px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase">Laser Code Entry</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        {leads.filter(l => l.registrationStage === 'Number Allotted').slice(0, 2).map((l, i) => (
                            <div key={i} className="p-5 bg-muted/40 rounded-2xl border border-border">
                                <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 tracking-widest">{l.carModel}</p>
                                <div className="flex items-center gap-4 mt-3">
                                    <input 
                                        type="text" 
                                        placeholder="Laser Code..." 
                                        className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-xs font-black uppercase tracking-widest outline-none focus:ring-2 ring-primary/20"
                                        defaultValue={l.hsrp.laserCode}
                                    />
                                    <button 
                                        onClick={() => handleStageUpdate(l.id, 'Plate Fitted')}
                                        className="p-2 bg-emerald-500 text-white rounded-lg hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20"
                                    >
                                        <CheckCircle2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex flex-col justify-center items-center text-center">
                        <Hash size={40} className="text-primary opacity-20 mb-4" />
                        <h5 className="font-black text-sm uppercase tracking-widest text-[#0f172a]">Fitted Status Hub</h5>
                        <p className="text-xs text-muted-foreground mt-2 font-medium">Input HSRP laser codes to auto-notify sales for final delivery check.</p>
                    </div>
                </div>
          </div>
      </div>

      {/* SLIDE-OVER DOCUMENT REVIEW PANEL */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedLead(null)}
               className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-[101] p-8 overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-black uppercase tracking-widest">Document Review</h3>
                    <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-muted rounded-full">
                        <ChevronRight size={24} className="rotate-180" />
                    </button>
                </div>

                <div className="space-y-8">
                    <div className="p-6 bg-muted/40 rounded-3xl border border-border">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Selected Vehicle</p>
                        <h4 className="text-lg font-black">{selectedLead.carModel}</h4>
                        <p className="text-xs font-mono font-bold opacity-60 mt-1 uppercase">Chassis: {selectedLead.chassisNumber}</p>
                    </div>

                    <div className="space-y-4">
                        <h5 className="font-black text-sm uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                             <FileCheck size={18} /> Triple Form Validator
                        </h5>
                        {[
                          { id: 'form20', label: 'Form 20', desc: 'Registration Application', status: selectedLead.forms.form20 },
                          { id: 'form21', label: 'Form 21', desc: 'Sales Certificate (Sales Dept)', status: selectedLead.forms.form21 },
                          { id: 'form22', label: 'Form 22', desc: 'Roadworthiness (Manufacturer)', status: selectedLead.forms.form22 },
                        ].map((form, i) => (
                           <div key={i} className={`p-4 rounded-2xl border transition-all flex justify-between items-center ${form.status ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-destructive/5 border-destructive/20'}`}>
                               <div>
                                   <p className="text-sm font-black tracking-tight">{form.label}</p>
                                   <p className="text-[10px] font-bold text-muted-foreground opacity-70 uppercase">{form.desc}</p>
                               </div>
                               {form.status ? <CheckCircle2 className="text-emerald-500" size={20} /> : <AlertCircle className="text-destructive" size={20} />}
                           </div>
                        ))}
                    </div>

                    <div className="pt-6">
                        <button 
                            disabled={selectedLead.registrationStage === 'Plate Fitted'}
                            onClick={() => {
                                const currentIndex = STAGES.indexOf(selectedLead.registrationStage);
                                if (currentIndex < STAGES.length - 1) {
                                    handleStageUpdate(selectedLead.id, STAGES[currentIndex + 1]);
                                }
                            }}
                            className="w-full py-4 bg-[#0f172a] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:opacity-90 disabled:opacity-50 transition-all"
                        >
                            Promote to {STAGES[Math.min(STAGES.indexOf(selectedLead.registrationStage) + 1, STAGES.length - 1)]}
                        </button>
                        <p className="text-[9px] text-center mt-3 text-muted-foreground font-black uppercase tracking-tighter">
                            Next step: {STAGES[Math.min(STAGES.indexOf(selectedLead.registrationStage) + 1, STAGES.length - 1)]}
                        </p>
                    </div>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RTOWorkspace;
