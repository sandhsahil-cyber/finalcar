import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, IndianRupee, ArrowUpRight, ArrowDownRight, Target, Zap, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Cell, PieChart, Pie, Legend } from 'recharts';

const MONTHLY_PL = [
  { month: 'Nov', income: 9200000, costs: 7100000, profit: 2100000 },
  { month: 'Dec', income: 11400000, costs: 8200000, profit: 3200000 },
  { month: 'Jan', income: 10800000, costs: 7900000, profit: 2900000 },
  { month: 'Feb', income: 12600000, costs: 8800000, profit: 3800000 },
  { month: 'Mar', income: 13900000, costs: 9200000, profit: 4700000 },
  { month: 'Apr', income: 14240000, costs: 9800000, profit: 4440000 },
];

const COST_BREAKDOWN = [
  { name: 'Staff Salaries', value: 3200000, fill: '#3b82f6', pct: 33 },
  { name: 'Stock Purchase', value: 4100000, fill: '#8b5cf6', pct: 42 },
  { name: 'Showroom Rent', value: 480000, fill: '#f59e0b', pct: 5 },
  { name: 'Marketing Ads', value: 580000, fill: '#10b981', pct: 6 },
  { name: 'Other Bills', value: 1440000, fill: '#64748b', pct: 14 },
];

const INCOME_SOURCES = [
  { name: 'Car Sales', value: 10800000, fill: '#3b82f6' },
  { name: 'Insurance Comm.', value: 1450000, fill: '#8b5cf6' },
  { name: 'Loan Comm.', value: 920000, fill: '#10b981' },
  { name: 'Accessories', value: 680000, fill: '#f59e0b' },
  { name: 'PDI Charges', value: 390000, fill: '#f43f5e' },
];

const OwnerProfitability: React.FC = () => {
  const [view, setView] = useState<'monthly' | 'breakdown'>('monthly');

  const thisMonth = MONTHLY_PL[MONTHLY_PL.length - 1];
  const lastMonth = MONTHLY_PL[MONTHLY_PL.length - 2];
  const profitGrowth = (((thisMonth.profit - lastMonth.profit) / lastMonth.profit) * 100).toFixed(1);

  return (
    <div className="space-y-8 bg-[#020617] -m-6 p-8 min-h-screen text-slate-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-emerald-500/20 rounded-xl border border-emerald-500/30 text-emerald-400">
              <TrendingUp size={20}/>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Net Profit</h2>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase ml-1">Actual money left after paying all bills & staff</p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl gap-1">
          {(['monthly', 'breakdown'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all
                ${view === v ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}>
              {v === 'monthly' ? 'Monthly View' : 'Cost Breakdown'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Income This Month', value: '₹14.24 Cr', sub: 'All sources combined', color: 'emerald', up: true, trend: '+8.2%' },
          { label: 'Total Costs This Month', value: '₹9.8 Cr', sub: 'Staff + Stock + Bills', color: 'rose', up: false, trend: '+3.1%' },
          { label: 'Actual Profit Left', value: '₹4.44 Cr', sub: 'After all deductions', color: 'blue', up: true, trend: `+${profitGrowth}%` },
          { label: 'Profit Margin %', value: '18.2%', sub: 'Every ₹100 in = ₹18 profit', color: 'purple', up: true, trend: 'Target: 20%' },
        ].map((s, i) => (
          <div key={i} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-600 transition-all">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">{s.label}</p>
            <h3 className={`text-xl font-black text-${s.color}-400 tracking-tight mb-1`}>{s.value}</h3>
            <p className="text-[9px] text-slate-600 font-bold uppercase">{s.sub}</p>
            <div className={`mt-2 flex items-center gap-1 text-[9px] font-black uppercase ${s.up ? 'text-emerald-500' : 'text-rose-500'}`}>
              {s.up ? <ArrowUpRight size={10}/> : <ArrowDownRight size={10}/>} {s.trend}
            </div>
          </div>
        ))}
      </div>

      {view === 'monthly' ? (
        <>
          {/* P&L Bar Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
            <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">6-Month Profit History</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-5">Compare income, costs and profit side by side</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_PL}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="700" axisLine={false} tickLine={false}/>
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="700" axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000000}Cr`}/>
                  <Tooltip contentStyle={{ background:'#0f172a', border:'none', borderRadius:'14px', fontSize:'11px', fontWeight:'700' }} formatter={(v: any) => [`₹${(v/1000000).toFixed(2)}Cr`, '']}/>
                  <Bar dataKey="income" name="Money In" fill="#3b82f6" radius={[4,4,0,0]} barSize={20}/>
                  <Bar dataKey="costs" name="Costs" fill="#f43f5e" radius={[4,4,0,0]} barSize={20}/>
                  <Bar dataKey="profit" name="Profit" fill="#10b981" radius={[4,4,0,0]} barSize={20}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex gap-4 text-[9px] font-black uppercase">
              <span className="text-blue-400">● Money In</span>
              <span className="text-rose-400">● Costs</span>
              <span className="text-emerald-400">● Profit</span>
            </div>
          </div>

          {/* Income Sources */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
            <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">Where is Our Money Coming From?</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-5">Breakdown of all income sources</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={INCOME_SOURCES} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                      {INCOME_SOURCES.map((e, i) => <Cell key={i} fill={e.fill}/>)}
                    </Pie>
                    <Tooltip contentStyle={{ background:'#0f172a', border:'none', borderRadius:'14px', fontSize:'11px' }} formatter={(v: any) => [`₹${(v/100000).toFixed(1)}L`, '']}/>
                    <Legend wrapperStyle={{ fontSize:'9px', fontWeight:'900', textTransform:'uppercase', color:'#94a3b8' }}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {INCOME_SOURCES.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.fill }}/>
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] font-black text-white uppercase mb-1">
                        <span>{s.name}</span>
                        <span className="text-slate-400">₹{(s.value/100000).toFixed(1)}L</span>
                      </div>
                      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(s.value / 14240000) * 100}%`, backgroundColor: s.fill }}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">Where is Our Money Going?</h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-6">This month's cost breakdown — every single rupee</p>
          <div className="space-y-4">
            {COST_BREAKDOWN.map((c, i) => (
              <div key={i} className="p-4 bg-slate-800/40 border border-slate-700/40 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.fill }}/>
                    <p className="text-xs font-black text-white uppercase">{c.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-white">₹{(c.value/100000).toFixed(1)}L</p>
                    <p className="text-[9px] text-slate-500 font-bold">{c.pct}% of total costs</p>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.pct}%`, backgroundColor: c.fill }}/>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 bg-slate-800/50 border border-slate-700/40 rounded-xl flex items-center gap-3">
            <AlertTriangle size={16} className="text-amber-400 flex-shrink-0"/>
            <p className="text-[10px] text-amber-300 font-bold">Staff salaries + stock cost = 75% of total spend. Review quarterly to stay profitable.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerProfitability;
