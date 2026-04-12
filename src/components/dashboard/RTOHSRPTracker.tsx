import React from 'react';
import { Hash, Package, Truck, CheckCircle2, Search, Filter, AlertCircle, Clock, ShieldCheck } from 'lucide-react';

const HSRP_STAGES = [
  { id: 'ordered', label: 'Ordered', count: 12, icon: <Clock size={16}/>, color: 'text-amber-500 bg-amber-500/10' },
  { id: 'in_transit', label: 'In Transit', count: 8, icon: <Truck size={16}/>, color: 'text-blue-500 bg-blue-500/10' },
  { id: 'received', label: 'Received', count: 15, icon: <Package size={16}/>, color: 'text-purple-500 bg-purple-500/10' },
  { id: 'fitted', label: 'Fitted', count: 84, icon: <CheckCircle2 size={16}/>, color: 'text-emerald-500 bg-emerald-500/10' },
];

const RECENT_ORDERS = [
  { id: 'HS-4101', customer: 'Rajesh Khanna', model: 'Safari', laserCode: 'A71822X', status: 'In Transit' },
  { id: 'HS-4102', customer: 'Kamal Deep', model: 'Nexon', laserCode: 'B82211Z', status: 'Received' },
  { id: 'HS-4103', customer: 'Sania M.', model: 'Altroz', laserCode: 'C99110P', status: 'Ordered' },
];

const RTOHSRPTracker: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight uppercase">HSRP Plate Tracker</h2>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <Hash size={14} className="text-primary" /> High-Security Registration Plate Orders & Fitting Operations
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white rounded-xl text-xs font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            New HSRP Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {HSRP_STAGES.map((stage, i) => (
            <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all">
                <div className={`p-2 rounded-xl mb-4 inline-block ${stage.color}`}>
                    {stage.icon}
                </div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stage.label}</p>
                <div className="flex justify-between items-end mt-1">
                    <h3 className="text-3xl font-black tabular-nums">{stage.count}</h3>
                    <span className="text-[9px] font-bold text-muted-foreground opacity-50 uppercase italic">Active Batch</span>
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
             <div className="p-8 border-b border-border bg-muted/10 flex justify-between items-center">
                <h3 className="font-black text-lg tracking-tight uppercase">Active Plate Inventory</h3>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <input type="text" placeholder="Laser Code / Name..." className="pl-9 pr-4 py-2 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5" />
                    </div>
                </div>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Order ID</th>
                      <th className="px-8 py-4">Vehicle & Model</th>
                      <th className="px-8 py-4">Laser Code</th>
                      <th className="px-8 py-4">Stage</th>
                      <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {RECENT_ORDERS.map((order, i) => (
                      <tr key={i} className="hover:bg-muted/20 transition-all group font-bold text-sm">
                        <td className="px-8 py-5 text-muted-foreground font-mono">{order.id}</td>
                        <td className="px-8 py-5">
                            <p className="font-black tracking-tight">{order.customer}</p>
                            <p className="text-[10px] text-muted-foreground uppercase opacity-70 tracking-tighter">Asset: {order.model}</p>
                        </td>
                        <td className="px-8 py-5">
                            <span className="font-mono text-xs bg-muted px-2 py-1 rounded-md border border-border">{order.laserCode}</span>
                        </td>
                        <td className="px-8 py-5">
                            <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
                                order.status === 'Received' ? 'bg-purple-500/10 text-purple-600' :
                                order.status === 'In Transit' ? 'bg-blue-500/10 text-blue-600' :
                                'bg-amber-500/10 text-amber-600'
                            }`}>
                                {order.status}
                            </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                            <button className="text-xs font-black text-primary hover:underline uppercase tracking-tight">Set Fitted</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>

          <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[32px] p-8 text-white shadow-xl flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                      <ShieldCheck size={32} className="text-emerald-400" />
                  </div>
                  <h4 className="font-black text-lg uppercase tracking-widest">Compliance Ready</h4>
                  <p className="text-xs text-white/60 mt-2 font-medium">84 units registered and plates fitted in the last 30 days. No pending citations.</p>
                  <button className="w-full mt-10 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                      Generate Monthly Audit
                  </button>
              </div>

              <div className="bg-destructive/5 border border-destructive/20 rounded-[32px] p-8">
                  <h4 className="font-black text-sm uppercase tracking-widest text-destructive flex items-center gap-2 mb-4">
                      <AlertCircle size={18} /> Overdue Fittings
                  </h4>
                  <div className="space-y-4">
                        {[1, 2].map((_, i) => (
                            <div key={i} className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-destructive/10">
                                <div>
                                    <p className="text-xs font-black tracking-tight">Rajesh Gupta</p>
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Safari Gold</p>
                                </div>
                                <span className="text-[10px] font-black text-destructive">4 Days Delayed</span>
                            </div>
                        ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default RTOHSRPTracker;
