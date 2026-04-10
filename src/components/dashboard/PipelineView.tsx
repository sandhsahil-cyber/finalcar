import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { DEAL_STAGES, STAGE_COLORS, formatCurrency, DealStage, formatFullCurrency } from '@/data/dummyData';
import DealCard from './DealCard';
import { Plus, ArrowRight, Wallet, FileText, CheckCircle2, Landmark, ShieldCheck, Package, ClipboardCheck, Receipt, Landmark as Bank } from 'lucide-react';

const PipelineView: React.FC = () => {
    const { deals, searchQuery, currentRole, setShowNewDealForm, currentUserId } = useDashboard();
    const [salesExecTab, setSalesExecTab] = useState<'ledger' | 'delivered'>('ledger');

    const filteredDeals = deals.filter(deal => {
        const matchesSearch = !searchQuery ||
            deal.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            deal.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            deal.id.toLowerCase().includes(searchQuery.toLowerCase());

        if (currentRole === 'salesperson') return matchesSearch && deal.salespersonId === currentUserId;
        if (currentRole === 'teamleader') return matchesSearch && deal.teamId === 'team-1';
        return matchesSearch;
    });

    if (currentRole === 'salesperson') {
        const ledgerDeals = filteredDeals.filter(d => d.stage === 'Account' || d.stage === 'Finance');
        const deliveredDeals = filteredDeals.filter(d => d.status === 'completed');

        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Executive Pipeline</h2>
                        <p className="text-sm text-gray-400 font-medium">Manage your active payments and documents</p>
                    </div>
                </div>

                <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
                    <button
                        onClick={() => setSalesExecTab('ledger')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${salesExecTab === 'ledger' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <Wallet className="w-4 h-4" />
                        Account Ledger
                    </button>
                    <button
                        onClick={() => setSalesExecTab('delivered')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${salesExecTab === 'delivered' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <FileText className="w-4 h-4" />
                        Delivered Car Docs
                    </button>
                </div>

                {salesExecTab === 'ledger' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest pl-1">Booking Pending DP & Finance</h3>
                            <div className="space-y-3">
                                {ledgerDeals.map(deal => (
                                    <div key={deal.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black">
                                                {deal.customerName.substring(0, 1)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{deal.customerName}</p>
                                                <p className="text-[10px] text-gray-400 font-bold">{deal.carModel} • {deal.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-xs font-black text-gray-900">{formatFullCurrency(deal.amount - (deal.downPayment || 0))}</p>
                                                <p className="text-[8px] text-gray-400 font-black uppercase tracking-wider">Pending DP</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase ${deal.financeStatus === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                                    }`}>
                                                    {deal.financeStatus || 'Searching'}
                                                </span>
                                                <p className="text-[8px] text-gray-400 font-black uppercase tracking-wider mt-1">Finance</p>
                                            </div>
                                            {deal.financeStatus === 'Approved' && (deal.downPayment || 0) > 0 && (
                                                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white animation-pulse">
                                                    <Truck className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {ledgerDeals.length === 0 && (
                                    <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                                        <p className="text-gray-400 text-sm font-medium">No pending accounts found</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-[2.5rem] text-white shadow-2xl h-fit">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">On-Road counting</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-4xl font-black">{formatCurrency(ledgerDeals.reduce((s, d) => s + d.amount, 0))}</p>
                                    <p className="text-[10px] text-gray-500 font-bold mt-2">TOTAL PIPELINE VALUE</p>
                                </div>
                                <div className="space-y-4 pt-6 border-t border-white/10">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-400">Total Units</span>
                                        <span className="font-black">{ledgerDeals.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-400">Ready for Delivery</span>
                                        <span className="text-emerald-400 font-black">{ledgerDeals.filter(d => d.financeStatus === 'Approved').length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliveredDeals.map(deal => (
                            <div key={deal.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{deal.customerName}</p>
                                        <p className="text-[10px] text-emerald-600 font-black uppercase">Delivered • {deal.updatedAt}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {[
                                        { label: 'RTO Receipt', icon: Receipt, color: 'blue' },
                                        { label: 'Accessories', icon: Package, color: 'orange' },
                                        { label: 'RTO Insurance', icon: ShieldCheck, color: 'indigo' },
                                        { label: 'RMC Info', icon: ClipboardCheck, color: 'purple' },
                                        { label: 'TCS Receipt', icon: Bank, color: 'red' },
                                        { label: 'Car Bill', icon: FileText, color: 'gray' },
                                    ].map((doc, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
                                            <doc.icon className={`w-5 h-5 text-${doc.color}-500 group-hover:scale-110 transition-transform`} />
                                            <span className="text-[8px] font-black uppercase text-gray-500">{doc.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                    Download Full Doc Set
                                </button>
                            </div>
                        ))}
                        {deliveredDeals.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-400 font-medium">No delivered car records found</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Pipeline Board</h2>
                    <p className="text-sm text-gray-500">Drag-style view of all deals by stage</p>
                </div>
                <button
                    onClick={() => setShowNewDealForm(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Deal
                </button>
            </div>

            {/* Flow indicator */}
            <div className="flex items-center justify-center gap-2 py-2">
                {DEAL_STAGES.map((stage, i) => (
                    <React.Fragment key={stage}>
                        <div
                            className="px-4 py-2 rounded-xl text-xs font-bold text-white"
                            style={{ backgroundColor: STAGE_COLORS[stage] }}
                        >
                            {stage}
                        </div>
                        {i < DEAL_STAGES.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {DEAL_STAGES.map(stage => {
                    const stageDeals = filteredDeals.filter(d => d.stage === stage);
                    const stageValue = stageDeals.reduce((sum, d) => sum + d.amount, 0);

                    return (
                        <div key={stage} className="bg-gray-50 rounded-2xl p-3">
                            {/* Stage Header */}
                            <div className="flex items-center justify-between mb-3 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STAGE_COLORS[stage] }} />
                                    <h3 className="text-sm font-bold text-gray-900">{stage}</h3>
                                    <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                        {stageDeals.length}
                                    </span>
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 px-1 mb-3">Value: {formatCurrency(stageValue)}</p>

                            {/* Deal Card */}
                            <div className="space-y-2">
                                {stageDeals.map(deal => (
                                    <DealCard key={deal.id} deal={deal} compact />
                                ))}
                                {stageDeals.length === 0 && (
                                    <div className="text-center py-8 text-gray-300">
                                        <p className="text-xs">No deals</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PipelineView;
