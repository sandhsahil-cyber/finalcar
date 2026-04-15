import React, { useState } from 'react';
import { LayoutGrid, Globe, TrendingUp, DollarSign, Search, Users, ShieldCheck, ArrowUpRight, ArrowDownRight, Printer, Share2, Layers, Map as MapIcon, Zap, Filter, ChevronDown, Activity, Box, UserCheck, Briefcase } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';
import { BrandPerformance } from '@/types/gceo';

const BRAND_DATA: BrandPerformance[] = [
  { id: '1', brand: 'Toyota', logo: 'https://www.carlogos.org/car-logos/toyota-logo.png', mtdRevenue: 42000000, mtdRevenueTarget: 38000000, ppu: 45000, stockTurnRatio: 4.2, efficiency: 94 },
  { id: '2', brand: 'MG', logo: 'https://www.carlogos.org/car-logos/mg-logo.png', mtdRevenue: 38000000, mtdRevenueTarget: 35000000, ppu: 38000, stockTurnRatio: 3.5, efficiency: 91 },
  { id: '3', brand: 'TATA Motors', logo: 'https://www.carlogos.org/car-logos/tata-motors-logo.png', mtdRevenue: 54000000, mtdRevenueTarget: 50000000, ppu: 32000, stockTurnRatio: 5.1, efficiency: 96 },
  { id: '4', brand: 'Ashok Leyland', logo: 'https://www.carlogos.org/car-logos/ashok-leyland-logo.png', mtdRevenue: 31000000, mtdRevenueTarget: 30000000, ppu: 28000, stockTurnRatio: 3.2, efficiency: 89 },
];

const CONTRIBUTION_DATA = [
  { name: 'Toyota', value: 42, fill: '#eb0a1e' },
  { name: 'MG', value: 38, fill: '#6366f1' },
  { name: 'TATA Motors', value: 54, fill: '#3b82f6' },
  { name: 'Ashok Leyland', value: 31, fill: '#10b981' },
];

