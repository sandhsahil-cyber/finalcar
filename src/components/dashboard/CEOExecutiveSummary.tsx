import React, { useState } from 'react';
import { TrendingUp, BarChart3, Globe, DollarSign, ArrowUpRight, ArrowDownRight, Printer, Download, Filter, Target, Zap, Waves, Activity, Dna } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend, BarChart, Bar, Cell } from 'recharts';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 4200000, margin: 12 },
  { month: 'Feb', revenue: 4800000, margin: 14 },
  { month: 'Mar', revenue: 5100000, margin: 13 },
  { month: 'Apr', revenue: 5900000, margin: 15 },
  { month: 'May', revenue: 6400000, margin: 16 },
  { month: 'Jun', revenue: 7200000, margin: 18 },
];

const GAUGE_DATA = [
  { name: 'Target', value: 100, fill: 'rgba(255,255,255,0.1)' },
  { name: 'Actual', value: 84, fill: '#10b981' },
];

const FUNNEL_DATA = [
  { stage: 'Leads', count: 1240, color: '#3b82f6' },
  { stage: 'Booked', count: 420, color: '#6366f1' },
  { stage: 'Car Assigned', count: 310, color: '#8b5cf6' },
  { stage: 'Doc Pending', count: 180, color: '#f43f5e' },
  { stage: 'Ready', count: 120, color: '#10b981' },
  { stage: 'Delivered', count: 94, color: '#0f172a' },
];

