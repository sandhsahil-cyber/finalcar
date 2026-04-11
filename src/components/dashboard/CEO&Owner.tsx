import React from 'react';
import { BarChart3, TrendingUp, PieChart, Layers, MapPin, Target } from 'lucide-react';
import { deals, formatCurrency, salespeople } from '@/data/dummyData';

const ExecutiveDashboard = () => {
    // Dynamic calculations
    const totalRevenue = deals.reduce((sum, d) => sum + d.amount, 0);
    const completedDeals = deals.filter(d => d.status === 'completed');
    const totalDeliveries = completedDeals.length;

    const totalSalespeople = salespeople.length;
    const totalTarget = salespeople.reduce((sum, sp) => sum + sp.monthlyTarget, 0);
    const totalAchieved = salespeople.reduce((sum, sp) => sum + sp.achieved, 0);
    const targetPercent = Math.round((totalAchieved / totalTarget) * 100);

    // Conversion: Bookings / Total Leads (Simplified)
    const bookingsCount = deals.filter(d => d.stage !== 'Account').length;
    const conversionRatio = deals.length > 0 ? ((bookingsCount / deals.length) * 100).toFixed(1) : '0';

    return (
        <div className="space-y-6">
            {/* 1. TOP PERFORMANCE METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl text-white shadow-xl">
                    <p className="text-gray-400 text-xs font-bold uppercase">Total Group Revenue</p>
                    <p className="text-2xl font-black">{formatCurrency(totalRevenue)}</p>
                    <div className="mt-2 flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                        <TrendingUp className="w-3 h-3" /> Monthly Projected
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase">Conversion Ratio</p>
                    <p className="text-2xl font-black text-gray-900">{conversionRatio}%</p>
                    <p className="text-[10px] text-gray-400">Lead to Booking</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase">Total Deliveries</p>
                    <p className="text-2xl font-black text-emerald-600">{totalDeliveries} Units</p>
                    <p className="text-[10px] text-gray-400 font-bold">Units out of showroom</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase">Group Target</p>
                    <p className="text-2xl font-black text-indigo-600">{targetPercent}%</p>
                    <div className="w-full bg-gray-100 h-1 rounded-full mt-2">
                        <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${targetPercent}%` }} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* 2. OUTLET PERFORMANCE ANALYSIS */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2"><MapPin className="w-5 h-5 text-red-500" /> Team Performance</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Alpha Squad', units: deals.filter(d => d.teamId === 'team-1').length, val: deals.filter(d => d.teamId === 'team-1').reduce((s, d) => s + d.amount, 0) },
                            { name: 'Beta Force', units: deals.filter(d => d.teamId === 'team-2').length, val: deals.filter(d => d.teamId === 'team-2').reduce((s, d) => s + d.amount, 0) },
                            { name: 'Gamma Elite', units: deals.filter(d => d.teamId === 'team-3').length, val: deals.filter(d => d.teamId === 'team-3').reduce((s, d) => s + d.amount, 0) },
                        ].map((team, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div>
                                    <p className="text-sm font-bold">{team.name}</p>
                                    <p className="text-[10px] text-gray-500">{team.units} Units in Pipeline</p>
                                </div>
                                <div className="text-right text-xs font-black text-gray-900">{formatCurrency(team.val)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. DEPARTMENTAL REVENUE SLICE */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Layers className="w-5 h-5 text-indigo-500" /> Dept. Revenue Contribution</h3>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-indigo-50 rounded-2xl">
                                <p className="text-[10px] font-bold text-indigo-400 uppercase">Accessories</p>
                                <p className="text-lg font-black text-indigo-700">₹84.50 L</p>
                            </div>
                            <div className="p-4 bg-emerald-50 rounded-2xl">
                                <p className="text-[10px] font-bold text-emerald-400 uppercase">Insurance Comm.</p>
                                <p className="text-lg font-black text-emerald-700">₹12.20 L</p>
                            </div>
                        </div>
                        {/* INVENTORY AGEING BAR */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase">
                                <span>Stock Ageing Analysis</span>
                                <span>Total: 240 Units</span>
                            </div>
                            <div className="flex h-3 w-full rounded-full overflow-hidden">
                                <div className="bg-emerald-400 w-[60%]" title="0-30 Days" />
                                <div className="bg-amber-400 w-[25%]" title="31-60 Days" />
                                <div className="bg-red-400 w-[15%]" title="60+ Days" />
                            </div>
                            <div className="flex gap-4 text-[9px] font-bold text-gray-500">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-400 rounded-full" /> New (60%)</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-amber-400 rounded-full" /> Moderate (25%)</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-400 rounded-full" /> Critical (15%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExecutiveDashboard;