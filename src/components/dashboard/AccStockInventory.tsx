import React from 'react';
import { Package, Search, Filter, ArrowUpRight, ArrowDownRight, Clock, ShieldCheck, History, ArrowRightLeft, CreditCard, Download, TrendingUp, CheckCircle2, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

const MODEL_STOCK_DATA = [
  { model: 'Fortuner', total: 42, done: 28, pending: 14, color: '#3b82f6', booming: true },
  { model: 'Safari', total: 35, done: 20, pending: 15, color: '#8b5cf6', booming: false },
  { model: 'Creta', total: 112, done: 85, pending: 27, color: '#10b981', booming: true },
  { model: 'Innova', total: 48, done: 30, pending: 18, color: '#f59e0b', booming: false },
  { model: 'Thar', total: 25, done: 10, pending: 15, color: '#f43f5e', booming: false },
  { model: 'Nexon', total: 95, done: 70, pending: 25, color: '#0ea5e9', booming: true },
];

const BILLING_TRANSACTIONS = [
  { id: 'TXN-001', customer: 'Amit Verma', car: 'Fortuner', type: 'Online', status: 'Success', amt: '₹5.0L', date: 'Today, 10:45 AM' },
  { id: 'TXN-002', customer: 'Surbhi Gupta', car: 'Hyryder', type: 'Cheque', status: 'Verified', amt: '₹1.0L', date: 'Today, 09:30 AM' },
  { id: 'TXN-003', customer: 'Karan Mehra', car: 'Innova', type: 'NEFT', status: 'Pending', amt: '₹2.5L', date: 'Yesterday' },
  { id: 'TXN-004', customer: 'Priya Mani', car: 'Tucson', type: 'Finance', status: 'Settled', amt: '₹21.0L', date: 'Yesterday' },
];

const AccStockInventory: React.FC = () => {
  const totalDone = MODEL_STOCK_DATA.reduce((acc, curr) => acc + curr.done, 0);
  const totalStock = MODEL_STOCK_DATA.reduce((acc, curr) => acc + curr.total, 0);
  const boomingModel = MODEL_STOCK_DATA.find(m => m.booming);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight uppercase tracking-widest bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Model-wise Inventory Control</h2>
          <p className="text-sm text-muted-foreground font-medium">Global stock availability, fulfillment status, and unit movement tracking</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all shadow-sm">
                <Download size={14} /> Export Stock Sheet
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/10">
                Update Store List
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-all border-b-4 border-b-primary">
             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Store Availability</p>
             <h3 className="text-4xl font-black tabular-nums">{totalStock} <span className="text-xs text-muted-foreground font-medium lowercase">Units</span></h3>
             <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-emerald-500">
                <ArrowUpRight size={12} /> +24 new inflow this week
             </div>
          </div>
          <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between border-b-4 border-b-emerald-500">
             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Inventory Done (Ready)</p>
             <h3 className="text-4xl font-black text-emerald-600 tabular-nums">{totalDone} <span className="text-xs text-muted-foreground font-medium lowercase">Ready</span></h3>
             <div className="mt-4 flex items-center gap-2 text-[10px] font-black opacity-60">
                 Efficiency: {Math.round((totalDone/totalStock)*100)}% Fulfilled
             </div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-[32px] shadow-xl text-white relative overflow-hidden">
             <Star className="absolute top-0 right-0 p-8 opacity-20 scale-150 rotate-12" size={100} />
             <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-80 underline underline-offset-4">Most Booming Model</p>
             <h3 className="text-3xl font-black uppercase tracking-tighter">{boomingModel?.model || 'Creta'}</h3>
             <div className="mt-4 bg-white/20 inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase">
                 Highest Movement Speed
             </div>
          </div>
          <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between border-b-4 border-b-[#0f172a]">
             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Stock Queue Depth</p>
             <h3 className="text-4xl font-black tabular-nums">{totalStock - totalDone} <span className="text-xs text-muted-foreground font-medium lowercase">Pending</span></h3>
             <div className="mt-4 flex items-center gap-1.5 text-[10px] font-black text-amber-600">
                 <Clock size={12} /> Avg Turnaround: 2.1 days
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border border-border rounded-[32px] p-8 shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <div>
                   <h3 className="font-black text-xl tracking-tight">Model-wise Inventory Distribution</h3>
                   <p className="text-xs text-muted-foreground font-medium mt-0.5 italic">Detailed view of stock availability per model category</p>
                </div>
                <div className="flex gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tighter">
                        <div className="w-2 h-2 rounded-full bg-primary" /> Total Stock
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tighter">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" /> Done (Ready)
                    </span>
                </div>
             </div>
             <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MODEL_STOCK_DATA} barGap={12}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis dataKey="model" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 900}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 900}} />
                        <Tooltip 
                            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                            contentStyle={{ borderRadius: '20px', border: '1px solid hsl(var(--border))' }}
                        />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[8, 8, 8, 8]} barSize={24} />
                        <Bar dataKey="done" fill="#10b981" radius={[8, 8, 8, 8]} barSize={24} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm flex flex-col justify-center">
             <h3 className="font-black text-lg tracking-tight mb-8">Ready vs Pending Ratio</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={[
                                { name: 'Done (Ready)', value: totalDone, color: '#10b981' },
                                { name: 'Pending (Queue)', value: totalStock - totalDone, color: '#f59e0b' },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={95}
                            paddingAngle={10}
                            dataKey="value"
                        >
                            <Cell fill="#10b981" />
                            <Cell fill="#f59e0b" />
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" align="center" layout="horizontal" iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-8 pt-6 border-t border-border flex justify-between items-center text-center">
                 <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60">Avg Sell-Out</p>
                    <p className="text-xl font-black tracking-tight text-primary">12.5 days</p>
                 </div>
                 <div className="w-px h-8 bg-border" />
                 <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60">Fulfillment Ratio</p>
                    <p className="text-xl font-black tracking-tight text-emerald-500">1.4x</p>
                 </div>
             </div>
          </div>
      </div>

      <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border bg-muted/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h3 className="font-black text-lg tracking-tight flex items-center gap-2">
                    <History size={20} className="text-emerald-500" /> Operational Movement & Billing Status
                </h3>
            </div>
            <div className="flex gap-3">
                <button className="px-4 py-2 bg-background border border-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all">Audit Logs</button>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input type="text" placeholder="Search models..." className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5 shadow-inner" />
                </div>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-widest">
              <tr>
                <th className="px-8 py-5">Vehicle Category (Model)</th>
                <th className="px-8 py-5">Global Units</th>
                <th className="px-8 py-5">Fulfillment (Done)</th>
                <th className="px-8 py-5 text-right">Market Boom Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MODEL_STOCK_DATA.map((item, i) => (
                <tr key={i} className={`hover:bg-muted/30 transition-all font-bold group cursor-pointer ${item.booming ? 'bg-emerald-500/5' : ''}`}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl bg-muted ${item.booming ? 'text-emerald-600' : 'text-primary'}`}>
                            <Package size={18} />
                        </div>
                        <span className="font-black text-sm group-hover:text-primary transition-colors tracking-tighter uppercase">{item.model}</span>
                        {item.booming && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-md text-[8px] font-black uppercase">BOOMING</span>}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black tabular-nums">{item.total}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-black">{item.done}</span>
                        <div className="flex-1 h-1.5 bg-muted rounded-full w-24 overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(item.done/item.total)*100}%` }} />
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                        {[...Array(5)].map((_, star) => (
                            <Star key={star} size={10} className={`${star < (item.booming ? 5 : 3) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                        ))}
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

export default AccStockInventory;
