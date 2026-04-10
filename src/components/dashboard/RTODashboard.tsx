import React, { useState } from 'react';
import {
    FileCheck,
    Clock,
    CheckCircle2,
    Car,
    UserCheck,
    Search,
    Filter,
    MoreVertical,
    ShieldCheck,
    ClipboardList,
    AlertCircle,
    ChevronRight
} from 'lucide-react';
import { deals, salespeople, formatCurrency } from '@/data/dummyData';
import MetricsCard from './MetricsCard';

const RTODashboard: React.FC = () => {
    const [filterQuery, setFilterQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

    // Business Logic: Only show deals that are "Settled" (from Accounts)
    // In a real app, you'd filter by deal.status === 'settled'
    const rtoLeads = deals.map(deal => {
        const salesman = salespeople.find(sp => sp.id === deal.salespersonId);
        return {
            ...deal,
            salesmanName: salesman?.name || 'Internal',
            rtoStatus: deal.status === 'active' ? 'Documentation' : 'Number Assigned',
            regType: deal.amount > 1500000 ? 'Permanent' : 'Temporary',
            taxAmount: deal.amount * 0.12, // 12% RTO Tax calculation
        };
    });

    const filteredRTO = rtoLeads.filter(d =>
        d.customerName.toLowerCase().includes(filterQuery.toLowerCase()) ||
        d.carModel.toLowerCase().includes(filterQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* 1. RTO KPI METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricsCard
                    title="Total RTO Leads"
                    value={rtoLeads.length.toString()}
                    subtitle="Active files this month"
                    icon={<ClipboardList className="w-5 h-5" />}
                    color="#6366f1"
                />
                <MetricsCard
                    title="Pending Registration"
                    value="12"
                    subtitle="Awaiting HSRP Plate"
                    icon={<Clock className="w-5 h-5" />}
                    color="#f59e0b"
                />
                <MetricsCard
                    title="Completed Cases"
                    value="28"
                    subtitle="RC Dispatched"
                    icon={<CheckCircle2 className="w-5 h-5" />}
                    color="#10b981"
                />
                <MetricsCard
                    title="RTO Tax Collected"
                    value={formatCurrency(4280000)}
                    subtitle="Net Paid to Govt"
                    icon={<ShieldCheck className="w-5 h-5" />}
                    color="#3b82f6"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                {/* 2. MAIN REGISTRATION TABLE */}
                <div className="xl:col-span-3 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Vehicle Registration Track</h3>
                            <p className="text-xs text-gray-500 font-medium">Manage High Security Registration Plates (HSRP) & RC Files</p>
                        </div>

                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Chassis / Customer..."
                                    className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-primary/20 outline-none"
                                    onChange={(e) => setFilterQuery(e.target.value)}
                                />
                            </div>
                            <button className="p-2 bg-gray-50 rounded-xl"><Filter className="w-4 h-4 text-gray-500" /></button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                <tr>
                                    <th className="px-6 py-4">Vehicle & Chassis</th>
                                    <th className="px-6 py-4">Customer Info</th>
                                    <th className="px-6 py-4">Reg Type</th>
                                    <th className="px-6 py-4">Tax Payable</th>
                                    <th className="px-6 py-4 text-center">RTO Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredRTO.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                                    <Car className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{item.carModel}</p>
                                                    <p className="text-[10px] font-mono text-gray-400">CH: 4WDR56X...901</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-gray-800">{item.customerName}</p>
                                            <p className="text-[10px] text-gray-500 flex items-center gap-1">
                                                <UserCheck className="w-3 h-3 text-emerald-500" /> {item.salesmanName}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${item.regType === 'Permanent' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
                                                }`}>
                                                {item.regType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-900">{formatCurrency(item.taxAmount)}</p>
                                            <p className="text-[9px] text-gray-400 font-bold tracking-tighter">INCL. ROAD TAX + CESS</p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${item.status === 'active' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                                                    }`}>
                                                    {item.rtoStatus}
                                                </span>
                                                {item.status === 'active' && <p className="text-[9px] text-red-400 animate-pulse font-bold">Docs Missing</p>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all shadow-sm">
                                                <MoreVertical className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. FILE SUBMISSION SIDEBAR */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl">
                        <h4 className="font-bold flex items-center gap-2 mb-4">
                            <FileCheck className="w-5 h-5" /> Quick RTO Action
                        </h4>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                                <p className="text-[11px] text-indigo-200 font-bold uppercase tracking-wider mb-1">Next HSRP Batch</p>
                                <p className="text-xl font-black">Tomorrow, 10:00 AM</p>
                            </div>

                            <div className="space-y-2">
                                <button className="w-full py-3 bg-white text-indigo-600 rounded-xl text-xs font-black shadow-lg hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                                    Upload RTO Receipt
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <button className="w-full py-3 bg-indigo-500/30 text-white border border-indigo-400/30 rounded-xl text-xs font-bold hover:bg-indigo-500/50 transition-all">
                                    Notify Salesman for Delivery
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* DOCUMENT ALERT CARD */}
                    <div className="bg-white border border-red-100 rounded-3xl p-6 shadow-sm">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <AlertCircle className="w-5 h-5 text-red-500" /> Discrepancy Found
                        </h4>
                        <div className="space-y-3">
                            {[1, 2].map((_, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-red-50/50 rounded-2xl border border-red-50">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-red-600 font-bold text-xs italic">!</div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-800">Sign. Mismatch: Manoj S.</p>
                                        <p className="text-[10px] text-gray-500">Form 20 rejected by RTO inspector.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RTODashboard;