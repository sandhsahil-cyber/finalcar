import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, ArrowRight, CheckCircle2, AlertCircle, FileText, Send, Upload, Trash2, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InsuranceLead, PolicyStage } from '@/types/insurance';

const INITIAL_INS_LEADS: InsuranceLead[] = [
  {
    id: 'INS-001',
    customerName: 'Aman Sharma',
    carModel: 'TATA Harrier Fearless',
    engineNumber: 'KRYO-170-A1',
    chassisNumber: 'WDR56X901XXX',
    stage: 'Quote Requested',
    premiumAmount: 48500,
    idv: 2245000,
    ncbTransfer: 20,
    addOns: { zeroDep: true, engineProtect: false, returnToInvoice: true, consumables: true },
    cashlessTieUp: true,
  },
  {
    id: 'INS-002',
    customerName: 'Priya Verma',
    carModel: 'TATA Nexon EV',
    engineNumber: 'EV-BAT-X1',
    chassisNumber: 'NXN44Z112XXX',
    stage: 'Premium Paid',
    premiumAmount: 32000,
    idv: 1450000,
    ncbTransfer: 0,
    addOns: { zeroDep: true, engineProtect: true, returnToInvoice: false, consumables: false },
    cashlessTieUp: true,
    provider: 'Tata AIG',
  },
];

