import React from 'react';
import { Activity, Clock, Target, CheckCircle2, ArrowRight, Zap, TrendingUp, BarChart3, Star, Layers, Zap as PulseIcon } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, AreaChart, Area } from 'recharts';

const FUNNEL_DATA = [
  { stage: 'Booking', count: 420, avgTime: '1.2h', efficiency: 98 },
  { stage: 'Account', count: 380, avgTime: '2.4d', efficiency: 92 },
  { stage: 'Finance', count: 310, avgTime: '4.2d', efficiency: 74 },
  { stage: 'RTO', count: 240, avgTime: '5.2d', efficiency: 68 },
  { stage: 'PDI', count: 180, avgTime: '1.2d', efficiency: 98 },
  { stage: 'Delivered', count: 154, avgTime: '0.8d', efficiency: 100 },
];

const OwnerDeliveryFunnel: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 bg-[#020617] -m-6 p-10 min-h-screen text-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase text-white italic">End-to-End Delivery Funnel</h2>
                    <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <Clock size={16} className="text-blue-500" /> Velocity Audit: From First Booking to Final Key Handover
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-[40px] p-10 overflow-hidden relative">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10">Funnel Volume & Drop-off</h4>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={FUNNEL_DATA} barGap={20}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="stage" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '20px' }} />
                                <Bar dataKey="count" radius={[15, 15, 0, 0]} barSize={45}>
                                    {FUNNEL_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.stage === 'Delivered' ? '#10b981' : entry.efficiency < 75 ? '#f43f5e' : '#3b82f6'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 border border-slate-800 p-10 rounded-[40px] shadow-sm">
                         <h4 className="text-sm font-black text-white uppercase tracking-widest mb-10 flex items-center justify-between">
                            Stage TAT Benchmarks
                            <Layers size={18} className="text-slate-500" />
                         </h4>
                         <div className="space-y-8">
                            {FUNNEL_DATA.map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.stage}</p>
                                        <p className="text-xl font-black text-white italic">{item.avgTime}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                        item.efficiency > 90 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                        item.efficiency > 75 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                        'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-lg shadow-rose-500/10'
                                    }`}>
                                        {item.efficiency}% Eff
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>

                    <div className="bg-blue-600 p-10 rounded-[40px] text-white shadow-3xl shadow-blue-600/30 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-12 opacity-15 group-hover:scale-110 transition-transform duration-700">
                             <PulseIcon size={140} />
                        </div>
                        <h4 className="text-xl font-black uppercase tracking-tight mb-4 relative z-10">Velocity Boost</h4>
                        <p className="text-xs font-medium opacity-80 leading-relaxed mb-10 relative z-10">
                            Finance department latency is causing a **2.8-day backlog** in RTO filings. Recommend direct intervention with the Finance lead.
                        </p>
                        <button className="w-full py-4 bg-white text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:opacity-95 shadow-xl relative z-10">
                            Push Accountability Alert
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[40px] overflow-hidden shadow-sm relative group">
                <div className="p-10 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">Active Delivery Pipeline (Top 10)</h4>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl">
                            <Star size={14} className="text-amber-500" />
                            <span className="text-[10px] font-black uppercase text-white">VIP Fast-Track</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#0f172a] text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">
                            <tr>
                                <th className="px-10 py-8">Customer & Order ID</th>
                                <th className="px-10 py-8">Model & Color</th>
                                <th className="px-10 py-8 text-center">Pipeline Age</th>
                                <th className="px-10 py-8 text-center">Current Bottleneck</th>
                                <th className="px-10 py-8 text-right">Escalation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {[
                                { id: 'ORD-201', customer: 'Rohan Mehta', model: 'Nexon EV', age: '08 Days', bottleneck: 'RTO Filing', status: 'Warning' },
                                { id: 'ORD-205', customer: 'Sneha Rao', model: 'Safari Dark', age: '14 Days', bottleneck: 'Finance Sanction', status: 'Critical' },
                                { id: 'ORD-209', customer: 'Amit Singh', model: 'Punch iCNG', age: '03 Days', bottleneck: 'PDI Check', status: 'Healthy' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-800/30 transition-all font-bold">
                                    <td className="px-10 py-8">
                                        <p className="text-sm font-black text-white uppercase">{row.customer}</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{row.id}</p>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className="text-[11px] text-slate-300 font-bold uppercase tracking-widest">{row.model}</p>
                                    </td>
                                    <td className="px-10 py-8 text-center italic text-white text-sm">{row.age}</td>
                                    <td className="px-10 py-8">
                                        <div className="flex justify-center">
                                            <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                                                row.status === 'Critical' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-lg shadow-rose-500/5' :
                                                row.status === 'Warning' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                            }`}>
                                                {row.bottleneck}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button className="p-3 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-all">
                                            <ArrowRight size={20} />
                                        </button>
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

export default OwnerDeliveryFunnel;
