import React, { useState } from 'react';
import { 
  Flame, TrendingUp, DollarSign, Box, Activity, Target, Download,
  AlertTriangle, CheckCircle2, Users, Car, IndianRupee, Clock, Zap,
  ArrowUpRight, ArrowDownRight, Star, ThumbsUp, Package
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, PieChart, Pie, Cell, Legend, BarChart, Bar, LineChart, Line, RadialBarChart, RadialBar
} from 'recharts';

// ─── DATA ──────────────────────────────────────────────────────────────────────
const DAILY_CASH = [
  { day: '1 Apr', moneyIn: 1240000, moneyOut: 840000 },
  { day: '5 Apr', moneyIn: 2120000, moneyOut: 1300000 },
  { day: '10 Apr', moneyIn: 1840000, moneyOut: 990000 },
  { day: '15 Apr', moneyIn: 3420000, moneyOut: 2100000 },
  { day: '20 Apr', moneyIn: 2980000, moneyOut: 1760000 },
  { day: '25 Apr', moneyIn: 4120000, moneyOut: 2400000 },
  { day: '30 Apr', moneyIn: 3840000, moneyOut: 2180000 },
];

const MARKET_SHARE = [
  { name: 'Our Showroom', value: 42, fill: '#3b82f6' },
  { name: 'Rival A', value: 28, fill: '#64748b' },
  { name: 'Rival B', value: 18, fill: '#94a3b8' },
  { name: 'Others', value: 12, fill: '#475569' },
];

const EXTRA_INCOME = [
  { name: 'Insurance', val: 450000, fill: '#3b82f6' },
  { name: 'Loan Comm.', val: 320000, fill: '#8b5cf6' },
  { name: 'Accessories', val: 180000, fill: '#10b981' },
  { name: 'Discounts Lost', val: 410000, fill: '#f43f5e' },
];

const FUTURE_GOALS = [
  { month: 'May', target: 50000000, actual: 42000000 },
  { month: 'Jun', target: 55000000, actual: 0 },
  { month: 'Jul', target: 60000000, actual: 0 },
];

const DEPT_STATUS = [
  { dept: 'Accounts', health: 94, status: 'Good', pending: '₹4.2L overdue', alert: false },
  { dept: 'Finance Loans', health: 71, status: 'Slow', pending: '14 files pending', alert: true },
  { dept: 'RTO / Plates', health: 58, status: 'Critical', pending: '28 registrations stuck', alert: true },
  { dept: 'PDI Check', health: 96, status: 'Good', pending: '1 car failed check', alert: false },
  { dept: 'Insurance', health: 88, status: 'Good', pending: '3 renewals due', alert: false },
  { dept: 'Accessories', health: 82, status: 'OK', pending: '6 fittings pending', alert: false },
];


