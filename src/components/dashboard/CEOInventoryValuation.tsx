import React from 'react';
import { DollarSign, ShieldAlert, BarChart3, ArrowUpRight, ArrowDownRight, Printer, Search, Filter, History, Package, Clock, Gauge } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const AGING_DATA = [
  { name: 'Under 30 Days', value: 142, fill: '#10b981' },
  { name: '30-60 Days', value: 64, fill: '#3b82f6' },
  { name: '60-90 Days', value: 28, fill: '#8b5cf6' },
  { name: 'Over 90 Days', value: 12, fill: '#f43f5e' },
];

const MODEL_STOCK_DATA = [
  { name: 'Nexon', stock: 42, value: 5.8 },
  { name: 'Safari', stock: 28, value: 8.2 },
  { name: 'Harrier', stock: 31, value: 7.4 },
  { name: 'Punch', stock: 85, value: 6.1 },
  { name: 'Altroz', stock: 24, value: 2.1 },
];

const CEOInventoryValuation: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 bg-[#020617] -m-6 p-10 min-h-screen text-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase text-white">Stock Valuation & Age Intelligence</h2>
                    <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <Package size={16} className="text-primary" /> Real-time Capital Allocation & Asset Aging Audit
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest border border-slate-700 hover:bg-slate-700 transition-all">
                        Inventory Audit (XLS)
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[40px] shadow-2xl">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">Total Inventory Value</p>
                    <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums mb-2">₹24.84 Cr</h3>
                    <p className="text-[10px] font-black uppercase text-emerald-500 flex items-center gap-1">
                        <ArrowDownRight size={12}/> 4.2% Lower than Prev Month
                    </p>
                    <div className="mt-8 pt-8 border-t border-slate-800 space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                            <span>Ready Stock</span><span>₹18.4 Cr</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                            <span>Transit/Yard</span><span>₹6.4 Cr</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-[40px] p-10 shadow-sm overflow-hidden relative group">
                    <div className="h-[300px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MODEL_STOCK_DATA}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                                <YAxis yAxisId="left" orientation="left" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} tickFormatter={(v) => `${v}U`} />
                                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}Cr`} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '20px' }} />
                                <Bar yAxisId="left" dataKey="stock" fill="rgba(255,255,255,0.1)" radius={[10, 10, 0, 0]} barSize={40} />
                                <Bar yAxisId="right" dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} barSize={40} />
                            </BarChart>
                         </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-slate-900/50 border border-slate-800 rounded-[40px] p-12 shadow-sm flex flex-col md:flex-row items-center gap-12 overflow-hidden relative group">
                    <div className="flex-1 space-y-8 relative z-10 w-full">
                        <div className="flex items-center gap-3">
                            <Clock className="text-rose-500" size={24} />
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Aging Vulnerability</h3>
                        </div>
                        <div className="space-y-6">
                            {AGING_DATA.map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                                        <span>{item.name}</span>
                                        <span className="text-white">{item.value} Units</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(item.value / 246) * 100}%`, backgroundColor: item.fill }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-64 h-64 relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={AGING_DATA} innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value"
                                    stroke="none"
                                >
                                    {AGING_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                </Pie>
                                <Tooltip contentStyle={{ display: 'none' }} />
                                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#94a3b8' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-sm font-black text-slate-500 uppercase tracking-widest">Total</span>
                            <span className="text-2xl font-black text-white">246</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0f172a] rounded-[40px] p-12 border border-slate-700 shadow-2xl relative overflow-hidden group">
                     <div className="absolute -top-10 -right-10 opacity-5 scale-[2] pointer-events-none group-hover:rotate-6 transition-transform duration-1000">
                        <ShieldAlert size={200} />
                    </div>
                    <div className="relative z-10 space-y-8">
                        <h4 className="text-2xl font-black text-white uppercase tracking-tight">Dead-Stock Elimination</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium">
                            The system has identified **12 units** of *TATA Harrier (Manual)* that have exceeded the 90-day aging threshold. 
                            Potential capital blockage: **₹2.8 Cr**.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl">
                                  <p className="text-[10px] font-black uppercase text-rose-400 mb-2">Loss Prevention</p>
                                  <h5 className="text-2xl font-black text-white tracking-tighter">₹84K / Day</h5>
                                  <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase">Interest Cost (Avg)</p>
                             </div>
                             <div className="p-6 bg-slate-800 rounded-3xl flex flex-col justify-center">
                                  <p className="text-[10px] font-black uppercase text-slate-500 mb-4">Recommended Action</p>
                                  <button className="w-full py-3 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:opacity-90">
                                      Launch Fire-Sale
                                  </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CEOInventoryValuation;
