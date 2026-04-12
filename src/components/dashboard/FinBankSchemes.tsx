import React, { useState } from 'react';
import { Landmark, Search, Filter, ArrowUpRight, Percent, Clock, CreditCard, ShieldCheck, Zap, TrendingUp, Calculator, Banknote } from 'lucide-react';
import { BankScheme } from '@/types/finance';

const BANK_SCHEMES: BankScheme[] = [
  { bankName: 'SBI (State Bank of India)', roi: 8.75, ltv: 90, tenureMax: 84, processingFee: 0, type: 'Floating' },
  { bankName: 'HDFC Bank', roi: 9.15, ltv: 85, tenureMax: 84, processingFee: 2500, type: 'Fixed' },
  { bankName: 'ICICI Bank', roi: 9.25, ltv: 95, tenureMax: 96, processingFee: 3500, type: 'Floating' },
  { bankName: 'AXIS Bank', roi: 9.40, ltv: 100, tenureMax: 84, processingFee: 0, type: 'Fixed' },
];

const FinBankSchemes: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [tenure, setTenure] = useState(84);

    const calculateEMI = (principal: number, annualRate: number, months: number) => {
        const monthlyRate = annualRate / 12 / 100;
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        return Math.round(emi);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">Bank Schemes & ROI Database</h2>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                        <Landmark size={16} className="text-primary" /> Multi-Bank Comparison & Eligibility Calibration
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all text-center">
                        Sync Latest Rates
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-card border border-border p-8 rounded-[40px] shadow-sm space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-xl text-primary"><Calculator size={20}/></div>
                            <h3 className="font-black text-sm uppercase tracking-widest">Eligibility Calc</h3>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Loan Amount (₹)</label>
                            <input 
                                type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                                className="w-full p-4 bg-muted/40 border-none rounded-2xl text-lg font-black outline-none focus:ring-4 ring-primary/5"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tenure (Months)</label>
                                <span className="text-[10px] font-black text-primary uppercase">{tenure} Months</span>
                            </div>
                            <input 
                                type="range" min="12" max="96" step="12" value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                                className="w-full accent-primary h-1.5 bg-muted rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-[8px] font-black text-muted-foreground px-1">
                                <span>1Y</span><span>2Y</span><span>3Y</span><span>4Y</span><span>5Y</span><span>6Y</span><span>7Y</span><span>8Y</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-border border-dashed space-y-4">
                             <div className="flex justify-between items-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <p className="text-[10px] font-black uppercase opacity-60">Avg EMI Range</p>
                                <p className="text-xl font-black text-primary">₹14.2K - 16.8K</p>
                             </div>
                             <p className="text-[9px] text-muted-foreground font-medium text-center italic">*Based on current market benchmarks</p>
                        </div>
                    </div>

                    <div className="bg-[#0f172a] p-8 rounded-[40px] text-white overflow-hidden relative group">
                        <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                             <TrendingUp size={160} />
                        </div>
                        <h4 className="text-xl font-black mb-4 relative z-10">Smart ROI Match</h4>
                        <p className="text-xs text-white/50 leading-relaxed mb-6 relative z-10">
                            The system has identified **SBI** as the optimal partner for Loan amounts exceeding **₹15L** with a tenure of 7 years.
                        </p>
                        <button className="w-full py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl relative z-10 hover:opacity-90">
                            Apply Optimal Scheme
                        </button>
                    </div>
                </div>

                <div className="xl:col-span-3 bg-card border border-border rounded-[40px] overflow-hidden shadow-sm flex flex-col">
                    <div className="p-8 border-b border-border bg-muted/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h3 className="font-black text-lg tracking-tight uppercase">Live Partner Comparison Matrix</h3>
                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input type="text" placeholder="Search by Bank Name..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5" />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-6">Bank Name & Product</th>
                                    <th className="px-8 py-6 text-center">ROI (%)</th>
                                    <th className="px-8 py-6 text-center">LTV Coverage</th>
                                    <th className="px-8 py-6">Fees & Type</th>
                                    <th className="px-8 py-6 text-right">Proj. EMI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {BANK_SCHEMES.map((scheme, i) => (
                                    <tr key={i} className="hover:bg-muted/30 transition-all group group-hover:first:rounded-t-3xl">
                                        <td className="px-8 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-black text-muted-foreground text-xs">{scheme.bankName.substring(0, 2).toUpperCase()}</div>
                                                <div>
                                                    <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{scheme.bankName}</p>
                                                    <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">Max Tenure: {scheme.tenureMax} Months</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8 text-center">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="text-sm font-black text-primary">{scheme.roi}%</span>
                                                <div className="flex items-center gap-1 text-[8px] font-bold text-muted-foreground uppercase mt-1">
                                                    <Percent size={8}/> Annual
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8">
                                            <div className="w-24 mx-auto">
                                                <div className="flex justify-between text-[9px] font-black uppercase mb-1.5">
                                                    <span>LTV</span>
                                                    <span>{scheme.ltv}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden shadow-inner">
                                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${scheme.ltv}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase text-foreground">PF: ₹{scheme.processingFee.toLocaleString()}</p>
                                                <p className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border inline-block ${
                                                    scheme.type === 'Fixed' ? 'bg-muted text-muted-foreground border-border' : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                                                }`}>
                                                    {scheme.type} Rate
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8 text-right">
                                            <div className="space-y-1">
                                                <p className="text-lg font-black text-foreground tracking-tight">₹{calculateEMI(loanAmount, scheme.roi, tenure).toLocaleString()}</p>
                                                <p className="text-[8px] font-black uppercase text-muted-foreground tracking-[0.1em]">Per Month / Over {tenure} Mo</p>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Market Sentiment', value: 'Bullish', icon: <TrendingUp className="text-emerald-500"/> },
                    { label: 'Avg Payout Ratio', value: '1.25%', icon: <Banknote className="text-primary"/> },
                    { label: 'Closure TAT', value: '48h', icon: <Clock className="text-amber-500"/> },
                    { label: 'Approved LTV', value: '88.5%', icon: <ShieldCheck className="text-blue-500"/> },
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex items-center gap-5">
                        <div className="p-3 bg-muted rounded-2xl">{stat.icon}</div>
                        <div>
                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                            <h4 className="text-xl font-black mt-1">{stat.value}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FinBankSchemes;
