import React from 'react';
import { Banknote, Search, Filter, ShieldCheck, CheckCircle2, Clock, FileText, ArrowUpRight, History, MoreHorizontal, AlertCircle, Bookmark } from 'lucide-react';

const NOC_CASES = [
  { id: 'NOC-7701', customerName: 'Varun Dhawan', carModel: 'TATA Punch', bankName: 'SBI', type: 'Loan Closure', status: 'In-Progress', requestDate: '3 Days ago' },
  { id: 'NOC-7702', customerName: 'Alia Bhatt', carModel: 'TATA Altroz', bankName: 'HDFC Bank', type: 'Trade-in NOC', status: 'Completed', requestDate: 'Yesterday' },
  { id: 'NOC-7703', customerName: 'Arjun Kapoor', carModel: 'TATA Safari', bankName: 'ICICI Bank', type: 'Hypothecation Removal', status: 'Pending', requestDate: 'Today' },
];

const FinNocClosure: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">NOC & Loan Closures</h2>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <Banknote size={16} className="text-primary" /> Hypothecation Clearance & Trade-in Documentation
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            Initiate NOC Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
              { label: 'Active Requests', value: '18', sub: 'Awaiting Bank response', color: 'text-amber-500', icon: <Clock size={18}/> },
              { label: 'NOCs Issued', value: '142', sub: 'This quarter', color: 'text-emerald-500', icon: <ShieldCheck size={18}/> },
              { label: 'Avg TAT', value: '5.4 Days', sub: 'Last 3 projects', color: 'text-blue-500', icon: <History size={18}/> },
              { label: 'Overdue Cases', value: '03', sub: 'Exceeding 7 days', color: 'text-rose-500', icon: <AlertCircle size={18}/> },
          ].map((stat, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex items-center gap-5">
                  <div className={`p-3 rounded-2xl bg-muted ${stat.color}`}>
                      {stat.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                    <h3 className="text-xl font-black text-foreground">{stat.value}</h3>
                  </div>
              </div>
          ))}
      </div>

      <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border bg-muted/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="font-black text-lg tracking-tight uppercase">Closure Pipeline</h3>
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="NOC ID / VIN / Customer..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5" />
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Case ID / Customer</th>
                <th className="px-8 py-5">Vehicle & Model</th>
                <th className="px-8 py-5">Bank & Type</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {NOC_CASES.map((doc, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-all group font-bold">
                  <td className="px-8 py-6">
                    <p className="text-[9px] font-mono text-muted-foreground uppercase opacity-70 italic tracking-tighter mb-1">{doc.id}</p>
                    <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{doc.customerName}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black">{doc.carModel}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">Req Date: {doc.requestDate}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black">{doc.bankName}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60 tracking-widest">{doc.type}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                        <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            doc.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                            doc.status === 'In-Progress' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 animate-pulse' :
                            'bg-amber-500/10 text-amber-600 border-amber-500/20'
                        }`}>
                            {doc.status}
                        </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <button title="View Docs" className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-primary transition-all"><FileText size={16} /></button>
                        <button title="Archived Case" className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-primary transition-all"><Bookmark size={16} /></button>
                        <button className="p-2 hover:bg-muted rounded-full text-muted-foreground"><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border border-border p-10 rounded-[40px] shadow-sm flex flex-col md:flex-row items-center gap-10 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-6 transition-transform duration-700">
                  <ShieldCheck size={200} />
              </div>
              <div className="flex-1 space-y-6 relative z-10">
                  <h3 className="text-2xl font-black tracking-tight">Trade-in Documentation Lock</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-lg">
                      For all pre-owned vehicle trade-ins, the **Bank NOC** must be verified before the system allows the vehicle to be "Evaluated & Stocked."
                  </p>
                  <button className="text-[10px] font-black uppercase tracking-widest text-[#0f172a] flex items-center gap-2 hover:underline">
                      View Trade-in Policy <ArrowUpRight size={14}/>
                  </button>
              </div>
          </div>

          <div className="bg-[#0f172a] p-10 rounded-[40px] text-white shadow-xl flex flex-col justify-center items-center text-center">
              <div className="p-4 bg-white/10 rounded-full mb-6">
                  <History size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-black uppercase tracking-widest mb-2">RC Hypothecation Sync</h4>
              <p className="text-[10px] text-white/50 font-medium max-w-xs mx-auto">
                Once the NOC is received, the RTO module is automatically notified to initiate Hypothecation Removal from the vehicle's RC.
              </p>
              <button className="w-full mt-8 py-4 bg-white text-[#0f172a] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:opacity-90 transition-all">
                Manual Sync with RTO
              </button>
          </div>
      </div>
    </div>
  );
};

export default FinNocClosure;
