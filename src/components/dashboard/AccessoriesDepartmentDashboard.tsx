import React, { useState } from 'react';
import {
    Package,
    Wrench,
    CheckSquare,
    Clock,
    ShoppingBag,
    FileText,
    Search,
    Filter,
    AlertTriangle,
    ChevronRight,
    Upload,
    Printer,
    History,
    CheckCircle2
} from 'lucide-react';
import { deals, formatCurrency } from '@/data/dummyData';
import MetricsCard from './MetricsCard';

const AccessoriesDashboard: React.FC = () => {
    const [filterQuery, setFilterQuery] = useState('');
    const [selectedFitment, setSelectedFitment] = useState<any>(null);

    // Business Logic: Accessory specific leads
    const totalAccessoryRevenue = deals.reduce((sum, d) => sum + (d.accessoriesAmount || 0), 0);
    const pendingFittings = deals.filter(d => (d.accessoriesAmount || 0) > 0 && d.status !== 'completed').length;
    const completedFittings = deals.filter(d => (d.accessoriesAmount || 0) > 0 && d.status === 'completed').length;

    const accessoryLeads = deals.filter(d => (d.accessoriesAmount || 0) > 0).map(deal => ({
        ...deal,
        fitmentStatus: deal.status === 'completed' ? 'Fitting Done' : 'In Progress',
        accessoryValue: deal.accessoriesAmount || 0,
        items: ['Floor Mats', 'Mud Flaps', 'Chrome Kit', 'Seat Covers'],
        pendingItems: deal.status === 'active' ? ['Dashcam'] : [],
    }));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* 1. SHOP FLOOR COUNTERS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricsCard
                    title="Total Accessory Sales" value={formatCurrency(totalAccessoryRevenue)} subtitle="Current Month Revenue"
                    icon={<ShoppingBag className="w-5 h-5" />} color="#f43f5e"
                />
                <MetricsCard
                    title="Pending Fittings" value={String(pendingFittings).padStart(2, '0')} subtitle="Vehicles in Bay"
                    icon={<Wrench className="w-5 h-5" />} color="#f59e0b"
                />
                <MetricsCard
                    title="Ready for Delivery" value={String(completedFittings).padStart(2, '0')} subtitle="Fitting Completed"
                    icon={<CheckCircle2 className="w-5 h-5" />} color="#10b981"
                />
                <MetricsCard
                    title="Avg Sale / Car" value={formatCurrency(totalAccessoryRevenue / (deals.filter(d => d.accessoriesAmount).length || 1))} subtitle="Productivity"
                    icon={<AlertTriangle className="w-5 h-5" />} color="#6366f1"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                {/* 2. FITMENT QUEUE TABLE */}
                <div className="xl:col-span-3 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Accessory Fitment Queue</h3>
                            <p className="text-xs text-gray-500 font-medium">Track installation progress and stock availability</p>
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text" placeholder="Chassis / Customer..."
                                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs outline-none"
                                    onChange={(e) => setFilterQuery(e.target.value)}
                                />
                            </div>
                            <button className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <Filter className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                <tr>
                                    <th className="px-6 py-4">Car & Owner</th>
                                    <th className="px-6 py-4">Fitment Items</th>
                                    <th className="px-6 py-4">Total Value</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {accessoryLeads.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{item.customerName}</p>
                                                <p className="text-[10px] font-mono text-gray-400">{item.carModel} • VIN...{item.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                {item.items.slice(0, 2).map((kit, i) => (
                                                    <span key={i} className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded uppercase font-bold">{kit}</span>
                                                ))}
                                                {item.items.length > 2 && <span className="text-[9px] text-gray-400">+{item.items.length - 2} more</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-900">{formatCurrency(item.accessoryValue)}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-center">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${item.fitmentStatus === 'In Progress' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                                                    }`}>
                                                    {item.fitmentStatus}
                                                </span>
                                                {item.pendingItems.length > 0 && (
                                                    <p className="text-[9px] text-red-500 font-bold mt-1">Stock Pending: {item.pendingItems[0]}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedFitment(item)}
                                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                            >
                                                <Wrench className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. RIGHT PANEL: FITMENT COMPLETION & BILLING */}
                <div className="space-y-6">

                    {/* JOB CARD SECTION */}
                    <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-6 relative">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <CheckSquare className="w-5 h-5 text-rose-500" /> Fitment Job Card
                        </h4>

                        {selectedFitment ? (
                            <div className="space-y-4 animate-in zoom-in-95 duration-200">
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Customer</p>
                                    <p className="text-sm font-black text-gray-900">{selectedFitment.customerName}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 font-bold uppercase">Assigned Fitter</label>
                                    <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-rose-500/20">
                                        <option>Suresh Pal (Senior Fitter)</option>
                                        <option>Rahul M. (Apprentice)</option>
                                    </select>
                                </div>

                                <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded border-rose-300 text-rose-500 focus:ring-rose-500" />
                                        <span className="text-xs font-bold text-rose-700 uppercase">Fitting Done & Verified</span>
                                    </label>
                                </div>

                                <div className="space-y-2">
                                    <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                                        <Upload className="w-4 h-4" /> Upload Accessory Bill
                                    </button>
                                    <button
                                        onClick={() => { alert('Salesman Notified: Fitting Complete!'); setSelectedFitment(null); }}
                                        className="w-full py-3 bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-200"
                                    >
                                        Complete & Notify Salesman
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                                <p className="text-xs text-gray-400 italic">Select a car from the queue to start fitment</p>
                            </div>
                        )}
                    </div>

                    {/* INVENTORY QUICK STATUS */}
                    <div className="bg-gray-900 rounded-3xl p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-sm">Inventory Check</h4>
                            <button className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1">
                                Full Report <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">Perfumes/Air Purifiers</span>
                                <span className="font-bold text-emerald-400">In Stock</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">Alloy Wheel Kits</span>
                                <span className="font-bold text-rose-400">2 Left</span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-rose-500 h-full w-[75%]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessoriesDashboard;