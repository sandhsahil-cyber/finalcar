import React, { useState } from 'react';
import { Truck, Search, Filter, ShieldCheck, CheckCircle, AlertTriangle, Camera, Clock, ChevronRight, Hash, ShieldAlert, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PDITask, PDIStage } from '@/types/pdi';

const INITIAL_PDI: PDITask[] = [
  {
    id: 'PDI-9001',
    customerName: 'Sanjay Dutt',
    carModel: 'TATA Safari Gold',
    vin: 'WDR77X112XXX',
    engineNo: 'ENG-998822',
    arrivalDate: 'Today, 09:00 AM',
    stage: 'Arrived from Yard',
    inspectionProgress: 0,
    photos: { front: null, rear: null, left: null, right: null },
  },
  {
    id: 'PDI-9002',
    customerName: 'Kriti Sanon',
    carModel: 'TATA Nexon EV',
    vin: 'NXN44Z009XXX',
    engineNo: 'EV-BAT-4422',
    arrivalDate: 'Yesterday',
    stage: 'Under Inspection',
    inspectionProgress: 65,
    photos: { front: 'checked', rear: 'checked', left: null, right: null },
  },
  {
    id: 'PDI-9003',
    customerName: 'Ranveer Singh',
    carModel: 'TATA Harrier',
    vin: 'HAR11M556XXX',
    engineNo: 'ENG-112233',
    arrivalDate: '2 Days ago',
    stage: 'Rectification Required',
    inspectionProgress: 88,
    photos: { front: 'checked', rear: 'checked', left: 'checked', right: 'checked' },
  },
];

