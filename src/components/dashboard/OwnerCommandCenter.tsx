import React, { useState, useMemo } from 'react';
import {
    TrendingUp, BarChart3, Globe, AlertOctagon,
    ArrowUpRight, Activity, Layers, Map,
    DollarSign, PieChart, Calendar, ShieldCheck,
    ChevronRight, ArrowRight, Users, ClipboardList,
    Package, X, Landmark, IndianRupee, MapPin,
    Building2, Target, BarChart2, Clock,
    AlertTriangle, CheckCircle2
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, LineChart, Line, ComposedChart, Area,
    Cell, Legend, PieChart as RePie, Pie
} from 'recharts';
import { deals, teams, formatCurrency } from '@/data/dummyData';

// ─── BRANDS CONFIG ────────────────────────────────────────
const BRANDS = [
    { id: 'all', name: 'Group Total', color: '#6366f1', gradient: 'from-slate-900 to-slate-800' },
    { id: 'brand-1', name: 'Toyota', color: '#eb0a1e', gradient: 'from-red-700 to-red-900' },
    { id: 'brand-2', name: 'Hyundai', color: '#002c5f', gradient: 'from-blue-700 to-blue-900' },
    { id: 'brand-3', name: 'Tata', color: '#1a1a2e', gradient: 'from-slate-700 to-slate-900' },
    { id: 'brand-4', name: 'Mahindra', color: '#d97706', gradient: 'from-amber-700 to-amber-900' },
    { id: 'brand-5', name: 'Maruti', color: '#2563eb', gradient: 'from-indigo-600 to-blue-900' },
];

const CITIES = ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'];