const GCEOConsolidated: React.FC = () => {
    const [viewMode, setViewMode] = useState<'revenue' | 'volume'>('revenue');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-8 animate-in fade-in duration-500 bg-[#0f172a] -m-6 p-10 min-h-screen text-slate-200">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><LayoutGrid size={24}/></div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase text-white">All Brands Control Center</h2>
                    </div>
                    <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                         <Globe size={16} className="text-emerald-500" /> Total Sales & Money Management for All Brands
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
                    <div className="relative flex-1 min-w-[300px] xl:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search customer, car, showroom..." 
                            className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-[11px] font-black outline-none focus:ring-4 ring-blue-500/10 text-white placeholder:text-slate-600 shadow-xl" 
                        />
                        {searchTerm && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl z-50 animate-in slide-in-from-top-2">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Search Results</p>
                                <div className="space-y-2">
                                    <div className="p-3 hover:bg-slate-800 rounded-xl cursor-not-allowed">
                                        <p className="text-xs font-black text-white">VIN: TATA-NX-2024-X112</p>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Found in: Toyota Dealership (Rajkot)</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl gap-1">
                        <button 
                            onClick={() => setViewMode('revenue')}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'revenue' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            Money Made Mode
                        </button>
                        <button 
                            onClick={() => setViewMode('volume')}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'volume' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            Cars Sold Mode
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Total Money Collected', value: '₹195.4 Cr', change: '+18.2%', icon: <DollarSign />, color: 'text-emerald-400' },
                    { label: 'Average Profit per Car', value: '₹1.05L', change: '+4.5%', icon: <TrendingUp />, color: 'text-blue-400' },
                    { label: 'Total Cars in Stock', value: '₹842 Cr', change: '-2.1%', icon: <Box />, color: 'text-purple-400' },
                    { label: 'Total Staff Working', value: '1,242', change: '+14 New', icon: <UserCheck />, color: 'text-amber-400' },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">{stat.icon}</div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">{stat.label}</p>
                        <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums mb-4">{stat.value}</h3>
                        <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {stat.change.startsWith('+') ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                            {stat.change} vs Prev Period
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-[40px] shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-slate-800 bg-slate-800/20 flex justify-between items-center">
                        <div>
                            <h3 className="font-black text-xl tracking-tight uppercase text-white">Performance of All Brands</h3>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Sales Speed & Shop Performance</p>
                        </div>
                        <div className="flex gap-2">
                             <button className="p-2.5 bg-slate-800 text-slate-400 rounded-xl hover:text-white transition-all"><Filter size={18}/></button>
                             <button className="p-2.5 bg-slate-800 text-slate-400 rounded-xl hover:text-white transition-all"><Printer size={18}/></button>
                        </div>
                    </div>
                    <div className="overflow-x-auto h-full">
                        <table className="w-full text-left">
                            <thead className="bg-slate-800/30 text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-6">Brand Name</th>
                                    <th className="px-8 py-6">This Month Money Index</th>
                                    <th className="px-8 py-6 text-center">Avg Profit</th>
                                    <th className="px-8 py-6 text-center">Sale Speed</th>
                                    <th className="px-8 py-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {BRAND_DATA.map((item, i) => (
                                    <tr key={i} className="hover:bg-slate-800/20 transition-all group font-bold">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-2xl border border-slate-800 p-2 flex items-center justify-center">
                                                    <img src={item.logo} alt={item.brand} className="w-10 h-10 object-contain" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-white group-hover:text-blue-400 transition-colors uppercase">{item.brand}</p>
                                                    <p className="text-[9px] text-slate-500 uppercase tracking-[0.1em]">{item.efficiency}% Score</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 min-w-[200px]">
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500 mb-2">
                                                <span>₹{(item.mtdRevenue / 10000000).toFixed(1)} Cr</span>
                                                <span>{((item.mtdRevenue / item.mtdRevenueTarget) * 100).toFixed(0)}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }} animate={{ width: `${Math.min((item.mtdRevenue / item.mtdRevenueTarget) * 100, 100)}%` }} transition={{ duration: 1 }}
                                                    className={`h-full rounded-full ${item.mtdRevenue > item.mtdRevenueTarget ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                                                />
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <p className="text-sm font-black text-white">₹{(item.ppu / 1000).toFixed(0)}K</p>
                                            <p className="text-[9px] font-black text-slate-500 uppercase mt-0.5">Per Car</p>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <p className="text-sm font-black text-emerald-500">{item.stockTurnRatio}x</p>
                                            <p className="text-[9px] font-black text-slate-500 uppercase mt-0.5">Times / Month</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="px-5 py-2.5 bg-slate-800 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white transition-all">
                                                Full Business Check
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-[#1e293b] rounded-[40px] p-10 border border-slate-700 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                        <h4 className="text-xl font-black text-white uppercase tracking-tight mb-8 relative z-10">Money Share by Brand</h4>
                        <div className="h-[280px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={CONTRIBUTION_DATA} innerRadius={70} outerRadius={90} paddingAngle={10} dataKey="value" stroke="none">
                                        {CONTRIBUTION_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '20px' }} />
                                    <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ bottom: -10, fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#94a3b8' }} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-sm font-black text-slate-500 uppercase tracking-widest">Total</span>
                                <span className="text-2xl font-black text-white">100%</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-10 rounded-[40px] shadow-sm relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/10 blur-[80px] rounded-full pointer-events-none" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 mb-8 flex items-center gap-2">
                            <Zap size={14} className="animate-pulse" /> Important Alerts
                        </h4>
                        <div className="space-y-4">
                            {[
                                { title: 'Slow Sale Warning', msg: 'Ashok Leyland (City A) avg delivery time exceeded group avg by 4.2 days.', color: 'rose' },
                                { title: 'Rule Check Due', msg: 'MG Dealership is due for Q3 money check audit.', color: 'amber' },
                            ].map((alert, i) => (
                                <div key={i} className={`p-5 bg-${alert.color}-500/5 border border-${alert.color}-500/10 rounded-2xl`}>
                                    <p className={`text-[11px] font-black text-${alert.color}-400 mb-1`}>{alert.title}</p>
                                    <p className="text-[10px] font-medium text-slate-400 leading-relaxed">{alert.msg}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 shadow-sm relative group overflow-hidden">
                     <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-6 group-hover:rotate-0 transition-all duration-1000">
                        <MapIcon size={200} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-10">
                             <h4 className="text-xl font-black text-white uppercase tracking-tight">Total Car Stock Distribution</h4>
                             <button className="px-4 py-2 bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-400 rounded-xl hover:text-white hover:bg-slate-700 transition-all">Switch to Map View</button>
                        </div>
                        <div className="h-[300px] w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { city: 'Mumbai', toyota: 42, mg: 12, tata: 18, ashok: 8 },
                                    { city: 'Delhi', toyota: 38, mg: 24, tata: 14, ashok: 12 },
                                    { city: 'Bangalore', toyota: 24, mg: 8, tata: 31, ashok: 24 },
                                    { city: 'Rajkot', toyota: 64, mg: 4, tata: 2, ashok: 0 },
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="city" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '20px' }} />
                                    <Bar dataKey="toyota" stackId="a" fill="#eb0a1e" barSize={40} />
                                    <Bar dataKey="mg" stackId="a" fill="#6366f1" />
                                    <Bar dataKey="tata" stackId="a" fill="#3b82f6" />
                                    <Bar dataKey="ashok" stackId="a" fill="#10b981" radius={[10, 10, 0, 0]} />
                                </BarChart>
                             </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/20 rounded-[40px] p-12 text-white relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Briefcase size={140} />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="px-3 py-1 bg-indigo-500 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">Needs Your OK</div>
                                <Activity className="text-indigo-400 animate-pulse" size={20} />
                            </div>
                            <h3 className="text-4xl font-black tracking-tighter mb-4 italic">Big Approvals Pending</h3>
                            <p className="text-sm font-medium opacity-70 leading-relaxed mb-10 max-w-md">
                                You have **3 group-level approval requests** pending for buying assets and marketing expansion.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { req: 'New Yard Plot (Ahmedabad)', value: '₹4.2 Cr', by: 'Operations Team' },
                                { req: 'Marketing Campaign (All India)', value: '₹85.0L', by: 'Marketing Team' },
                            ].map((task, i) => (
                                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-[32px] flex items-center justify-between group-hover:border-indigo-500/30 transition-all">
                                    <div>
                                        <p className="text-sm font-black text-white">{task.req}</p>
                                        <p className="text-[10px] font-bold opacity-50 uppercase mt-1">{task.by}</p>
                                    </div>
                                    <div className="text-right flex items-center gap-4">
                                        <p className="text-xl font-black text-indigo-400 tabular-nums">{task.value}</p>
                                        <button className="px-5 py-2.5 bg-white text-indigo-900 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all">Review</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GCEOConsolidated;
