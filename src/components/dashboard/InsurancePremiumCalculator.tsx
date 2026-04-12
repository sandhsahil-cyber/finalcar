import React, { useState } from 'react';
import { Calculator, ShieldCheck, CheckCircle2, Star, Zap, Landmark, Umbrella, ArrowRight, Wallet, BadgeCheck } from 'lucide-react';
import { QuoteComparison } from '@/types/insurance';

const COMPARISON_QUOTES: QuoteComparison[] = [
  {
    provider: 'HDFC Ergo',
    premium: 42800,
    idv: 2150000,
    benefits: ['Cashless Service (1000+ Garages)', '24X7 Roadside Assist', 'Zero Depreciation included'],
  },
  {
    provider: 'Tata AIG',
    premium: 39500,
    idv: 2150000,
    benefits: ['Quick Claim Settlement', 'Key Replacement cover', 'Personal Accident Cover (15L)'],
    isRecommended: true,
  },
  {
    provider: 'ICICI Lombard',
    premium: 45200,
    idv: 2180000,
    benefits: ['Highest Pick-up / Drop', 'Garages near you', 'Consumables cover'],
  },
];

const InsurancePremiumCalculator: React.FC = () => {
    const [exShowroom, setExShowroom] = useState<string>('2450000');

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase">Premium Comparison Suite</h2>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                        <Calculator size={16} className="text-primary" /> Multi-Provider Quote Generation & Benefit Analysis
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10">
                    <BadgeCheck className="text-primary" size={20} />
                    <span className="text-xs font-black uppercase text-primary tracking-widest">IRDAI Certified Quotes</span>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-[#0f172a] p-8 rounded-[32px] text-white shadow-xl border border-white/10">
                        <h4 className="font-black text-sm uppercase tracking-widest mb-8 text-primary">Input Configuration</h4>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase opacity-60 block mb-2 tracking-widest">Ex-Showroom Price (₹)</label>
                                <input 
                                    type="text" 
                                    value={exShowroom} 
                                    onChange={(e) => setExShowroom(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-black outline-none focus:ring-4 ring-primary/20" 
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase opacity-60 block mb-2 tracking-widest">Registration State</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none">
                                    <option>Gujarat (GJ)</option>
                                    <option>Maharashtra (MH)</option>
                                    <option>Delhi (DL)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase opacity-60 block mb-2 tracking-widest">Customer Profile</label>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Individual</button>
                                    <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">Corporate</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 pt-8 border-t border-white/10 text-center">
                            <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60">Estimated IDV</p>
                            <h3 className="text-2xl font-black mt-1">₹{(parseInt(exShowroom || '0') * 0.95).toLocaleString()}</h3>
                            <button className="w-full mt-8 py-4 bg-white text-[#0f172a] rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:opacity-90 active:scale-95 transition-all">
                                Refresh Quotes
                            </button>
                        </div>
                    </div>

                    <div className="bg-card border border-border p-8 rounded-[32px] shadow-sm">
                        <h5 className="font-black text-[11px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Umbrella className="text-primary" size={16} /> Key Add-on Packages
                        </h5>
                        <div className="space-y-3">
                            {['Zero Depreciation', 'Return to Invoice', 'Consumables Cover', 'Engine Protection'].map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-2 text-xs font-bold text-muted-foreground border-b border-border/50">
                                   {item}
                                   <div className={`w-8 h-4 rounded-full relative transition-all ${i===0 || i===2 ? 'bg-primary' : 'bg-muted'}`}>
                                       <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${i===0 || i===2 ? 'right-0.5' : 'left-0.5'}`} />
                                   </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {COMPARISON_QUOTES.map((quote, i) => (
                            <div key={i} className={`relative bg-card border ${quote.isRecommended ? 'border-primary ring-4 ring-primary/5' : 'border-border'} rounded-[40px] p-8 shadow-sm flex flex-col group hover:shadow-xl transition-all duration-500`}>
                                {quote.isRecommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-1.5">
                                        <Star size={10} className="fill-white" /> Recommended Choice
                                    </div>
                                )}
                                
                                <div className="text-center mb-8">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{quote.provider}</p>
                                    <h4 className="text-3xl font-black text-[#0f172a]">₹{quote.premium.toLocaleString()}</h4>
                                    <p className="text-[9px] font-bold text-muted-foreground mt-1 lowercase italic">/ annual premium</p>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <div className="p-4 bg-muted/30 rounded-2xl">
                                        <p className="text-[9px] font-black uppercase text-muted-foreground mb-1 opacity-60">Sum Insured (IDV)</p>
                                        <p className="text-sm font-black text-foreground uppercase">₹{quote.idv.toLocaleString()}</p>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        {quote.benefits.map((benefit, j) => (
                                            <div key={j} className="flex items-start gap-3 text-[10px] font-bold text-muted-foreground leading-relaxed">
                                                <div className="mt-0.5 text-primary"><CheckCircle2 size={12} /></div>
                                                {benefit}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-10 pt-6 border-t border-border border-dashed">
                                    <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${quote.isRecommended ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02]' : 'bg-muted text-muted-foreground hover:bg-[#0f172a] hover:text-white'}`}>
                                        Select Quote <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 bg-card border border-border rounded-[40px] p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <Landmark size={180} />
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                            <div className="max-w-md">
                                <h3 className="text-2xl font-black tracking-tight mb-4">Cashless Tie-up Network</h3>
                                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                                    We have a direct cashless tie-up with over **15+** major insurance providers. 
                                    Our in-house workshop handles direct settlements with HDFC Ergo, Tata AIG, and Kotak General for seamless accident repairs.
                                </p>
                            </div>
                            <div className="w-full md:w-auto grid grid-cols-2 gap-4">
                                <div className="bg-muted p-6 rounded-3xl text-center">
                                    <p className="text-3xl font-black text-primary">15 min</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Policy Issuance</p>
                                </div>
                                <div className="bg-[#0f172a] p-6 rounded-3xl text-center text-white">
                                    <p className="text-3xl font-black text-emerald-400">100%</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-1">Cashless Record</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsurancePremiumCalculator;
