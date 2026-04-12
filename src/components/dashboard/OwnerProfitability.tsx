import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Target, Activity, ArrowUpRight, ArrowDownRight, Printer, Share2, Layers, Filter, Activity as PulseIcon, Zap } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, AreaChart, Area, Legend } from 'recharts';

const PROFIT_LEAKAGE = [
    { name: 'Insurance Payout', val: 450000, fill: '#3b82f6' },
    { name: 'Fin Commission', val: 320000, fill: '#8b5cf6' },
    { name: 'Acc Margin', val: 180000, fill: '#10b981' },
    { name: 'Discounts', val: -410000, fill: '#f43f5e' },
];

const REVENUE_VS_COGS = [
  { month: 'Jan', revenue: 120, cogs: 102 },
  { month: 'Feb', revenue: 142, cogs: 121 },
  { month: 'Mar', revenue: 184, cogs: 154 },
  { month: 'Apr', revenue: 165, cogs: 140 },
  { month: 'May', revenue: 210, cogs: 178 },
  { month: 'Jun', revenue: 242, cogs: 204 },
];

const OwnerProfitability: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 bg-[#020617] -m-6 p-10 min-h-screen text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight uppercase text-white italic">Profitability & Margin Analytics</h2>
          <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <BarChart3 size={16} className="text-emerald-500" /> Granular Revenue vs COGS & Leakage Tracking
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
              { label: 'MTD Net Profit', value: '₹42.8L', change: '+14% WoW', icon: <DollarSign />, color: 'emerald' },
              { label: 'Avg Unit Margin', value: '₹18.4K', change: '+₹2.1K LY', icon: <TrendingUp />, color: 'blue' },
              { label: 'Leakage Ratio', value: '1.24', change: 'Payout vs Disc', icon: <Target />, color: 'amber' },
              { label: 'Admin Expenses', value: '₹4.24L', change: '-4.2% YoY', icon: <Activity />, color: 'rose' },
          ].map((stat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[40px] shadow-sm">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">{stat.label}</p>
                  <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums mb-4">{stat.value}</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 opacity-60">
                      {stat.change}
                  </p>
              </div>
          ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-[40px] p-10 flex flex-col relative overflow-hidden group">
               <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10">Revenue vs. COGS Trend (₹ Lakhs)</h4>
               <div className="h-[400px] w-full mt-auto relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={REVENUE_VS_COGS}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '20px' }} />
                              <Legend verticalAlign="top" align="right" fontSize={10} fontWeight="900" />
                              <Bar dataKey="revenue" fill="#3b82f6" radius={[10, 10, 0, 0]} barSize={40} />
                              <Bar dataKey="cogs" fill="rgba(255,255,255,0.1)" radius={[10, 10, 0, 0]} barSize={40} />
                         </BarChart>
                    </ResponsiveContainer>
               </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 flex flex-col relative overflow-hidden group">
               <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10">Profitability Leakage (Hidden Profits)</h4>
               <div className="flex-1">
                    <ResponsiveContainer width="100%" height="300px">
                        <BarChart data={PROFIT_LEAKAGE} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={11} fontWeight="900" width={120} />
                            <Bar dataKey="val" radius={[0, 15, 15, 0]} barSize={30}>
                                {PROFIT_LEAKAGE.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.val < 0 ? '#f43f5e' : entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-12 bg-[#0f172a] p-8 rounded-[32px] border border-slate-700">
                         <div className="flex justify-between items-center mb-4">
                              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Margin Recovery</h5>
                              <Zap size={16} className="text-emerald-500 animate-pulse" />
                         </div>
                         <p className="text-xs font-bold leading-relaxed text-slate-400">
                              Reducing discounts by **2.5%** could potentially inject an additional **₹4.8L** into net profit this quarter.
                         </p>
                    </div>
               </div>
          </div>
      </div>
    </div>
  );
};

export default OwnerProfitability;
