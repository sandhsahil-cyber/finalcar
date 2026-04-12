import React, { useState } from 'react';
import { FileSignature, Search, Filter, Landmark, Clock, CheckCircle2, AlertCircle, FileText, ArrowRight, Banknote, ShieldCheck, Printer, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoanLead, LoanStage } from '@/types/finance';

const INITIAL_LOANS: LoanLead[] = [
  {
    id: 'LN-501',
    customerName: 'Aditya Birla',
    carModel: 'TATA Safari Dark',
    dealValue: 2450000,
    downPayment: 500000,
    loanRequired: 1950000,
    bankName: 'HDFC Bank',
    stage: 'Sanctioned',
    tatDays: 3,
    documents: { bankStatement: true, salarySlips: true, ecsMandate: false },
  },
  {
    id: 'LN-502',
    customerName: 'Kriti Sanon',
    carModel: 'TATA Nexon EV',
    dealValue: 1850000,
    downPayment: 300000,
    loanRequired: 1550000,
    bankName: 'ICICI Bank',
    stage: 'Queries Pending',
    tatDays: 5,
    documents: { bankStatement: true, salarySlips: false, ecsMandate: false },
  },
  {
    id: 'LN-503',
    customerName: 'Ranveer Singh',
    carModel: 'TATA Harrier',
    dealValue: 2150000,
    downPayment: 400000,
    loanRequired: 1750000,
    bankName: 'SBI',
    stage: 'DO Received',
    tatDays: 8,
    documents: { bankStatement: true, salarySlips: true, ecsMandate: true },
    doNumber: 'DO/SBI/88220',
  },
];

const FinLoanApplications: React.FC = () => {
    const [loans, setLoans] = useState<LoanLead[]>(INITIAL_LOANS);
    const [selectedLoan, setSelectedLoan] = useState<LoanLead | null>(null);

    const getStageColor = (stage: LoanStage) => {
        switch (stage) {
            case 'Login Done': return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
            case 'Queries Pending': return 'text-rose-600 bg-rose-500/10 border-rose-500/20 animate-pulse';
            case 'Sanctioned': return 'text-purple-600 bg-purple-500/10 border-purple-500/20';
            case 'DO Received': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20';
            case 'Disbursed': return 'text-[#0f172a] bg-muted border-border';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">Retail Loan Pipeline</h2>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                        <Landmark size={16} className="text-primary" /> Multi-Bank Application Tracking & DO Portal
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                        <FileSignature size={14} /> Log New Case
                    </button>
                    <button className="p-2.5 bg-card border border-border rounded-xl shadow-sm hover:bg-muted transition-colors"><Printer size={20} /></button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { label: 'Logged', value: '24', color: 'text-blue-500' },
                    { label: 'Sanctioned', value: '18', color: 'text-purple-500' },
                    { label: 'DO In-Hand', value: '12', color: 'text-emerald-500' },
                    { label: 'Queries', value: '05', color: 'text-rose-500' },
                    { label: 'Disbursed', value: '₹4.2Cr', color: 'text-[#0f172a]' },
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border p-5 rounded-3xl shadow-sm text-center">
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                        <h4 className={`text-xl font-black ${stat.color}`}>{stat.value}</h4>
                    </div>
                ))}
            </div>

            <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border bg-muted/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="font-black text-lg tracking-tight uppercase">Active Loan Pipeline</h3>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="text" placeholder="Customer / Bank / Deal ID..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5 shadow-inner" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-5">Customer & Model</th>
                                <th className="px-8 py-5">Loan Details</th>
                                <th className="px-8 py-5">TAT</th>
                                <th className="px-8 py-5 text-center">Stage</th>
                                <th className="px-8 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loans.map((loan) => (
                                <tr key={loan.id} className="hover:bg-muted/30 transition-all group cursor-pointer" onClick={() => setSelectedLoan(loan)}>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center font-black">
                                                {loan.bankName.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{loan.customerName}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70 italic">{loan.carModel}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-[11px] font-black tracking-tight">₹{loan.loanRequired.toLocaleString()}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">{loan.bankName}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={12} className={loan.tatDays > 4 ? 'text-rose-500' : 'text-muted-foreground'} />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${loan.tatDays > 4 ? 'text-rose-600' : 'text-muted-foreground'}`}>
                                                {loan.tatDays} Days
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-center">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStageColor(loan.stage)}`}>
                                                {loan.stage}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 hover:bg-muted rounded-full transition-all text-muted-foreground">
                                            <ArrowRight size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {selectedLoan && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10"
                    >
                        <div className="xl:col-span-2 bg-card border border-border rounded-[40px] p-10 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-12 opacity-5 scale-[2] pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                                <Landmark size={150} />
                           </div>
                           <div className="relative z-10">
                               <div className="flex justify-between items-start mb-10 pb-6 border-b border-border border-dashed">
                                    <div>
                                        <h3 className="font-black text-2xl tracking-tight">Bank Compliance & Document Status</h3>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">Verification Checklist for {selectedLoan.bankName}</p>
                                    </div>
                                    {selectedLoan.doNumber && (
                                        <div className="px-5 py-2.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                           <ShieldCheck size={16} /> DO Recv: {selectedLoan.doNumber}
                                        </div>
                                    )}
                               </div>

                               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                   <div className="space-y-6">
                                        <h5 className="text-[11px] font-black uppercase tracking-widest text-primary mb-6">Required Documentation</h5>
                                        <div className="space-y-3">
                                            {[
                                                { label: '6 Months Bank Statement', status: selectedLoan.documents.bankStatement },
                                                { label: 'Salary Slips / 2yr ITR', status: selectedLoan.documents.salarySlips },
                                                { label: 'Identity & Address Proof', status: true },
                                                { label: 'ECS Mandate (Auto-Debit)', status: selectedLoan.documents.ecsMandate },
                                                { label: 'Signed Post-Dated Checks', status: false },
                                            ].map((doc, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-muted/40 rounded-2xl border border-border transition-all hover:border-primary/30">
                                                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${doc.status ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-background border-border shadow-inner'}`}>
                                                        {doc.status && <CheckCircle2 size={12} />}
                                                    </div>
                                                    <span className={`text-[11px] font-black uppercase tracking-tight ${doc.status ? 'opacity-40 line-through' : 'opacity-100'}`}>{doc.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                   </div>

                                   <div className="space-y-8">
                                       <div className="bg-[#0f172a] p-8 rounded-[32px] text-white shadow-xl">
                                           <h4 className="font-black text-sm uppercase tracking-widest text-primary mb-6">DO (Delivery Order) Portal</h4>
                                           <p className="text-[10px] text-white/50 font-medium leading-relaxed mb-8">
                                               Upload the sanctioned Delivery Order from the bank to unlock vehicle movement in the Sales dashboard.
                                           </p>
                                           <div className="w-full h-32 bg-white/5 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:bg-white/10 transition-all">
                                               <Upload className="text-primary mb-2" size={24} />
                                               <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Upload DO Scan (PDF/JPG)</p>
                                           </div>
                                           <button className="w-full mt-6 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:opacity-90 transition-all">
                                               Approve & Release Car
                                           </button>
                                       </div>
                                       
                                       <div className="p-6 bg-card border border-border rounded-[32px] flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-rose-500"><AlertCircle size={24}/></div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Sales Handshake Lock</p>
                                                <p className="text-[9px] font-bold text-muted-foreground opacity-70">Car delivery is blocked until DO is verified.</p>
                                            </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-card border border-border p-8 rounded-[40px] shadow-sm flex flex-col">
                                <h4 className="font-black text-sm uppercase tracking-widest mb-8 border-b border-border pb-4 flex items-center justify-between">
                                    Disbursement Sync
                                    <Banknote size={20} className="text-emerald-500" />
                                </h4>
                                <div className="space-y-5 flex-1">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-muted-foreground font-black uppercase tracking-widest opacity-50">Sanctioned Amt</span>
                                        <span className="font-black">₹{selectedLoan.loanRequired.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-muted-foreground font-black uppercase tracking-widest opacity-50">Disbursed Date</span>
                                        <span className="font-black">Pending</span>
                                    </div>
                                    <div className="bg-muted/50 p-6 rounded-3xl mt-4 border border-border">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Accountant Action</p>
                                        <p className="text-[9px] text-muted-foreground font-bold leading-relaxed mb-6">
                                            Once Disbursement is confirmed by the bank, pushing this will update the Showroom Credit Ledger.
                                        </p>
                                        <button className="w-full py-4 bg-[#0f172a] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all">
                                            Update Ledger (Disbursed)
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-500 p-8 rounded-[40px] text-white shadow-xl shadow-blue-500/20">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-black text-sm uppercase tracking-widest">Bank Executive</h4>
                                    <ShieldCheck size={20} className="opacity-30" />
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[9px] font-black uppercase opacity-60 tracking-widest">RM Name</p>
                                        <p className="text-sm font-black mt-1">Sanjeev Kumar (HDFC)</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase opacity-60 tracking-widest">Emergency Contact</p>
                                        <p className="text-sm font-black mt-1">+91 91122 33445</p>
                                    </div>
                                    <button className="w-full mt-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                                        Initiate WhatsApp Query
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FinLoanApplications;
