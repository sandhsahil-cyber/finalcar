import React from 'react';
import { BarChartHorizontal, TrendingUp, DollarSign, Target, Activity, ArrowUpRight, ArrowDownRight, Printer, Share2, Layers, Filter, ChevronDown, Activity as Pulse, Zap } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, AreaChart, Area, Legend } from 'recharts';

const BRAND_COMPARISON = [
  { brand: 'Toyota', profit: 4.8, volume: 142, ppu: 45000, efficiency: 94 },
  { brand: 'BMW', profit: 12.4, volume: 88, ppu: 142000, efficiency: 82 },
  { brand: 'Audi', profit: 9.6, volume: 75, ppu: 128000, efficiency: 88 },
  { brand: 'Tesla', profit: 5.2, volume: 54, ppu: 95000, efficiency: 75 },
];

const GCEOBrandAnalytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 bg-[#0f172a] -m-6 p-10 min-h-screen text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight uppercase text-white">Inter-Brand High Performance Analytics</h2>
          <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <BarChartHorizontal size={16} className="text-blue-500" /> Cross-Portfolio Efficiency & Profitability Comparison
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 overflow-hidden relative group">
              <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10">Profit Contribution by Brand (Cr)</h4>
              <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={BRAND_COMPARISON} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis type="number" hide />
                          <YAxis dataKey="brand" type="category" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} width={80} />
                          <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '20px' }} />
                          <Bar dataKey="profit" radius={[0, 20, 20, 0]} barSize={40}>
                              {BRAND_COMPARISON.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.profit > 10 ? '#3b82f6' : entry.profit > 6 ? '#8b5cf6' : '#6366f1'} />
                              ))}
                          </Bar>
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>

           <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 overflow-hidden relative group">
              <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10">Net PPU Efficiency (₹k)</h4>
              <div className="h-[400px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={BRAND_COMPARISON}>
                             <defs>
                                <linearGradient id="colorPPU" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="brand" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} tickFormatter={(v) => `${v/1000}k`} />
                            <Tooltip contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '20px' }} />
                            <Area type="monotone" dataKey="ppu" stroke="#10b981" fillOpacity={1} fill="url(#colorPPU)" strokeWidth={4} />
                        </AreaChart>
                   </ResponsiveContainer>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {[
            { label: 'Most Profitable', value: 'BMW India', sub: '₹142K PPU', icon: <DollarSign />, color: 'blue' },
            { label: 'Best Efficiency', value: 'Toyota (City A)', sub: '94% TAT Score', icon: <Pulse />, color: 'emerald' },
            { label: 'Fastest Stock Turn', value: 'Toyota (City B)', sub: '5.2x Monthly', icon: <Zap />, color: 'amber' },
            { label: 'Highest CSAT', value: 'Audi Mumbai', sub: '9.8 / 10', icon: <Target />, color: 'purple' },
          ].map((card, i) => (
              <div key={i} className={`bg-slate-900/50 border border-slate-800 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group`}>
                   <div className={`p-3 bg-${card.color}-500/10 rounded-2xl w-fit ${card.color === 'blue' ? 'text-blue-400' : card.color === 'emerald' ? 'text-emerald-400' : card.color === 'amber' ? 'text-amber-400' : 'text-purple-400'} mb-6`}>{card.icon}</div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{card.label}</p>
                   <h5 className="text-xl font-black text-white tracking-tight uppercase mb-1">{card.value}</h5>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter opacity-60">{card.sub}</p>
              </div>
          ))}
      </div>
    </div>
  );
};

export default GCEOBrandAnalytics;
