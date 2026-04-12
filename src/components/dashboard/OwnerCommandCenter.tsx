import React, { useState } from 'react';
import { LayoutDashboard, BarChart3, Target, Activity, Flame, Zap, Shield, TrendingUp, DollarSign, Box, Clock, UserCheck, AlertTriangle, CheckCircle2, ChevronRight, Filter, Download, Printer, Bell, Activity as PulseIcon, Car, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';

const REVENUE_DATA = [
  { date: '01', value: 1240000 },
  { date: '05', value: 2120000 },
  { date: '10', value: 1840000 },
  { date: '15', value: 3420000 },
  { date: '20', value: 2980000 },
  { date: '25', value: 4120000 },
  { date: '30', value: 3840000 },
];

const MARKET_SHARE = [
  { name: 'Nexon', value: 35, fill: '#3b82f6' },
  { name: 'Punch', value: 25, fill: '#8b5cf6' },
  { name: 'Safari', value: 20, fill: '#f43f5e' },
  { name: 'Harrier', value: 20, fill: '#10b981' },
];

const DEPT_HEALTH = [
  { dept: 'Accounts', status: 'Healthy', metric: 'Overdue', value: '₹4.2L', stuck: 2, latent: 12 },
  { dept: 'Finance', status: 'Warning', metric: 'Avg Sanction', value: '4.2 Days', stuck: 14, latent: 56 },
  { dept: 'RTO', status: 'Critical', metric: 'Awaiting Reg', value: '28 Units', stuck: 12, latent: 72 },
  { dept: 'PDI', status: 'Healthy', metric: 'Fail Rate', value: '1.2%', stuck: 1, latent: 8 },
];

const LEAKAGE_DATA = [
    { name: 'Insurance Payout', val: 450000, fill: '#3b82f6' },
    { name: 'Fin Commission', val: 320000, fill: '#8b5cf6' },
    { name: 'Acc Margin', val: 180000, fill: '#10b981' },
    { name: 'Discounts', val: -410000, fill: '#f43f5e' },
];

const OwnerCommandCenter: React.FC = () => {
    const [dateRange, setDateRange] = useState('MTD');

    return (
        <div className="space-y-8 animate-in fade-in duration-500 bg-[#020617] -m-6 p-10 min-h-screen text-slate-200">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400 border border-rose-500/30 shadow-lg shadow-rose-500/10"><Flame size={24}/></div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase text-white italic">Dealer Principal Command</h2>
                    </div>
                    <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                         <PulseIcon size={16} className="text-emerald-500" /> Showroom P&L Master Engine • Real-time Fiscal Oversight
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl gap-1">
                        {['Today', 'Week', 'MTD', 'YTD'].map(p => (
                            <button 
                                key={p} onClick={() => setDateRange(p)}
                                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${dateRange === p ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-slate-500 hover:text-white'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                    <button className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all shadow-xl"><Download size={20}/></button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Net Showroom Revenue', value: '₹14.24 Cr', change: '+12.4%', icon: <DollarSign />, color: 'emerald' },
                    { label: 'Gross Margin (Group)', value: '18.2%', change: '+2.1%', icon: <TrendingUp />, color: 'blue' },
                    { label: 'Pipeline Value', value: '₹18.52 Cr', change: '92 Units', icon: <Activity />, color: 'rose' },
                    { label: 'Stock Valuation (Yard)', value: '₹24.8 Cr', change: '142 Units', icon: <Box />, color: 'purple' },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700 text-${stat.color}-500`}>{stat.icon}</div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">{stat.label}</p>
                        <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums mb-4">{stat.value}</h3>
                        <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${stat.change.startsWith('+') || !stat.change.includes('-') ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {stat.change} vs Target
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-[40px] p-10 flex flex-col relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />
                     <div className="flex justify-between items-start mb-10 relative z-10">
                        <div>
                            <h4 className="text-xl font-black text-white uppercase tracking-tight">Business Velocity (Area Trends)</h4>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Daily Inflow & Sales Momentum Index</p>
                        </div>
                        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                             <span className="text-[9px] font-black uppercase text-emerald-500">Live P&L Stream</span>
                        </div>
                    </div>
                    <div className="h-[400px] w-full mt-auto relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={REVENUE_DATA}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/100000}L`} />
                                <Tooltip contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '20px' }} />
                                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[#0f172a] rounded-[40px] p-10 border border-slate-700 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-[2] pointer-events-none group-hover:rotate-6 transition-transform duration-1000">
                        <Target size={180} />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-8 relative z-10">Model-wise Market Share</h4>
                    <div className="h-[300px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={MARKET_SHARE} innerRadius={80} outerRadius={100} paddingAngle={10} dataKey="value" stroke="none">
                                    {MARKET_SHARE.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '20px' }} />
                                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ bottom: -20, fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#94a3b8' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-sm font-black text-slate-500 uppercase tracking-widest">Total Sales</span>
                            <span className="text-2xl font-black text-white">420 Units</span>
                        </div>
                    </div>
                    <div className="mt-12 pt-10 border-t border-slate-700 relative z-10">
                        <button className="w-full py-4 bg-slate-800 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white transition-all shadow-xl">
                            Download Inventory Audit
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 shadow-sm relative group overflow-hidden">
                     <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10 relative z-10">Departmental Efficiency Heatmap</h4>
                     <div className="grid grid-cols-2 gap-8 relative z-10">
                        {DEPT_HEALTH.map((dept, i) => (
                            <div key={i} className={`p-8 bg-slate-800/40 border border-slate-700/50 rounded-[32px] hover:border-${dept.status === 'Critical' ? 'rose' : dept.status === 'Warning' ? 'amber' : 'emerald'}-500/30 transition-all ${dept.stuck > 10 ? 'ring-2 ring-rose-500 ring-offset-4 ring-offset-[#020617] animate-pulse shadow-xl shadow-rose-500/20' : ''}`}>
                                <div className="flex justify-between items-start mb-6">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{dept.dept}</p>
                                    <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${dept.status === 'Critical' ? 'bg-rose-500/10 text-rose-500' : dept.status === 'Warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>{dept.status}</span>
                                </div>
                                <h5 className="text-2xl font-black text-white tracking-tighter mb-1">{dept.value}</h5>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{dept.metric}</p>
                                <div className="mt-6 pt-6 border-t border-slate-700 flex justify-between">
                                     <div className="text-center">
                                        <p className="text-[10px] font-black text-rose-500">{dept.stuck}</p>
                                        <p className="text-[8px] font-black text-slate-600 uppercase">Stuck</p>
                                     </div>
                                     <div className="text-center">
                                        <p className="text-[10px] font-black text-white">{dept.latent}h</p>
                                        <p className="text-[8px] font-black text-slate-600 uppercase">Latent</p>
                                     </div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 flex flex-col relative overflow-hidden group">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10">Manager Escalation Feed</h4>
                    <div className="flex-1 space-y-6">
                        {[
                            { id: 'ESC-1', by: 'RTO Head', msg: 'HSRP inventory mismatch in Rajkot hub. Immediate stock push required.', type: 'Immediate' },
                            { id: 'ESC-2', by: 'Finance Manager', msg: 'ICICI Bank loan sanctions taking >5 days on avg. Review payout terms.', type: 'Urgent' },
                            { id: 'ESC-3', by: 'Accounts Head', msg: 'TDS reconciliation pending for Q3. Need auditor approval.', type: 'Normal' },
                        ].map((esc, i) => (
                            <div key={i} className={`p-6 bg-${esc.type === 'Immediate' ? 'rose' : esc.type === 'Urgent' ? 'amber' : 'slate'}-500/5 border border-${esc.type === 'Immediate' ? 'rose' : esc.type === 'Urgent' ? 'amber' : 'slate'}-500/10 rounded-3xl flex items-start gap-5 group-hover:scale-[1.02] transition-transform`}>
                                <div className={`p-2 rounded-xl bg-${esc.type === 'Immediate' ? 'rose' : esc.type === 'Urgent' ? 'amber' : 'slate'}-500/10 text-${esc.type === 'Immediate' ? 'rose' : esc.type === 'Urgent' ? 'amber' : 'slate'}-500`}>
                                     {esc.type === 'Immediate' ? <Zap size={18} /> : <Bell size={18} />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-xs font-black text-white uppercase">{esc.by}</p>
                                        <span className="text-[9px] font-black text-slate-500 uppercase">Today 10:42 AM</span>
                                    </div>
                                    <p className="text-[11px] font-medium text-slate-400 leading-relaxed">{esc.msg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-[#0f172a] rounded-[40px] p-12 border border-slate-700 shadow-3xl flex flex-col md:flex-row items-center gap-16 overflow-hidden relative group">
                <div className="flex-1 relative z-10 w-full">
                     <div className="flex items-center gap-4 mb-10">
                        <Shield className="text-emerald-500" size={32} />
                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Final Closing Gate (Safe Delivery)</h3>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                         {[
                            { label: 'Accounts', status: 'Approved', icon: <DollarSign /> },
                            { label: 'RTO Reg.', status: 'Ready', icon: <Car /> },
                            { label: 'Finance DO', status: 'Approved', icon: <FileText /> },
                            { label: 'PDI Cert.', status: 'Certified', icon: <CheckCircle2 /> },
                         ].map((gate, i) => (
                            <div key={i} className="text-center group-hover:scale-110 transition-transform">
                                <div className="mx-auto w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-500 mb-4 shadow-lg shadow-emerald-500/10">
                                     {gate.icon}
                                </div>
                                <p className="text-[10px] font-black text-white uppercase tracking-widest">{gate.label}</p>
                                <p className="text-[9px] font-black text-emerald-500 uppercase mt-1 flex items-center justify-center gap-1">
                                    <CheckCircle2 size={10} /> {gate.status}
                                </p>
                            </div>
                         ))}
                     </div>
                </div>

                <div className="w-full md:w-96 bg-slate-900 border border-slate-800 p-10 rounded-[48px] shadow-2xl relative z-10">
                     <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mb-4">Closing Logic Status</p>
                     <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Ready for Grand Handover?</h4>
                     <div className="space-y-6">
                         <div className="flex justify-between items-center text-sm font-black text-emerald-400 italic">
                             <span>YES — ALL GATES CLEAR</span>
                             <Zap size={16} />
                         </div>
                         <p className="text-xs font-medium text-slate-500 leading-relaxed mb-8">
                            System has verified technical and financial clearance across all 4 departments for VIN #88921.
                         </p>
                         <button className="w-full py-5 bg-white text-[#0f172a] rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-3">
                            Confirm Final Release <ChevronRight size={16} />
                         </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerCommandCenter;