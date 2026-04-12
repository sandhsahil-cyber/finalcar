import React, { useState } from 'react';
import { Wrench, Search, Filter, Printer, CheckCircle2, Package, Clock, ShieldCheck, ChevronRight, Upload, Play, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FitmentOrder, FitmentStage } from '@/types/accessories';

const INITIAL_FITMENTS: FitmentOrder[] = [
  {
    id: 'FIT-801',
    customerName: 'Rahul Mehra',
    carModel: 'TATA Safari Gold',
    vin: 'WDR56X901XXX',
    stage: 'Order Received',
    accessories: [
      { sku: 'SKU-001', status: 'Pending' },
      { sku: 'SKU-005', status: 'Pending' },
      { sku: 'SKU-102', status: 'Pending' },
    ],
    dateReceived: 'Today, 10:15 AM',
  },
  {
    id: 'FIT-802',
    customerName: 'Anjali Sharma',
    carModel: 'TATA Nexon EV',
    vin: 'NXN44Z112XXX',
    stage: 'Installation In-Progress',
    accessories: [
      { sku: 'SKU-EV-01', status: 'Installed' },
      { sku: 'SKU-EV-02', status: 'Installed' },
      { sku: 'SKU-EV-03', status: 'Pending' },
    ],
    dateReceived: 'Yesterday',
    jobCardId: 'JC-4421',
  },
];

const AccFitmentQueue: React.FC = () => {
    const [orders, setOrders] = useState<FitmentOrder[]>(INITIAL_FITMENTS);
    const [selectedOrder, setSelectedOrder] = useState<FitmentOrder | null>(null);

    const getStageColor = (stage: FitmentStage) => {
        switch (stage) {
            case 'Order Received': return 'text-red-600 bg-red-500/10 border-red-500/20';
            case 'Stock Allocated': return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
            case 'Installation In-Progress': return 'text-amber-600 bg-amber-500/10 border-amber-500/20';
            case 'Quality Checked': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20';
            default: return 'text-gray-600 bg-gray-500/10';
        }
    };

    const getProgress = (order: FitmentOrder) => {
        const total = order.accessories.length;
        const installed = order.accessories.filter(a => a.status === 'Installed' || a.status === 'Verified').length;
        return Math.round((installed / total) * 100);
    };

    const handlePrintJobCard = (order: FitmentOrder) => {
        alert(`PRINTING JOB CARD: ${order.jobCardId || 'JC-TEMP'} for ${order.customerName} [${order.carModel}]`);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">Live Fitment Queue</h2>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                        <Wrench size={16} className="text-rose-500" /> Active Accessory Installation Pipeline & Workflow
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                        <Play size={14} className="fill-white" /> Start Morning Shift
                    </button>
                </div>
            </div>

            <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border bg-muted/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500"><Wrench size={24}/></div>
                        <div>
                            <h3 className="font-black text-lg tracking-tight">Installation Workflow Pipeline</h3>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1">Status: Fitment Order Tracking</p>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input type="text" placeholder="Filter by Car Model / VIN..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5" />
                        </div>
                        <button className="p-3 bg-background border border-border rounded-xl shadow-sm hover:bg-muted transition-colors"><Filter size={18} /></button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-5">Vehicle & ID</th>
                                <th className="px-8 py-5">Customer info</th>
                                <th className="px-8 py-5">Completion</th>
                                <th className="px-8 py-5">Current Stage</th>
                                <th className="px-8 py-5 text-right">Workshop Link</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-muted/30 transition-all group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{order.carModel}</p>
                                                <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase opacity-70">VIN: {order.vin}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black">{order.customerName}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">Recv: {order.dateReceived}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="w-24">
                                            <div className="flex justify-between text-[9px] font-black uppercase mb-1">
                                                <span>Fitted</span>
                                                <span className={getProgress(order) === 100 ? 'text-emerald-500' : 'text-primary'}>{getProgress(order)}%</span>
                                            </div>
                                            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all duration-700 ${getProgress(order) === 100 ? 'bg-emerald-500' : 'bg-primary'}`} 
                                                    style={{ width: `${getProgress(order)}%` }} 
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStageColor(order.stage)}`}>
                                            {order.stage}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 hover:bg-muted rounded-full transition-all text-muted-foreground">
                                            <ChevronRight size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {selectedOrder && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10"
                    >
                        <div className="xl:col-span-2 bg-card border border-border rounded-[40px] p-10 shadow-sm">
                            <div className="flex justify-between items-center mb-10 pb-6 border-b border-border border-dashed">
                                <div>
                                    <h3 className="font-black text-2xl tracking-tight">Active Accessories Checklist</h3>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">Job Card ID: {selectedOrder.jobCardId || 'Awaiting Generation'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handlePrintJobCard(selectedOrder)} className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all">
                                        <Printer size={14} /> Print Job Card
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { category: 'Internal', icon: <Package size={14}/>, items: ['Floor Mats', 'Seat Covers', 'Ambient Lighting'] },
                                    { category: 'External', icon: <Wrench size={14}/>, items: ['Mud Flaps', 'Alloy Wheels', 'Teflon Coating'] },
                                    { category: 'Electricals', icon: <AlertCircle size={14}/>, items: ['GPS Tracker', 'Reverse Camera', 'Audio System'] },
                                ].map((cat, i) => (
                                    <div key={i} className="space-y-4">
                                        <h5 className="text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-2 mb-4">
                                            {cat.icon} {cat.category}
                                        </h5>
                                        <div className="space-y-2">
                                            {cat.items.map((item, j) => (
                                                <div key={j} className="flex items-center gap-3 p-3 bg-muted/40 rounded-2xl border border-border">
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${j < 2 ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-background border-border shadow-inner'}`}>
                                                        {j < 2 && <CheckCircle2 size={10} />}
                                                    </div>
                                                    <span className={`text-[11px] font-black uppercase tracking-tight ${j < 2 ? 'opacity-40 line-through' : 'opacity-100'}`}>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 flex justify-between items-center p-6 bg-primary/5 border border-primary/20 rounded-3xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-primary rounded-xl text-white"><ShieldCheck size={18}/></div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Pre-Delivery Quality Check</p>
                                        <p className="text-xs font-bold text-muted-foreground opacity-70">Verify all fitments before customer inspection.</p>
                                    </div>
                                </div>
                                <button className="px-6 py-3 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90">
                                    Final Authorization
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-[#0f172a] p-8 rounded-[40px] text-white shadow-xl flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-10">
                                    <h4 className="font-black text-sm uppercase tracking-widest text-primary">Billing Sync</h4>
                                    <Clock size={20} className="opacity-20" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-[10px] font-black opacity-50 uppercase tracking-widest">Total Accessories</span>
                                        <span className="text-sm font-black">₹42,850</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-[10px] font-black opacity-50 uppercase tracking-widest">Technician Labor</span>
                                        <span className="text-sm font-black">₹4,200</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 pt-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Net Payable</span>
                                        <span className="text-xl font-black">₹47,050</span>
                                    </div>
                                </div>
                                <button className="w-full mt-10 py-4 bg-white text-[#0f172a] rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:opacity-90 transition-all">
                                    Push to Accountant
                                </button>
                                <p className="text-[9px] text-center mt-3 text-white/30 font-black uppercase italic tracking-tighter">
                                    *Must match "Fitment Note" in Sales Record
                                </p>
                            </div>

                            <div className="bg-card border border-border p-8 rounded-[40px] shadow-sm flex-1">
                                <h4 className="font-black text-sm uppercase tracking-widest mb-6">Inventory Handshake</h4>
                                <div className="space-y-4">
                                    <div className="w-full h-48 bg-muted/40 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-6 group cursor-pointer hover:border-primary/50 transition-all">
                                        <Upload className="text-muted-foreground group-hover:text-primary transition-colors mb-4" size={32} />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Scan Accessory QR Code to Auto-Allocate Stock</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccFitmentQueue;
