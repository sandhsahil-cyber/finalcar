import React from 'react';
import { Target, Star, Smile, TrendingUp, Users, MessageSquare, ArrowRight, Activity, Filter, Search, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const CSAT_TREND = [
  { month: 'Jan', score: 8.2 },
  { month: 'Feb', score: 8.5 },
  { month: 'Mar', score: 9.1 },
  { month: 'Apr', score: 8.8 },
  { month: 'May', score: 9.4 },
  { month: 'Jun', score: 9.2 },
];

const FEEDBACK_DISTRIBUTION = [
  { name: 'Promoters (9-10)', value: 65, fill: '#10b981' },
  { name: 'Passives (7-8)', value: 25, fill: '#8b5cf6' },
  { name: 'Detractors (0-6)', value: 10, fill: '#f43f5e' },
];

const OwnerCSAT: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 bg-[#020617] -m-6 p-10 min-h-screen text-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase text-white italic">Customer Satisfaction (CSAT) Intelligence</h2>
                    <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <Star size={16} className="text-amber-500" /> Real-time Sentiment Analysis & Delivery Experience Audit
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Overall CSAT Score', value: '9.2 / 10', change: '+0.4 Index', icon: <Smile />, color: 'emerald' },
                    { label: 'Net Promoter Score (NPS)', value: '72', change: '+8 Points', icon: <Target />, color: 'blue' },
                    { label: 'Feedback Response Rate', value: '42%', change: 'MTD Average', icon: <Users />, color: 'amber' },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[40px] shadow-sm relative overflow-hidden group">
                        <div className={`p-3 bg-${stat.color}-500/10 rounded-2xl w-fit text-${stat.color}-400 mb-6`}>{stat.icon}</div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">{stat.label}</p>
                        <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums mb-4">{stat.value}</h3>
                        <p className="text-[9px] font-black uppercase text-emerald-500">{stat.change}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 overflow-hidden group relative">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10">6-Month CSAT Progression</h4>
                    <div className="h-[300px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={CSAT_TREND}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                                <YAxis domain={[0, 10]} stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '20px' }} />
                                <Area type="monotone" dataKey="score" stroke="#10b981" fillOpacity={1} fill="url(#colorScore)" strokeWidth={4} />
                            </AreaChart>
                         </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 overflow-hidden relative">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10">Sentiment Distribution</h4>
                    <div className="h-[300px] w-full relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={FEEDBACK_DISTRIBUTION} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                                    {FEEDBACK_DISTRIBUTION.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '20px' }} />
                            </PieChart>
                         </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-sm font-black text-slate-500 uppercase tracking-widest">NPS Index</span>
                            <span className="text-2xl font-black text-white">72</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10">
                 <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10 flex items-center justify-between">
                    Recent Verified Reviews
                    <MessageSquare size={18} className="text-slate-500" />
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {[
                        { reviewer: 'Aditya Khanna', date: 'Yesterday', score: 10, msg: 'Excellent delivery experience! The transition from finance to RTO was seamless. Special thanks to the PDI team for spotless car prep.' },
                        { reviewer: 'Neha Sharma', date: '2 Days Ago', score: 6, msg: 'Car is great but the finance sanction took longer than expected. Had to wait 4 hours at the showroom on delivery day.' },
                     ].map((rev, i) => (
                        <div key={i} className="p-8 bg-slate-800/30 border border-slate-700/50 rounded-[32px] hover:border-blue-500/20 transition-all flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                     <div className="flex gap-1">
                                         {[...Array(5)].map((_, it) => <Star key={it} size={14} className={it < (rev.score/2) ? 'text-amber-500 fill-amber-500' : 'text-slate-700'} />)}
                                     </div>
                                     <span className="text-[10px] font-black text-slate-500 uppercase">{rev.date}</span>
                                </div>
                                <p className="text-xs font-medium text-slate-400 leading-relaxed italic">" {rev.msg} "</p>
                            </div>
                            <div className="mt-8 flex items-center justify-between border-t border-slate-700 pt-6">
                                <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-black">{rev.reviewer.split(' ').map(n=>n[0]).join('')}</div>
                                     <p className="text-xs font-black text-white uppercase">{rev.reviewer}</p>
                                </div>
                                <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-[9px] font-black">Verified Customer</div>
                            </div>
                        </div>
                     ))}
                 </div>
            </div>
        </div>
    );
};

export default OwnerCSAT;
