import React from 'react';
import { FileCheck, Search, ShieldCheck, Download, MoreVertical, FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';

const DOCUMENT_INVENTORY = [
  { id: 'DOC-1301', customer: 'Rajesh Khanna', model: 'Safari', forms: { f20: true, f21: true, f22: false }, lastUpdate: '10 min ago' },
  { id: 'DOC-1302', customer: 'Simran Jeet', model: 'Nexon EV', forms: { f20: true, f21: true, f22: true }, lastUpdate: '2 hours ago' },
  { id: 'DOC-1303', customer: 'Vikram Sethi', model: 'Punch', forms: { f20: true, f21: true, f22: true }, lastUpdate: 'Yesterday' },
  { id: 'DOC-1304', customer: 'Kamal Deep', model: 'Nexon', forms: { f20: true, f21: false, f22: false }, lastUpdate: 'Yesterday' },
];

const RTODocumentVault: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight uppercase tracking-widest text-[#0f172a]">Compliance Document Vault</h2>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" /> Secure archival and verification of Forms 20, 21, and 22
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-background border border-border rounded-xl text-xs font-black shadow-sm hover:bg-muted transition-all">
            <Download size={14} /> Batch Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border p-8 rounded-[32px] shadow-sm flex flex-col items-center text-center">
             <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6">
                <FileCheck size={32} />
             </div>
             <h4 className="text-xl font-black tracking-tight">Triple-Form Secure</h4>
             <p className="text-xs text-muted-foreground mt-2 font-medium">All essential registration forms are digitally verified and linked to chassis numbers.</p>
          </div>
          <div className="bg-card border border-border p-8 rounded-[32px] shadow-sm flex flex-col items-center text-center">
             <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
             </div>
             <h4 className="text-xl font-black tracking-tight">Audit Ready</h4>
             <p className="text-xs text-muted-foreground mt-2 font-medium">Every document undergoes a double-check protocol from both Sales and Manufacturer depts.</p>
          </div>
          <div className="bg-card border border-border p-8 rounded-[32px] shadow-sm flex flex-col items-center text-center">
             <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                <Clock size={32} />
             </div>
             <h4 className="text-xl font-black tracking-tight">Retention Policy</h4>
             <p className="text-xs text-muted-foreground mt-2 font-medium">Digital copies are retained for 5 years as per RTO digital archiving guidelines.</p>
          </div>
      </div>

      <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border bg-muted/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h3 className="font-black text-lg tracking-tight">Vehicle Document Compliance Matrix</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1">Verification Status: Form 20, 21, 22</p>
            </div>
            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Chassis / Name..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5" />
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Chassis ID</th>
                <th className="px-8 py-5">Customer & Model</th>
                <th className="px-8 py-5 text-center">Form 20 (Appl.)</th>
                <th className="px-8 py-5 text-center">Form 21 (Sales)</th>
                <th className="px-8 py-5 text-center">Form 22 (Roadw.)</th>
                <th className="px-8 py-5 text-right">Vault Info</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {DOCUMENT_INVENTORY.map((item, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-all group font-bold">
                  <td className="px-8 py-6 text-muted-foreground text-xs font-mono">{item.id}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{item.customer}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Asset: {item.model}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                        {item.forms.f20 ? <CheckCircle2 className="text-emerald-500" size={18} /> : <XCircle className="text-destructive opacity-30" size={18} />}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                        {item.forms.f21 ? <CheckCircle2 className="text-emerald-500" size={18} /> : <XCircle className="text-destructive opacity-30" size={18} />}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                        {item.forms.f22 ? <CheckCircle2 className="text-emerald-500" size={18} /> : <XCircle className="text-destructive opacity-30" size={18} />}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex flex-col items-end gap-1">
                        <button className="p-2 hover:bg-muted rounded-full">
                            <Download size={16} className="text-muted-foreground" />
                        </button>
                        <span className="text-[9px] uppercase font-black text-muted-foreground opacity-50 tracking-tighter">Updated: {item.lastUpdate}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RTODocumentVault;
