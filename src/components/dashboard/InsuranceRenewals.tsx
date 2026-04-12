import React from 'react';
import { History, Search, Filter, ArrowUpRight, Clock, ShieldCheck, Mail, Smartphone, MoreHorizontal, AlertCircle, TrendingUp } from 'lucide-react';
import { InsuranceLead } from '@/types/insurance';

const RENEWAL_LEADS: InsuranceLead[] = [
  {
    id: 'REN-401',
    customerName: 'Sanjay Dutt',
    carModel: 'TATA Safari (2023)',
    engineNumber: 'KRYO-X-44',
    chassisNumber: 'WDR-990-22',
    stage: 'Policy Issued',
    premiumAmount: 42000,
    idv: 1845000,
    ncbTransfer: 20,
    addOns: { zeroDep: true, engineProtect: true, returnToInvoice: false, consumables: false },
    cashlessTieUp: true,
    expiryDays: 4,
    isRenewed: false,
  },
  {
    id: 'REN-402',
    customerName: 'Manoj Bajpayee',
    carModel: 'TATA Nexon (2023)',
    engineNumber: 'REV-X-99',
    chassisNumber: 'NXN-110-33',
    stage: 'Policy Issued',
    premiumAmount: 28500,
    idv: 950000,
    ncbTransfer: 10,
    addOns: { zeroDep: true, engineProtect: false, returnToInvoice: false, consumables: false },
    cashlessTieUp: true,
    expiryDays: 12,
    isRenewed: false,
  },
  {
    id: 'REN-403',
    customerName: 'Kriti Sanon',
    carModel: 'TATA Punch (2023)',
    engineNumber: 'PNC-A-11',
    chassisNumber: 'PNC-770-44',
    stage: 'Soft Copy Sent',
    premiumAmount: 18200,
    idv: 620000,
    ncbTransfer: 50,
    addOns: { zeroDep: false, engineProtect: false, returnToInvoice: false, consumables: false },
    cashlessTieUp: false,
    expiryDays: 0, // Expired today
    isRenewed: false,
  },
];

const InsuranceRenewals: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">Renewals & Endorsements</h2>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                        <History size={16} className="text-primary" /> Tracking Expiring Policies & Retention Opportunities
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                        Bulk SMS Reminders
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Upcoming Renewals', value: '42', icon: <Clock />, color: 'text-primary' },
                    { label: 'Retention Rate', value: '78%', icon: <TrendingUp />, color: 'text-emerald-500' },
                    { label: 'Expired Policies', value: '08', icon: <AlertCircle />, color: 'text-destructive' },
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-6">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                            <div className={`p-1.5 rounded-lg bg-muted ${stat.color}`}>{stat.icon}</div>
                        </div>
                        <h3 className="text-3xl font-black text-foreground">{stat.value}</h3>
                        <p className="text-[9px] font-bold text-muted-foreground mt-2 opacity-50 uppercase italic tracking-tighter">Real-time status tracking</p>
                    </div>
                ))}
            </div>

            <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border bg-muted/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="font-black text-lg tracking-tight uppercase">Expiring Policy Retention List</h3>
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input type="text" placeholder="Search customer..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5" />
                        </div>
                        <button className="p-3 bg-background border border-border rounded-xl shadow-sm hover:bg-muted transition-colors"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-5">Customer / Model</th>
                                <th className="px-8 py-5">Chassis Info</th>
                                <th className="px-8 py-5">Time to Expiry</th>
                                <th className="px-8 py-5">Last Premium</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {RENEWAL_LEADS.map((lead, i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-all group font-bold">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 rounded-full bg-primary/5 text-primary flex items-center justify-center text-[11px] font-black uppercase">
                                                {lead.customerName[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{lead.customerName}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-tighter">{lead.carModel}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-xs font-mono font-bold uppercase opacity-70">CH: {lead.chassisNumber}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                                                (lead.expiryDays ?? 0) <= 5 ? 'bg-destructive/10 text-destructive border-destructive/20 animate-pulse' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                                            }`}>
                                                {lead.expiryDays === 0 ? 'EXPIRED TODAY' : `${lead.expiryDays} DAYS LEFT`}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-black tabular-nums">
                                        ₹{lead.premiumAmount.toLocaleString()}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button title="Email Quote" className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-primary transition-all"><Mail size={16} /></button>
                                            <button title="WhatsApp Reminder" className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-emerald-500 transition-all"><Smartphone size={16} /></button>
                                            <button className="px-3 py-1.5 bg-[#0f172a] text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:opacity-90 ml-2">Renew</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card border border-border p-8 rounded-[40px] shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 pointer-events-none">
                        <History size={160} />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight mb-6">Retention Campaign Summary</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Renewal SMS Sent', value: '1,248', percent: 100, color: 'bg-primary' },
                            { label: 'Callbacks Scheduled', value: '312', percent: 25, color: 'bg-amber-500' },
                            { label: 'Payment Completed', value: '84', percent: 7, color: 'bg-emerald-500' },
                        ].map((camp, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                                    <span className="text-muted-foreground">{camp.label}</span>
                                    <span>{camp.value}</span>
                                </div>
                                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                     <div className={`h-full ${camp.color} transition-all duration-1000`} style={{ width: `${camp.percent}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#0f172a] p-8 rounded-[40px] text-white shadow-xl flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                        <ShieldCheck size={32} className="text-primary" />
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-widest mb-3">Retention Reward Engine</h4>
                    <p className="text-sm text-white/50 max-w-sm font-medium leading-relaxed">
                        Track upcoming service-linked insurance renewals. Customers with active service plans show a **22%** higher retention rate.
                    </p>
                    <button className="mt-8 px-10 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        Access Retention Audit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InsuranceRenewals;
