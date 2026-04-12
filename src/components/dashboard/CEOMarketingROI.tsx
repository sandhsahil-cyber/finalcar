import React from 'react';
import { Zap, TrendingUp, Target, Users, DollarSign, ArrowUpRight, ArrowDownRight, Printer, Share2, Activity, PieChart, Filter } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';

const MARKETING_METRICS = [
  { month: 'Jan', leads: 420, closures: 31, spend: 120000 },
  { month: 'Feb', leads: 510, closures: 42, spend: 145000 },
  { month: 'Mar', leads: 680, closures: 58, spend: 210000 },
  { month: 'Apr', leads: 590, closures: 48, spend: 180000 },
  { month: 'May', leads: 820, closures: 72, spend: 250000 },
  { month: 'Jun', leads: 940, closures: 84, spend: 280000 },
];

const SOURCE_ROI = [
  { name: 'Instagram', conversion: 4.2, cac: 1200, color: '#e1306c' },
  { name: 'Google Search', conversion: 8.5, cac: 2400, color: '#4285f4' },
  { name: 'Facebook', conversion: 3.8, cac: 1400, color: '#1877f2' },
  { name: 'Local Events', conversion: 12.4, cac: 800, color: '#10b981' },
];

const CEOMarketingROI: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 bg-[#020617] -m-6 p-10 min-h-screen text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight uppercase text-white">Marketing ROI & Lead Intelligence</h2>
          <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <Zap size={16} className="text-amber-400" /> Capital Acquisition Cost vs Conversion Efficiency
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
              { label: 'Avg CAC', value: '₹1,440', sub: '-₹210 vs LY', icon: <DollarSign />, color: 'text-emerald-500' },
              { label: 'Total MTD Spend', value: '₹2.84L', sub: '92% of budget', icon: <Activity />, color: 'text-blue-500' },
              { label: 'Conversion Rate', value: '8.4%', sub: '+1.2% this week', icon: <Target />, color: 'text-amber-500' },
              { label: 'New Web Leads', value: '942', sub: 'Last 30 Days', icon: <Users />, color: 'text-purple-500' },
          ].map((stat, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-[32px] shadow-sm">
                  <div className={`p-2 rounded-xl mb-4 inline-block bg-slate-800 ${stat.color}`}>
                      {stat.icon}
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-black text-white tabular-nums mt-1">{stat.value}</h3>
                  <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">{stat.sub}</p>
              </div>
          ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-slate-900/50 border border-slate-800 rounded-[40px] p-10 flex flex-col">
              <div className="flex justify-between items-center mb-10">
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">Lead Ingestion vs Spending</h4>
                  <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Leads</span></div>
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Spending</span></div>
                  </div>
              </div>
              <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MARKETING_METRICS}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                          <YAxis yAxisId="left" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                          <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.3)" fontSize={11} fontWeight="900" axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '20px' }} />
                          <Area yAxisId="left" type="monotone" dataKey="leads" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={4} />
                          <Area yAxisId="right" type="monotone" dataKey="spend" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={4} />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-[40px] p-10 flex flex-col">
              <h4 className="text-xl font-black text-white uppercase tracking-tight mb-10">Channel Efficiency (Conversion %)</h4>
              <div className="flex-1 space-y-8">
                  {SOURCE_ROI.map((source, i) => (
                      <div key={i}>
                          <div className="flex justify-between items-center mb-2">
                              <p className="text-[11px] font-black text-white uppercase tracking-widest">{source.name}</p>
                              <p className="text-[11px] font-black text-emerald-500">{source.conversion}%</p>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(source.conversion / 15) * 100}%`, backgroundColor: source.color }} />
                          </div>
                          <div className="flex justify-between mt-2">
                              <p className="text-[9px] font-black text-slate-500 uppercase">CAC: ₹{source.cac}</p>
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">High Efficiency</p>
                          </div>
                      </div>
                  ))}
              </div>
              <div className="mt-12 bg-blue-600 p-8 rounded-[32px] text-white overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                      <TrendingUp size={100} />
                  </div>
                  <p className="text-[10px] font-black uppercase opacity-60 mb-4">Strategic Insight</p>
                  <p className="text-xs font-bold leading-relaxed mb-6">
                      Local Events have the highest conversion (12.4%) at the lowest cost. Recommend scaling and increasing budget for Q3.
                  </p>
                  <button className="w-full py-3 bg-white text-blue-600 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">
                      Allocate 20% More Budget
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default CEOMarketingROI;