// ─── MAIN COMPONENT ────────────────────────────────────────
const OwnerDashboard = () => {
    const [activeBrand, setActiveBrand] = useState('all');
    const [timePeriod, setTimePeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

    // ─── FILTERED DATA ─────────────────────────────────────
    const filteredDeals = useMemo(() => {
        return activeBrand === 'all' ? deals : deals.filter(d => d.brandId === activeBrand);
    }, [activeBrand]);

    const filteredTeams = useMemo(() => {
        return activeBrand === 'all' ? teams : teams.filter(t => t.brandId === activeBrand);
    }, [activeBrand]);

    // ─── CORE METRICS ──────────────────────────────────────
    const metrics = useMemo(() => {
        const totalLeads = filteredDeals.length;
        const bookings = filteredDeals.filter(d => d.stage !== 'General').length;
        const delivered = filteredDeals.filter(d => d.status === 'completed').length;
        const blocked = filteredDeals.filter(d => d.status === 'blocked').length;
        const revenue = filteredDeals.reduce((s, d) => s + d.amount, 0);
        const accessoriesTotal = filteredDeals.reduce((s, d) => s + (d.accessoriesAmount || 0), 0);
        const financeInhouse = filteredDeals.filter(d => d.financeType === 'In-house').length;
        const conversionRate = totalLeads > 0 ? ((delivered / totalLeads) * 100).toFixed(1) : '0';
        const activeOutlets = filteredTeams.length;
        const totalTarget = filteredTeams.reduce((s, t) => s + t.monthlyTarget, 0);
        const totalAchieved = filteredTeams.reduce((s, t) => s + t.achieved, 0);

        return { totalLeads, bookings, delivered, blocked, revenue, accessoriesTotal, financeInhouse, conversionRate, activeOutlets, totalTarget, totalAchieved };
    }, [filteredDeals, filteredTeams]);

    // ─── BRAND BREAKDOWN (for pie chart) ───────────────────
    const brandBreakdown = useMemo(() => {
        const totalRev = deals.reduce((s, d) => s + d.amount, 0);
        return BRANDS.filter(b => b.id !== 'all').map(brand => {
            const brandRev = deals.filter(d => d.brandId === brand.id).reduce((s, d) => s + d.amount, 0);
            return {
                name: brand.name,
                value: Math.round((brandRev / totalRev) * 100) || 0,
                revenue: brandRev,
                color: brand.color,
            };
        });
    }, []);

    // ─── STOCK INVENTORY BY BRAND ──────────────────────────
    const stockByBrand = useMemo(() => {
        return BRANDS.filter(b => b.id !== 'all').map(brand => {
            const brandDeals = deals.filter(d => d.brandId === brand.id);
            const active = brandDeals.filter(d => d.status === 'active' || d.status === 'pending').length;
            const completed = brandDeals.filter(d => d.status === 'completed').length;
            const blocked = brandDeals.filter(d => d.status === 'blocked').length;
            return { name: brand.name, brandId: brand.id, active, completed, blocked, total: active + completed + blocked, color: brand.color };
        });
    }, []);

    // ─── GEOGRAPHIC ANALYSIS ───────────────────────────────
    const cityPerformance = useMemo(() => {
        return CITIES.map(city => {
            const cityTeams = (activeBrand === 'all' ? teams : teams.filter(t => t.brandId === activeBrand)).filter(t => t.city === city);
            const revenue = cityTeams.reduce((s, t) => s + t.achieved, 0);
            const target = cityTeams.reduce((s, t) => s + t.monthlyTarget, 0);
            const outlets = cityTeams.length;
            return { city, revenue, target, outlets, achievement: target > 0 ? Math.round((revenue / target) * 100) : 0 };
        }).sort((a, b) => b.revenue - a.revenue);
    }, [activeBrand]);

    // ─── OUTLET RANKINGS ───────────────────────────────────
    const outletRankings = useMemo(() => {
        return filteredTeams
            .map(t => ({ ...t, score: Math.round((t.achieved / t.monthlyTarget) * 100) }))
            .sort((a, b) => b.score - a.score);
    }, [filteredTeams]);

    const topOutlets = outletRankings.slice(0, Math.min(10, outletRankings.length));
    const bottomOutlets = outletRankings.slice(-Math.min(5, outletRankings.length)).reverse();

    // ─── CRITICAL ALERTS ───────────────────────────────────
    const alerts = useMemo(() => {
        const red = filteredTeams.filter(t => (t.achieved / t.monthlyTarget) < 0.5).length;
        const yellow = filteredTeams.filter(t => { const r = t.achieved / t.monthlyTarget; return r >= 0.5 && r < 0.75; }).length;
        const green = filteredTeams.filter(t => (t.achieved / t.monthlyTarget) >= 0.75).length;
        return { red, yellow, green };
    }, [filteredTeams]);

    // ─── YEARLY PROJECTION DATA ────────────────────────────
    const yearlyData = useMemo(() => {
        const currentRev = metrics.revenue;
        return [
            { year: 'FY24', revenue: Math.round(currentRev * 0.52), profit: Math.round(currentRev * 0.52 * 0.09) },
            { year: 'FY25', revenue: Math.round(currentRev * 0.74), profit: Math.round(currentRev * 0.74 * 0.10) },
            { year: 'FY26', revenue: currentRev, profit: Math.round(currentRev * 0.112) },
        ];
    }, [metrics.revenue]);

    // ─── TIME MULTIPLIER (mock daily/weekly/monthly) ───────
    const timeLabel = timePeriod === 'daily' ? 'Today' : timePeriod === 'weekly' ? 'This Week' : 'This Month';
    const timeDivisor = timePeriod === 'daily' ? 30 : timePeriod === 'weekly' ? 4 : 1;

    return (
        <div className="min-h-screen bg-background text-foreground p-4 md:p-6 font-sans">

            {/* ═══════════════════════════════════════════════════
                HEADER: OWNER BRANDING + BRAND FILTER + TIME FILTER
            ═══════════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Owner Command</h1>
                    </div>
                    <p className="text-muted-foreground font-medium flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4" /> Multi-Brand Group Intelligence • {metrics.activeOutlets} Outlets Active • {timeLabel}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    {/* TIME PERIOD */}
                    <div className="flex bg-muted rounded-xl p-1 border shadow-inner">
                        {(['daily', 'weekly', 'monthly'] as const).map((period) => (
                            <button key={period} onClick={() => setTimePeriod(period)}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${timePeriod === period
                                    ? 'bg-card text-card-foreground shadow-sm ring-1 ring-border' : 'text-muted-foreground hover:text-foreground'}`}>
                                {period}
                            </button>
                        ))}
                    </div>
                    {/* BRAND FILTER */}
                    <div className="flex flex-wrap bg-muted rounded-xl p-1 border shadow-inner gap-0.5">
                        {BRANDS.map((brand) => (
                            <button key={brand.id} onClick={() => setActiveBrand(brand.id)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${activeBrand === brand.id
                                    ? 'bg-card text-card-foreground shadow-sm ring-1 ring-border' : 'text-muted-foreground hover:text-foreground'}`}>
                                {brand.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 1: 8-CARD HIGH DENSITY KPI GRID
            ═══════════════════════════════════════════════════ */}
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 mb-8">
                {/* REVENUE HERO CARD */}
                <div className={`col-span-2 bg-gradient-to-br ${BRANDS.find(b => b.id === activeBrand)?.gradient || 'from-slate-900 to-slate-800'} p-5 rounded-[2rem] text-white shadow-xl relative overflow-hidden`}>
                    <div className="relative z-10">
                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">
                            {activeBrand === 'all' ? 'Group Revenue' : `${BRANDS.find(b => b.id === activeBrand)?.name} Revenue`}
                        </p>
                        <p className="text-2xl md:text-3xl font-black tabular-nums">{formatCurrency(Math.round(metrics.revenue / timeDivisor))}</p>
                        <div className="flex items-center gap-1.5 mt-3">
                            <TrendingUp className="w-3 h-3 text-emerald-300" />
                            <span className="text-[10px] font-bold text-emerald-300">+{(12 / timeDivisor * 2).toFixed(0)}% {timeLabel}</span>
                        </div>
                    </div>
                    <Globe className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10" />
                </div>

                <KpiMini title="Total Leads" value={Math.round(metrics.totalLeads / timeDivisor)} icon={<Users className="w-4 h-4" />} color="#3b82f6" />
                <KpiMini title="Bookings" value={Math.round(metrics.bookings / timeDivisor)} icon={<ClipboardList className="w-4 h-4" />} color="#8b5cf6" />
                <KpiMini title="Delivered" value={Math.round(metrics.delivered / timeDivisor)} icon={<Package className="w-4 h-4" />} color="#10b981" />
                <KpiMini title="Conversion" value={`${metrics.conversionRate}%`} icon={<Target className="w-4 h-4" />} color="#f59e0b" subtitle="Lead → Delivery" />
                <KpiMini title="Blocked" value={metrics.blocked} icon={<X className="w-4 h-4" />} color="#ef4444" />
                <KpiMini title="Accessories" value={formatCurrency(metrics.accessoriesTotal)} icon={<Layers className="w-4 h-4" />} color="#ff6b35" />
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 2: CRITICAL ALERTS (RED / YELLOW / GREEN)
            ═══════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <AlertCard icon={<AlertOctagon className="w-5 h-5" />} label="Red Zones" count={alerts.red} sub="Below 50% Target" colorClass="bg-red-500/10 border-red-500/30 text-red-600" />
                <AlertCard icon={<AlertTriangle className="w-5 h-5" />} label="Yellow Watch" count={alerts.yellow} sub="50-75% Target" colorClass="bg-amber-500/10 border-amber-500/30 text-amber-600" />
                <AlertCard icon={<CheckCircle2 className="w-5 h-5" />} label="Green Active" count={alerts.green} sub="Above 75% Target" colorClass="bg-emerald-500/10 border-emerald-500/30 text-emerald-600" />
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 3: FORECASTING + BRAND COMPARISON
            ═══════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* FORECASTING & PROJECTIONS */}
                <div className="lg:col-span-2 bg-card border rounded-[2.5rem] p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <h3 className="text-lg font-black flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" /> Forecasting & P&L Projections
                        </h3>
                        <div className="flex gap-4 text-[10px] font-black uppercase text-muted-foreground">
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary" /> Revenue</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Profit</span>
                        </div>
                    </div>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={yearlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} dy={10} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid hsl(var(--border))', boxShadow: 'none' }} />
                                <Area type="monotone" dataKey="revenue" fill="hsl(var(--primary))" fillOpacity={0.05} stroke="none" />
                                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[12, 12, 0, 0]} barSize={50} />
                                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 3, stroke: '#fff' }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* BRAND PORTFOLIO COMPARISON */}
                <div className="bg-card border rounded-[2.5rem] p-6 md:p-8 shadow-sm">
                    <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" /> Brand Portfolio
                    </h3>
                    <div className="h-[200px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePie>
                                <Pie data={brandBreakdown} innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                                    {brandBreakdown.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </RePie>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-black">5</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Brands</span>
                        </div>
                    </div>
                    <div className="space-y-3 mt-4">
                        {brandBreakdown.map((b) => (
                            <div key={b.name} className="flex justify-between items-center group cursor-pointer hover:bg-muted/50 p-2 rounded-xl transition-all" onClick={() => {
                                const brand = BRANDS.find(br => br.name === b.name);
                                if (brand) setActiveBrand(brand.id);
                            }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                                    <span className="text-xs font-bold">{b.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-muted-foreground">{formatCurrency(b.revenue)}</span>
                                    <span className="text-xs font-black">{b.value}%</span>
                                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 4: STOCK INVENTORY BY BRAND (Edge Stock)
            ═══════════════════════════════════════════════════ */}
            <div className="bg-card border rounded-[2.5rem] p-6 md:p-8 shadow-sm mb-8">
                <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" /> Stock Inventory — Brand-Wise Edge Stock
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {stockByBrand.map((brand) => (
                        <div key={brand.name} className="p-4 rounded-2xl border hover:shadow-md transition-all cursor-pointer" onClick={() => setActiveBrand(brand.brandId)}>
                            <div className="flex justify-between items-start mb-3">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{brand.name}</p>
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brand.color }} />
                            </div>
                            <p className="text-2xl font-black">{brand.total}</p>
                            <p className="text-[10px] text-muted-foreground font-bold mb-3">Total Pipeline Units</p>
                            <div className="flex gap-2 text-[9px] font-bold">
                                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600">{brand.active} Active</span>
                                <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600">{brand.completed} Done</span>
                                {brand.blocked > 0 && <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-600">{brand.blocked} Block</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 5: GEOGRAPHIC ANALYSIS (City-Wise)
            ═══════════════════════════════════════════════════ */}
            <div className="bg-card border rounded-[2.5rem] p-6 md:p-8 shadow-sm mb-8">
                <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" /> Geographic Intelligence — City-Wise Revenue
                </h3>
                <div className="h-[280px] w-full mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={cityPerformance} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="city" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} width={90} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))' }} formatter={(val: number) => formatCurrency(val)} />
                            <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} barSize={24} name="Revenue" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {cityPerformance.map(c => (
                        <div key={c.city} className="p-3 rounded-xl border bg-muted/30">
                            <p className="text-[10px] font-black text-muted-foreground uppercase">{c.city}</p>
                            <p className="text-sm font-black">{formatCurrency(c.revenue)}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${c.achievement >= 75 ? 'bg-emerald-500' : c.achievement >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${c.achievement}%` }} />
                                </div>
                                <span className="text-[9px] font-black text-muted-foreground">{c.achievement}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 6: OUTLET RANKINGS (Top 10 + Bottom 5)
            ═══════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                {/* TOP OUTLETS */}
                <div className="bg-card border rounded-[2.5rem] p-6 md:p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-black flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Top Performers
                        </h3>
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">{topOutlets.length} Outlets</span>
                    </div>
                    <div className="space-y-2">
                        {topOutlets.map((outlet, i) => (
                            <OutletRow key={outlet.id} rank={i + 1} name={outlet.name} city={outlet.city || 'N/A'} score={outlet.score} status="top" brandName={BRANDS.find(b => b.id === outlet.brandId)?.name || ''} />
                        ))}
                    </div>
                </div>

                {/* BOTTOM OUTLETS */}
                <div className="bg-card border rounded-[2.5rem] p-6 md:p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-black flex items-center gap-2">
                            <AlertOctagon className="w-5 h-5 text-red-500" /> Needs Attention
                        </h3>
                        <span className="text-[10px] font-black text-red-600 bg-red-500/10 px-3 py-1 rounded-full">{bottomOutlets.length} Outlets</span>
                    </div>
                    <div className="space-y-2">
                        {bottomOutlets.map((outlet, i) => (
                            <OutletRow key={outlet.id} rank={outletRankings.length - bottomOutlets.length + i + 1} name={outlet.name} city={outlet.city || 'N/A'} score={outlet.score} status="bottom" brandName={BRANDS.find(b => b.id === outlet.brandId)?.name || ''} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 7: FINANCIAL P&L + RECOMMENDED ACTIONS
            ═══════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* RECOMMENDED ACTIONS */}
                <div className="bg-primary text-primary-foreground p-6 md:p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-primary-foreground/60 text-[10px] font-black uppercase tracking-widest mb-4">Owner's Recommended Actions</h3>
                        <div className="space-y-3">
                            {alerts.red > 0 && (
                                <ActionItem text={`Immediate review required: ${alerts.red} outlet(s) operating below 50% target. Consider resource re-allocation or management audit.`} />
                            )}
                            <ActionItem text="Redirect slow-moving Toyota Glanza stock from Surat West to Ahmedabad South to capitalize on high demand." />
                            <ActionItem text={`Maruti division showing strong momentum. Consider expanding Brezza inventory across ${activeBrand === 'all' ? 'all' : BRANDS.find(b => b.id === activeBrand)?.name} outlets.`} />
                            {alerts.yellow > 0 && (
                                <ActionItem text={`Monitor ${alerts.yellow} yellow-zone outlet(s). Deploy additional field support before month-end close.`} />
                            )}
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold opacity-60">Estimated Yield Improvement</p>
                                <p className="text-2xl font-black">+{formatCurrency(Math.round(metrics.revenue * 0.04))}</p>
                            </div>
                            <button className="bg-white text-primary p-3 rounded-2xl hover:scale-105 transition-transform shadow-lg">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                </div>

                {/* FINANCIAL P&L SUMMARY */}
                <div className="bg-card border rounded-[2.5rem] p-6 md:p-8 shadow-sm">
                    <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                        <IndianRupee className="w-5 h-5 text-primary" /> Financial P&L Summary
                    </h3>
                    <div className="space-y-4">
                        <PnlDetail label="Gross Revenue" value={formatCurrency(Math.round(metrics.revenue / timeDivisor))} percent="100%" highlight />
                        <div className="border-t my-2" />
                        <PnlDetail label="Material & Procurement" value={formatCurrency(Math.round(metrics.revenue * 0.62 / timeDivisor))} percent="62%" />
                        <PnlDetail label="Manpower & OpEx" value={formatCurrency(Math.round(metrics.revenue * 0.14 / timeDivisor))} percent="14%" />
                        <PnlDetail label="Marketing & Digital" value={formatCurrency(Math.round(metrics.revenue * 0.05 / timeDivisor))} percent="5%" />
                        <PnlDetail label="Accessories Revenue" value={formatCurrency(Math.round(metrics.accessoriesTotal / timeDivisor))} percent="" isPositive />
                        <div className="pt-4 mt-2 border-t flex justify-between items-center">
                            <span className="text-sm font-black text-primary">Consolidated EBITDA</span>
                            <span className="text-xl font-black text-emerald-500">{formatCurrency(Math.round(metrics.revenue * 0.19 / timeDivisor))}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                            <span>Net Profit Margin</span>
                            <span className="font-black text-emerald-600">11.2%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── SUB-COMPONENTS ─────────────────────────────────────────

const KpiMini = ({ title, value, icon, color, subtitle }: any) => (
    <div className="bg-card border p-3 md:p-4 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
            <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${color}15` }}>
                {React.cloneElement(icon, { style: { color } })}
            </div>
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter">{title}</p>
        </div>
        <div className="mt-auto">
            <p className="text-lg font-black">{value}</p>
            {subtitle && <p className="text-[9px] text-muted-foreground font-bold">{subtitle}</p>}
        </div>
    </div>
);

const AlertCard = ({ icon, label, count, sub, colorClass }: any) => (
    <div className={`border-2 p-5 rounded-[2rem] ${colorClass} flex items-center gap-4`}>
        <div className="p-3 rounded-2xl bg-white/60">{icon}</div>
        <div>
            <p className="text-2xl font-black">{String(count).padStart(2, '0')}</p>
            <p className="text-xs font-black">{label}</p>
            <p className="text-[10px] font-bold opacity-70">{sub}</p>
        </div>
    </div>
);

const OutletRow = ({ rank, name, city, score, status, brandName }: any) => (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${status === 'top' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
            {rank}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">{name}</p>
            <p className="text-[9px] text-muted-foreground font-bold uppercase">{brandName} • {city}</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden hidden sm:block">
                <div className={`h-full rounded-full ${status === 'top' ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} />
            </div>
            <span className={`text-xs font-black ${status === 'top' ? 'text-emerald-600' : 'text-red-600'}`}>{score}%</span>
        </div>
    </div>
);

const ActionItem = ({ text }: { text: string }) => (
    <div className="flex gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
        <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 shrink-0" />
        <p className="text-xs font-bold leading-relaxed">{text}</p>
    </div>
);

const PnlDetail = ({ label, value, percent, highlight, isPositive }: any) => (
    <div className="flex justify-between items-center text-xs font-bold">
        <span className={highlight ? 'text-foreground font-black' : 'text-muted-foreground'}>{label}</span>
        <div className="flex items-center gap-3">
            {percent && <span className="text-muted-foreground/50">{percent}</span>}
            <span className={`w-20 text-right font-black ${isPositive ? 'text-emerald-600' : highlight ? 'text-foreground' : ''}`}>{value}</span>
        </div>
    </div>
);

export default OwnerDashboard;