import React from 'react';
import { BarChart3, TrendingUp, Users, PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight, Printer, Share2, MoreVertical, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const REPORT_METRICS = [
  { label: 'Revenue Generated', value: '₹12.4 Cr', sub: 'Target: ₹15.0 Cr', percent: 82, color: 'bg-primary' },
  { label: 'Operational Expenses', value: '₹2.1 Cr', sub: 'Target: < ₹2.5 Cr', percent: 74, color: 'bg-destructive' },
  { label: 'Lead Conversion', value: '18.4%', sub: 'Target: 20%', percent: 92, color: 'bg-emerald-500' },
  { label: 'Unit Sales', value: '142', sub: 'Target: 180', percent: 78, color: 'bg-amber-500' },
];

const SALES_BY_MODEL_DATA = [
  { model: 'Safari', sales: 45, revenue: 112.5 },
  { model: 'Harrier', sales: 38, revenue: 85.2 },
  { model: 'Nexon', sales: 82, revenue: 106.6 },
  { model: 'Punch', sales: 95, revenue: 76.0 },
  { model: 'Altroz', sales: 64, revenue: 48.2 },
];

const AccSalesReports: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Consolidated Sales Reports</h2>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <Calendar size={14} /> Fiscal Year 2024-25 <span className="text-primary font-black">•</span> Performance Audit Ready
          </p>
        </div>
        <div className="flex gap-3 bg-muted/50 p-1.5 rounded-2xl border border-border self-stretch md:self-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-background border border-border rounded-xl text-xs font-black shadow-sm hover:bg-muted transition-all">
            <Printer size={14} /> Print Audit
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            <Share2 size={14} /> Share PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {REPORT_METRICS.map((metric, i) => (
          <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{metric.label}</span>
                <div className="p-1.5 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                    <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
            </div>
            <h3 className="text-2xl font-black tabular-nums">{metric.value}</h3>
            <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[10px] font-black">
                    <span className="text-muted-foreground">{metric.sub}</span>
                    <span className="text-primary">{metric.percent}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${metric.color} rounded-full transition-all duration-1000`} style={{ width: `${metric.percent}%` }} />
                </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-card border border-border rounded-[32px] p-8 shadow-sm">
             <div className="flex justify-between items-center mb-10">
                <div>
                   <h3 className="font-black text-xl tracking-tight">Revenue contribution by Model</h3>
                   <p className="text-xs text-muted-foreground font-medium">Model wise unit sales vs total revenue contribution (Cr)</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg text-[10px] font-black uppercase">
                        Units Sold
                    </div>
                </div>
             </div>
             <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SALES_BY_MODEL_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis dataKey="model" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 800}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 800}} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '20px', border: 'none', backgroundColor: 'hsl(var(--card))', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)' }}
                        />
                        <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[12, 12, 12, 12]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="flex flex-col gap-8">
              <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm flex-1">
                 <h3 className="font-black text-lg tracking-tight mb-8 text-center uppercase text-[12px] tracking-widest text-muted-foreground">Historical Trend</h3>
                 <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={SALES_BY_MODEL_DATA}>
                            <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={5} dot={{ r: 6, fill: 'hsl(var(--primary))', strokeWidth: 3, stroke: 'white' }} />
                        </LineChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="mt-8 pt-8 border-t border-border flex justify-around">
                    <div className="text-center">
                        <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60">Avg Profit</p>
                        <p className="text-lg font-black text-emerald-500 tracking-tight">₹1.85 L</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60">Converted</p>
                        <p className="text-lg font-black text-primary tracking-tight">72.4%</p>
                    </div>
                 </div>
              </div>

              <div className="bg-primary p-8 rounded-[32px] shadow-xl text-primary-foreground relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                      <BarChart3 size={120} />
                  </div>
                  <h4 className="font-black text-sm uppercase tracking-widest opacity-80 mb-2">Quarterly Projection</h4>
                  <h3 className="text-3xl font-black mb-6">₹18.50 Cr</h3>
                  <p className="text-[10px] font-black bg-white/20 inline-block px-3 py-1.5 rounded-full uppercase tracking-tighter">
                      Exceeding forecast by 12%
                  </p>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                  <h3 className="font-black text-lg tracking-tight">Operational Multipliers</h3>
                  <button className="text-muted-foreground hover:text-foreground transition-colors"><MoreVertical size={18} /></button>
              </div>
              <div className="space-y-6">
                {[
                  { label: 'In-house Finance adoption', value: '45%', status: 'excellent' },
                  { label: 'Insurance attachment rate', value: '68%', status: 'warning' },
                  { label: 'Accessories avg ticket size', value: '₹42K', status: 'excellent' },
                  { label: 'Warranty upsell ratio', value: '12%', status: 'critical' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-pointer hover:translate-x-1 transition-all duration-300">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${row.status === 'excellent' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : row.status === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-destructive'}`} />
                        <span className="text-[12px] font-black group-hover:text-primary transition-colors">{row.label}</span>
                    </div>
                    <span className="text-sm font-black tabular-nums">{row.value}</span>
                  </div>
                ))}
              </div>
          </div>

          <div className="bg-muted p-1 rounded-[32px] flex flex-col justify-center items-center text-center p-8 border border-border border-dashed">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Printer className="text-muted-foreground" size={24} />
              </div>
              <h4 className="font-black text-lg tracking-tight text-muted-foreground">Detailed Ledger Reports</h4>
              <p className="text-xs text-muted-foreground/60 max-w-[280px] mt-2 font-medium italic">
                  Generate deep-dive reports for audit trails, tax compliance, and salesperson incentive settlements.
              </p>
              <button className="mt-8 px-8 py-3 bg-background border border-border rounded-xl text-[11px] font-black tracking-widest hover:border-primary transition-all uppercase shadow-sm">
                  Access Archive
              </button>
          </div>
      </div>
    </div>
  );
};

export default AccSalesReports;
