import React from 'react';
import { Package, Search, Filter, AlertTriangle, ArrowUpRight, ArrowDownRight, Printer, Download, Plus, ShoppingCart, Tag } from 'lucide-react';
import { AccessoryItem } from '@/types/accessories';

const STOCK_ITEMS: AccessoryItem[] = [
  { sku: 'SKU-7721', name: 'Premium Leather Seat Covers', category: 'Internal', price: 14500, gst: 18, laborCost: 1200, stockLevel: 2, lowStockThreshold: 5, compatibleModels: ['Safari', 'Harrier'] },
  { sku: 'SKU-1022', name: 'All-Weather Floor Mats', category: 'Internal', price: 2800, gst: 12, laborCost: 200, stockLevel: 45, lowStockThreshold: 10, compatibleModels: ['Nexon', 'Punch', 'Altroz'] },
  { sku: 'SKU-9901', name: 'Chrome Side Beading (Set)', category: 'External', price: 4200, gst: 18, laborCost: 500, stockLevel: 4, lowStockThreshold: 5, compatibleModels: ['Harrier'] },
  { sku: 'SKU-EL-33', name: 'Rear View Mirror Camera', category: 'Electrical', price: 8500, gst: 28, laborCost: 1500, stockLevel: 8, lowStockThreshold: 3, compatibleModels: ['Universal'] },
];

const AccInventoryStock: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">Accessory Inventory Control</h2>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                        <Package size={16} className="text-primary" /> Real-time SKU Tracking & Warehouse Management
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                        <Plus size={14} /> Add New SKU
                    </button>
                    <button className="p-2.5 bg-card border border-border rounded-xl shadow-sm hover:bg-muted transition-colors"><Printer size={20} /></button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total active SKUs', value: '1,240', sub: 'Across 3 categories', color: 'text-primary' },
                    { label: 'Low Stock Alerts', value: '14', sub: 'Requires urgent order', color: 'text-rose-500' },
                    { label: 'In-Stock Value', value: '₹42.8L', sub: 'Asset valuation', color: 'text-emerald-500' },
                    { label: 'GST Pending', value: '₹3.4L', sub: 'Purchase reconciliation', color: 'text-blue-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col justify-between">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                        <div>
                            <h3 className={`text-2xl font-black mt-2 ${stat.color}`}>{stat.value}</h3>
                            <p className="text-[9px] font-bold text-muted-foreground mt-1 opacity-50 uppercase italic tracking-tighter">{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border bg-muted/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <h3 className="font-black text-lg tracking-tight uppercase">Master Accessory Repository</h3>
                    <div className="flex gap-4 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input type="text" placeholder="Search by SKU / Part Name / Compatibility..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5 shadow-inner" />
                        </div>
                        <button className="p-3 bg-background border border-border rounded-xl shadow-sm hover:bg-muted transition-colors"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-5">SKU & Item Details</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5">Pricing & Tax</th>
                                <th className="px-8 py-5">Current Stock</th>
                                <th className="px-8 py-5 text-right">Supply Chain</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {STOCK_ITEMS.map((item, i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-all group font-bold">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                                                <Tag size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{item.name}</p>
                                                <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase opacity-70">SKU: {item.sku}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[10px] font-black px-2.5 py-1 bg-muted rounded-md border border-border uppercase tracking-widest">{item.category}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-[11px] font-black tracking-tight">Base: ₹{item.price.toLocaleString()}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">Tax: {item.gst}% • Labor: ₹{item.laborCost}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2.5 py-1.5 rounded-lg text-xs font-black tabular-nums border ${
                                                item.stockLevel <= item.lowStockThreshold ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                                            }`}>
                                                {item.stockLevel} UNITS
                                            </span>
                                            {item.stockLevel <= item.lowStockThreshold && (
                                                <div className="p-1 px-2 bg-rose-500 rounded text-white text-[8px] font-black uppercase tracking-tighter animate-pulse">Low Stock</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className={`flex items-center gap-2 ml-auto px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                                            item.stockLevel <= item.lowStockThreshold ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground hover:bg-[#0f172a] hover:text-white'
                                        }`}>
                                            <ShoppingCart size={12} /> Order Now
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#0f172a] p-10 rounded-[40px] text-white shadow-xl relative overflow-hidden flex flex-col justify-between group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-[2] group-hover:scale-[2.2] group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                        <Package size={200} />
                    </div>
                    <div>
                        <h4 className="text-2xl font-black tracking-tight mb-2">Automated Inventory Hub</h4>
                        <p className="text-sm text-white/50 font-medium leading-relaxed max-w-sm">
                            Integrate with manufacturer backend for "Just-In-Time" stock replenishment. Redundant items are auto-flagged for clearance sales.
                        </p>
                    </div>
                    <div className="mt-10 flex gap-4">
                        <div className="flex-1 bg-white/5 border border-white/10 p-5 rounded-3xl">
                            <p className="text-[10px] font-black opacity-50 uppercase mb-1">Turnover Ratio</p>
                            <p className="text-xl font-black text-primary">8.5x</p>
                        </div>
                        <div className="flex-1 bg-white/5 border border-white/10 p-5 rounded-3xl">
                           <p className="text-[10px] font-black opacity-50 uppercase mb-1">Stock Aging</p>
                           <p className="text-xl font-black text-amber-500">14 Days</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border p-10 rounded-[40px] shadow-sm flex flex-col justify-center text-left">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-500 rounded-3xl text-white shadow-xl shadow-blue-500/30">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight">Active Supply Warnings</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="p-5 bg-rose-500/5 border border-rose-500/10 rounded-3xl flex justify-between items-center">
                            <div>
                                <p className="text-[11px] font-black uppercase text-rose-600">Alloy Wheel Out-of-Stock</p>
                                <p className="text-[9px] font-bold text-muted-foreground opacity-70">Impact: 4 pending deliveries for TATA Safari</p>
                            </div>
                            <button className="text-[10px] font-black uppercase tracking-widest text-[#0f172a] underline">Resolve</button>
                        </div>
                        <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-3xl flex justify-between items-center">
                            <div>
                                <p className="text-[11px] font-black uppercase text-amber-600">GST Rate Mismatch</p>
                                <p className="text-[9px] font-bold text-muted-foreground opacity-70">SKU-9901 has incorrect tax bracket entry</p>
                            </div>
                            <button className="text-[10px] font-black uppercase tracking-widest text-[#0f172a] underline">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccInventoryStock;
