import React from 'react';
import { Wrench, Search, Filter, AlertCircle, Clock, CheckCircle2, MoreHorizontal, History, User, Landmark, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { RectificationEntry } from '@/types/pdi';

const RECTIFICATIONS: RectificationEntry[] = [
  { id: 'RL-101', taskId: 'PDI-9003', carModel: 'TATA Harrier', defectDescription: 'Minor paint scratch on LH Front Door (Rear portion)', severity: 'Minor', status: 'In-Work', technician: 'Suresh P.' },
  { id: 'RL-102', taskId: 'PDI-9003', carModel: 'TATA Harrier', defectDescription: 'AC vent direction knob loose', severity: 'Minor', status: 'Pending' },
  { id: 'RL-103', taskId: 'PDI-8822', carModel: 'TATA Safari', defectDescription: 'Alloy wheel center cap missing', severity: 'Moderate', status: 'Fixed', technician: 'Rajesh M.' },
];

const PDIRectificationLog: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">Defect & Rectification Log</h2>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <Wrench size={16} className="text-rose-500" /> Technical Fault Tracking & Repair Workflow
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-rose-200 hover:opacity-90 transition-all">
             Report New Defect
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
              { label: 'Active Defects', value: '08', icon: <AlertCircle />, color: 'text-rose-500' },
              { label: 'Pending Fix', value: '03', icon: <Clock />, color: 'text-amber-500' },
              { label: 'Repaired (MTD)', value: '142', icon: <CheckCircle2 />, color: 'text-emerald-500' },
              { label: 'Avg TAT', value: '2.4h', icon: <History />, color: 'text-blue-500' },
          ].map((stat, i) => (
              <div key={i} className="bg-card border border-border p-5 rounded-[32px] shadow-sm">
                  <div className={`p-2 rounded-xl mb-4 inline-block bg-muted ${stat.color}`}>
                      {stat.icon}
                  </div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-black text-foreground mt-1 tabular-nums">{stat.value}</h3>
              </div>
          ))}
      </div>

      <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border bg-muted/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="font-black text-lg tracking-tight uppercase tracking-widest">Active Repair Pipeline</h3>
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search by Car / Defect / Tech..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5 shadow-inner" />
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Case ID / Model</th>
                <th className="px-8 py-5">Defect Description</th>
                <th className="px-8 py-5 text-center">Severity</th>
                <th className="px-8 py-5">Technician</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RECTIFICATIONS.map((entry, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-all group font-bold">
                  <td className="px-8 py-6">
                    <p className="text-[9px] font-mono text-muted-foreground uppercase opacity-70 tracking-tighter mb-1">{entry.id}</p>
                    <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{entry.carModel}</p>
                  </td>
                  <td className="px-8 py-6 max-w-xs">
                    <p className="text-[11px] font-bold text-foreground leading-snug">{entry.defectDescription}</p>
                    <p className="text-[9px] font-black uppercase text-muted-foreground opacity-50 mt-1">Ref Task: {entry.taskId}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                        <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                            entry.severity === 'Minor' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                            entry.severity === 'Moderate' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                            'bg-rose-500/10 text-rose-600 border-rose-500/20'
                        }`}>
                            {entry.severity}
                        </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-muted rounded-lg text-muted-foreground"><User size={12}/></div>
                        <p className="text-xs font-black">{entry.technician || 'Awaiting Assign'}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        entry.status === 'Fixed' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                        entry.status === 'In-Work' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 animate-pulse' :
                        'bg-rose-500/10 text-rose-600 border-rose-500/20'
                    }`}>
                        {entry.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-muted rounded-full text-muted-foreground"><MoreHorizontal size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#0f172a] p-10 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 scale-[2] pointer-events-none group-hover:rotate-6 transition-transform duration-700">
                  <ShieldAlert size={200} />
              </div>
              <div className="relative z-10 max-w-xl">
                  <h3 className="text-2xl font-black tracking-tight mb-4">Body Shop Coordination</h3>
                  <p className="text-sm text-white/50 leading-relaxed font-medium mb-10">
                      All "Moderate" and "Critical" defects found during PDI are automatically routed to the Bodyshop Manager's queue. 
                      Standardized labor codes for PDI rectifications are auto-allocated to maintain workshop productivity.
                  </p>
                  <button className="px-8 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:opacity-90">
                      View Service Escalations
                  </button>
              </div>
          </div>

          <div className="bg-card border border-border p-10 rounded-[40px] shadow-sm flex flex-col justify-center items-center text-center">
              <div className="p-4 bg-muted rounded-full mb-6">
                  <Landmark size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-black uppercase tracking-widest mb-2">Inventory Damage Audit</h4>
              <p className="text-[10px] text-muted-foreground font-medium max-w-xs mx-auto">
                Generate month-end reports on vehicles arriving with defects from the Yard vs Factory for insurance claims.
              </p>
              <button className="w-full mt-8 py-4 bg-[#0f172a] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-primary transition-all">
                Download Audit Report
              </button>
          </div>
      </div>
    </div>
  );
};

export default PDIRectificationLog;
