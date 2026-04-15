import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, TrendingUp, AlertTriangle, Phone, Filter } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Cell, AreaChart, Area
} from 'recharts';

// ─── BRAND DATA ──────────────────────────────────────────────────────────────
const BRANDS = [
  { id: 'all',   label: 'All Brands',     color: '#94a3b8', accent: '#334155' },
  { id: 'tata',  label: 'TATA',           color: '#3b82f6', accent: '#1e3a5f' },
  { id: 'toyota',label: 'Toyota',         color: '#dc2626', accent: '#450a0a' },
  { id: 'mg',    label: 'MG',             color: '#d97706', accent: '#451a03' },
  { id: 'al',    label: 'Ashok Leyland',  color: '#16a34a', accent: '#052e16' },
];

const BRAND_SCORES = [
  { brand: 'TATA',          score: 91, responses: 84, happy: 79, neutral: 13, unhappy: 8,  alert: false, alertMsg: '' },
  { brand: 'Toyota',        score: 87, responses: 42, happy: 74, neutral: 18, unhappy: 8,  alert: false, alertMsg: '' },
  { brand: 'MG',            score: 78, responses: 31, happy: 65, neutral: 22, unhappy: 13, alert: true,  alertMsg: 'MG satisfaction dropped to 78% — Accessories Fitting needs urgent attention.' },
  { brand: 'Ashok Leyland', score: 83, responses: 18, happy: 71, neutral: 20, unhappy: 9,  alert: false, alertMsg: '' },
];

const CSAT_TREND = [
  { month: 'Nov', score: 78 },
  { month: 'Dec', score: 82 },
  { month: 'Jan', score: 74 },
  { month: 'Feb', score: 85 },
  { month: 'Mar', score: 88 },
  { month: 'Apr', score: 91 },
];

const CATEGORY_SCORES: Record<string, Array<{ category: string; score: number }>> = {
  all:    [
    { category: 'Sales Team Behavior', score: 92 },
    { category: 'Delivery Process',    score: 88 },
    { category: 'Finance Help',        score: 79 },
    { category: 'Insurance Team',      score: 85 },
    { category: 'Accessories Fitting', score: 74 },
    { category: 'Showroom Cleanliness',score: 95 },
  ],
  tata:  [
    { category: 'Sales Team Behavior', score: 94 },
    { category: 'Delivery Process',    score: 91 },
    { category: 'Finance Help',        score: 82 },
    { category: 'Insurance Team',      score: 88 },
    { category: 'Accessories Fitting', score: 79 },
    { category: 'Showroom Cleanliness',score: 96 },
  ],
  toyota:[
    { category: 'Sales Team Behavior', score: 88 },
    { category: 'Delivery Process',    score: 85 },
    { category: 'Finance Help',        score: 76 },
    { category: 'Insurance Team',      score: 82 },
    { category: 'Accessories Fitting', score: 71 },
    { category: 'Showroom Cleanliness',score: 93 },
  ],
  mg:    [
    { category: 'Sales Team Behavior', score: 81 },
    { category: 'Delivery Process',    score: 79 },
    { category: 'Finance Help',        score: 74 },
    { category: 'Insurance Team',      score: 80 },
    { category: 'Accessories Fitting', score: 62 },
    { category: 'Showroom Cleanliness',score: 90 },
  ],
  al:    [
    { category: 'Sales Team Behavior', score: 85 },
    { category: 'Delivery Process',    score: 83 },
    { category: 'Finance Help',        score: 76 },
    { category: 'Insurance Team',      score: 78 },
    { category: 'Accessories Fitting', score: 73 },
    { category: 'Showroom Cleanliness',score: 88 },
  ],
};