const PDIIngestionQueue: React.FC = () => {
    const [tasks, setTasks] = useState<PDITask[]>(INITIAL_PDI);
    const [selectedTask, setSelectedTask] = useState<PDITask | null>(null);

    const getStageColor = (stage: PDIStage) => {
        switch (stage) {
            case 'Arrived from Yard': return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
            case 'Under Inspection': return 'text-amber-600 bg-amber-500/10 border-amber-500/20 animate-pulse';
            case 'Rectification Required': return 'text-rose-600 bg-rose-500/10 border-rose-500/20';
            case 'PDI Certified': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase">Technical Inspection Queue</h2>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                        <ShieldCheck size={16} className="text-primary" /> Master Quality Control & Vehicle release management
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                        Bulk Yard Release
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'In Yard', value: '12', icon: <Truck />, color: 'text-blue-500' },
                    { label: 'PDI Certified', value: '88', icon: <BadgeCheck />, color: 'text-emerald-500' },
                    { label: 'Rectifications', value: '04', icon: <ShieldAlert />, color: 'text-rose-500' },
                    { label: 'Avg PDI Time', value: '1.4h', icon: <Clock />, color: 'text-amber-500' },
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

            <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border bg-muted/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="font-black text-lg tracking-tight uppercase">Quality Pipeline</h3>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="text" placeholder="VIN / Chassis / Customer..." className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-[10px] font-black outline-none focus:ring-4 ring-primary/5 shadow-inner" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-5">Vehicle Detail</th>
                                <th className="px-8 py-5">Arrival & Status</th>
                                <th className="px-8 py-5">Checking Progress</th>
                                <th className="px-8 py-5 text-center">Stage</th>
                                <th className="px-8 py-5 text-right">Audit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-muted/30 transition-all group cursor-pointer" onClick={() => setSelectedTask(task)}>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center font-black">
                                                <Car size={20} className="opacity-40" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{task.carModel}</p>
                                                <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase opacity-70">VIN: {task.vin}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-xs font-black">{task.arrivalDate}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">Customer: {task.customerName}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="w-24">
                                            <div className="flex justify-between text-[9px] font-black uppercase mb-1">
                                                <span className="opacity-50">Points</span>
                                                <span className={task.inspectionProgress === 100 ? 'text-emerald-500' : 'text-primary'}>{task.inspectionProgress}%</span>
                                            </div>
                                            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all duration-700 ${task.stage === 'Rectification Required' ? 'bg-rose-500' : task.inspectionProgress === 100 ? 'bg-emerald-500' : 'bg-primary'}`} 
                                                    style={{ width: `${task.inspectionProgress}%` }} 
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-center">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStageColor(task.stage)}`}>
                                                {task.stage}
                                            </span>
                                        </div>
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
                {selectedTask && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10"
                    >
                        <div className="xl:col-span-2 bg-card border border-border rounded-[40px] p-10 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-12 opacity-5 scale-[2] pointer-events-none group-hover:rotate-6 transition-transform duration-700">
                                <ShieldCheck size={150} />
                           </div>
                           <div className="relative z-10">
                               <div className="flex justify-between items-start mb-10 pb-6 border-b border-border border-dashed">
                                    <div>
                                        <h3 className="font-black text-2xl tracking-tight uppercase">Technical Validation & Chassis Matching</h3>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">QC AUDIT FOR {selectedTask.carModel}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-5 py-2.5 bg-background border border-border rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-muted transition-all">
                                            <Hash size={14} /> Verify VIN
                                        </button>
                                    </div>
                               </div>

                               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                   <div className="space-y-8">
                                       <div className="p-8 bg-muted/40 rounded-[32px] border border-border border-dashed">
                                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Chassis Identification Matrix</h5>
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[9px] font-black uppercase opacity-40">Physical Chassis No.</p>
                                                    <p className="text-sm font-mono font-black text-foreground mt-1">{selectedTask.vin}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black uppercase opacity-40">Engine Number</p>
                                                    <p className="text-sm font-mono font-black text-foreground mt-1">{selectedTask.engineNo}</p>
                                                </div>
                                                <div className="pt-4 flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded bg-emerald-500 text-white flex items-center justify-center"><CheckCircle size={12}/></div>
                                                    <p className="text-[10px] font-black uppercase tracking-tight text-emerald-600">Matches RTO System Records</p>
                                                </div>
                                            </div>
                                       </div>

                                       <div className="space-y-4">
                                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Inter-Dept Handshake</h5>
                                            <div className="p-6 bg-emerald-500/5 rounded-[32px] border border-emerald-500/10 flex items-center gap-4">
                                                <ShieldCheck className="text-emerald-500" size={24} />
                                                <p className="text-[11px] font-bold text-emerald-800 leading-tight">
                                                    Accessories Fitment marked **100% COMPLETE** by workshop. Vehicle released for final PDI.
                                                </p>
                                            </div>
                                       </div>
                                   </div>

                                   <div className="space-y-8">
                                       <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Photo Evidence Upload</h5>
                                       <div className="grid grid-cols-2 gap-4">
                                            {['Front', 'Rear', 'Left Side', 'Right Side'].map((side, i) => (
                                                <div key={i} className="aspect-square bg-muted/20 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-center p-4 hover:border-primary/40 group cursor-pointer transition-all">
                                                    <Camera className="text-muted-foreground group-hover:text-primary transition-colors mb-2" size={24} />
                                                    <p className="text-[9px] font-black uppercase tracking-tighter opacity-60">Upload {side} View</p>
                                                </div>
                                            ))}
                                       </div>
                                       <button className="w-full py-4 bg-[#0f172a] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                           CERTIFY CONDITION <ShieldCheck size={16} />
                                       </button>
                                   </div>
                               </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-card border border-border p-8 rounded-[40px] shadow-sm flex flex-col justify-between h-full">
                                <div>
                                    <h4 className="font-black text-sm uppercase tracking-widest mb-8 flex items-center justify-between">
                                        PDI Bay Status
                                        <Clock size={20} className="text-amber-500" />
                                    </h4>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">Bay Allocation</span>
                                            <span className="text-sm font-black text-primary">PDI BAY #04</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">Allocated To</span>
                                            <span className="text-sm font-black">M. Khan (L3 Technician)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 bg-rose-500/10 border border-rose-500/20 p-6 rounded-3xl group cursor-pointer">
                                    <div className="flex items-center gap-3 mb-2">
                                        <ShieldAlert size={20} className="text-rose-600" />
                                        <h5 className="text-[11px] font-black uppercase tracking-widest text-rose-600">Major Fault Flag (STOP)</h5>
                                    </div>
                                    <p className="text-[10px] text-rose-800 leading-relaxed font-bold">
                                        Found a major mechanical or paint defect? Push the red flag to immediately block Sales from handover.
                                    </p>
                                    <button className="w-full mt-6 py-3 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-200">
                                        BLOCK DELIVERY
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PDIIngestionQueue;
