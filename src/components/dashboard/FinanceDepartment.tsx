import React from 'react';
import { Landmark, FileCheck, Search, ArrowRight, UserPlus, FileSearch } from 'lucide-react';
import { formatCurrency, formatFullCurrency } from '@/data/dummyData';
import { useDashboard } from '@/contexts/DashboardContext';

const FinanceDashboard = () => {
    const { deals, updateDepartmentStatus } = useDashboard();
    // Dynamic Finance Stats
    const financeDeals = deals.filter(d => d.departmentStatus?.['Finance'] === 'In Progress');
    const logged = financeDeals.length;
    const sanctioned = financeDeals.filter(d => d.financeStatus === 'Approved' || d.financeStatus === 'Disbursed').length;
    const disbursed = financeDeals.filter(d => d.financeStatus === 'Disbursed').length;
    const rejected = financeDeals.filter(d => d.financeStatus === 'Rejected').length;

    return (
        <div className="space-y-6">
            {/* Finance Funnel */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Cases Logged', value: logged, color: 'blue' },
                    { label: 'Sanctioned', value: sanctioned, color: 'purple' },
                    { label: 'Disbursed', value: disbursed, color: 'emerald' },
                    { label: 'Rejected', value: rejected, color: 'red' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm transition-all hover:scale-[1.02]">
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                        <p className={`text-2xl font-black text-${stat.color}-600`}>{String(stat.value).padStart(2, '0')}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold">Loan Processing Portal</h3>
                        <p className="text-xs text-gray-400 font-medium">Tracking {financeDeals.length} active loan applications</p>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">
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
                                <th className="pb-4 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {financeDeals.length > 0 ? (
                                financeDeals.map((deal) => (
                                    <tr key={deal.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="py-4">
                                            <div>
                                                <p className="font-bold text-gray-900">{deal.customerName}</p>
                                                <p className="text-[10px] text-gray-400">{deal.carModel}</p>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-[8px] font-black">{deal.financePartner?.substring(0, 2).toUpperCase()}</div>
                                                <p className="font-medium text-gray-700">{deal.financePartner || 'Not Assigned'}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 font-mono font-bold text-gray-900 text-xs">
                                            {formatFullCurrency(deal.amount - (deal.downPayment || 0))}
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                                                deal.financeStatus === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                                                deal.financeStatus === 'Disbursed' ? 'bg-blue-50 text-blue-600' :
                                                deal.financeStatus === 'Rejected' ? 'bg-red-50 text-red-600' :
                                                'bg-amber-50 text-amber-600'
                                            }`}>
                                                {deal.financeStatus || 'In Progress'}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button 
                                                onClick={() => updateDepartmentStatus(deal.id, 'Finance', 'Completed')}
                                                className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-all"
                                            >
                                                Mark Done
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-400 italic">No active finance cases found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FinanceDashboard;