import React from 'react';
import { Landmark, FileCheck, Search, ArrowRight, UserPlus, FileSearch } from 'lucide-react';

const FinanceDashboard = () => {
    return (
        <div className="space-y-6">
            {/* Finance Funnel */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Cases Logged', value: '24', color: 'blue' },
                    { label: 'Sanctioned', value: '18', color: 'purple' },
                    { label: 'Disbursed', value: '12', color: 'emerald' },
                    { label: 'Rejected', value: '04', color: 'red' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                        <p className={`text-2xl font-black text-${stat.color}-600`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Loan Processing Portal</h3>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">
                        <UserPlus className="w-4 h-4" /> New Bank Login
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-bold text-gray-400 uppercase border-b border-gray-50">
                                <th className="pb-4">Customer</th>
                                <th className="pb-4">Financier (Bank)</th>
                                <th className="pb-4">Loan Amount</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4 text-right">Documents</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {[1, 2].map((i) => (
                                <tr key={i}>
                                    <td className="py-4 font-bold">Rahul Mehta</td>
                                    <td className="py-4">HDFC Bank Ltd.</td>
                                    <td className="py-4 font-mono font-bold">₹8,50,000</td>
                                    <td className="py-4">
                                        <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-bold">Sanctioned</span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FileSearch className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FinanceDashboard;