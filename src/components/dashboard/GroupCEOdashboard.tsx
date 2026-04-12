import React, { useState, useMemo } from 'react';
import { 
  BarChart3, TrendingUp, Layers, MapPin, Building2, Globe, Users, 
  ClipboardList, Package, X, ShieldCheck, IndianRupee, CheckCircle2 
} from 'lucide-react';
import { deals, formatCurrency, salespeople, teams, STAGE_COLORS } from '@/data/dummyData';
import MetricsCard from './MetricsCard';

const GroupCEOdashboard = () => {
    // 1. BRAND CONFIGURATION
    const brands = [
        { id: 'all', name: 'Group Total', color: 'from-gray-900 to-gray-800' },
        { id: 'brand-1', name: 'Toyota', color: 'from-red-700 to-red-900' },
        { id: 'brand-2', name: 'Hyundai', color: 'from-blue-700 to-blue-900' },
        { id: 'brand-3', name: 'Tata', color: 'from-slate-700 to-slate-900' },
        { id: 'brand-4', name: 'Mahindra', color: 'from-orange-700 to-orange-900' },
        { id: 'brand-5', name: 'Maruti', color: 'from-indigo-600 to-blue-900' },
    ];

    const [activeBrand, setActiveBrand] = useState('all');

    const filteredDeals = useMemo(() => {
        return activeBrand === 'all'
            ? deals
            : deals.filter(d => d.brandId === activeBrand);
    }, [activeBrand]);

    // 3. CALCULATIONS
    const metrics = useMemo(() => {
        const delivered = filteredDeals.filter(d => d.status === 'completed').length;
        const totalLeads = filteredDeals.length;
        const bookings = filteredDeals.filter(d => d.stage !== 'General').length;
        const blocked = filteredDeals.filter(d => d.status === 'blocked').length;
        const financeInhouse = filteredDeals.filter(d => d.financeType === 'In-house').length;
        const accessoriesCount = filteredDeals.filter(d => (d.accessoriesAmount || 0) > 0).length;
        const accessoriesTotal = filteredDeals.reduce((sum, d) => sum + (d.accessoriesAmount || 0), 0);
        const exchangeCount = filteredDeals.filter(d => d.isExchange).length;
        const totalIncentives = filteredDeals.reduce((sum, d) => sum + (d.incentiveAmount || 0), 0);
        const revenue = filteredDeals.reduce((sum, d) => sum + d.amount, 0);

        return {
            totalLeads,
            bookings,
            delivered,
            blocked,
            financeInhouse,
            accessoriesCount,
            accessoriesTotal,
            exchangeCount,
            totalIncentives,
            revenue
        };
    }, [filteredDeals]);

    const stats = useMemo(() => {
        const conversion = metrics.totalLeads > 0 ? ((metrics.bookings / metrics.totalLeads) * 100).toFixed(1) : '0';
        return { conversion };
    }, [metrics]);

    return (
        <div className="space-y-6 p-4">
            {/* BRAND SELECTOR TABS */}
            <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-2xl w-fit">
                {brands.map((brand) => (
                    <button
                        key={brand.id}
                        onClick={() => setActiveBrand(brand.id)}
                        className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeBrand === brand.id
                                ? 'bg-white text-gray-900 shadow-sm scale-105'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {brand.name}
                    </button>
                ))}
            </div>

            {/* 1. TOP PERFORMANCE METRICS - High Density Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                <div className={`col-span-2 bg-gradient-to-br ${brands.find(b => b.id === activeBrand).color} p-5 rounded-[2rem] text-white shadow-xl flex flex-col justify-between relative overflow-hidden group transition-all duration-500`}>
                    <div className="relative z-10">
                        <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">
                            {activeBrand === 'all' ? 'Total Sales' : `${brands.find(b => b.id === activeBrand).name} Sales`}
                        </p>
                        <p className="text-3xl font-black tabular-nums">{formatCurrency(metrics.revenue)}</p>
                    </div>
                    <div className="relative z-10 flex items-center gap-1.5 mt-4">
                        <div className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-emerald-300" />
                            <span>Live Update</span>
                        </div>
                    </div>
                    <Globe className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform duration-700" />
                </div>

                <MetricsCard
                    title="Leads"
                    value={metrics.totalLeads}
                    icon={<Users className="w-4 h-4" />}
                    color="#3b82f6"
                />
                <MetricsCard
                    title="Bookings"
                    value={metrics.bookings}
                    icon={<ClipboardList className="w-4 h-4" />}
                    color="#8b5cf6"
                />
                <MetricsCard
                    title="Delivered"
                    value={metrics.delivered}
                    icon={<Package className="w-4 h-4" />}
                    color="#10b981"
                />
                <MetricsCard
                    title="Blocks"
                    value={metrics.blocked}
                    icon={<X className="w-4 h-4" />}
                    color="#f43f5e"
                />
                <MetricsCard
                    title="Accessories"
                    value={metrics.accessoriesCount}
                    subtitle={formatCurrency(metrics.accessoriesTotal)}
                    icon={<Layers className="w-4 h-4" />}
                    color="#ff6b35"
                />
                <MetricsCard
                    title="Incentives"
                    value={formatCurrency(metrics.totalIncentives)}
                    icon={<IndianRupee className="w-4 h-4" />}
                    color="#6366f1"
                />
            </div>

            {/* 2. BRAND-WISE COMPARISON (Visible only when 'All' is selected) */}
            {activeBrand === 'all' && (
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-500" /> Brand-wise Sales Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {brands.filter(b => b.id !== 'all').map((brand) => {
                            const brandDeals = deals.filter(d => d.brandId === brand.id);
                            const brandRev = brandDeals.reduce((s, d) => s + d.amount, 0);
                            const brandUnits = brandDeals.filter(d => d.status === 'completed').length;
                            return (
                                <div key={brand.id} className="p-5 border border-gray-100 rounded-[2rem] bg-gray-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                                    <div className="flex justify-between items-start mb-3">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{brand.name}</p>
                                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{brandUnits} Units</span>
                                    </div>
                                    <p className="text-xl font-black text-gray-900 tabular-nums">{formatCurrency(brandRev)}</p>
                                    <div className="w-full bg-gray-200 h-1.5 rounded-full mt-4">
                                        <div
                                            className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
                                            style={{ width: `${(brandRev / metrics.revenue) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* 3. TEAM PERFORMANCE */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-red-500" />
                            {activeBrand === 'all' ? 'Best Performing Teams' : `${brands.find(b => b.id === activeBrand).name} Best Teams`}
                        </h3>
                    </div>
                    <div className="space-y-3">
                        {teams
                            .filter(t => activeBrand === 'all' || activeBrand === 'brand-3') // Teams are currently Tata-linked
                            .sort((a, b) => b.achieved - a.achieved)
                            .slice(0, 4)
                            .map((team, i) => {
                                const progress = Math.round((team.achieved / team.monthlyTarget) * 100);
                                return (
                                    <div key={team.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-[1.5rem] transition-all border border-transparent hover:border-gray-100 group">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-black text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            0{i + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-black text-gray-900">{team.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progress}%` }} />
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-500">{progress}%</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-gray-900">{formatCurrency(team.achieved)}</p>
                                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Target Done</p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-indigo-500" /> {activeBrand === 'all' ? 'Car Stock' : `${brands.find(b => b.id === activeBrand).name} Car Stock`}
                    </h3>
                    <div className="space-y-8">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Cars Available</p>
                                <p className="text-4xl font-black text-gray-900">
                                    {activeBrand === 'all' ? '1,248' : activeBrand === 'brand-1' ? '312' : activeBrand === 'brand-2' ? '412' : '264'} 
                                    <span className="text-sm font-medium text-gray-400 ml-2">Units</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Booked / Hold</p>
                                <p className="text-2xl font-black text-gray-700">84 <span className="text-xs text-gray-400">Cars</span></p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <span>How Long Cars Are in Stock</span>
                                <span className="text-amber-600">Average 18 Days</span>
                            </div>
                            <div className="flex h-5 w-full rounded-2xl overflow-hidden border border-gray-50 shadow-inner">
                                <div className="bg-emerald-400 w-[65%] hover:opacity-80 transition-opacity cursor-help" title="0-30 Days" />
                                <div className="bg-amber-400 w-[20%] hover:opacity-80 transition-opacity cursor-help" title="31-60 Days" />
                                <div className="bg-red-400 w-[15%] hover:opacity-80 transition-opacity cursor-help" title="60+ Days" />
                            </div>
                            <div className="flex gap-4 mt-2">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                    <span className="text-[10px] font-bold text-gray-500">Selling Fast (0-30 days)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                                    <span className="text-[10px] font-bold text-gray-500">Normal (31-60 days)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-400" />
                                    <span className="text-[10px] font-bold text-gray-500">Slow Selling (60+ days)</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-50">
                            <button className="w-full py-3 bg-gray-50 text-gray-600 text-xs font-bold rounded-2xl hover:bg-gray-100 transition-colors uppercase tracking-widest">
                                See Full Stock Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupCEOdashboard;