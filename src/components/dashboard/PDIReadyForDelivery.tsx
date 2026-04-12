import React from 'react';
import { CheckCircle, Search, Filter, ShieldCheck, Share2, ClipboardList, Printer, Download, Sparkles, TrendingUp, Bell, ArrowRight } from 'lucide-react';

const READY_CARS = [
  { id: 'RL-01', customerName: 'Sanjay Dutt', carModel: 'TATA Safari Gold', certifiedDate: 'Today, 11:30 AM', certifiedBy: 'M. Khan', chassisNo: 'WDR77X112XXX' },
  { id: 'RL-02', customerName: 'Kriti Sanon', carModel: 'TATA Nexon EV', certifiedDate: 'Yesterday', certifiedBy: 'R. Tiwari', chassisNo: 'NXN44Z009XXX' },
  { id: 'RL-03', customerName: 'Varun Dhawan', carModel: 'TATA Punch', certifiedDate: '2 Days ago', certifiedBy: 'Admin', chassisNo: 'PNCH88Z001XXX' },
];

const PDIReadyForDelivery: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">Ready for Customer Delivery</h2>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-500" /> Technically Certified Vehicles Released to Sales Team
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200 hover:opacity-90 transition-all">
                        <Printer size={14} /> Download Bulk Certificates
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Certified (MTD)', value: '142', icon: <Sparkles />, color: 'text-emerald-500' },
                    { label: 'Handover Pending', value: '18', icon: <ClipboardList />, color: 'text-amber-500' },
                    { label: 'Yard Occupancy', value: '82%', icon: <TrendingUp />, color: 'text-blue-500' },
                    { label: 'Sales Handshakes', value: '24', icon: <Bell />, color: 'text-purple-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm hover:translate-y-[-2px] transition-all">
                        <div className={`p-2 rounded-xl mb-4 inline-block bg-muted ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-2xl font-black text-foreground tabular-nums mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border bg-muted/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="font-black text-lg tracking-tight uppercase">Final Release Ledger</h3>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="text" placeholder="POI Number / Chassis / Customer..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5 shadow-inner" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-5">Release ID / Customer</th>
                                <th className="px-8 py-5">Vehicle Identification</th>
                                <th className="px-8 py-5">Certification Log</th>
                                <th className="px-8 py-5">Auth By</th>
                                <th className="px-8 py-5 text-center">Export</th>
                                <th className="px-8 py-5 text-right">Sales Handover</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {READY_CARS.map((car, i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-all group font-bold">
                                    <td className="px-8 py-6">
                                        <p className="text-[9px] font-mono text-muted-foreground uppercase opacity-70 italic tracking-tighter mb-1">{car.id}</p>
                                        <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{car.customerName}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black">{car.carModel}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">VIN: {car.chassisNo}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-[11px] font-black">{car.certifiedDate}</p>
                                        <p className="text-[9px] font-black uppercase text-emerald-500 flex items-center gap-1 mt-1">
                                            <ShieldCheck size={10} /> Certified Mint Condition
                                        </p>
                                    </td>
                                    <td className="px-8 py-6 text-xs text-muted-foreground font-black uppercase opacity-60">
                                        {car.certifiedBy}
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><Download size={16}/></button>
                                            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><Printer size={16}/></button>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="flex items-center gap-2 ml-auto px-4 py-2 bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200">
                                            Handshake <Share2 size={12} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-[#0f172a] p-12 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-12 opacity-5 scale-[2] pointer-events-none group-hover:rotate-6 transition-transform duration-700">
                         <Bell size={200} />
                     </div>
                     <div className="relative z-10">
                        <h3 className="text-2xl font-black tracking-tight mb-4 uppercase">Automated Sales Broadcast</h3>
                        <p className="text-sm text-white/50 leading-relaxed font-medium mb-10">
                            The moment a vehicle is marked as **PDI Certified**, the corresponding Sales Executive receives a push notification and the "Schedule Delivery" button is unlocked in their CRM.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="p-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/40" />
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Last Broadcast: 10m ago</span>
                            </div>
                        </div>
                     </div>
                 </div>

                 <div className="bg-card border border-border p-12 rounded-[40px] shadow-sm flex flex-col justify-center gap-6">
                    <h4 className="text-2xl font-black tracking-tight uppercase">Ready vs Delivered Index</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase opacity-50 tracking-widest">
                            <span>Efficiency Meter</span>
                            <span>92%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[92%]" />
                        </div>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                            Avg time car spends in "Ready for Delivery" state: **1.2 Days**. 
                            Lowering this improves inventory turnover.
                        </p>
                        <button className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:underline">
                            View Productivity Audit <ArrowRight size={14}/>
                        </button>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default PDIReadyForDelivery;
