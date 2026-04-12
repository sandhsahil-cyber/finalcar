import React from 'react';
import { Umbrella, Search, Filter, AlertCircle, CheckCircle2, MoreHorizontal, Clock, Wrench, FileText, ArrowUpRight, ShieldCheck, Landmark } from 'lucide-react';
import { ClaimRecord } from '@/types/insurance';

const ACTIVE_CLAIMS: ClaimRecord[] = [
  { id: 'CLM-001', policyNumber: 'DGT-882200-X', customerName: 'Ranbir Kapoor', carModel: 'Safari Dark', claimDate: 'Today', estimatedAmount: 145000, approvalStatus: 'In-Progress', garageType: 'Cashless' },
  { id: 'CLM-002', policyNumber: 'TATA-AIG-1122', customerName: 'Deepika P.', carModel: 'Nexon EV', claimDate: 'Yesterday', estimatedAmount: 12000, approvalStatus: 'Approved', garageType: 'Cashless' },
  { id: 'CLM-003', policyNumber: 'ICICI-LOM-7788', customerName: 'Shahrukh Khan', carModel: 'Harrier', claimDate: '2 Days ago', estimatedAmount: 4500, approvalStatus: 'Pending', garageType: 'Reimbursement' },
];

const InsuranceClaimsDesk: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">Claims & Garage Desk</h2>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <Umbrella size={16} className="text-destructive" /> Cashless Approvals & Accident Repair Coordination
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-destructive text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-destructive/20 hover:opacity-90 transition-all">
            Intimate New Claim
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
              { label: 'Active Claims', value: '14', icon: <Wrench size={18}/>, color: 'text-primary' },
              { label: 'Avg Approval', value: '4.2h', icon: <Clock size={18}/>, color: 'text-amber-500' },
              { label: 'Cashless Ratio', value: '92%', icon: <ShieldCheck size={18}/>, color: 'text-emerald-500' },
              { label: 'Pending Payouts', value: '₹12.8L', icon: <Landmark size={18}/>, color: 'text-blue-500' },
          ].map((stat, i) => (
              <div key={i} className="bg-card border border-border p-5 rounded-[32px] shadow-sm hover:translate-y-[-2px] transition-all">
                  <div className={`p-2 rounded-xl mb-4 inline-block bg-muted ${stat.color}`}>
                      {stat.icon}
                  </div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-black text-foreground tabular-nums mt-1">{stat.value}</h3>
              </div>
          ))}
      </div>

      <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border bg-muted/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="font-black text-lg tracking-tight uppercase">Live Claim Pipeline</h3>
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Policy No / VIN / Name..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5" />
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Claim ID / Policy</th>
                <th className="px-8 py-5">Customer & Model</th>
                <th className="px-8 py-5">Repair Estimate</th>
                <th className="px-8 py-5">Type</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ACTIVE_CLAIMS.map((claim, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-all group font-bold">
                  <td className="px-8 py-6">
                    <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{claim.id}</p>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase opacity-70 italic">{claim.policyNumber}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black">{claim.customerName}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-tighter">Model: {claim.carModel}</p>
                  </td>
                  <td className="px-8 py-6 text-sm font-black tabular-nums">
                    ₹{claim.estimatedAmount.toLocaleString()}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                        claim.garageType === 'Cashless' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-muted text-muted-foreground border-border'
                    }`}>
                        {claim.garageType}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                        <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            claim.approvalStatus === 'Approved' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                            claim.approvalStatus === 'In-Progress' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20 animate-pulse' :
                            'bg-destructive/10 text-destructive border-destructive/20'
                        }`}>
                            {claim.approvalStatus}
                        </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <button title="View Photos" className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-primary transition-all"><FileText size={16} /></button>
                        <button title="Showroom Audit" className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-primary transition-all"><ArrowUpRight size={16} /></button>
                        <button className="p-2 hover:bg-muted rounded-full text-muted-foreground"><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border border-border p-10 rounded-[40px] shadow-sm flex flex-col md:flex-row items-center gap-10 overflow-hidden relative group">
              <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                  <Wrench size={300} />
              </div>
              <div className="flex-1 space-y-6 relative z-10">
                  <h3 className="text-2xl font-black tracking-tight">Workshop Coordination Hub</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                      Our insurance desk works directly with the service floor to ensure cashless approval files are submitted within **6 hours** of vehicle entry.
                  </p>
                  <div className="flex gap-4">
                      <div className="bg-destructive/5 text-destructive px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-destructive/10">
                          Accident Desk Line: +91 9988 7766 55
                      </div>
                  </div>
              </div>
              <div className="w-full md:w-auto bg-[#0f172a] p-8 rounded-[32px] text-white text-center shadow-xl relative z-10">
                  <ShieldCheck size={40} className="text-primary mx-auto mb-4" />
                  <p className="text-xs font-black uppercase tracking-widest opacity-60">Avg Settlement</p>
                  <h4 className="text-3xl font-black mt-1">4.2 Days</h4>
                  <p className="text-[9px] mt-2 italic font-serif">Surveyor turnaround time (Avg)</p>
              </div>
          </div>

          <div className="bg-card border border-border p-8 rounded-[40px] shadow-sm flex flex-col justify-center items-center text-center">
             <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-6">
                <AlertCircle size={32} />
             </div>
             <h4 className="text-xl font-black tracking-tight">Rejected Claims Review</h4>
             <p className="text-xs text-muted-foreground mt-2 font-medium">Analyze rejection reasons for current month's files to improve compliance.</p>
             <button className="w-full mt-8 py-4 bg-muted text-muted-foreground rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#0f172a] hover:text-white transition-all">
                Access Rejection Log
             </button>
          </div>
      </div>
    </div>
  );
};

export default InsuranceClaimsDesk;
