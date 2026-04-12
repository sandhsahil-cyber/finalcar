import React from 'react';
import { ShieldCheck, Target, Activity, FileText, AlertTriangle, ArrowUpRight, ArrowDownRight, Printer, Search, Filter, History, PieChart, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, PieChart as ReChartsPie, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const AUDIT_STATS = [
  { name: 'Toyata Rajkot', score: 92, csat: 9.4, status: 'Healthy' },
  { name: 'BMW India', score: 74, csat: 8.2, status: 'Warning' },
  { name: 'Audi Mumbai', score: 88, csat: 9.1, status: 'Healthy' },
  { name: 'Tesla City A', score: 62, csat: 7.5, status: 'Critical' },
];

const GCEORiskCompliance: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 bg-[#0f172a] -m-6 p-10 min-h-screen text-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase text-white">Group Risk, Compliance & CSAT</h2>
                    <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-emerald-500" /> Enterprise-wide Audit Surveillance & Integrity Scoreboard
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Group Integrity Index' , value: '88.4%', trend: 'Top Decile', color: 'emerald' },
                    { label: 'Avg CSAT Score', value: '8.8 / 10', trend: '+0.2 Index', color: 'blue' },
                    { label: 'Pending Audits', value: '08 Units', trend: 'Due in 4 Days', color: 'amber' },
                    { label: 'Critical Resolutions', value: '14 Flags', trend: 'High Urgency', color: 'rose' },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[40px] shadow-sm overflow-hidden relative group">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">{stat.label}</p>
                        <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums mb-4">{stat.value}</h3>
                        <p className={`text-[9px] font-black uppercase tracking-widest text-${stat.color}-500/80`}>{stat.trend}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                 <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-[40px] overflow-hidden">
                     <div className="p-8 border-b border-slate-800 bg-slate-800/10 flex justify-between items-center">
                        <h3 className="font-black text-lg tracking-tight uppercase text-white">Compliance Distribution (By Brand)</h3>
                     </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-800/30 text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-6">Dealership Name</th>
                                    <th className="px-8 py-6 text-center">Integrity Score</th>
                                    <th className="px-8 py-6 text-center">CSAT (10)</th>
                                    <th className="px-8 py-6 text-center">Status</th>
                                    <th className="px-8 py-6 text-right">Audit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {AUDIT_STATS.map((log, i) => (
                                    <tr key={i} className="hover:bg-slate-800/20 transition-all group font-bold">
                                        <td className="px-8 py-6 text-xs text-white font-black uppercase tracking-widest">{log.name}</td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-sm font-black text-white">{log.score}%</span>
                                                <div className="w-20 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                                    <div className={`h-full ${log.score > 80 ? 'bg-emerald-500' : log.score > 60 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${log.score}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <p className="text-sm font-black text-white">{log.csat}</p>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                                log.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                log.status === 'Warning' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                'bg-rose-500/10 text-rose-500 border-rose-500/20 animate-pulse'
                                            }`}>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="px-5 py-2.5 bg-slate-800 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-white transition-all">
                                                Surveillance
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                 </div>

                 <div className="bg-[#0f172a] border border-slate-700 rounded-[40px] p-10 flex flex-col justify-between overflow-hidden relative shadow-2xl group">
                      <div className="absolute top-0 right-0 p-12 opacity-5 scale-[2] pointer-events-none group-hover:rotate-6 transition-transform duration-1000">
                        <AlertTriangle size={200} />
                    </div>
                    <div className="relative z-10">
                        <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Master Compliance Flag</h4>
                        <div className="p-8 bg-rose-500 text-white rounded-[32px] shadow-xl shadow-rose-500/20 space-y-6">
                            <div className="flex items-center gap-3">
                                <AlertTriangle size={24} className="animate-bounce" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Immediate Attention Required</span>
                            </div>
                            <p className="text-sm font-bold leading-relaxed">
                                Tesla City A has failed the "Financial Payout Reconciliation" audit for 3 consecutive months.
                            </p>
                            <div className="pt-6 border-t border-white/20">
                                 <button className="w-full py-4 bg-white text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 shadow-lg">
                                    Initiate Corrective Action
                                 </button>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 mt-10">
                         <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Global Audit Progress</p>
                                <p className="text-xl font-black text-white italic">72% Completed</p>
                            </div>
                            <CheckCircle2 className="text-emerald-500" size={32} />
                         </div>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default GCEORiskCompliance;