const ALL_REVIEWS = [
  { brand: 'tata',  name: 'Rajesh Kumar', car: 'TATA Nexon',          rating: 5, comment: 'Excellent experience! Delivery was on time and staff was very helpful.', date: '2 days ago', salesperson: 'Rahul Shah' },
  { brand: 'tata',  name: 'Priya Sharma', car: 'TATA Safari',         rating: 4, comment: 'Good service but finance took too long — 5 days for loan approval.',      date: '3 days ago', salesperson: 'Amit Patel' },
  { brand: 'tata',  name: 'Suresh Patel', car: 'TATA Harrier',        rating: 3, comment: 'Car was great but had to follow up 3 times for plate. RTO is slow.',       date: '5 days ago', salesperson: 'Priya Mehta' },
  { brand: 'toyota',name: 'Anita Joshi',  car: 'Toyota Innova',       rating: 5, comment: 'Smooth process from booking to delivery. Very satisfied!',                  date: '1 week ago', salesperson: 'Neha Joshi' },
  { brand: 'toyota',name: 'Vikram Rao',   car: 'Toyota Fortuner',     rating: 4, comment: 'Great car. Insurance documentation was a bit slow.',                        date: '4 days ago', salesperson: 'Rahul Shah' },
  { brand: 'mg',    name: 'Mehul Shah',   car: 'MG Hector',           rating: 2, comment: 'Accessories were not fitted properly. Had to visit twice. Very frustrating.',date: '3 days ago', salesperson: 'Amit Patel' },
  { brand: 'mg',    name: 'Kavita Rao',   car: 'MG Gloster',          rating: 3, comment: 'Service okay but the accessories team needs better training.',               date: '6 days ago', salesperson: 'Priya Mehta' },
  { brand: 'al',    name: 'Dinesh Verma', car: 'Ashok Leyland BOSS',  rating: 4, comment: 'Good commercial vehicle. PDI process was thorough and professional.',        date: '2 weeks ago',salesperson: 'Rahul Shah' },
];

