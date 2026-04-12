import React from 'react';
import { Users2, ArrowUpRight, ArrowDownRight, Search, Filter, MoreHorizontal, ReceiptText, Clock, Wallet, Send } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const TEAM_LEADS_DATA = [
  { name: 'Team Alpha', leads: 45, conversion: '12%', color: '#3b82f6' },
  { name: 'Team Beta', leads: 32, conversion: '10%', color: '#8b5cf6' },
  { name: 'Team Gamma', leads: 58, conversion: '15%', color: '#10b981' },
  { name: 'Team Delta', leads: 28, conversion: '8%', color: '#f59e0b' },
];

const SALES_PERSON_PERFORMANCE = [
  { id: 'SP-001', name: 'Vikram Singh', leads: 12, hot: 4, warm: 5, cold: 3, target: '85%', pendingBill: 2, inProgress: 4, pendingDP: 1 },
  { id: 'SP-002', name: 'Anita Desai', leads: 15, hot: 7, warm: 6, cold: 2, target: '92%', pendingBill: 5, inProgress: 6, pendingDP: 3 },
  { id: 'SP-003', name: 'Rahul Verma', leads: 10, hot: 3, warm: 4, cold: 3, target: '78%', pendingBill: 1, inProgress: 3, pendingDP: 2 },
  { id: 'SP-004', name: 'Meera Joshi', leads: 14, hot: 6, warm: 5, cold: 3, target: '88%', pendingBill: 3, inProgress: 5, pendingDP: 2 },
];

const AccSalesLeads: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight uppercase tracking-widest">Sales & Dept Lead Pipeline</h2>
          <p className="text-sm text-muted-foreground font-medium">Monitoring departmental flow, billing status, and down payment progress</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-xl text-xs font-bold hover:bg-muted transition-all shadow-sm">
            <Filter size={14} /> Filter Depts
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Notify All Sales
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all border-b-4 border-b-blue-500">
             <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-blue-500/10 rounded-xl text-blue-600">
                    <ReceiptText size={20} />
                 </div>
                 <span className="text-[10px] font-black text-blue-600 bg-blue-500/10 px-2 py-1 rounded-full">ACTION REQUIRED</span>
             </div>
             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Bills Pending</p>
             <h3 className="text-3xl font-black mt-1">11 <span className="text-xs font-medium text-muted-foreground tracking-normal block mt-1 italic">Awaiting verification</span></h3>
          </div>
          <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all border-b-4 border-b-amber-500">
             <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600">
                    <Clock size={20} />
                 </div>
                 <span className="text-[10px] font-black text-amber-600 bg-amber-500/10 px-2 py-1 rounded-full">IN PROGRESS</span>
             </div>
             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Flow In-Progress</p>
             <h3 className="text-3xl font-black mt-1">18 <span className="text-xs font-medium text-muted-foreground tracking-normal block mt-1 italic">Dept transitions active</span></h3>
          </div>
          <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all border-b-4 border-b-emerald-500">
             <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600">
                    <Wallet size={20} />
                 </div>
                 <span className="text-[10px] font-black text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">COLLECTIONS</span>
             </div>
             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Pending DP</p>
             <h3 className="text-3xl font-black mt-1">₹8.5 L <span className="text-xs font-medium text-muted-foreground tracking-normal block mt-1 italic">8 items overdue</span></h3>
          </div>
          <div className="bg-[#0f172a] p-6 rounded-[32px] shadow-xl text-white">
             <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-white/10 rounded-xl text-primary">
                    <Users2 size={20} />
                 </div>
                 <span className="text-[10px] font-black text-primary bg-primary/20 px-2 py-1 rounded-full">GLOBAL INFLOW</span>
             </div>
             <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">Total Sales Leads</p>
             <h3 className="text-3xl font-black mt-1">163 <span className="text-[10px] font-bold text-emerald-400 block mt-1 italic">+12 this week</span></h3>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-lg tracking-tight">Departmental Lead Source</h3>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-black text-muted-foreground tracking-widest">
                <div className="w-2 h-2 rounded-full bg-primary" /> Active Queue
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TEAM_LEADS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }} />
                <Bar dataKey="leads" radius={[8, 8, 8, 8]} barSize={32}>
                  {TEAM_LEADS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-border bg-muted/20">
                <h3 className="font-black text-lg tracking-tight">Staff Billing Summary</h3>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
                <div className="grid grid-cols-1 divide-y divide-border">
                    {SALES_PERSON_PERFORMANCE.map((person, i) => (
                        <div key={i} className="p-6 hover:bg-muted/30 transition-all group flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-sm font-black group-hover:text-primary transition-colors">{person.name}</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">{person.id}</span>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="text-center">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase opacity-60">Bill Pend.</p>
                                    <p className="text-xs font-black text-blue-600">{person.pendingBill}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase opacity-60">In Prog.</p>
                                    <p className="text-xs font-black text-amber-600">{person.inProgress}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase opacity-60">DP Pend.</p>
                                    <p className="text-xs font-black text-emerald-600">{person.pendingDP}</p>
                                </div>
                                <button className="p-2 hover:bg-primary/10 rounded-full text-muted-foreground hover:text-primary transition-all">
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-4 bg-muted/50 border-t border-border flex justify-center">
                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View Consolidated Ledger</button>
            </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border flex justify-between items-center bg-muted/10">
            <h3 className="font-black text-lg tracking-tight uppercase tracking-widest">Active Sales Pipeline (Full Analysis)</h3>
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input type="text" placeholder="Search Exec..." className="pl-9 pr-4 py-2 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5 shadow-inner" />
                </div>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-widest">
              <tr>
                <th className="px-8 py-5">Sales Executive</th>
                <th className="px-8 py-5">Global Leads</th>
                <th className="px-8 py-5">Dept distribution</th>
                <th className="px-8 py-5 text-right">Target Efficiency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {SALES_PERSON_PERFORMANCE.map((person, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black uppercase">{person.name[0]}</div>
                        <span className="font-black text-sm group-hover:text-primary transition-colors">{person.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-black text-sm tabular-nums">{person.leads}</td>
                  <td className="px-8 py-6">
                    <div className="flex gap-1.5">
                        <span className="px-2 py-0.5 bg-red-500/10 text-red-600 rounded-md text-[8px] font-black uppercase">HOT: {person.hot}</span>
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded-md text-[8px] font-black uppercase">WARM: {person.warm}</span>
                        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 rounded-md text-[8px] font-black uppercase">COLD: {person.cold}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center gap-2 justify-end">
                        <span className="text-[10px] font-black tabular-nums">{person.target}</span>
                        <div className="w-16 h-1.5 bg-muted rounded-full">
                            <div className="h-full bg-primary rounded-full" style={{ width: person.target }} />
                        </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccSalesLeads;
