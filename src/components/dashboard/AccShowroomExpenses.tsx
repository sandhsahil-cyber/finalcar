import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Filter, Download, Zap, Fuel, Droplet, Hammer, Truck, ShieldCheck, UserCheck, Flame, Car } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const DISCOUNT_BY_MODEL = [
  { name: 'Toyota Fortuner', value: 35, amount: '₹5,25,000', color: '#db2777' },
  { name: 'MG Hector', value: 25, amount: '₹3,75,000', color: '#dc2626' },
  { name: 'TATA Safari', value: 20, amount: '₹3,00,000', color: '#2563eb' },
  { name: 'Ashok Leyland Dost', value: 12, amount: '₹1,80,000', color: '#059669' },
  { name: 'MG Astor', value: 8, amount: '₹1,20,000', color: '#7c3aed' },
];

const DISCOUNT_AUTHORITY = [
  { role: 'Sales Executive', count: 45, total: '₹4,50,000', color: '#3b82f6' },
  { id: 'tl', role: 'Team Leader', count: 28, total: '₹5,60,000', color: '#8b5cf6' },
  { id: 'sm', role: 'Sales Manager', count: 12, total: '₹4,90,000', color: '#f59e0b' },
];

const RECENT_DISCOUNTS = [
  { id: 'DSC-101', customer: 'Rajesh Patel', model: 'Toyota Fortuner', amount: '₹45,000', authorizedBy: 'Vikram Rathore', rank: 'Team Leader', date: '2024-04-12', icon: <ShieldCheck size={14}/> },
  { id: 'DSC-102', customer: 'Sunil Gupta', model: 'MG Astor', amount: '₹12,000', authorizedBy: 'Rajesh Patel', rank: 'Sales Executive', date: '2024-04-11', icon: <UserCheck size={14}/> },
  { id: 'DSC-103', customer: 'Manoj Sharma', model: 'MG Hector', amount: '₹35,000', authorizedBy: 'Dinesh Chauhan', rank: 'Sales Manager', date: '2024-04-10', icon: <Flame size={14}/> },
  { id: 'DSC-104', customer: 'Sita Ram', model: 'Toyota Fortuner', amount: '₹50,000', authorizedBy: 'Dinesh Chauhan', rank: 'Sales Manager', date: '2024-04-09', icon: <Flame size={14}/> },
  { id: 'DSC-105', customer: 'Amit Verma', model: 'Ashok Leyland Dost', amount: '₹8,000', authorizedBy: 'Sunil Gupta', rank: 'Sales Executive', date: '2024-04-08', icon: <UserCheck size={14}/> },
];

const MONTHLY_DISCOUNT_TREND = [
  { month: 'Jan', amount: 8.5 },
  { month: 'Feb', amount: 9.2 },
  { month: 'Mar', amount: 12.8 },
  { month: 'Apr', amount: 15.0 },
  { month: 'May', amount: 11.5 },
  { month: 'Jun', amount: 14.2 },
];

const AccShowroomExpenses: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight uppercase tracking-[0.05em]">Shop Money & Discount Details</h2>
          <p className="text-sm text-muted-foreground font-medium">Checking bills, oil, car cleaning, and discounts</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-xl text-xs font-bold hover:bg-muted transition-all">
            <Download size={14} /> Get Full Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Add New Expense
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
                 <p className="text-xs font-bold opacity-60 uppercase tracking-widest">Month Total Discount</p>
                <h3 className="text-4xl font-black mt-1">₹15.00 L <span className="text-xs opacity-50 font-medium tracking-normal text-white/50">/ mo</span></h3>
                <p className="text-[10px] mt-4 font-bold flex items-center gap-1 text-emerald-400">
                    <ArrowUpRight size={12} /> Next: 8% less bill
                </p>
             </div>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between border-l-4 border-l-amber-500">
                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Profit Used Up</p>
                    <h4 className="text-2xl font-black mt-1">₹5,42,000</h4>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[45%]" />
                    </div>
                    <span className="text-[10px] font-black">45% of Margin</span>
                </div>
             </div>
             <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between border-l-4 border-l-emerald-500">
                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Approval Speed</p>
                    <h4 className="text-2xl font-black mt-1">₹3,400 <span className="text-xs font-bold text-muted-foreground">/ average unit</span></h4>
                </div>
                <div className="mt-4 flex items-center gap-2 text-emerald-500 font-black text-[10px]">
                    <ArrowDownRight size={12} /> 15% less discount loss
                </div>
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm">
             <h3 className="font-black text-lg tracking-tight mb-8">Discount by Car Model</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={DISCOUNT_BY_MODEL}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={8}
                            dataKey="value"
                        >
                            {DISCOUNT_BY_MODEL.map((entry, index) => (
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
             <h3 className="font-black text-lg tracking-tight mb-8">Monthly Discount Map</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MONTHLY_DISCOUNT_TREND}>
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
            <h3 className="font-black text-lg tracking-tight">Discount Detail & Who Gave It</h3>
            <div className="flex gap-4">
               {DISCOUNT_AUTHORITY.map((auth, i) => (
                 <div key={i} className="flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-xl shadow-sm">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: auth.color }} />
                    <span className="text-[10px] font-black whitespace-nowrap">{auth.role}: {auth.count} cases</span>
                 </div>
               ))}
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
              <tr>
                <th className="px-8 py-4">Discount ID</th>
                <th className="px-8 py-4">Customer Name</th>
                <th className="px-8 py-4">Car Name</th>
                <th className="px-8 py-4">Who Gave It</th>
                <th className="px-8 py-4">Discount Money</th>
                <th className="px-8 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RECENT_DISCOUNTS.map((item, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-all font-bold text-sm">
                  <td className="px-8 py-5 text-muted-foreground font-mono">{item.id}</td>
                  <td className="px-8 py-5 font-black tracking-tight">{item.customer}</td>
                  <td className="px-8 py-5 text-xs font-black opacity-60 uppercase">
                      <div className="flex items-center gap-2">
                        <Car size={14} className="text-primary" />
                        {item.model}
                      </div>
                  </td>
                  <td className="px-8 py-5">
                      <div className="flex flex-col">
                          <span className="font-black text-xs">{item.authorizedBy}</span>
                          <span className="text-[10px] opacity-60 font-medium">{item.rank}</span>
                      </div>
                  </td>
                  <td className="px-8 py-5 font-black tabular-nums text-red-500">-{item.amount}</td>
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
