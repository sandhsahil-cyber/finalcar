import React, { useState } from 'react';
import { CheckCircle, Clipboard, AlertCircle, Settings, Truck, FileText, Share2 } from 'lucide-react';

const PDIDashboard = () => {
    const [selectedPDI, setSelectedPDI] = useState(null);

    const pdiChecklist = [
        { id: 1, label: 'Exterior Paint & Scratch Check', status: 'pending' },
        { id: 2, label: 'Electricals & Infotainment', status: 'pending' },
        { id: 3, label: 'Engine Fluids & Battery Health', status: 'pending' },
        { id: 4, label: 'Tyre Pressure & Alloy Finish', status: 'pending' },
    ];

    return (
        <div className="space-y-6">
            {/* PDI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase">Today's PDI Queue</p>
                    <p className="text-2xl font-black text-gray-900">08 <span className="text-sm font-medium text-orange-500">Cars</span></p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase">Pending Rectifications</p>
                    <p className="text-2xl font-black text-red-500">02 <span className="text-sm font-medium">Cars</span></p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase">Ready for Delivery</p>
                    <p className="text-2xl font-black text-emerald-500">14 <span className="text-sm font-medium">Cars</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* PDI Lead Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400">
                            <tr>
                                <th className="px-6 py-4">Vehicle Detail</th>
                                <th className="px-6 py-4">Salesman</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-gray-50/50 cursor-pointer" onClick={() => setSelectedPDI(i)}>
                                    <td className="px-6 py-4">
                                        <p className="font-bold">Grand Vitara Alpha</p>
                                        <p className="text-[10px] text-gray-400 font-mono">VIN: 9A82J...092</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">Vikram Singh</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold">Awaiting Check</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 bg-gray-50 rounded-lg"><Settings className="w-4 h-4 text-gray-400" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PDI Report Form */}
                <div className="bg-gray-900 rounded-3xl p-6 text-white">
                    <h3 className="font-bold flex items-center gap-2 mb-4"><Clipboard className="w-5 h-5 text-emerald-400" /> Digital PDI Report</h3>
                    <div className="space-y-4">
                        {pdiChecklist.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10">
                                <span className="text-xs">{item.label}</span>
                                <input type="checkbox" className="rounded-full w-5 h-5 accent-emerald-500" />
                            </div>
                        ))}
                        <textarea placeholder="Observation Notes..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs outline-none" rows={3}></textarea>
                        <button className="w-full py-3 bg-emerald-500 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2">
                            <Share2 className="w-4 h-4" /> Finalize & Notify Salesman
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PDIDashboard;