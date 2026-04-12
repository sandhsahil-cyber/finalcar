import React from 'react';
import { DollarSign, TrendingUp, Landmark, ArrowUpRight, ArrowDownRight, Printer, Share2, Layers, Filter, Activity, Zap, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';

const LIQUIDITY_TREND = [
  { day: '01', toyota: 40000000, bmw: 12000000, audi: 18000000 },
  { day: '05', toyota: 42000000, bmw: 11000000, audi: 22000000 },
  { day: '10', toyota: 38000000, bmw: 15000000, audi: 21000000 },
  { day: '15', toyota: 45000000, bmw: 18000000, audi: 19000000 },
];

const GCEOFundFlow: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 bg-[#0f172a] -m-6 p-10 min-h-screen text-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase text-white">Group Liquidity & Fund Management</h2>
                    <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <DollarSign size={16} className="text-emerald-500" /> Consolidated Cash Balances & Treasury Oversight
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Total Group Cash Pool', value: '₹142.8 Cr', trend: '+₹4.2 Cr Today', status: 'Healthy' },
                    { label: 'Opex Credit Line', value: '₹250 Cr', trend: '42% Utilized', status: 'Optimal' },
                    { label: 'Daily Group Burn', value: '₹1.84 Cr', trend: '-2.1% WoW', status: 'Positive' },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[40px] shadow-sm relative overflow-hidden group">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">{stat.label}</p>
                        <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums mb-4">{stat.value}</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{stat.trend}</span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest">{stat.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                 <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-[40px] p-10 overflow-hidden">
                     <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10">Brand-wise Liquidity Distribution</h4>
                     <div className="h-[400px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={LIQUIDITY_TREND}>
                                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                 <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                                 <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/10000000}Cr`} />
                                 <Tooltip contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '20px' }} />
                                 <Area type="monotone" dataKey="toyota" stackId="1" stroke="#eb0a1e" fill="#eb0a1e" fillOpacity={0.1} strokeWidth={4} />
                                 <Area type="monotone" dataKey="bmw" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={4} />
                                 <Area type="monotone" dataKey="audi" stackId="1" stroke="#64748b" fill="#64748b" fillOpacity={0.1} strokeWidth={4} />
                             </AreaChart>
                         </ResponsiveContainer>
                     </div>
                 </div>

                 <div className="bg-slate-900 border border-slate-800 p-10 rounded-[40px] shadow-sm flex flex-col justify-between overflow-hidden relative group">
                      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-6 transition-transform duration-1000">
                        <Landmark size={200} />
                    </div>
                    <div className="relative z-10">
                        <h4 className="text-xl font-black text-white uppercase tracking-tight mb-8">Group Fund Approvals</h4>
                        <div className="space-y-6">
                            {[
                                { desc: 'Toyota Rajkot: Inventory Purchase', value: '₹12.4 Cr', urgency: 'High' },
                                { desc: 'Audi Mumbai: Operational CAPEX', value: '₹2.1 Cr', urgency: 'Normal' },
                                { desc: 'Group Level: Insurance Renewal', value: '₹1.84 Cr', urgency: 'Immediate' },
                            ].map((app, i) => (
                                <div key={i} className="p-5 bg-slate-800/40 border border-slate-700/50 rounded-3xl group-hover:border-blue-500/20 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                         <p className="text-[11px] font-black text-white leading-snug max-w-[150px]">{app.desc}</p>
                                         <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${app.urgency === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'}`}>{app.urgency}</span>
                                    </div>
                                    <h5 className="text-xl font-black text-white tracking-tighter tabular-nums mb-4">{app.value}</h5>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:opacity-90">Approve</button>
                                        <button className="flex-1 py-3 bg-slate-700 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-600 hover:text-white">Review</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="w-full mt-10 py-4 bg-slate-800 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white transition-all relative z-10">
                        Group Treasury Master
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default GCEOFundFlow;
