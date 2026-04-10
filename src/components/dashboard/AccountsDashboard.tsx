import React, { useState } from 'react';
import {
    IndianRupee, Banknote, Landmark, History, Users2, Building2,
    PackageSearch, Search, Filter, Download, ReceiptText, AlertCircle,
    FileText, CheckCircle2, XCircle, CreditCard, Wallet, Send,
    ArrowRightLeft
} from 'lucide-react';
import {
    salespeople, showroomExpenses, staffPayroll,
    formatCurrency, formatFullCurrency
} from '@/data/dummyData';
import { useDashboard } from '@/contexts/DashboardContext';
import MetricsCard from './MetricsCard';

const AccountDashboard: React.FC = () => {
    const { deals } = useDashboard();
    const [filterQuery, setFilterQuery] = useState('');
    const [selectedDeal, setSelectedDeal] = useState<any>(null);
    const [paymentMode, setPaymentMode] = useState<'Cash' | 'Finance' | 'Online'>('Online');

    // Business Logic: Linking Salespeople to Deals
    const enhancedDeals = deals.map(deal => {
        const salesman = salespeople.find(sp => sp.id === deal.salespersonId);
        return { ...deal, salesmanName: salesman?.name || 'Unknown' };
    });

    const filteredDeals = enhancedDeals.filter(d =>
        d.customerName.toLowerCase().includes(filterQuery.toLowerCase()) ||
        d.carModel.toLowerCase().includes(filterQuery.toLowerCase())
    );

    const handleApprovePayment = (dealId: string) => {
        alert(`Receipt Generated for ${selectedDeal.customerName}. Notifying ${selectedDeal.salesmanName} to move to RTO stage.`);
        setSelectedDeal(null);
    };

    // Dynamic Accounting Stats
    const totalLedgerInflow = deals.reduce((sum, d) => sum + (d.downPayment || 0), 0);
    const financePending = deals.filter(d => d.financeType && d.financeStatus !== 'Disbursed').reduce((sum, d) => sum + (d.amount - (d.downPayment || 0)), 0);
    const operatingExpenses = showroomExpenses.reduce((sum, ex) => sum + ex.amount, 0) + staffPayroll.reduce((sum, p) => sum + p.totalPayout, 0);
    const stockAssetValue = deals.reduce((sum, d) => sum + d.amount, 0);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* 1. TOP FINANCE METRICS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricsCard title="Total Ledger Inflow" value={formatCurrency(totalLedgerInflow)} subtitle="Collected this month" trend={12} icon={<IndianRupee className="w-5 h-5" />} color="#10b981" />
                <MetricsCard title="Finance Pending" value={formatCurrency(financePending)} subtitle="Awaiting Disbursement" trend={-5} icon={<Landmark className="w-5 h-5" />} color="#f59e0b" />
                <MetricsCard title="Operating Expenses" value={formatCurrency(operatingExpenses)} subtitle="Rent + Payroll" trend={2} icon={<Building2 className="w-5 h-5" />} color="#ef4444" />
                <MetricsCard title="Inventory Value" value={formatCurrency(stockAssetValue)} subtitle={`${deals.length} Units in pipeline`} icon={<PackageSearch className="w-5 h-5" />} color="#3b82f6" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* 2. MAIN TABLE: Booking Leads for Settlement */}
                <div className="xl:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Payment Settlements</h3>
                            <p className="text-sm text-gray-500">Verify documents and process booking amounts</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" placeholder="Search customer..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none w-full md:w-48" onChange={(e) => setFilterQuery(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                                    <th className="pb-3 px-2">Customer & Salesman</th>
                                    <th className="pb-3 px-2">Car Model</th>
                                    <th className="pb-3 px-2">Amount Due</th>
                                    <th className="pb-3 px-2 text-right">Settlement</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredDeals.map((deal) => (
                                    <tr key={deal.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-2">
                                            <p className="text-sm font-bold text-gray-900">{deal.customerName}</p>
                                            <p className="text-[11px] text-gray-500 flex items-center gap-1"><Users2 className="w-3 h-3" /> {deal.salesmanName}</p>
                                        </td>
                                        <td className="py-4 px-2">
                                            <p className="text-sm font-semibold text-gray-800">{deal.carModel}</p>
                                            <p className="text-[10px] text-blue-600 font-bold uppercase">{deal.carVariant}</p>
                                        </td>
                                        <td className="py-4 px-2">
                                            <p className="text-sm font-mono font-bold text-gray-900">{formatFullCurrency(deal.amount)}</p>
                                            <span className="text-[10px] text-amber-600 font-bold">Booking: {formatFullCurrency(deal.downPayment)}</span>
                                        </td>
                                        <td className="py-4 px-2 text-right">
                                            <button
                                                onClick={() => setSelectedDeal(deal)}
                                                className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl text-xs font-bold transition-all"
                                            >
                                                Process Payment
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. SETTLEMENT PANEL (Visible when deal selected) */}
                <div className="space-y-6">
                    {selectedDeal ? (
                        <div className="bg-white border-2 border-primary/20 rounded-3xl p-6 shadow-xl animate-in zoom-in-95 duration-300">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-bold text-gray-900 text-lg">Verification Hub</h3>
                                <button onClick={() => setSelectedDeal(null)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
                            </div>

                            {/* Document Check */}
                            <div className="space-y-3 mb-6">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">KYC Documents</p>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm font-medium">PAN Card</span>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm font-medium">Aadhar Card</span>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                </div>
                            </div>

                            {/* Payment Mode Selection */}
                            <div className="space-y-3 mb-6">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Select Payment Mode</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <button onClick={() => setPaymentMode('Cash')} className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${paymentMode === 'Cash' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-400'}`}>
                                        <Wallet className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-bold">CASH</span>
                                    </button>
                                    <button onClick={() => setPaymentMode('Online')} className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${paymentMode === 'Online' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-400'}`}>
                                        <CreditCard className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-bold">ONLINE</span>
                                    </button>
                                    <button onClick={() => setPaymentMode('Finance')} className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${paymentMode === 'Finance' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-400'}`}>
                                        <Landmark className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-bold">LOAN</span>
                                    </button>
                                </div>
                            </div>

                            {/* Summary & Receipt Generation */}
                            <div className="bg-gray-900 rounded-2xl p-4 text-white mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs text-gray-400">Net Amount</span>
                                    <span className="text-sm font-bold">{formatFullCurrency(selectedDeal.amount)}</span>
                                </div>
                                <div className="flex justify-between border-t border-white/10 pt-2">
                                    <span className="text-xs text-emerald-400 font-bold">Collecting Now</span>
                                    <span className="text-lg font-black text-emerald-400">{formatFullCurrency(selectedDeal.downPayment)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleApprovePayment(selectedDeal.id)}
                                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition-all"
                            >
                                <ReceiptText className="w-5 h-5" />
                                Generate Receipt & Notify {selectedDeal.salesmanName.split(' ')[0]}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ArrowRightLeft className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-sm font-bold text-gray-400">Select a deal to process documents and payments</p>
                        </div>
                    )}

                    {/* Recent Activity Mini-Feed */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <History className="w-5 h-5 text-primary" /> Recent Collections
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <p className="text-xs font-medium text-gray-600">₹2,00,000 received for <b>Manoj Sharma</b> (Cash)</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <p className="text-xs font-medium text-gray-600">Finance Disbursed for <b>Vijay Prakash</b></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AccountDashboard;