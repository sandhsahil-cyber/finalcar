import React from 'react';
import { UserCheck, Users, Briefcase, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Printer, Share2, Search, Filter, Activity } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Legend } from 'recharts';

const PAYROLL_DATA = [
  { brand: 'Toyota', headcount: 480, incentive: 12.4, efficiency: 94 },
  { brand: 'BMW', headcount: 220, incentive: 45.8, efficiency: 82 },
  { brand: 'Audi', headcount: 180, incentive: 32.1, efficiency: 88 },
  { brand: 'Tesla', headcount: 140, incentive: 18.5, efficiency: 75 },
];

const GCEOHRPayroll: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 bg-[#0f172a] -m-6 p-10 min-h-screen text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight uppercase text-white">HR Intelligence & Consolidated Payroll</h2>
          <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <UserCheck size={16} className="text-blue-500" /> Group-wide Headcount Distribution & Incentive Efficiency
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
              { label: 'Total Headcount', value: '1,242', change: '+14 Today', icon: <Users />, color: 'blue' },
              { label: 'MTD Payroll Cost', value: '₹2.84 Cr', change: '+4.2% Index', icon: <DollarSign />, color: 'emerald' },
              { label: 'Incentive Payouts', value: '₹1.15 Cr', change: '-1.4% WoW', icon: <Briefcase />, color: 'amber' },
              { label: 'Active Recruitment', value: '42 Open', change: '8 Critical', icon: <Search />, color: 'purple' },
          ].map((stat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[40px] shadow-sm">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">{stat.label}</p>
                  <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums mb-4">{stat.value}</h3>
                  <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-500 opacity-60">
                      {stat.change}
                  </div>
              </div>
          ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 overflow-hidden relative group">
              <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10">Brand-wise Incentive Burn (Lakhs)</h4>
              <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={PAYROLL_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="brand" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
                          <Tooltip contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '20px' }} />
                          <Bar dataKey="incentive" radius={[15, 15, 0, 0]} barSize={50} fill="#6366f1">
                              {PAYROLL_DATA.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={index === 1 ? '#3b82f6' : '#6366f1'} />
                              ))}
                          </Bar>
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 space-y-8">
               <h4 className="text-xl font-black text-white uppercase tracking-tight mb-4">Human Resource Distribution</h4>
               <div className="space-y-6">
                    {PAYROLL_DATA.map((brand, i) => (
                        <div key={i} className="p-6 bg-slate-800/40 border border-slate-700/50 rounded-3xl hover:border-blue-500/20 transition-all flex items-center justify-between">
                            <div>
                                <p className="text-sm font-black text-white uppercase tracking-tight">{brand.brand}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Efficiency Index: {brand.efficiency}%</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-black text-white tracking-tighter">{brand.headcount}</p>
                                <p className="text-[9px] font-black text-slate-500 uppercase">Headcount</p>
                            </div>
                        </div>
                    ))}
               </div>
               <button className="w-full py-4 bg-slate-800 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white transition-all">
                   Manage Enterprise Payroll
               </button>
          </div>
      </div>
    </div>
  );
};

export default GCEOHRPayroll;
