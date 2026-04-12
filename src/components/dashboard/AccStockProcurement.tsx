import React from 'react';
import { ShoppingCart, Search, Filter, Warehouse, Truck, Clock, CheckCircle2, History, CreditCard, ChevronRight, FileText, ArrowRight } from 'lucide-react';

const RECENT_PROCUREMENTS = [
  { id: 'PO-9912', vendor: 'TATA Genuine Parts', status: 'In-Transit', items: 42, value: '₹1,42,000', expected: 'Tomorrow' },
  { id: ' PO-9911', vendor: 'Neo Wheels Ltd.', status: 'Delivered', items: 12, value: '₹84,500', expected: 'Yesterday' },
  { id: 'PO-9910', vendor: 'Auto-Tech Electronics', status: 'Awaiting Approval', items: 5, value: '₹22,100', expected: '3 Days' },
];

const AccStockProcurement: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">Stock Procurement Hub</h2>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                        <ShoppingCart size={16} className="text-primary" /> Vendor Purchase Orders & Inbound Supply Tracking
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                        Create New PO
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Active Purchase Orders', value: '08', icon: <FileText />, color: 'text-primary' },
                    { label: 'Pending Deliveries', value: '03', icon: <Truck />, color: 'text-amber-500' },
                    { label: 'Monthly Spend', value: '₹8.4L', icon: <CreditCard />, color: 'text-[#0f172a]' },
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                            <div className={`p-1.5 rounded-lg bg-muted ${stat.color}`}>{stat.icon}</div>
                        </div>
                        <h3 className="text-3xl font-black text-foreground tabular-nums">{stat.value}</h3>
                        <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                             <div className="h-full bg-primary/20 w-[60%]" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border bg-muted/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="font-black text-lg tracking-tight uppercase tracking-widest">Inbound Supply Pipeline</h3>
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input type="text" placeholder="PO ID / Vendor..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5 shadow-inner" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-5">PO Number</th>
                                <th className="px-8 py-5">Supplier / Vendor</th>
                                <th className="px-8 py-5">Value & Units</th>
                                <th className="px-8 py-5">Current Status</th>
                                <th className="px-8 py-5 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {RECENT_PROCUREMENTS.map((po, i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-all group font-bold">
                                    <td className="px-8 py-6 text-muted-foreground text-xs font-mono">{po.id}</td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{po.vendor}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-70">Category: Accessories</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-[11px] font-black">{po.value}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">{po.items} Unique SKU Items</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                                            po.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                                            po.status === 'In-Transit' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 animate-pulse' :
                                            'bg-amber-500/10 text-amber-600 border-amber-500/20'
                                        }`}>
                                            {po.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-all">
                                            <ChevronRight size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3 bg-card border border-border p-10 rounded-[40px] shadow-sm flex flex-col md:flex-row items-center gap-10 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                        <Warehouse size={300} />
                    </div>
                    <div className="flex-1 space-y-6 relative z-10">
                        <h3 className="text-2xl font-black tracking-tight">Consolidated Vendor Management</h3>
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-xl">
                            Our procurement module tracks vendor lead-times and fulfillment accuracy. 
                            Use the automated **"Short-Supply"** flagging system to notify suppliers of missing items during GRN (Goods Received Note).
                        </p>
                        <div className="flex gap-4">
                            <button className="text-[10px] font-black uppercase tracking-widest text-[#0f172a] flex items-center gap-2 hover:underline">
                                View Vendor Directory <ArrowRight size={14}/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0f172a] p-8 rounded-[40px] text-white shadow-xl flex flex-col justify-center items-center text-center">
                    <div className="p-4 bg-white/10 rounded-full mb-6">
                        <History size={32} className="text-primary" />
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-widest mb-2">Purchase History</h4>
                    <p className="text-[10px] text-white/50 font-medium">Analyze procurement trends over the last 6 months to optimize inventory levels.</p>
                    <button className="w-full mt-8 py-4 bg-white text-[#0f172a] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:opacity-90 transition-all">
                        Download Trend Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccStockProcurement;
