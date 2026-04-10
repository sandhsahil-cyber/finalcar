import React from 'react';
import { BarChart3, TrendingUp, PieChart, Layers, MapPin, Target } from 'lucide-react';

const ExecutiveDashboard = () => {
    return (
        <div className="space-y-6">
            {/* 1. TOP PERFORMANCE METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl text-white shadow-xl">
                    <p className="text-gray-400 text-xs font-bold uppercase">Total Group Revenue</p>
                    <p className="text-2xl font-black">₹42.80 Cr</p>
                    <div className="mt-2 flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                        <TrendingUp className="w-3 h-3" /> +12.4% vs Last Month
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase">Conversion Ratio</p>
                    <p className="text-2xl font-black text-gray-900">18.5%</p>
                    <p className="text-[10px] text-gray-400">Enquiry to Booking</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase">Dead Stock (60+ Days)</p>
                    <p className="text-2xl font-black text-red-600">14 Units</p>
                    <p className="text-[10px] text-gray-400 font-bold">HOLD VALUE: ₹1.2 Cr</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase">Target Achievement</p>
                    <p className="text-2xl font-black text-indigo-600">82%</p>
                    <div className="w-full bg-gray-100 h-1 rounded-full mt-2">
                        <div className="bg-indigo-600 h-full w-[82%]" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* 2. OUTLET PERFORMANCE ANALYSIS */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2"><MapPin className="w-5 h-5 text-red-500" /> Outlet Performance</h3>
                        <select className="text-xs border-none bg-gray-50 rounded-lg p-1 outline-none">
                            <option>This Quarter</option>
                        </select>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Downtown Outlet (Flagship)', sales: 120, growth: '+5%', color: 'blue' },
                            { name: 'Western Highway Branch', sales: 85, growth: '+2%', color: 'purple' },
                            { name: 'City Center Showroom', sales: 64, growth: '-1%', color: 'amber' }
                        ].map((outlet, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div>
                                    <p className="text-sm font-bold">{outlet.name}</p>
                                    <p className="text-[10px] text-gray-500">{outlet.sales} Units Delivered</p>
                                </div>
                                <div className="text-right text-xs font-black text-emerald-600">{outlet.growth}</div>
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