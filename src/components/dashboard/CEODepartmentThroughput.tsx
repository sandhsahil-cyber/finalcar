import React from 'react';
import { BarChart3, Clock, AlertTriangle, ShieldCheck, PieChart, TrendingUp, Layers, User, MoreHorizontal, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { DepartmentThroughput } from '@/types/ceo';

const THROUGHPUT_DATA: DepartmentThroughput[] = [
  { department: 'Accounts', avgDays: 2.4, pendingUnits: 14, efficiency: 92 },
  { department: 'Finance', avgDays: 4.8, pendingUnits: 28, efficiency: 74 },
  { department: 'RTO', avgDays: 5.2, pendingUnits: 42, efficiency: 68 },
  { department: 'Accessories', avgDays: 1.8, pendingUnits: 12, efficiency: 95 },
  { department: 'PDI', avgDays: 1.2, pendingUnits: 8, efficiency: 98 },
];

const CEODepartmentThroughput: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 bg-[#020617] -m-6 p-10 min-h-screen text-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase text-white">Department Throughput & Bottlenecks</h2>
                    <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                         <BarChart3 size={16} className="text-blue-500" /> End-to-End Operational Latency Monitoring
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-slate-900/50 border border-slate-800 rounded-[40px] p-10 overflow-hidden relative">
                    <div className="flex justify-between items-center mb-10">
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Latency by Department (Days)</h4>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-500/10 px-4 py-2 rounded-xl">
                            <Clock size={12}/> Critical Bottleneck: RTO
                        </div>
                    </div>
                    <div className="h-[400px] w-full mt-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={THROUGHPUT_DATA} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="department" type="category" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} width={100} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '20px' }} />
                                <Bar dataKey="avgDays" radius={[0, 20, 20, 0]} barSize={40}>
                                    {THROUGHPUT_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.avgDays > 4 ? '#f43f5e' : entry.avgDays > 3 ? '#fbbf24' : '#3b82f6'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-[40px] shadow-sm">
                         <h4 className="text-sm font-black text-white uppercase tracking-widest mb-10 flex items-center justify-between">
                            Pending Queue Depth
                            <Layers size={18} className="text-slate-500" />
                         </h4>
                         <div className="space-y-8">
                            {THROUGHPUT_DATA.map((dept, i) => (
                                <div key={i} className="flex items-end justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{dept.department}</p>
                                        <p className="text-xl font-black text-white">{dept.pendingUnits} Units</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                        dept.efficiency > 90 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                        dept.efficiency > 70 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                        'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                    }`}>
                                        {dept.efficiency}% Eff
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>

                    <div className="bg-blue-600 p-10 rounded-[40px] text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                             <TrendingUp size={140} />
                        </div>
                        <h4 className="text-xl font-black uppercase tracking-tight mb-4 relative z-10">Productivity Boost</h4>
                        <p className="text-xs font-medium opacity-80 leading-relaxed mb-8 relative z-10">
                            Finance TAT has increased by **1.2 days** this week due to pending bank queries. Suggesting immediate RM intervention.
                        </p>
                        <button className="w-full py-4 bg-white text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all relative z-10">
                            Notify Finance Head
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-[40px] overflow-hidden shadow-sm">
                 <div className="p-8 border-b border-slate-800 bg-slate-800/10 flex justify-between items-center">
                    <h3 className="font-black text-lg tracking-tight uppercase text-white">End-to-End Cycle Time (Booking-to-Delivery)</h3>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700">
                             <Clock size={14} className="text-emerald-500" />
                             <span className="text-[10px] font-black uppercase tracking-widest">Global Avg: 11.4 Days</span>
                        </div>
                    </div>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-800/30 text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-6">Lead Details & Model</th>
                                <th className="px-8 py-6">Ageing in System</th>
                                <th className="px-8 py-6">Current Dept</th>
                                <th className="px-8 py-6">Latent Hours</th>
                                <th className="px-8 py-6 text-right">Escalate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {[
                                { id: 'LD-101', customer: 'Sanjay Kapoor', model: 'Nexon EV', age: '14 Days', dept: 'RTO', latent: '42h' },
                                { id: 'LD-104', customer: 'Varun Sharma', model: 'Harrier', age: '08 Days', dept: 'Finance', latent: '12h' },
                                { id: 'LD-109', customer: 'Rishi Roy', model: 'Safari', age: '22 Days', dept: 'PDI', latent: '31h' },
                            ].map((lead, i) => (
                                <tr key={i} className="hover:bg-slate-800/20 transition-all group font-bold">
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-white group-hover:text-blue-400 transition-colors uppercase">{lead.customer}</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">{lead.model} • {lead.id}</p>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-slate-300 tracking-tight">{lead.age}</td>
                                    <td className="px-8 py-6 text-xs text-white uppercase tracking-widest">{lead.dept}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-500 border border-rose-500/20`}>
                                            {lead.latent} Overdue
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-all">
                                            <ArrowRight size={18} />
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

export default CEODepartmentThroughput;
