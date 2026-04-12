import React from 'react';
import { FileText, Search, Filter, ShieldAlert, CheckCircle2, History, User, Landmark, DollarSign, ArrowUpRight, Clock, AlertTriangle } from 'lucide-react';
import { AuditLogEntry } from '@/types/ceo';

const AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'LOG-8801', timestamp: 'Today, 11:24 AM', user: 'SM Rahul', department: 'Sales', action: 'High-Value Discount Approved', amount: 85000, status: 'Review' },
  { id: 'LOG-8802', timestamp: 'Today, 09:42 AM', user: 'Acc Gupta', department: 'Accounts', action: 'Capital Expense (CAPEX) Logged', amount: 412000, status: 'Flagged' },
  { id: 'LOG-8803', timestamp: 'Yesterday', user: 'Admin', department: 'System', action: 'Bank Payout reconciliation mismatch fix', status: 'Approved' },
  { id: 'LOG-8804', timestamp: 'Yesterday', user: 'SM Rahul', department: 'Sales', action: 'Bulk Unit Allotment Override', status: 'Approved' },
];

const CEOAuditLogs: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 bg-[#020617] -m-6 p-10 min-h-screen text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight uppercase text-white">Strategic Audit & Financial Oversight</h2>
          <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <FileText size={16} className="text-primary" /> Corporate Governance & Performance Audit Log
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-red-600/10 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-600/20 transition-all">
            <ShieldAlert size={14} /> High-Risk Flags (08)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 bg-slate-900/50 border border-slate-800 rounded-[40px] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-slate-800 bg-slate-800/10 flex justify-between items-center">
                  <h3 className="font-black text-lg tracking-tight uppercase text-white">Master Audit Pipeline</h3>
                  <div className="relative w-80">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input type="text" placeholder="Search by ID / User / Dept..." className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-blue-500/10 text-white" />
                  </div>
              </div>
              <div className="overflow-x-auto">
                  <table className="w-full text-left">
                      <thead className="bg-slate-800/30 text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">
                          <tr>
                              <th className="px-8 py-6">ID & Timestamp</th>
                              <th className="px-8 py-6">Operator & Dept</th>
                              <th className="px-8 py-6">Action Event</th>
                              <th className="px-8 py-6">Impact Value</th>
                              <th className="px-8 py-6 text-center">Protocol</th>
                              <th className="px-8 py-6 text-right">Audit</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                          {AUDIT_LOGS.map((log, i) => (
                              <tr key={i} className="hover:bg-slate-800/20 transition-all group font-bold">
                                  <td className="px-8 py-6 text-xs text-slate-400 font-mono tracking-tighter">
                                      <p className="text-white font-black">{log.id}</p>
                                      <p className="opacity-50 mt-1">{log.timestamp}</p>
                                  </td>
                                  <td className="px-8 py-6">
                                      <p className="text-sm font-black text-white group-hover:text-blue-400 transition-colors uppercase">{log.user}</p>
                                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">{log.department}</p>
                                  </td>
                                  <td className="px-8 py-6">
                                      <p className="text-[11px] font-bold text-slate-300 leading-snug">{log.action}</p>
                                  </td>
                                  <td className="px-8 py-6">
                                      {log.amount ? (
                                          <p className="text-sm font-black text-white">₹{log.amount.toLocaleString()}</p>
                                      ) : (
                                          <span className="text-[9px] font-black text-slate-600 uppercase">Non-Monetary</span>
                                      )}
                                  </td>
                                  <td className="px-8 py-6">
                                      <div className="flex justify-center">
                                          <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                              log.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                              log.status === 'Review' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                              'bg-rose-500/10 text-rose-500 border-rose-500/20 animate-pulse'
                                          }`}>
                                              {log.status}
                                          </span>
                                      </div>
                                  </td>
                                  <td className="px-8 py-6 text-right">
                                      <button className="px-5 py-2.5 bg-slate-800 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-white transition-all">
                                          Review Details
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>

          <div className="space-y-8">
              <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-[40px] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 scale-[2] pointer-events-none group-hover:rotate-6 transition-transform duration-700">
                      <ShieldAlert size={150} />
                  </div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
                      High-Value Gates
                  </h4>
                  <div className="space-y-6 relative z-10">
                      <div className="p-6 bg-slate-800/40 border border-slate-700/50 rounded-3xl">
                          <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Pending Authorization</p>
                          <h5 className="text-lg font-black text-white">IT Infrastructure Upgrade</h5>
                          <p className="text-2xl font-black text-blue-400 mt-2 tracking-tighter">₹12,45,000</p>
                          <div className="flex gap-3 mt-6">
                              <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Approve</button>
                              <button className="flex-1 py-3 bg-slate-700 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest">Reject</button>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-[40px] shadow-sm">
                  <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8">Risk Metrics</h4>
                  <div className="space-y-8">
                      <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Integrity Index</p>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 w-[98%]" />
                          </div>
                      </div>
                      <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Overdue Approvals</p>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 w-[42%]" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default CEOAuditLogs;