const RECENT_ALERTS = [
  { type: 'danger', msg: 'RTO: 28 registration files are stuck for over 30 days', time: '2h ago' },
  { type: 'warning', msg: 'Finance: 14 loan applications waiting for bank reply', time: '4h ago' },
  { type: 'success', msg: 'PDI: All April deliveries passed quality check', time: '1d ago' },
  { type: 'info', msg: '3 insurance renewals due in next 7 days', time: '1d ago' },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const BRAND_ROI = [
  { brand: 'Toyota',        investment: 120000000, returns: 168000000, color: '#c0392b' },
  { brand: 'TATA',          investment:  82000000, returns: 109000000, color: '#1e40af' },
  { brand: 'MG',            investment:  95000000, returns: 142000000, color: '#d97706' },
  { brand: 'Ashok Leyland', investment:  87000000, returns: 113000000, color: '#15803d' },
];

const OwnerCommandCenter: React.FC = () => {
  const [dateRange, setDateRange] = useState('MTD');

  const alertColor = (type: string) => {
    // Luxury dark theme: Teal=Success, Amber=Warning, Deep Red=Critical
    if (type === 'danger') return 'border-red-700/50 bg-red-950/40 text-red-400';
    if (type === 'warning') return 'border-amber-600/40 bg-amber-950/30 text-amber-400';
    if (type === 'success') return 'border-teal-600/40 bg-teal-950/30 text-teal-400';
    return 'border-blue-700/40 bg-blue-950/20 text-blue-400';
  };

  const healthColor = (h: number) => h >= 90 ? '#14b8a6' : h >= 70 ? '#f59e0b' : '#dc2626';

  return (
    <div className="space-y-8 bg-[#060d1a] -m-6 p-8 min-h-screen text-slate-200">

      {/* ── HEADER ── */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-rose-500/20 rounded-xl border border-rose-500/30 text-rose-400">
              <Flame size={22} />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">Owner Command Center</h2>
          </div>
          <p className="text-xs font-semibold text-slate-500 ml-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            Live tracking • Showroom Profit & Money Flow
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl gap-1">
            {['Today', 'Week', 'MTD', 'YTD'].map(p => (
              <button key={p} onClick={() => setDateRange(p)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all
                  ${dateRange === p ? 'bg-white text-black shadow-md' : 'text-slate-500 hover:text-white'}`}>
                {p}
              </button>
            ))}
          </div>
          <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all">
            <Download size={18}/>
          </button>
        </div>
      </div>

      {/* ── CRITICAL ALERTS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {RECENT_ALERTS.map((a, i) => (
          <div key={i} className={`flex items-start gap-3 px-4 py-3 rounded-2xl border ${alertColor(a.type)}`}>
            <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold leading-tight">{a.msg}</p>
              <p className="text-[10px] opacity-60 mt-0.5">{a.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── TOP 4 MONEY CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Money Collected', value: '₹14.24 Cr', sub: 'This Month', icon: <IndianRupee size={20}/>, color: 'emerald', trend: '+12.4%', up: true },
          { label: 'Actual Profit Earned', value: '18.2%', sub: 'Net Margin', icon: <TrendingUp size={20}/>, color: 'blue', trend: '+2.1%', up: true },
          { label: 'Customer Money Pending', value: '₹18.52 Cr', sub: 'Booked but not paid yet', icon: <Clock size={20}/>, color: 'amber', trend: '92 Orders', up: true },
          { label: 'Cars in Showroom', value: '₹24.8 Cr', sub: 'Value of unsold cars', icon: <Car size={20}/>, color: 'purple', trend: '142 Units', up: false },
        ].map((s, i) => (
          <div key={i} className="bg-slate-900/70 border border-slate-800 rounded-[28px] p-6 relative overflow-hidden group hover:border-slate-600 transition-all duration-300">
            <div className={`absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 text-${s.color}-400`}>
              <div className="w-20 h-20">{s.icon}</div>
            </div>
            <div className={`inline-flex p-2 rounded-xl bg-${s.color}-500/10 border border-${s.color}-500/20 text-${s.color}-400 mb-3`}>
              {s.icon}
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
            <h3 className="text-2xl font-black text-white tracking-tighter mb-1">{s.value}</h3>
            <p className="text-[10px] text-slate-600 font-bold uppercase">{s.sub}</p>
            <div className={`mt-3 flex items-center gap-1 text-[10px] font-black uppercase ${s.up ? 'text-emerald-500' : 'text-slate-500'}`}>
              {s.up ? <ArrowUpRight size={11}/> : <ArrowDownRight size={11}/>}
              {s.trend}
            </div>
          </div>
        ))}
      </div>

      {/* ── CAPITAL EFFICIENCY BANNER — Most Prominent Feature ── */}
      <div className="relative overflow-hidden rounded-2xl border"
        style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #0a1628 50%, #1a0a2e 100%)', borderColor: 'rgba(99,102,241,0.3)' }}>
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}/>
        <div className="relative z-10 p-6">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl border" style={{ backgroundColor:'#6366f115', borderColor:'#6366f140' }}>
                <Zap size={22} style={{ color:'#a5b4fc' }}/>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color:'#818cf8' }}>Capital Efficiency — Financial Health Index</p>
                <h3 className="text-xl font-black text-white">Your money is working at <span style={{ color:'#a5b4fc' }}>33.3% ROI</span> this month</h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-5">
              {[
                { label: 'Total Invested',   value: '₹38.4 Cr', color: '#94a3b8' },
                { label: 'Total Returned',   value: '₹51.2 Cr', color: '#14b8a6' },
                { label: 'Net Gain',         value: '+₹12.8 Cr', color: '#a5b4fc' },
                { label: 'Best Brand ROI',   value: 'MG 49%',    color: '#fbbf24' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-[8px] font-black uppercase tracking-widest mb-0.5 text-slate-500">{s.label}</p>
                  <p className="text-lg font-black" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── DAILY CASH FLOW + MARKET SHARE ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-[28px] p-7">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-base font-black text-white uppercase tracking-tight">Daily Cash Flow</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Money Coming In vs Money Going Out Every Day</p>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> In
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block ml-2" /> Out
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_CASH}>
                <defs>
                  <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="700" axisLine={false} tickLine={false}/>
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="700" axisLine={false} tickLine={false} tickFormatter={v => `₹${v/100000}L`}/>
                <Tooltip contentStyle={{ background:'#0f172a', border:'none', borderRadius:'16px', fontSize:'11px', fontWeight:'700' }}/>
                <Area type="monotone" dataKey="moneyIn" name="Money In" stroke="#10b981" strokeWidth={3} fill="url(#gIn)"/>
                <Area type="monotone" dataKey="moneyOut" name="Money Out" stroke="#f43f5e" strokeWidth={2} fill="url(#gOut)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-7">
          <h4 className="text-base font-black text-white uppercase tracking-tight mb-1">Our City Share</h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-5">How much of the city market is ours?</p>
          <div className="h-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MARKET_SHARE} innerRadius={58} outerRadius={75} paddingAngle={6} dataKey="value" stroke="none">
                  {MARKET_SHARE.map((e, i) => <Cell key={i} fill={e.fill}/>)}
                </Pie>
                <Tooltip contentStyle={{ background:'#0f172a', border:'none', borderRadius:'14px', fontSize:'11px' }}/>
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize:'9px', fontWeight:'900', textTransform:'uppercase', color:'#94a3b8' }}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] font-black text-slate-500 uppercase">Our Share</span>
              <span className="text-2xl font-black text-white">42%</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-center">
            <p className="text-[10px] text-emerald-400 font-black uppercase">+3.2% vs Last Month ↑</p>
          </div>
        </div>
      </div>

      {/* ── DEPARTMENT HEALTH METER ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-base font-black text-white uppercase tracking-tight">Department Health</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Which departments are smooth? Which have problems?</p>
          </div>
          <div className="flex gap-3 text-[9px] font-black uppercase">
            <span className="text-emerald-400">● Good</span>
            <span className="text-amber-400">● Slow</span>
            <span className="text-rose-400">● Critical</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEPT_STATUS.map((d, i) => (
            <div key={i} className={`p-4 rounded-2xl border ${d.alert ? 'border-rose-500/30 bg-rose-500/5' : 'border-slate-800 bg-slate-900/50'}`}>
              <div className="flex justify-between items-start mb-3">
                <p className="text-xs font-black text-white uppercase">{d.dept}</p>
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full
                  ${d.health >= 90 ? 'bg-emerald-500/20 text-emerald-400' : d.health >= 70 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  {d.status}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${d.health}%`, backgroundColor: healthColor(d.health) }}/>
              </div>
              <p className="text-[10px] text-slate-500 font-bold">{d.pending}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXTRA INCOME + GROWTH GOAL ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-7">
          <h4 className="text-base font-black text-white uppercase tracking-tight mb-1">Extra Income vs Money Lost to Discounts</h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-5">What extra money we earn + what we give away as discounts</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={EXTRA_INCOME} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false}/>
                <XAxis type="number" stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="700" axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}K`}/>
                <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="700" axisLine={false} tickLine={false} width={80}/>
                <Tooltip contentStyle={{ background:'#0f172a', border:'none', borderRadius:'14px', fontSize:'11px', fontWeight:'700' }} formatter={(v: any) => [`₹${(v/1000).toFixed(0)}K`, '']}/>
                <Bar dataKey="val" radius={[0, 8, 8, 0]}>
                  {EXTRA_INCOME.map((e, i) => <Cell key={i} fill={e.fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-7">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30 text-emerald-400">
              <Zap size={14}/>
            </div>
            <h4 className="text-base font-black text-white uppercase tracking-tight">Growth Plan — Next 3 Months</h4>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-4">Our target vs what we are actually achieving</p>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FUTURE_GOALS}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="700" axisLine={false} tickLine={false}/>
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="700" axisLine={false} tickLine={false} tickFormatter={v => `₹${v/10000000}Cr`}/>
                <Tooltip contentStyle={{ background:'#0f172a', border:'none', borderRadius:'14px', fontSize:'11px', fontWeight:'700' }}/>
                <Bar dataKey="target" name="Target" fill="#1e3a5f" radius={[6,6,0,0]} barSize={28}/>
                <Bar dataKey="actual" name="Actual" fill="#3b82f6" radius={[6,6,0,0]} barSize={28}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center gap-3 text-[9px] font-black uppercase">
            <span className="w-3 h-3 rounded-sm bg-[#1e3a5f] inline-block"/> Target
            <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block ml-2"/> Actual
          </div>

          {/* ── MARKETING YIELD CARD ── */}
          <div className="mt-5 pt-5 border-t border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-purple-500/20 rounded-lg border border-purple-500/30 text-purple-400">
                <TrendingUp size={13}/>
              </div>
              <h5 className="text-xs font-black text-white uppercase tracking-tight">Marketing ROI — Ad Money vs Profit</h5>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-4">Every rupee you spend on ads — how much profit does it actually bring?</p>

            {/* Marketing Stat Cards */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Ad Spend', value: '₹5L', sub: 'This Month', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
                { label: 'Net Profit Generated', value: '₹18L', sub: 'From Ad Campaigns', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                { label: 'Marketing ROI', value: '260%', sub: '₹1 Spent → ₹3.6 Back', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
              ].map((s, i) => (
                <div key={i} className={`p-3 rounded-xl border ${s.bg} text-center`}>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
                  <p className="text-[8px] font-bold text-slate-600 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Channel breakdown */}
            <div className="space-y-2">
              {[
                { channel: 'Google Ads', spend: '₹1.8L', profit: '₹7.2L', roi: '300%', bar: 75 },
                { channel: 'WhatsApp Campaign', spend: '₹0.5L', profit: '₹4.1L', roi: '720%', bar: 95 },
                { channel: 'Facebook / Meta', spend: '₹2L', profit: '₹5.2L', roi: '160%', bar: 55 },
                { channel: 'Print / Hoarding', spend: '₹0.7L', profit: '₹1.5L', roi: '114%', bar: 38 },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase w-32 flex-shrink-0 truncate">{c.channel}</p>
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-purple-500/70" style={{ width: `${c.bar}%` }}/>
                  </div>
                  <p className="text-[9px] font-black text-emerald-400 w-10 text-right flex-shrink-0">{c.roi}</p>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-slate-600 font-bold mt-2 italic">💡 WhatsApp is your highest-returning channel. Scale it up.</p>
          </div>
        </div>
      </div>

      {/* ── 30-DAY MONEY PLAN ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-7">
        <h4 className="text-base font-black text-white uppercase tracking-tight mb-1">30-Day Money Plan</h4>
        <p className="text-[10px] text-slate-500 font-bold uppercase mb-6">Expected cash coming in vs bills you have to pay this month</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 bg-teal-500/5 border border-teal-500/15 rounded-2xl">
            <p className="text-[9px] font-black text-teal-400 uppercase tracking-widest mb-2">Money Coming In</p>
            <h5 className="text-4xl font-black text-white tracking-tighter">₹12.4 Cr</h5>
            <p className="text-[9px] font-bold text-slate-500 uppercase mt-2">Loans Approved + Down Payments</p>
          </div>
          <div className="p-6 bg-red-500/5 border border-red-700/20 rounded-2xl">
            <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-2">Money Going Out</p>
            <h5 className="text-4xl font-black text-white tracking-tighter">₹8.2 Cr</h5>
            <p className="text-[9px] font-bold text-slate-500 uppercase mt-2">Stock + Bills + Salaries</p>
          </div>
          <div className="p-6 bg-indigo-500/10 border border-indigo-500/25 rounded-2xl flex flex-col justify-center">
            <Zap size={22} className="text-indigo-400 mb-3"/>
            <p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest mb-1">Net Cash Surplus</p>
            <p className="text-3xl font-black text-white">₹4.2 Cr</p>
            <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">Profit expected this month</p>
          </div>
        </div>
      </div>

      {/* ── CAPITAL EFFICIENCY ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-7">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-yellow-500/20 rounded-lg border border-yellow-500/30 text-yellow-400">
                <Zap size={16}/>
              </div>
              <h4 className="text-base font-black text-white uppercase tracking-tight">Capital Efficiency</h4>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase">How much we spent vs how much we got back — per brand</p>
          </div>
          <div className="flex gap-4 text-[9px] font-black uppercase">
            <span><span className="inline-block w-2.5 h-2.5 rounded-sm bg-slate-600 mr-1"/>Investment</span>
            <span><span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-500 mr-1"/>Returns</span>
          </div>
        </div>

        {/* Summary KPI Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Investment', value: '₹38.4 Cr', sub: 'How much we put in', color: 'slate', icon: <ArrowDownRight size={16}/> },
            { label: 'Total Returns', value: '₹51.2 Cr', sub: 'How much we got back', color: 'emerald', icon: <ArrowUpRight size={16}/> },
            { label: 'Overall ROI', value: '33.3%', sub: 'Success rate — every ₹1 invested ≈ ₹1.33 returned', color: 'yellow', icon: <TrendingUp size={16}/> },
          ].map((s, i) => (
            <div key={i} className={`p-5 rounded-2xl border ${
              i === 0 ? 'border-slate-700 bg-slate-800/40' :
              i === 1 ? 'border-emerald-500/25 bg-emerald-500/5' :
              'border-yellow-500/25 bg-yellow-500/5'
            }`}>
              <div className={`inline-flex p-1.5 rounded-lg mb-3 ${
                i === 0 ? 'bg-slate-700 text-slate-300' :
                i === 1 ? 'bg-emerald-500/20 text-emerald-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {s.icon}
              </div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
              <h3 className={`text-2xl font-black tracking-tighter mb-1 ${
                i === 0 ? 'text-white' : i === 1 ? 'text-emerald-400' : 'text-yellow-400'
              }`}>{s.value}</h3>
              <p className="text-[9px] text-slate-600 font-bold">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Brand-wise Bar Chart */}
        <div className="mb-5">
          <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Brand-by-Brand: Profit vs Cost</h5>
          <p className="text-[10px] text-slate-600 font-bold mb-4">Which brand is making us the most money after paying all costs?</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BRAND_ROI} barGap={4} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                <XAxis dataKey="brand" stroke="rgba(255,255,255,0.2)" fontSize={11} fontWeight="700" axisLine={false} tickLine={false}/>
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="700" axisLine={false} tickLine={false} tickFormatter={v => `₹${v/10000000}Cr`}/>
                <Tooltip
                  contentStyle={{ background:'#0f172a', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', fontSize:'11px', fontWeight:'700' }}
                  formatter={(v: any, name: string) => [`₹${(v/10000000).toFixed(2)} Cr`, name]}
                />
                <Bar dataKey="investment" name="Investment (What We Spent)" fill="#334155" radius={[6,6,0,0]} barSize={28}/>
                <Bar dataKey="returns" name="Returns (What We Got Back)" fill="#10b981" radius={[6,6,0,0]} barSize={28}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Per-Brand ROI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BRAND_ROI.map((b, i) => {
            const roi = (((b.returns - b.investment) / b.investment) * 100).toFixed(1);
            const profit = ((b.returns - b.investment) / 10000000).toFixed(2);
            const roiNum = parseFloat(roi);
            return (
              <div key={i} className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] ${
                roiNum >= 35 ? 'border-emerald-500/30 bg-emerald-500/5' :
                roiNum >= 25 ? 'border-blue-500/30 bg-blue-500/5' :
                'border-amber-500/30 bg-amber-500/5'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black text-white"
                    style={{ backgroundColor: b.color }}>
                    {b.brand.slice(0, 2).toUpperCase()}
                  </div>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                    roiNum >= 35 ? 'bg-emerald-500/20 text-emerald-400' :
                    roiNum >= 25 ? 'bg-blue-500/20 text-blue-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    ROI {roi}%
                  </span>
                </div>
                <p className="text-sm font-black text-white mb-0.5">{b.brand}</p>
                <p className="text-xl font-black text-emerald-400">₹{profit} Cr</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Net Profit</p>
                <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500/70" style={{ width: `${Math.min(roiNum, 50) * 2}%` }}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OwnerCommandCenter;