const InsurancePolicyIssuance: React.FC = () => {
  const [leads, setLeads] = useState<InsuranceLead[]>(INITIAL_INS_LEADS);
  const [selectedLead, setSelectedLead] = useState<InsuranceLead | null>(null);

  const getStageColor = (stage: PolicyStage) => {
    switch (stage) {
      case 'Quote Requested': return 'text-amber-600 bg-amber-500/10 border-amber-500/20';
      case 'Premium Paid': return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
      case 'Policy Issued': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20';
      case 'Soft Copy Sent': return 'text-purple-600 bg-purple-500/10 border-purple-500/20';
      default: return 'text-gray-600 bg-gray-500/10';
    }
  };

  const handlePushToRTO = (lead: InsuranceLead) => {
    alert(`PUSHED TO RTO: Policy ${lead.policyNumber} for ${lead.chassisNumber} mapped to RTO Document Vault.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">New Policy Issuance Hub</h2>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" /> New Vehicle Comprehensive Insurance Worklist
          </p>
        </div>
        <div className="flex gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search by VIN / Customer..." className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-xs font-bold focus:ring-4 ring-primary/5 outline-none shadow-sm" />
            </div>
            <button className="p-3 bg-card border border-border rounded-xl shadow-sm hover:bg-muted transition-colors"><Filter size={18} /></button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border bg-muted/5 flex justify-between items-center">
            <h3 className="font-black text-lg tracking-tight">Policy Lifecycle Management</h3>
            <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" /> Policy Live
                </span>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Customer & Assets</th>
                <th className="px-8 py-5">Ins. Provider</th>
                <th className="px-8 py-5">Premium Value</th>
                <th className="px-8 py-5">Current Stage</th>
                <th className="px-8 py-5 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/30 transition-all group cursor-pointer" onClick={() => setSelectedLead(lead)}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/5 text-emerald-600 flex items-center justify-center">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{lead.customerName}</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">{lead.carModel}</p>
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {lead.provider ? (
                        <span className="text-xs font-black uppercase tracking-tighter bg-muted px-2 py-1 rounded-md border border-border">{lead.provider}</span>
                    ) : (
                        <span className="text-xs font-bold text-muted-foreground opacity-50 italic">Quote Stage</span>
                    )}
                  </td>
                  <td className="px-8 py-6 font-black text-sm tabular-nums text-foreground">
                    ₹{lead.premiumAmount.toLocaleString()}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStageColor(lead.stage)}`}>
                        {lead.stage}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-muted rounded-full transition-all text-muted-foreground">
                        <ArrowRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedLead && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <motion.div 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                 className="xl:col-span-2 bg-card border border-border rounded-[32px] p-8 shadow-sm flex flex-col"
              >
                  <div className="flex justify-between items-center mb-8 pb-6 border-b border-border border-dashed">
                      <div>
                          <h3 className="font-black text-xl tracking-tight">Coverage Checklist & IDV</h3>
                          <p className="text-xs text-muted-foreground font-medium uppercase mt-1">VIN: {selectedLead.chassisNumber}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${selectedLead.cashlessTieUp ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
                          {selectedLead.cashlessTieUp ? 'Cashless Tie-up Active' : 'Non-Cashless'}
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                          <div>
                              <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-1">Calculated IDV (Sum Insured)</label>
                              <p className="text-2xl font-black text-foreground">₹{selectedLead.idv.toLocaleString()}</p>
                              <p className="text-[9px] font-bold text-muted-foreground opacity-50 italic mt-1">*95% of Ex-Showroom Invoice Value</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-muted/30 rounded-2xl border border-border">
                                  <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">NCB Transfer</p>
                                  <p className="text-lg font-black">{selectedLead.ncbTransfer}%</p>
                              </div>
                              <div className="p-4 bg-muted/30 rounded-2xl border border-border">
                                  <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Net Premium</p>
                                  <p className="text-lg font-black text-emerald-600">₹{selectedLead.premiumAmount.toLocaleString()}</p>
                              </div>
                          </div>

                          <div className="pt-4 space-y-3">
                                <h5 className="text-[11px] font-black uppercase tracking-widest text-primary mb-2">Policy Add-Ons Verified</h5>
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(selectedLead.addOns).map(([key, active]) => (
                                        <div key={key} className={`px-3 py-2 rounded-xl border text-[10px] font-black uppercase flex items-center justify-between ${active ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-muted/20 border-border text-muted-foreground opacity-40'}`}>
                                            {key.replace(/([A-Z])/g, ' $1')}
                                            {active && <CheckCircle2 size={12} />}
                                        </div>
                                    ))}
                                </div>
                          </div>
                      </div>

                      <div className="bg-[#0f172a] p-8 rounded-[32px] text-white flex flex-col justify-between">
                          <div>
                            <h4 className="font-black text-sm uppercase tracking-widest mb-6">Policy Generation Control</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[9px] font-black opacity-50 uppercase tracking-widest block mb-2">Policy / Cover Note No.</label>
                                    <input type="text" placeholder="Enter Digit/Tata-AIG No." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 ring-primary/40" />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black opacity-50 uppercase tracking-widest block mb-2">Issuance Date</label>
                                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 ring-primary/40 color-scheme-dark" />
                                </div>
                            </div>
                          </div>

                          <div className="pt-8 space-y-3">
                             <button 
                                onClick={() => handlePushToRTO(selectedLead)}
                                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                             >
                                <Send size={14} /> Issue & Push to RTO Vault
                             </button>
                             <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                                <Smartphone size={14} /> Send Payment Link (SMS)
                             </button>
                          </div>
                      </div>
                  </div>
              </motion.div>

              <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm h-full flex flex-col overflow-hidden">
                  <h3 className="font-black text-lg tracking-tight mb-8">Asset & Engine Verification</h3>
                  <div className="space-y-6 flex-1">
                      <div className="w-full h-48 bg-muted/50 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-6 group cursor-pointer hover:border-primary/50 transition-all">
                          <Upload className="text-muted-foreground group-hover:text-primary transition-colors mb-4" size={32} />
                          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Upload Inspection Photos</p>
                          <p className="text-[9px] font-bold text-muted-foreground opacity-50 mt-1 italic">(Optional for New Cars)</p>
                      </div>

                      <div className="space-y-4">
                          <div className="flex justify-between items-center py-2 border-b border-border">
                              <span className="text-[10px] font-black text-muted-foreground uppercase">Engine No.</span>
                              <span className="text-xs font-black font-mono">{selectedLead.engineNumber}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border">
                              <span className="text-[10px] font-black text-muted-foreground uppercase">IDV Verified</span>
                              <CheckCircle2 size={16} className="text-emerald-500" />
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border">
                              <span className="text-[10px] font-black text-muted-foreground uppercase">Sales Handshake</span>
                              <ShieldCheck size={16} className="text-blue-500" />
                          </div>
                      </div>
                  </div>
                  <button className="mt-8 text-[10px] font-black uppercase tracking-widest text-destructive flex items-center justify-center gap-2 hover:underline">
                      <Trash2 size={14} /> Cancel Selection
                  </button>
              </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InsurancePolicyIssuance;
