import React, { useState } from 'react';
import { Car, AlertTriangle, TrendingDown, Package, Clock, DollarSign, Zap, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';

const MODELS_STOCK = [
  { model: 'Nexon', brand: 'TATA', units: 42, value: 5.8, ageAvg: 18, slowUnits: 3 },
  { model: 'Safari', brand: 'TATA', units: 28, value: 8.2, ageAvg: 28, slowUnits: 6 },
  { model: 'Harrier', brand: 'TATA', units: 31, value: 7.4, ageAvg: 45, slowUnits: 12 },
  { model: 'Punch', brand: 'TATA', units: 85, value: 6.1, ageAvg: 12, slowUnits: 0 },
  { model: 'Altroz', brand: 'TATA', units: 24, value: 2.1, ageAvg: 22, slowUnits: 4 },
  { model: 'Innova', brand: 'Toyota', units: 14, value: 4.2, ageAvg: 35, slowUnits: 5 },
  { model: 'Hector', brand: 'MG', units: 11, value: 3.1, ageAvg: 20, slowUnits: 2 },
];

const AGING_DATA = [
  { name: 'Under 30 Days', value: 142, fill: '#10b981' },
  { name: '30–60 Days', value: 64, fill: '#f59e0b' },
  { name: '60–90 Days', value: 28, fill: '#f97316' },
  { name: 'Over 90 Days', value: 12, fill: '#f43f5e' },
];

const STOCK_CHART = MODELS_STOCK.map(m => ({ name: m.model, units: m.units, value: m.value }));

const CEOInventoryValuation: React.FC = () => {
  const [sortBy, setSortBy] = useState<'units' | 'age' | 'slow'>('age');
  const totalUnits = MODELS_STOCK.reduce((s, m) => s + m.units, 0);
  const totalValue = MODELS_STOCK.reduce((s, m) => s + m.value, 0).toFixed(1);
  const slowMoving = MODELS_STOCK.reduce((s, m) => s + m.slowUnits, 0);
  const sortedModels = [...MODELS_STOCK].sort((a, b) => {
    if (sortBy === 'units') return b.units - a.units;
    if (sortBy === 'age') return b.ageAvg - a.ageAvg;
    return b.slowUnits - a.slowUnits;
  });

  const ageColor = (d: number) => d < 30 ? '#10b981' : d < 60 ? '#f59e0b' : '#f43f5e';
  const ageLabel = (d: number) => d < 30 ? 'Fresh' : d < 60 ? 'Getting Old' : 'Must Sell!';

  return (
    <div className="space-y-8 bg-[#020617] -m-6 p-8 min-h-screen text-slate-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-purple-500/20 rounded-xl border border-purple-500/30 text-purple-400">
              <Car size={20}/>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Stock Value</h2>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase ml-1">Which cars are sitting in the showroom? Which are old and costing you money?</p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl gap-1">
          {([['age', 'By Age'], ['slow', 'Slow Moving'], ['units', 'By Quantity']] as const).map(([v, l]) => (
            <button key={v} onClick={() => setSortBy(v)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all
                ${sortBy === v ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Cars in Stock', value: `${totalUnits} Units`, sub: 'Across all models & brands', color: 'blue', icon: <Package size={16}/> },
          { label: 'Total Stock Value', value: `₹${totalValue} Cr`, sub: 'Your money tied up in cars', color: 'purple', icon: <DollarSign size={16}/> },
          { label: 'Cars Sitting Over 60 Days', value: `${AGING_DATA[2].value + AGING_DATA[3].value} Units`, sub: 'Losing ₹84K/day in interest', color: 'rose', icon: <Clock size={16}/> },
          { label: 'Slow Moving Cars', value: `${slowMoving} Units`, sub: 'Need urgent action / offer', color: 'amber', icon: <AlertTriangle size={16}/> },
        ].map((s, i) => (
          <div key={i} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-600 transition-all">
            <div className={`inline-flex p-1.5 rounded-lg bg-${s.color}-500/10 border border-${s.color}-500/20 text-${s.color}-400 mb-3`}>
              {s.icon}
            </div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
            <h3 className="text-xl font-black text-white tracking-tight mb-1">{s.value}</h3>
            <p className="text-[9px] text-slate-600 font-bold uppercase">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Stock by Model Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-tight">Car-by-Car Stock Status</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">See each model — how many cars, how old, and how risky</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">
                <th className="text-left pb-3 pr-4">Model</th>
                <th className="text-left pb-3 pr-4">Brand</th>
                <th className="text-right pb-3 pr-4">Stock (Units)</th>
                <th className="text-right pb-3 pr-4">Value (₹Cr)</th>
                <th className="text-right pb-3 pr-4">Avg Age (Days)</th>
                <th className="text-center pb-3 pr-4">Status</th>
                <th className="text-right pb-3">Slow Moving</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sortedModels.map((m, i) => (
                <tr key={i} className={`${m.ageAvg > 60 ? 'bg-rose-500/5' : ''} hover:bg-slate-800/30 transition-all`}>
                  <td className="py-3 pr-4">
                    <p className="font-black text-white">{m.model}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase">{m.brand}</span>
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <span className="font-black text-white">{m.units}</span>
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <span className="font-black text-blue-400">₹{m.value}Cr</span>
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <span className="font-black" style={{ color: ageColor(m.ageAvg) }}>{m.ageAvg} days</span>
                  </td>
                  <td className="py-3 pr-4 text-center">
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${ageColor(m.ageAvg)}20`, color: ageColor(m.ageAvg) }}>
                      {ageLabel(m.ageAvg)}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {m.slowUnits > 0 ? (
                      <span className="text-rose-400 font-black">{m.slowUnits} units ⚠️</span>
                    ) : (
                      <CheckCircle2 size={14} className="text-emerald-500 ml-auto"/>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aging Chart + Stock Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">Car Age Distribution</h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-5">How long have cars been waiting to be sold?</p>
          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={AGING_DATA} innerRadius={52} outerRadius={68} paddingAngle={5} dataKey="value" stroke="none">
                  {AGING_DATA.map((e, i) => <Cell key={i} fill={e.fill}/>)}
                </Pie>
                <Tooltip contentStyle={{ background:'#0f172a', border:'none', borderRadius:'14px', fontSize:'11px' }} formatter={(v: any) => [`${v} cars`, '']}/>
                <Legend wrapperStyle={{ fontSize:'9px', fontWeight:'900', textTransform:'uppercase', color:'#94a3b8' }}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] font-black text-slate-500 uppercase">Total</span>
              <span className="text-xl font-black text-white">246</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">Stock Units by Model</h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-5">Which model has too many cars sitting unsold?</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STOCK_CHART}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="700" axisLine={false} tickLine={false}/>
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="700" axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ background:'#0f172a', border:'none', borderRadius:'14px', fontSize:'11px' }} formatter={(v: any) => [`${v} units`, '']}/>
                <Bar dataKey="units" fill="#3b82f6" radius={[6,6,0,0]} barSize={22}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── IDLE CAPITAL ALERT with Opportunity Cost ── */}
      <div className="space-y-3">
        {/* Primary Alert */}
        <div className="p-5 bg-rose-500/10 border border-rose-500/30 rounded-2xl">
          <div className="flex items-start gap-4 mb-4">
            <AlertTriangle size={20} className="text-rose-400 flex-shrink-0 mt-0.5"/>
            <div>
              <p className="text-sm font-black text-rose-300 uppercase mb-1">🚨 Urgent: 12 Harrier cars unsold for 90+ days</p>
              <p className="text-[10px] text-rose-400/70 font-bold">These 12 units are blocking ₹2.8 Cr of your money. You are not losing the car — but you ARE losing the profit you could have earned with that money.</p>
            </div>
          </div>

          {/* Opportunity Cost Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="p-4 bg-rose-500/15 border border-rose-500/25 rounded-xl text-center">
              <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1">Money Blocked</p>
              <p className="text-2xl font-black text-white">₹2.8 Cr</p>
              <p className="text-[9px] font-bold text-rose-400/60 mt-1">Tied up in unsold stock</p>
            </div>
            <div className="p-4 bg-amber-500/15 border border-amber-500/25 rounded-xl text-center">
              <p className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-1">Daily Interest Cost</p>
              <p className="text-2xl font-black text-white">₹84,000</p>
              <p className="text-[9px] font-bold text-amber-400/60 mt-1">Opportunity cost per day</p>
            </div>
            <div className="p-4 bg-orange-500/15 border border-orange-500/25 rounded-xl text-center">
              <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest mb-1">Monthly Profit Lost</p>
              <p className="text-2xl font-black text-white">₹2.4 L</p>
              <p className="text-[9px] font-bold text-orange-400/60 mt-1">Could be earned elsewhere</p>
            </div>
          </div>

          {/* Opportunity Cost Line */}
          <div className="p-3 bg-slate-900/60 border border-slate-700/40 rounded-xl mb-3">
            <p className="text-[10px] font-black text-amber-300 uppercase mb-1">💡 Opportunity Cost Insight</p>
            <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
              ₹2.8 Cr blocked in old stock = <span className="text-amber-300 font-black">₹2.4L/month potential profit lost.</span> If this money was invested in new fast-selling models (e.g., Nexon / Punch), it could generate <span className="text-emerald-400 font-black">₹5.6L/month</span> in returns — meaning you're losing the difference every single month you delay.
            </p>
          </div>

          {/* Recovery Window */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Recommended Action</p>
              <p className="text-xs font-bold text-white">Offer 2–3% discount or exchange deal to clear stock within 15 days</p>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-lg text-[9px] font-black text-amber-300 uppercase">
                Act Within 15 Days
              </div>
              <div className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-[9px] font-black text-emerald-400 uppercase">
                Save ₹1.26L
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEOInventoryValuation;
