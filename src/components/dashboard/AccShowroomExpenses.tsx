import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Filter, Download, Zap, Fuel, Droplet, Hammer, Truck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const EXPENSE_CATEGORIES = [
  { name: 'Fixed (Rent/EMI)', value: 35, color: '#3b82f6' },
  { name: 'Vehicle Readiness (PDI)', value: 25, color: '#10b981' },
  { name: 'Utilities & Bills', value: 15, color: '#f59e0b' },
  { name: 'Showroom Ops (Fuel/Wash)', value: 15, color: '#8b5cf6' },
  { name: 'Admin & Staffing', value: 10, color: '#f43f5e' },
];

const SHOWROOM_DAILY_EXPENSES = [
  { id: 'EXP-101', item: 'Electricity (Light Bill)', category: 'Utilities', cost: '₹42,500', status: 'Paid', date: '2024-04-10', icon: <Zap size={14}/> },
  { id: 'EXP-102', item: 'Staff Transport Fuel', category: 'Showroom Ops', cost: '₹12,400', status: 'Approved', date: '2024-04-11', icon: <Fuel size={14}/> },
  { id: 'EXP-103', item: 'Car Washing & Wax (Ext)', category: 'Vehicle Readiness', cost: '₹18,000', status: 'Paid', date: '2024-04-08', icon: <Droplet size={14}/> },
  { id: 'EXP-104', item: 'Car Build & Acc Prep', category: 'Vehicle Readiness', cost: '₹1,45,000', status: 'Completed', date: '2024-04-12', icon: <Hammer size={14}/> },
  { id: 'EXP-105', item: 'Ready to Road (Full Detailing)', category: 'Vehicle Readiness', cost: '₹22,000', status: 'Pending', date: '2024-04-12', icon: <Truck size={14}/> },
  { id: 'EXP-106', item: 'Floor Refreshments', category: 'Admin', cost: '₹8,500', status: 'Paid', date: '2024-04-09', icon: <Wallet size={14}/> },
];

const MONTHLY_EXPENSE_TREND = [
  { month: 'Jan', amount: 15 },
  { month: 'Feb', amount: 18 },
  { month: 'Mar', amount: 16 },
  { month: 'Apr', amount: 22 },
  { month: 'May', amount: 19 },
  { month: 'Jun', amount: 25 },
];

const AccShowroomExpenses: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight uppercase tracking-[0.05em]">Showroom Operational Expenses</h2>
          <p className="text-sm text-muted-foreground font-medium">Monitoring utility bills, fuel, detailing, and vehicle readiness costs</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-xl text-xs font-bold hover:bg-muted transition-all">
            <Download size={14} /> Download Ledger
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Post New Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0f172a] p-6 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
                <TrendingUp size={80} />
             </div>
             <div className="relative z-10 flex justify-between items-start">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                    <Wallet size={20} />
                </div>
                <span className="text-[10px] font-black bg-emerald-500 px-2 py-1 rounded-full uppercase">Operational</span>
             </div>
             <div className="relative z-10 mt-8">
                <p className="text-xs font-bold opacity-60 uppercase tracking-widest">Global Showroom Spend</p>
                <h3 className="text-4xl font-black mt-1">₹8.42 L <span className="text-xs opacity-50 font-medium tracking-normal text-white/50">/ mo</span></h3>
                <p className="text-[10px] mt-4 font-bold flex items-center gap-1 text-emerald-400">
                    <ArrowUpRight size={12} /> Forecast: +8% utility efficiency
                </p>
             </div>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between border-l-4 border-l-amber-500">
                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Utility & Fuel Burden</p>
                    <h4 className="text-2xl font-black mt-1">₹54,900</h4>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[72%]" />
                    </div>
                    <span className="text-[10px] font-black">72% Consumption</span>
                </div>
             </div>
             <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between border-l-4 border-l-emerald-500">
                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Readiness Efficiency</p>
                    <h4 className="text-2xl font-black mt-1">₹2,145 <span className="text-xs font-bold text-muted-foreground">/ unit ready</span></h4>
                </div>
                <div className="mt-4 flex items-center gap-2 text-emerald-500 font-black text-[10px]">
                    <ArrowDownRight size={12} /> 12% faster ready-to-road turnaround
                </div>
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm">
             <h3 className="font-black text-lg tracking-tight mb-8">Showroom Op Component Ratio</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={EXPENSE_CATEGORIES}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={8}
                            dataKey="value"
                        >
                            {EXPENSE_CATEGORIES.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: 'hsl(var(--card))', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                        />
                        <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm">
             <h3 className="font-black text-lg tracking-tight mb-8">Monthly Operational Trend</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MONTHLY_EXPENSE_TREND}>
                        <defs>
                            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 800}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 800}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorAmt)" />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
      </div>

      <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border flex justify-between items-center bg-muted/30">
            <h3 className="font-black text-lg tracking-tight">Showroom Disbursement Ledger</h3>
            <button className="text-xs font-black text-primary flex items-center gap-2 hover:underline">
                View All Ledger <ArrowUpRight size={14} />
            </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
              <tr>
                <th className="px-8 py-4">Serial ID</th>
                <th className="px-8 py-4">Expense Item</th>
                <th className="px-8 py-4">Department</th>
                <th className="px-8 py-4">Cost Value</th>
                <th className="px-8 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {SHOWROOM_DAILY_EXPENSES.map((item, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-all font-bold text-sm">
                  <td className="px-8 py-5 text-muted-foreground font-mono">{item.id}</td>
                  <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-muted rounded-lg text-primary">{item.icon}</div>
                          <span className="font-black tracking-tight">{item.item}</span>
                      </div>
                  </td>
                  <td className="px-8 py-5 text-xs font-black opacity-60 uppercase">{item.category}</td>
                  <td className="px-8 py-5 font-black tabular-nums">{item.cost}</td>
                  <td className="px-8 py-5 text-right font-black tabular-nums">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccShowroomExpenses;
