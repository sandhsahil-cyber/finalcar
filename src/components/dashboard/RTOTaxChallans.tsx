import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownRight, Printer, Download, Filter, Search, MoreHorizontal, Landmark } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TAX_DATA = [
  { month: 'Jan', amount: 12.4 },
  { month: 'Feb', amount: 15.8 },
  { month: 'Mar', amount: 14.2 },
  { month: 'Apr', amount: 18.5 },
  { month: 'May', amount: 16.9 },
  { month: 'Jun', amount: 22.4 },
];

const TRANSACTIONS = [
  { id: 'TXN-901', customer: 'Rajesh Khanna', model: 'Safari', type: 'Road Tax', amount: '₹1,85,000', status: 'Success', date: 'Today, 10:45 AM' },
  { id: 'TXN-902', customer: 'Simran Jeet', model: 'Nexon EV', type: 'Counter Tax', amount: '₹5,200', status: 'Pending', date: 'Today, 09:30 AM' },
  { id: 'TXN-903', customer: 'Vikram Sethi', model: 'Punch', type: 'Challan', amount: '₹1,200', status: 'Success', date: 'Yesterday' },
];

const RTOTaxChallans: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight uppercase">Tax & Challan Tracking</h2>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <Landmark size={14} className="text-primary" /> Road Tax Receipts & Government Disbursement Log
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-xl text-xs font-bold hover:bg-muted transition-all shadow-sm">
            <Printer size={14} /> Batch Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Export GST/Tax Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0f172a] p-6 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
                <CreditCard size={80} />
             </div>
             <p className="text-[10px] font-black opacity-60 uppercase tracking-widest relative z-10">Net Tax Disbursement</p>
             <h3 className="text-4xl font-black mt-1 relative z-10">₹42.8 L</h3>
             <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-emerald-400 relative z-10">
                <ArrowUpRight size={12} /> 14% increase from last quarter
             </div>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between">
             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Pending Payments</p>
             <h4 className="text-2xl font-black mt-1">₹8.45 L</h4>
             <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[65%]" />
                </div>
                <span className="text-[10px] font-black">12 files pending</span>
             </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between">
             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Avg Tax / Unit</p>
             <h4 className="text-2xl font-black mt-1">₹68,200</h4>
             <p className="mt-4 text-[10px] font-bold text-muted-foreground opacity-60 italic">Based on latest SUV/Sedan mix</p>
          </div>
      </div>

      <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm">
          <h3 className="font-black text-lg tracking-tight mb-8">Disbursement Trend (Lakhs)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TAX_DATA}>
                <defs>
                  <linearGradient id="colorTax" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 800}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 800}} />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorTax)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
      </div>

      <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border flex justify-between items-center bg-muted/20">
            <h3 className="font-black text-lg tracking-tight uppercase tracking-widest">Transaction History</h3>
            <div className="flex gap-3">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input type="text" placeholder="Search txns..." className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5 shadow-inner" />
                </div>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-widest">
              <tr>
                <th className="px-8 py-5">TXN ID</th>
                <th className="px-8 py-5">Customer & Model</th>
                <th className="px-8 py-5">Type</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {TRANSACTIONS.map((txn, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-all font-bold group cursor-pointer">
                  <td className="px-8 py-6 text-muted-foreground text-xs font-mono">{txn.id}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{txn.customer}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Model: {txn.model}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black bg-muted px-2 py-1 rounded-md uppercase tracking-tighter border border-border">{txn.type}</span>
                  </td>
                  <td className="px-8 py-6 text-sm font-black tabular-nums">{txn.amount}</td>
                  <td className="px-8 py-6">
                    <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-tight ${
                        txn.status === 'Success' ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10 animate-pulse'
                    }`}>
                        {txn.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right text-muted-foreground text-[10px] font-black uppercase">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RTOTaxChallans;
