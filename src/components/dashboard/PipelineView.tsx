import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { DEAL_STAGES, STAGE_COLORS, formatCurrency, DealStage, formatFullCurrency } from '@/data/dummyData';
import DealCard from './DealCard';
import { Plus, ArrowRight, Wallet, FileText, CheckCircle2, Landmark, ShieldCheck, Package, ClipboardCheck, Receipt, Truck, Landmark as Bank } from 'lucide-react';

const PipelineView: React.FC = () => {
    const { deals, searchQuery, currentRole, setShowNewDealForm, currentUserId } = useDashboard();
    
    // Determine default tab based on role
    const defaultTab = currentRole === 'salesperson' ? 'ledger' : 'kanban';
    const [activeTab, setActiveTab] = useState<'kanban' | 'ledger' | 'delivered'>(defaultTab);

    const filteredDeals = deals.filter(deal => {
        const matchesSearch = !searchQuery ||
            deal.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            deal.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            deal.id.toLowerCase().includes(searchQuery.toLowerCase());

        if (currentRole === 'salesperson') return matchesSearch && deal.salespersonId === currentUserId;
        if (currentRole === 'teamleader') return matchesSearch && deal.teamId === 'team-1';
        return matchesSearch;
    });

    const ledgerDeals = filteredDeals.filter(d => d.stage === 'Account' || d.stage === 'Finance');
    const deliveredDeals = filteredDeals.filter(d => d.status === 'completed');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Showroom Pipeline</h2>
                    <p className="text-sm text-gray-400 font-medium">Tracking {filteredDeals.length} active opportunities</p>
                </div>
                {currentRole === 'salesperson' && (
                    <button
                        onClick={() => setShowNewDealForm(true)}
                        className="flex items-center gap-1.5 px-6 py-3 bg-orange-500 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        Create New Lead
                    </button>
                )}
            </div>

            {/* Universal Tab Switcher */}
            <div className="flex gap-2 p-1.5 bg-gray-100 rounded-[1.5rem] w-fit border border-gray-200/50">
                {currentRole !== 'salesperson' && (
                    <button
                        onClick={() => setActiveTab('kanban')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'kanban' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <ArrowRight className="w-4 h-4" />
                        Kanban Board
                    </button>
                )}
                <button
                    onClick={() => setActiveTab('ledger')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'ledger' ? 'bg-white text-blue-600 shadow-sm border border-blue-100' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <Wallet className="w-4 h-4" />
                    Account Ledger
                </button>
                {currentRole === 'salesperson' && (
                    <button
                        onClick={() => setActiveTab('delivered')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'delivered' ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <FileText className="w-4 h-4" />
                        Delivery Docs
                    </button>
                )}
            </div>

            {/* TAB CONTENT: KANBAN BOARD */}
            {activeTab === 'kanban' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-center gap-2 py-2 overflow-x-auto no-scrollbar">
                        {DEAL_STAGES.map((stage, i) => (
                            <React.Fragment key={stage}>
                                <div className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter text-white whitespace-nowrap" style={{ backgroundColor: STAGE_COLORS[stage] }}>
                                    {stage}
                                </div>
                                {i < DEAL_STAGES.length - 1 && <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {DEAL_STAGES.map(stage => {
                            const stageDeals = filteredDeals.filter(d => d.stage === stage);
                            const stageValue = stageDeals.reduce((sum, d) => sum + d.amount, 0);
                            return (
                                <div key={stage} className="bg-gray-50/50 rounded-[2rem] p-4 border border-gray-100/50">
                                    <div className="flex items-center justify-between mb-4 px-1">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: STAGE_COLORS[stage] }} />
                                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-tighter">{stage}</h3>
                                            <span className="w-5 h-5 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">
                                                {stageDeals.length}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-400 px-1 mb-4 font-bold">{formatCurrency(stageValue)}</p>
                                    <div className="space-y-3">
                                        {stageDeals.map(deal => <DealCard key={deal.id} deal={deal} compact />)}
                                        {stageDeals.length === 0 && <div className="text-center py-12 text-gray-300 font-medium text-[10px] italic">No active deals</div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* TAB CONTENT: ACCOUNT LEDGER */}
            {activeTab === 'ledger' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Booking Pending DP & Finance</h3>
                        <div className="space-y-3">
                            {ledgerDeals.map(deal => (
                                <div key={deal.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-between gap-4 group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-[1.25rem] bg-blue-50 text-blue-600 flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-colors uppercase">
                                            {deal.customerName.substring(0, 1)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{deal.customerName}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{deal.carModel} • {deal.id}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="text-xs font-black text-gray-900">{formatFullCurrency(deal.amount - (deal.downPayment || 0))}</p>
                                            <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest leading-none mt-1">Pending DP</p>
                                        </div>
                                        <div className="text-right min-w-[70px]">
                                            <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase whitespace-nowrap ${deal.financeStatus === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                {deal.financeStatus || 'Searching'}
                                            </span>
                                            <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest leading-none mt-1">Finance</p>
                                        </div>
                                        {deal.financeStatus === 'Approved' && (deal.downPayment || 0) > 0 && (
                                            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 animate-bounce">
                                                <Truck className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {ledgerDeals.length === 0 && (
                                <div className="py-24 text-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
                                    <p className="text-gray-400 text-xs font-black uppercase tracking-widest">No pending settlements</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-[#0f172a] p-8 rounded-[3rem] text-white shadow-2xl h-fit sticky top-24">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Summary Statistics</h3>
                            <Receipt className="w-5 h-5 text-gray-700" />
                        </div>
                        <div className="space-y-8">
                            <div>
                                <p className="text-5xl font-black tracking-tighter">{formatCurrency(ledgerDeals.reduce((s, d) => s + d.amount, 0))}</p>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-3">Pipeline On-Road Value</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
                                <div>
                                    <p className="text-xl font-black">{ledgerDeals.length}</p>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">Total Leads</p>
                                </div>
                                <div>
                                    <p className="text-xl font-black text-emerald-400">{ledgerDeals.filter(d => d.financeStatus === 'Approved' && (d.downPayment || 0) > 0).length}</p>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">Ready Delivery</p>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 transition-colors rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20">
                                Generate Ledger Report
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: DELIVERY DOCUMENTS (Excl. Sales Exec) */}
            {activeTab === 'delivered' && currentRole === 'salesperson' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deliveredDeals.map(deal => (
                        <div key={deal.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p className="text-sm font-black text-gray-900">{deal.customerName}</p>
                                    <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest mt-1">Successfully Delivered • {deal.updatedAt}</p>
                                </div>
                                <div className="w-12 h-12 rounded-[1.25rem] bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {[
                                    { label: 'RTO Receipt', icon: Receipt, color: 'blue' },
                                    { label: 'Accessories', icon: Package, color: 'orange' },
                                    { label: 'Insurance', icon: ShieldCheck, color: 'indigo' },
                                    { label: 'RMC Card', icon: ClipboardCheck, color: 'purple' },
                                    { label: 'TCS Receipt', icon: Bank, color: 'rose' },
                                    { label: 'Final Bill', icon: FileText, color: 'gray' },
                                ].map((doc, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-[1.5rem] hover:bg-gray-100 transition-all cursor-pointer group border border-transparent hover:border-gray-200">
                                        <doc.icon className={`w-5 h-5 text-${doc.color}-500 group-hover:scale-125 transition-transform`} />
                                        <span className="text-[8px] font-black uppercase text-gray-400 tracking-tighter group-hover:text-gray-900 transition-colors">{doc.label}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-4 bg-gray-900 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-200">
                                Export Document Kit
                            </button>
                        </div>
                    ))}
                    {deliveredDeals.length === 0 && (
                        <div className="col-span-full py-32 text-center bg-gray-50/50 rounded-[4rem] border-2 border-dashed border-gray-200">
                            <FileText className="w-12 h-12 text-gray-200 mx-auto mb-6" />
                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">No historical delivery records</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PipelineView;
