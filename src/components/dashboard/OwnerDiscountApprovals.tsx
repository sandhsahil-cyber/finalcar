import React from 'react';
import { Flame, DollarSign, UserCheck, AlertTriangle, CheckCircle2, XCircle, Search, Filter, Shield, ChevronRight, Zap } from 'lucide-react';

const APPROVAL_REQUESTS = [
  { id: 'REQ-992', manager: 'Amit V.', model: 'Safari Adventure', bookingVal: '₹24,50,000', requestedDisc: '₹45,000', marginImpact: '-2.1%', reason: 'Bulk Corporate Lead (Adani Group)', urgency: 'High' },
  { id: 'REQ-1004', manager: 'Suresh K.', model: 'Nexon EV Empowered', bookingVal: '₹19,20,000', requestedDisc: '₹25,000', marginImpact: '-1.4%', reason: 'Loyalty Upgrade (Repeat Customer)', urgency: 'Normal' },
  { id: 'REQ-1012', manager: 'Priya S.', model: 'Punch Creative', bookingVal: '₹9,80,000', requestedDisc: '₹12,000', marginImpact: '-1.1%', reason: 'Competition Price Match (Maruti)', urgency: 'Immediate' },
];

const OwnerDiscountApprovals: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 bg-[#020617] -m-6 p-10 min-h-screen text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight uppercase text-white italic">Strategic Price & Discount Governance</h2>
          <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <Shield size={16} className="text-blue-500" /> High-Authority Approval Queue for Net Margin Preservation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
              { label: 'MTD Total Discounts', value: '₹12.84L', sub: 'Target: <₹10L', status: 'Warning' },
              { label: 'Avg Disc per Unit', value: '₹14,200', sub: '+12% vs LY', status: 'Critical' },
              { label: 'Discount/Payout Ratio', value: '1.42x', sub: 'Balanced at 1.0x', status: 'Healthy' },
          ].map((stat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[40px] shadow-sm relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.status === 'Critical' ? 'rose' : stat.status === 'Warning' ? 'amber' : 'emerald'}-500/5 blur-[60px] rounded-full`} />
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">{stat.label}</p>
                  <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums mb-4">{stat.value}</h3>
                  <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.sub}</span>
                      <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${stat.status === 'Critical' ? 'bg-rose-500/10 text-rose-500' : stat.status === 'Warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>{stat.status}</span>
                  </div>
              </div>
          ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[40px] overflow-hidden">
           <div className="p-10 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
                <h4 className="text-xl font-black text-white uppercase tracking-tight">Pending Escalations ({APPROVAL_REQUESTS.length})</h4>
                <div className="flex gap-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                        <input type="text" placeholder="Search Request ID..." className="pl-10 pr-4 py-2 bg-slate-800 border-none rounded-xl text-[10px] font-black text-white outline-none focus:ring-2 ring-blue-500 w-48" />
                     </div>
                </div>
           </div>
           <div className="p-10 space-y-8">
                {APPROVAL_REQUESTS.map((req, i) => (
                    <div key={i} className="bg-[#0f172a] border border-slate-700/50 rounded-[32px] p-8 flex flex-col xl:flex-row items-center gap-10 hover:border-blue-500/30 transition-all group overflow-hidden relative">
                         <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${req.urgency === 'Immediate' ? 'bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.5)]' : req.urgency === 'High' ? 'bg-amber-500' : 'bg-slate-700'}`} />
                         
                         <div className="flex-1 w-full xl:w-auto">
                              <div className="flex items-center gap-4 mb-4">
                                   <div className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest">{req.id}</div>
                                   <div className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${req.urgency === 'Immediate' ? 'bg-rose-500/10 text-rose-500 animate-pulse' : 'bg-slate-700 text-slate-400'}`}>{req.urgency}</div>
                              </div>
                              <h5 className="text-2xl font-black text-white tracking-tighter uppercase mb-2">{req.model}</h5>
                              <p className="text-[11px] font-medium text-slate-400 leading-relaxed max-w-lg mb-6 leading-relaxed bg-slate-800/20 p-4 rounded-2xl italic">" {req.reason} "</p>
                              <div className="flex flex-wrap gap-10">
                                   <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Requested By</p>
                                        <div className="flex items-center gap-2">
                                             <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-black">AV</div>
                                             <p className="text-sm font-black text-white uppercase">{req.manager}</p>
                                        </div>
                                   </div>
                                   <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Booking Value</p>
                                        <p className="text-sm font-black text-white italic">{req.bookingVal}</p>
                                   </div>
                                   <div>
                                        <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Disc. Request</p>
                                        <p className="text-sm font-black text-rose-500 italic">{req.requestedDisc}</p>
                                   </div>
                                   <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact on GP</p>
                                        <p className="text-sm font-black text-amber-500 italic">{req.marginImpact}</p>
                                   </div>
                              </div>
                         </div>

                         <div className="flex flex-row xl:flex-col gap-4 w-full xl:w-48 relative z-10">
                              <button className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/10 group-hover:scale-105 active:scale-95">
                                   <CheckCircle2 size={16} /> Approve
                              </button>
                              <button className="flex-1 py-4 bg-slate-800 text-slate-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-500/10 hover:text-rose-500 transition-all flex items-center justify-center gap-3 group-hover:scale-105 active:scale-95">
                                   <XCircle size={16} /> Reject
                              </button>
                         </div>
                    </div>
                ))}
           </div>
      </div>
    </div>
  );
};

export default OwnerDiscountApprovals;
