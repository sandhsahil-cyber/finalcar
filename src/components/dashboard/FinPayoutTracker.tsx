import React from 'react';
import { PieChart, Search, Filter, TrendingUp, ArrowUpRight, CheckCircle2, MoreHorizontal, History, Banknote, Landmark, Target, Wallet } from 'lucide-react';
import { PayoutRecord } from '@/types/finance';

const PAYOUTS: PayoutRecord[] = [
  { id: 'PY-001', customerName: 'Ranbir Kapoor', bankName: 'HDFC Bank', loanAmount: 1450000, commissionPercent: 1.25, payoutAmount: 18125, status: 'Reconciled' },
  { id: 'PY-002', customerName: 'Deepika P.', bankName: 'SBI', loanAmount: 850000, commissionPercent: 0.85, payoutAmount: 7225, status: 'Received' },
  { id: 'PY-003', customerName: 'Shahrukh Khan', bankName: 'ICICI Bank', loanAmount: 2200000, commissionPercent: 1.5, payoutAmount: 33000, status: 'Pending' },
];

const FinPayoutTracker: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">Commission & Payout Tracker</h2>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <PieChart size={16} className="text-primary" /> Multi-Bank Brokerage Reconciliation & Revenue Audit
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            Download Payout Ledger
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
              { label: 'Pending Payouts', value: '₹1.28L', sub: '14 Active cases', color: 'text-amber-500', icon: <History size={20}/> },
              { label: 'Received (MTD)', value: '₹3.42L', sub: 'Last 30 days', color: 'text-emerald-500', icon: <Wallet size={20}/> },
              { label: 'Avg Payout Rate', value: '1.32%', sub: 'Dealer incentive', color: 'text-blue-500', icon: <Target size={20}/> },
              { label: 'Revenue Target', value: '74%', sub: '₹4.5L vs ₹6L', color: 'text-purple-500', icon: <TrendingUp size={20}/> },
          ].map((stat, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between hover:translate-y-[-4px] transition-all">
                  <div className={`p-2 rounded-xl mb-4 inline-block bg-muted ${stat.color}`}>
                      {stat.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    <h3 className="text-2xl font-black text-foreground tabular-nums mt-1">{stat.value}</h3>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border border-dashed">
                      <p className="text-[9px] font-bold text-muted-foreground tracking-tight opacity-60 uppercase">{stat.sub}</p>
                  </div>
              </div>
          ))}
      </div>

      <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border bg-muted/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="font-black text-lg tracking-tight uppercase">Bank Payout Pipeline</h3>
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="POI Number / Bank / Lead..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5 shadow-inner" />
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Payout ID / Customer</th>
                <th className="px-8 py-5">Financier</th>
                <th className="px-8 py-5">Loan Calculation</th>
                <th className="px-8 py-5">Commission</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Ledger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {PAYOUTS.map((py, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-all group font-bold">
                  <td className="px-8 py-6">
                    <p className="text-[9px] font-mono text-muted-foreground uppercase opacity-70 italic tracking-tighter mb-1">{py.id}</p>
                    <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{py.customerName}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg"><Landmark size={14}/></div>
                        <p className="text-sm font-black">{py.bankName}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[11px] font-black tracking-tight">₹{py.loanAmount.toLocaleString()}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">Basis: Disbursement</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-primary">₹{py.payoutAmount.toLocaleString()}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60 tracking-widest">{py.commissionPercent}% Payout Rate</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                        <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            py.status === 'Reconciled' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                            py.status === 'Received' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                            'bg-amber-500/10 text-amber-600 border-amber-500/20 animate-pulse'
                        }`}>
                            {py.status}
                        </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-all">
                        <ArrowUpRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#0f172a] p-12 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 scale-[2] pointer-events-none group-hover:rotate-6 transition-transform duration-700">
                  <PieChart size={200} />
              </div>
              <div className="relative z-10 max-w-lg">
                  <h3 className="text-2xl font-black tracking-tight mb-4">Payout Discrepancy Alert</h3>
                  <p className="text-sm text-white/50 leading-relaxed font-medium mb-10">
                      The system has flagged **2 cases** where the disbursement from ICICI Bank does not match the expected payout rate of 1.5%. 
                      Please review the "Bank Confirmation Letter" and update the ledger.
                  </p>
                  <button className="px-8 py-4 bg-white text-[#0f172a] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:opacity-90">
                      Initiate Reconciliation
                  </button>
              </div>
          </div>

          <div className="bg-card border border-border p-12 rounded-[40px] shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-emerald-500 rounded-3xl text-white shadow-xl shadow-emerald-500/30">
                      <Banknote size={28} />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight uppercase">Month-End Revenue</h3>
              </div>
              <div className="grid grid-cols-2 gap-8 mb-10 border-b border-border border-dashed pb-10">
                  <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Finance Commission</p>
                      <h4 className="text-3xl font-black tracking-tighter">₹4,82,500</h4>
                      <div className="flex items-center gap-1 text-[9px] font-black text-emerald-500 mt-2">
                          <TrendingUp size={12}/> +12.4% vs Prev Month
                      </div>
                  </div>
                  <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Interests/PF Splits</p>
                      <h4 className="text-3xl font-black tracking-tighter text-muted-foreground opacity-50">₹84,200</h4>
                  </div>
              </div>
              <div className="flex gap-4">
                  <button className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:underline">
                      View Full Quarterly Audit <MoreHorizontal size={14}/>
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default FinPayoutTracker;
