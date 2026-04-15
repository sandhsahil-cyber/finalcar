import React, { useState } from 'react';
import { CheckCircle, Clipboard, AlertCircle, Settings, Truck, FileText, Share2 } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

const PDIDashboard = () => {
    const { deals, salespeople, updateDepartmentStatus } = useDashboard();
    const [selectedPDI, setSelectedPDI] = useState<any>(null);

    const pdiChecklist = [
        { id: 1, label: 'Body & Scratches', status: 'pending' },
        { id: 2, label: 'Lights & Music', status: 'pending' },
        { id: 3, label: 'Oil & Battery', status: 'pending' },
        { id: 4, label: 'Tyres & Wheels', status: 'pending' },
    ];

    const pdiDeals = deals.filter(d => d.departmentStatus?.['PDI'] === 'In Progress');
    const completedPDI = deals.filter(d => d.departmentStatus?.['PDI'] === 'Completed');

    return (
        <div className="space-y-6">
            {/* PDI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase">Today's Cars to Check</p>
                    <p className="text-2xl font-black text-gray-900">{String(pdiDeals.length).padStart(2, '0')} <span className="text-sm font-medium text-orange-500">Cars</span></p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase">Repairs/Fixes Needed</p>
                    <p className="text-2xl font-black text-red-500">{String(deals.filter(d => d.status === 'blocked' && d.stage === 'PDI').length).padStart(2, '0')} <span className="text-sm font-medium">Cars</span></p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase">Cars Ready for Delivery</p>
                    <p className="text-2xl font-black text-emerald-500">{String(completedPDI.length).padStart(2, '0')} <span className="text-sm font-medium">Cars</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* PDI Lead Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400">
                            <tr>
                                <th className="px-6 py-4">Car Details</th>
                                <th className="px-6 py-4">Sales Person</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {pdiDeals.map((deal) => {
                                const sp = salespeople.find(s => s.id === deal.salespersonId);
                                return (
                                <tr key={deal.id} className={`hover:bg-gray-50/50 cursor-pointer ${selectedPDI?.id === deal.id ? 'bg-emerald-50/50' : ''}`} onClick={() => setSelectedPDI(deal)}>
                                    <td className="px-6 py-4">
                                        <p className="font-bold">{deal.carModel}</p>
                                        <p className="text-[10px] text-gray-400 font-mono">VIN: ...{deal.id.split('-')[1].substring(6)}</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{sp?.name || 'Internal'}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold">Wait for Check</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 bg-gray-50 rounded-lg shadow-sm hover:bg-white"><Settings className="w-4 h-4 text-gray-400" /></button>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* PDI Report Form */}
                <div className="bg-gray-900 rounded-3xl p-6 text-white">
                    <h3 className="font-bold flex items-center gap-2 mb-4"><Clipboard className="w-5 h-5 text-emerald-400" /> Car Check Report</h3>
                    <div className="space-y-4">
                        {pdiChecklist.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10">
                                <span className="text-xs">{item.label}</span>
                                <input type="checkbox" className="rounded-full w-5 h-5 accent-emerald-500" />
                            </div>
                        ))}
                        <textarea placeholder="Write Problem/Notes..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs outline-none" rows={3}></textarea>
                        <button 
                            disabled={!selectedPDI}
                            onClick={() => {
                                if (selectedPDI) {
                                    updateDepartmentStatus(selectedPDI.id, 'PDI', 'Completed');
                                    alert("Check Done! Sales Person told");
                                    setSelectedPDI(null);
                                }
                            }}
                            className="w-full py-3 bg-emerald-500 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors disabled:opacity-50"
                        >
                            <Share2 className="w-4 h-4" /> {selectedPDI ? `Finish Check for ${selectedPDI.carModel}` : 'Select a Vehicle'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PDIDashboard;