import React, { useState } from 'react';
import {
    ShieldCheck,
    UserCheck,
    Clock,
    FilePlus,
    FileText,
    Search,
    Filter,
    ArrowUpRight,
    Download,
    CheckCircle2,
    AlertCircle,
    History,
    Send,
    UploadCloud,
    Briefcase
} from 'lucide-react';
import { formatCurrency } from '@/data/dummyData';
import { useDashboard } from '@/contexts/DashboardContext';
import MetricsCard from './MetricsCard';

const InsuranceDashboard: React.FC = () => {
    const { deals, updateDepartmentStatus } = useDashboard();
    const [filterQuery, setFilterQuery] = useState('');
    const [showIssueModal, setShowIssueModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState<any>(null);

    // Dynamic Business Logic
    const inHouseInsurance = deals.filter(d => d.insurancePartner).length;
    const pendingApproval = deals.filter(d => d.status !== 'completed' && d.stage === 'RTO').length;
    const totalProcessed = deals.filter(d => d.status === 'completed' || d.insurancePartner).length;

    const insuranceDeals = deals.filter(d => d.departmentStatus?.['Insurance'] === 'In Progress');

    const insuranceLeads = insuranceDeals.map(deal => ({
        ...deal,
        insuranceType: deal.insurancePartner ? 'Self (Showroom)' : 'By Party (External)',
        policyStatus: deal.status === 'completed' ? 'Insurance Policy Ready' : 'Waiting for Papers',
        premiumAmount: deal.amount * 0.035, // Approx 3.5% Premium
        expiryDate: '2027-04-10'
    }));

    const handleIssuePolicy = (lead: any) => {
        setSelectedLead(lead);
        setShowIssueModal(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* 1. TOP STATS COUNTERS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricsCard
                    title="Insurance Finish" value={String(totalProcessed).padStart(2, '0')} subtitle="Processed this month"
                    icon={<ShieldCheck className="w-5 h-5" />} color="#0ea5e9"
                />
                <MetricsCard
                    title="Shop Insurance" value={String(inHouseInsurance).padStart(2, '0')} subtitle="From Shop"
                    icon={<Briefcase className="w-5 h-5" />} color="#10b981"
                />
                <MetricsCard
                    title="Wait for Ins." value={String(pendingApproval).padStart(2, '0')} subtitle="In Pipeline"
                    icon={<Clock className="w-5 h-5" />} color="#f59e0b"
                />
                <MetricsCard
                    title="Total vs Shop" value={`${Math.round((inHouseInsurance/deals.length)*100)}%`} subtitle="vs Total Sales"
                    icon={<History className="w-5 h-5" />} color="#6366f1"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* 2. INSURANCE LEAD TABLE */}
                <div className="xl:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Make New Insurance</h3>
                            <p className="text-sm text-gray-500">Check & Make Insurance paper for Sales Person</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text" placeholder="Customer or VIN..."
                                    className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none w-full md:w-48"
                                    onChange={(e) => setFilterQuery(e.target.value)}
                                />
                            </div>
                            <button className="p-2 border border-gray-100 rounded-xl hover:bg-gray-50"><Download className="w-4 h-4 text-gray-500" /></button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                    <th className="pb-4 px-2">Customer & Car</th>
                                    <th className="pb-4 px-2">Type</th>
                                    <th className="pb-4 px-2">Total Fee</th>
                                    <th className="pb-4 px-2">Paper Status</th>
                                    <th className="pb-4 px-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm font-medium">
                                {insuranceLeads.map((lead) => (
                                    <tr key={lead.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-2">
                                            <p className="font-bold text-gray-900">{lead.customerName}</p>
                                            <p className="text-[10px] text-gray-500 uppercase">{lead.carModel} • {lead.carVariant}</p>
                                        </td>
                                        <td className="py-4 px-2">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${lead.insuranceType.includes('Self') ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {lead.insuranceType === 'Self (Showroom)' ? 'From Shop' : 'From Outside'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2">
                                            <p className="font-mono font-bold text-gray-800">{formatCurrency(lead.premiumAmount)}</p>
                                        </td>
                                        <td className="py-4 px-2">
                                            <div className="flex items-center gap-1.5">
                                                <div className={`w-1.5 h-1.5 rounded-full ${lead.policyStatus.includes('Waiting') ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                                                <span className="text-xs">{lead.policyStatus === 'Insurance Policy Ready' ? 'Paper Ready' : 'Wait for Paper'}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 text-right">
                                            <button
                                                onClick={() => handleIssuePolicy(lead)}
                                                className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
                                            >
                                                <FilePlus className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. RIGHT PANEL: ISSUANCE FORM & REPORTS */}
                <div className="space-y-6">

                    {/* POLICY ISSUANCE CARD */}
                    <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-primary" /> Write Insurance Info
                        </h3>

                        {selectedLead ? (
                            <div className="space-y-4 animate-in slide-in-from-right-4">
                                <div>
                                    <label className="text-[10px] text-gray-400 font-bold uppercase">Insurance Policy Number</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm mt-1 focus:ring-1 focus:ring-primary outline-none" placeholder="Enter Policy No." />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] text-gray-400 font-bold uppercase">Car Value for Ins.</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm mt-1 outline-none" placeholder="₹" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-gray-400 font-bold uppercase">Add-Ons</label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm mt-1 outline-none">
                                            <option>Zero Dep</option>
                                            <option>RTI</option>
                                            <option>Engine Protect</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="p-4 bg-white/5 rounded-2xl border border-dashed border-white/20 text-center group cursor-pointer hover:border-primary/50 transition-colors">
                                    <UploadCloud className="w-6 h-6 mx-auto mb-2 text-gray-400 group-hover:text-primary" />
                                    <p className="text-[10px] font-bold text-gray-400">Drag & Drop Signed Policy PDF</p>
                                </div>

                                <button
                                    onClick={() => { 
                                        updateDepartmentStatus(selectedLead.id, 'Insurance', 'Completed');
                                        alert('Policy Sent to Salesperson!'); 
                                        setSelectedLead(null); 
                                    }}
                                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
                                >
                                    <Send className="w-4 h-4" /> Finish & Tell Sales Person
                                </button>
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-sm text-gray-400 italic">Select a lead from the table to generate a policy</p>
                            </div>
                        )}
                    </div>

                    {/* RENEWAL ALERT SECTION */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <History className="w-5 h-5 text-indigo-500" /> Next Year Insurance List
                            </h3>
                            <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-bold">REPORT</span>
                        </div>
                        <div className="space-y-3">
                            {[1, 2].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                                    <div>
                                        <p className="text-xs font-bold text-gray-800 italic">GJ01-RV-9821</p>
                                        <p className="text-[10px] text-gray-500">Expiring in 4 days</p>
                                    </div>
                                    <button className="text-primary p-2 hover:bg-white rounded-lg transition-colors">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InsuranceDashboard;