const PENDING_FOLLOWUP = [
  { name: 'Suresh Patel',  brand: 'TATA',          issue: 'RTO plate still pending',          daysWaiting: 12, priority: 'high' as const },
  { name: 'Mehul Shah',    brand: 'MG',            issue: 'Accessories not fitted properly',  daysWaiting: 8,  priority: 'high' as const },
  { name: 'Kavita Rao',    brand: 'MG',            issue: 'Second visit for accessories',     daysWaiting: 5,  priority: 'medium' as const },
  { name: 'Dinesh Verma',  brand: 'Ashok Leyland', issue: 'NOC document pending',             daysWaiting: 3,  priority: 'low' as const },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
const OwnerCSAT: React.FC = () => {
  const [tab, setTab]           = useState<'overview' | 'reviews' | 'followup'>('overview');
  const [brandFilter, setBrandFilter] = useState<string>('all');

  const activeBrand  = BRANDS.find(b => b.id === brandFilter)!;
  const activeScores = CATEGORY_SCORES[brandFilter] ?? CATEGORY_SCORES['all'];
  const filteredReviews = brandFilter === 'all' ? ALL_REVIEWS : ALL_REVIEWS.filter(r => r.brand === brandFilter);
  const filteredFollowup = brandFilter === 'all' ? PENDING_FOLLOWUP : PENDING_FOLLOWUP.filter(f =>
    brandFilter === 'tata'   ? f.brand === 'TATA' :
    brandFilter === 'toyota' ? f.brand === 'Toyota' :
    brandFilter === 'mg'     ? f.brand === 'MG' :
    brandFilter === 'al'     ? f.brand === 'Ashok Leyland' : true
  );

  const scoreColor   = (s: number) => s >= 85 ? '#14b8a6' : s >= 75 ? '#f59e0b' : '#dc2626';
  const scoreLabel   = (s: number) => s >= 85 ? 'Excellent' : s >= 75 ? 'Needs Work' : 'Critical';
  const priorityStyle = (p: string) =>
    p === 'high'   ? 'border-red-700/50 bg-red-950/40 text-red-400' :
    p === 'medium' ? 'border-amber-600/40 bg-amber-950/30 text-amber-400' :
                     'border-slate-700 bg-slate-900/50 text-slate-500';

  const overallScore = brandFilter === 'all' ? 89 :
    BRAND_SCORES.find(b =>
      (brandFilter === 'tata' && b.brand === 'TATA') ||
      (brandFilter === 'toyota' && b.brand === 'Toyota') ||
      (brandFilter === 'mg' && b.brand === 'MG') ||
      (brandFilter === 'al' && b.brand === 'Ashok Leyland')
    )?.score ?? 89;

  return (
    <div className="space-y-7 bg-[#020617] -m-6 p-8 min-h-screen text-slate-200">

      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-amber-500/15 rounded-xl border border-amber-500/25 text-amber-400">
              <Star size={20}/>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Experience Metrics</h2>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase ml-1">Brand-wise Customer Satisfaction · Alerts · Follow-Up Queue</p>
        </div>
        <div className="flex bg-[#0d1626] border border-white/8 p-1 rounded-xl gap-1">
          {([['overview', 'Overview'], ['reviews', 'Reviews'], ['followup', 'Follow-Up']] as const).map(([v, l]) => (
            <button key={v} onClick={() => setTab(v)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all
                ${tab === v ? 'bg-white text-black shadow-md' : 'text-slate-500 hover:text-white'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* ── BRAND FILTER BAR ── */}
      <div className="flex flex-wrap gap-2">
        {BRANDS.map(b => (
          <button key={b.id} onClick={() => setBrandFilter(b.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all duration-200
              ${brandFilter === b.id
                ? 'text-white shadow-lg scale-[1.04]'
                : 'border-slate-700 bg-slate-900 text-slate-500 hover:border-slate-600 hover:text-slate-300'
              }`}
            style={brandFilter === b.id ? { backgroundColor: b.accent, borderColor: b.color, color: b.color } : {}}>
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: b.color }}/>
            {b.label}
          </button>
        ))}

        {/* Filtered brand alert */}
        {brandFilter !== 'all' && BRAND_SCORES.find(bs =>
          (brandFilter === 'tata' && bs.brand === 'TATA') ||
          (brandFilter === 'toyota' && bs.brand === 'Toyota') ||
          (brandFilter === 'mg' && bs.brand === 'MG') ||
          (brandFilter === 'al' && bs.brand === 'Ashok Leyland')
        )?.alert && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-700/50 bg-red-950/40 text-red-400 text-[10px] font-black">
            <AlertTriangle size={11}/>
            {BRAND_SCORES.find(bs =>
              (brandFilter === 'tata' && bs.brand === 'TATA') ||
              (brandFilter === 'toyota' && bs.brand === 'Toyota') ||
              (brandFilter === 'mg' && bs.brand === 'MG') ||
              (brandFilter === 'al' && bs.brand === 'Ashok Leyland')
            )?.alertMsg}
          </div>
        )}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {tab === 'overview' && (
        <>
          {/* Brand Score Comparison Bar Chart */}
          <div className="bg-[#0d1626] border border-white/8 rounded-2xl p-6">
            <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">Brand Happiness Score Comparison</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-5">Which brand's customers are happiest? Score out of 100.</p>

            {/* Horizontal brand bars */}
            <div className="space-y-4 mb-6">
              {BRAND_SCORES.map((b, i) => {
                const brand = BRANDS.find(br =>
                  (br.id === 'tata' && b.brand === 'TATA') ||
                  (br.id === 'toyota' && b.brand === 'Toyota') ||
                  (br.id === 'mg' && b.brand === 'MG') ||
                  (br.id === 'al' && b.brand === 'Ashok Leyland')
                );
                return (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: brand?.color }}/>
                        <p className="text-xs font-black text-white uppercase">{b.brand}</p>
                        {b.alert && <AlertTriangle size={11} className="text-red-400"/>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold text-slate-500">{b.responses} reviews</span>
                        <span className="text-xs font-black" style={{ color: scoreColor(b.score) }}>{b.score}</span>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${scoreColor(b.score)}20`, color: scoreColor(b.score) }}>
                          {scoreLabel(b.score)}
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${b.score}%`, backgroundColor: brand?.color ?? '#64748b' }}/>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Small recharts version */}
            <div className="h-36 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BRAND_SCORES} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false}/>
                  <XAxis type="number" domain={[0, 100]} stroke="rgba(255,255,255,0.15)" fontSize={9} fontWeight="700" axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="brand" stroke="rgba(255,255,255,0.15)" fontSize={9} fontWeight="700" axisLine={false} tickLine={false} width={100}/>
                  <Tooltip contentStyle={{ background:'#0d1626', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'14px', fontSize:'11px', fontWeight:'700' }} formatter={(v: any) => [`${v}/100`, 'Happiness Score']}/>
                  <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={14}>
                    {BRAND_SCORES.map((_, i) => (
                      <Cell key={i} fill={[BRANDS[1].color, BRANDS[2].color, BRANDS[3].color, BRANDS[4].color][i]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Overall Score + Trend */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-1 bg-[#0d1626] border rounded-2xl p-7 text-center flex flex-col items-center justify-center"
              style={{ borderColor: brandFilter !== 'all' ? `${activeBrand.color}40` : 'rgba(255,255,255,0.08)' }}>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">
                {brandFilter === 'all' ? 'Overall' : activeBrand.label} Happiness Score
              </p>
              <div className="text-7xl font-black text-white mb-1" style={{ color: scoreColor(overallScore) }}>
                {overallScore}
              </div>
              <p className="text-xs font-bold text-slate-400">out of 100</p>
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.round(overallScore / 20) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}/>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-teal-400">
                <TrendingUp size={11}/> +3 pts vs last month
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Happy',   value: brandFilter === 'all' ? '78%' : `${BRAND_SCORES.find(b => b.brand === activeBrand.label)?.happy ?? 78}%`, icon: <ThumbsUp size={15}/>, color: '#14b8a6' },
                  { label: 'Neutral', value: brandFilter === 'all' ? '14%' : `${BRAND_SCORES.find(b => b.brand === activeBrand.label)?.neutral ?? 14}%`, icon: <MessageSquare size={15}/>, color: '#94a3b8' },
                  { label: 'Unhappy', value: brandFilter === 'all' ? '8%'  : `${BRAND_SCORES.find(b => b.brand === activeBrand.label)?.unhappy ?? 8}%`, icon: <ThumbsDown size={15}/>, color: '#dc2626' },
                ].map((s, i) => (
                  <div key={i} className="bg-[#0d1626] border border-white/8 rounded-xl p-4 text-center">
                    <div className="flex justify-center mb-2" style={{ color: s.color }}>{s.icon}</div>
                    <p className="text-xl font-black mb-1" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#0d1626] border border-white/8 rounded-xl p-5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">6-Month Trend</p>
                <div className="h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CSAT_TREND}>
                      <defs>
                        <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.15)" fontSize={9} fontWeight="700" axisLine={false} tickLine={false}/>
                      <YAxis domain={[60, 100]} stroke="rgba(255,255,255,0.15)" fontSize={9} fontWeight="700" axisLine={false} tickLine={false}/>
                      <Tooltip contentStyle={{ background:'#0d1626', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px', fontSize:'11px' }}/>
                      <Area type="monotone" dataKey="score" name="Score" stroke="#14b8a6" strokeWidth={2.5} fill="url(#gT)"/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Department Scores — filtered by brand */}
          <div className="bg-[#0d1626] border border-white/8 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-tight">Department Scores
                  {brandFilter !== 'all' && <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor:`${activeBrand.color}20`, color: activeBrand.color }}>
                    {activeBrand.label}
                  </span>}
                </h4>
                <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Anything below 80 needs immediate owner attention</p>
              </div>
              <div className="flex gap-3 text-[9px] font-black uppercase">
                <span style={{ color:'#14b8a6' }}>● Excellent (85+)</span>
                <span className="text-amber-400">● Warning (75–84)</span>
                <span style={{ color:'#dc2626' }}>● Critical (&lt;75)</span>
              </div>
            </div>
            <div className="space-y-3">
              {activeScores.map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <p className="text-[10px] font-black text-white uppercase w-44 flex-shrink-0">{c.category}</p>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${c.score}%`, backgroundColor: scoreColor(c.score) }}/>
                  </div>
                  <span className="text-xs font-black w-8 text-right flex-shrink-0" style={{ color: scoreColor(c.score) }}>{c.score}</span>
                  {c.score < 80 && (
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor:'#dc262620', color:'#dc2626' }}>
                      Action Needed
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── REVIEWS TAB ── */}
      {tab === 'reviews' && (
        <div className="space-y-4">
          <p className="text-[10px] text-slate-500 font-bold uppercase">Showing {filteredReviews.length} reviews {brandFilter !== 'all' ? `for ${activeBrand.label}` : 'across all brands'}</p>
          {filteredReviews.length === 0 && (
            <div className="p-8 text-center bg-[#0d1626] border border-white/8 rounded-2xl">
              <p className="text-slate-500 font-bold text-sm">No reviews found for this brand filter.</p>
            </div>
          )}
          {filteredReviews.map((r, i) => {
            const brandMeta = BRANDS.find(b => b.id === r.brand);
            return (
              <div key={i} className={`bg-[#0d1626] rounded-2xl p-5 border transition-all
                ${r.rating <= 2 ? 'border-red-700/50' : r.rating === 3 ? 'border-amber-600/40' : 'border-white/8'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-black text-white">{r.name}</p>
                      <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor:`${brandMeta?.color}20`, color: brandMeta?.color }}>
                        {brandMeta?.label}
                      </span>
                    </div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase">{r.car} · {r.salesperson}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} size={11} className={si < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}/>
                      ))}
                    </div>
                    <p className="text-[9px] text-slate-500 font-bold">{r.date}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{r.comment}</p>
                {r.rating <= 3 && (
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase hover:opacity-80 transition-all flex items-center gap-1"
                      style={{ backgroundColor:'#78350f40', borderColor:'#d97706', border:'1px solid', color:'#d97706' }}>
                      <Phone size={9}/> Call Customer
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase hover:opacity-80 transition-all"
                      style={{ backgroundColor:'#14b8a620', borderColor:'#14b8a6', border:'1px solid', color:'#14b8a6' }}>
                      Mark Resolved
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── FOLLOW-UP TAB ── */}
      {tab === 'followup' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border flex items-center gap-3"
            style={{ backgroundColor:'#dc262615', borderColor:'#dc262640' }}>
            <AlertTriangle size={15} style={{ color:'#dc2626' }} className="flex-shrink-0"/>
            <p className="text-[10px] font-black" style={{ color:'#fca5a5' }}>
              {filteredFollowup.filter(p => p.priority === 'high').length} customers need urgent attention today — call them personally.
            </p>
          </div>
          {filteredFollowup.length === 0 && (
            <div className="p-8 text-center bg-[#0d1626] border border-white/8 rounded-2xl">
              <p className="text-slate-500 font-bold text-sm">No follow-ups pending for this brand.</p>
            </div>
          )}
          {filteredFollowup.map((f, i) => {
            const brandMeta = BRANDS.find(b =>
              (b.id === 'tata' && f.brand === 'TATA') ||
              (b.id === 'toyota' && f.brand === 'Toyota') ||
              (b.id === 'mg' && f.brand === 'MG') ||
              (b.id === 'al' && f.brand === 'Ashok Leyland')
            );
            return (
              <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border ${priorityStyle(f.priority)}`}>
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-black text-white">{f.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-black text-white">{f.name}</p>
                    <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor:`${brandMeta?.color}20`, color: brandMeta?.color }}>
                      {f.brand}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">{f.issue}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-black text-white">{f.daysWaiting}d waiting</p>
                  <p className="text-[9px] font-bold uppercase opacity-60">{f.priority}</p>
                </div>
                <button className="px-3 py-2 rounded-xl text-[9px] font-black text-white uppercase hover:opacity-80 transition-all flex items-center gap-1 flex-shrink-0"
                  style={{ backgroundColor:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)' }}>
                  <Phone size={9}/> Call
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OwnerCSAT;