const CEOExecutiveSummary: React.FC = () => {
    const [payoutMultiplier, setPayoutMultiplier] = useState(1);
    const estimatedProfitImpact = (payoutMultiplier - 1) * 450000;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 bg-[#020617] -m-6 p-10 min-h-screen text-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg text-primary"><Globe size={20}/></div>
                        <h2 className="text-3xl font-black tracking-tight uppercase text-white">Showroom Main View</h2>
                    </div>
                    <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                         <Activity size={16} className="text-emerald-500" /> Daily Work Status
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-white/5">
                        <Download size={14} /> Download Full Hisaab (PDF)
                    </button>
                    <button className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-slate-400 hover:text-white transition-colors"><Printer size={20} /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Total Sales This Month', value: '₹7.24 Cr', change: '+12.4%', icon: <DollarSign />, color: 'text-emerald-400' },
                    { label: 'Our Profit Margin', value: '18.2%', change: '+2.1%', icon: <TrendingUp />, color: 'text-blue-400' },
                    { label: 'Value of Cars in Stock', value: '₹24.8 Cr', change: '-4.8%', icon: <Waves />, color: 'text-purple-400' },
                    { label: 'Our Market Share', value: '31.5%', change: '+1.2%', icon: <Target />, color: 'text-amber-400' },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">{stat.icon}</div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">{stat.label}</p>
                        <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums mb-4">{stat.value}</h3>
                        <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {stat.change.startsWith('+') ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                            {stat.change} vs Last Month
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-slate-900/50 border border-slate-800 rounded-[40px] p-10 flex flex-col">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h4 className="text-xl font-black text-white uppercase tracking-tight">Money In vs. Profit Chart</h4>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Monthly Money and Profit</p>
                        </div>
                        <div className="flex bg-slate-800 rounded-xl p-1 gap-1">
                            {['6M', '1Y', 'ALL'].map(t => (
                                <button key={t} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${t === '6M' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}>{t}</button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[400px] w-full mt-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={REVENUE_DATA}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1000000}M`} />
                                <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', color: '#fff' }} />
                                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[#0f172a] rounded-[40px] p-10 border border-slate-700 shadow-2xl relative overflow-hidden group flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-emerald-500/5 pointer-events-none" />
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                        <Target size={120} />
                    </div>
                    
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-8 relative z-10 flex items-center justify-between">
                        Target Progress
                        <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                            <Zap size={18} className="animate-pulse" />
                        </span>
                    </h4>
                    
                    <div className="flex-1 flex flex-col justify-center relative min-h-[320px]">
                        <div className="h-[280px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" barSize={20} data={GAUGE_DATA} startAngle={180} endAngle={-180}>
                                    <RadialBar 
                                        background={{ fill: 'rgba(255,255,255,0.05)' }} 
                                        dataKey="value" 
                                        cornerRadius={30}
                                        label={false}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="text-center"
                                >
                                    <p className="text-6xl font-black text-white tracking-tighter tabular-nums leading-none">84<span className="text-2xl text-slate-500 ml-0.5">%</span></p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mt-4 bg-emerald-500/10 py-1 px-3 rounded-full inline-block">Work Speed</p>
                                </motion.div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
                            <div className="p-4 bg-slate-800/40 rounded-3xl border border-slate-700/50">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Target</p>
                                <p className="text-lg font-black text-white">120 Units</p>
                            </div>
                            <div className="p-4 bg-slate-800/40 rounded-3xl border border-slate-700/50">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Done</p>
                                <p className="text-lg font-black text-emerald-500">94 Units</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-10 border-t border-slate-800/50 relative z-10">
                        <div className="flex justify-between items-center mb-6">
                             <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Profit Calculator</h5>
                             <Activity size={16} className="text-blue-400/50" />
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium mb-10 leading-relaxed">
                            Adjusting the **Change Loan Commission** to see potential final profit impact.
                        </p>
                        <div className="relative h-2 w-full bg-slate-800 rounded-full mb-6">
                            <motion.div 
                                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                                initial={{ width: "50%" }}
                                animate={{ width: `${(payoutMultiplier - 1) * 100 + 50}%` }}
                            />
                            <input 
                                type="range" min="1" max="2" step="0.1" value={payoutMultiplier} onChange={(e) => setPayoutMultiplier(Number(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                        </div>
                        <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest mb-10 px-1">
                            <span>Base (1x)</span><span>Optimal (1.5x)</span><span>Aggressive (2x)</span>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 p-6 rounded-[32px] flex items-center justify-between shadow-xl shadow-blue-500/5 group/impact">
                            <div>
                                <p className="text-[10px] font-black uppercase text-blue-400 mb-1">Projected New Profit</p>
                                <p className="text-2xl font-black text-white tracking-tighter">+₹{estimatedProfitImpact.toLocaleString()}</p>
                            </div>
                            <div className="px-5 py-2.5 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 group-hover/impact:scale-105 transition-transform cursor-pointer">
                                Apply
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-slate-900/50 border border-slate-800 rounded-[40px] p-10 shadow-sm overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                        <BarChart3 size={200} />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10 relative z-10">Customer Journey</h4>
                    <div className="h-[400px] w-full relative z-10">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={FUNNEL_DATA} layout="vertical" barGap={20}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={11} fontWeight="900" width={100} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '20px' }} />
                                <Bar dataKey="count" radius={[0, 20, 20, 0]} barSize={35}>
                                    {FUNNEL_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                         </ResponsiveContainer>
                    </div>
                    <div className="mt-6 flex justify-between px-4 border-t border-slate-800 pt-8 relative z-10">
                         <div className="text-center">
                            <p className="text-[10px] font-black uppercase text-slate-500">Avg. Days to Sell a Car</p>
                            <p className="text-2xl font-black text-white">12.4 Days</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] font-black uppercase text-slate-500">Payments Still Due</p>
                            <p className="text-2xl font-black text-white">₹18.5 Cr</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] font-black uppercase text-slate-500">Deal Closing Rate</p>
                            <p className="text-2xl font-black text-emerald-500">7.5%</p>
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-[40px] shadow-sm flex flex-col justify-between overflow-hidden relative">
                         <div className="absolute -top-4 -right-4 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                         <div className="relative z-10 h-full flex flex-col justify-between">
                          <div>
                             <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">Approvals Needed</h5>
                             <div className="space-y-4">
                                 {[
                                    { id: 'APP-99', req: 'High Discount Request', value: '₹1,45,000', by: 'SM Rahul' },
                                    { id: 'APP-102', req: 'Large Expense Approval', value: '₹4,12,000', by: 'Acc Gupta' },
                                 ].map((app, i) => (
                                    <div key={i} className="p-5 bg-slate-800/40 border border-slate-700/50 rounded-3xl flex items-center justify-between group-hover:border-blue-500/30 transition-all">
                                        <div>
                                            <p className="text-[11px] font-black text-white">{app.req}</p>
                                            <p className="text-[9px] font-bold text-slate-500 uppercase">{app.by}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-white tracking-tight">{app.value}</p>
                                            <button className="text-[9px] font-black text-blue-400 uppercase tracking-widest hover:underline mt-1">Review</button>
                                        </div>
                                    </div>
                                 ))}
                             </div>
                         </div>
                          <button className="w-full mt-10 py-4 bg-slate-800 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white transition-all">
                             View All Pending Approvals
                          </button>
                     </div>
                </div>

                    <div className="bg-emerald-500 p-10 rounded-[40px] text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                             <TrendingUp size={140} />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-8">Total 3-Month Earnings</h5>
                                <h3 className="text-4xl font-black tracking-tighter">₹24.42 Cr</h3>
                                <p className="text-[11px] font-bold opacity-80 mt-2 leading-relaxed">
                                    The team is working at **94.2%** speed.
                                </p>
                            </div>
                            <div className="pt-10 border-t border-white/20 mt-10">
                                <div className="flex items-center gap-3">
                                    <Activity size={20} className="text-white animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Showroom Status: Healthy ✅</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CEOExecutiveSummary;
