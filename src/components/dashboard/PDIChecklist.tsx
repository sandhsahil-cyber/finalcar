import React, { useState } from 'react';
import { ClipboardList, CheckCircle2, ShieldCheck, PenTool, Layout, Wrench, Zap, FileText, Share2, Car, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { InspectionResult } from '@/types/pdi';

const CHECKLIST_DATA: InspectionResult[] = [
  {
    category: 'Exterior',
    points: [
      { label: 'Paint Quality & Scratch-free Surface', checked: false },
      { label: 'Panel Gaps & Alignment Check', checked: false },
      { label: 'Glass/Windshield Clarity & Wiper Check', checked: false },
      { label: 'Tyre Pressure & Alloy Polish', checked: false },
    ]
  },
  {
    category: 'Interior',
    points: [
      { label: 'AC Cooling & Vent Airflow', checked: false },
      { label: 'Infotainment/Speakers/Reverse Camera', checked: false },
      { label: 'Seat Adjustments & Upholstery Condition', checked: false },
      { label: 'Dashboard Lights & Console Functionality', checked: false },
    ]
  },
  {
    category: 'Under-the-Hood',
    points: [
      { label: 'Oil Levels & Leakage Audit', checked: false },
      { label: 'Battery Health & Terminal Tightness', checked: false },
      { label: 'Coolant & Brake Fluid Levels', checked: false },
      { label: 'Engine Noise & Vibration (NVH) Check', checked: false },
    ]
  },
  {
    category: 'Documents',
    points: [
       { label: 'Spare Key Presence & Pairing', checked: false },
       { label: "Owner's Manual & Warranty Booklet", checked: false },
       { label: 'Roadside Assistance (RSA) Activation', checked: false },
    ]
  }
];

const PDIChecklist: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('Exterior');
    const [checklist, setChecklist] = useState(CHECKLIST_DATA);

    const togglePoint = (catIndex: number, pointIndex: number) => {
        const newData = [...checklist];
        newData[catIndex].points[pointIndex].checked = !newData[catIndex].points[pointIndex].checked;
        setChecklist(newData);
    };

    const getTotalChecked = () => {
        let total = 0;
        let checked = 0;
        checklist.forEach(cat => {
            cat.points.forEach(p => {
                total++;
                if (p.checked) checked++;
            });
        });
        return { total, checked, percent: Math.round((checked / total) * 100) };
    };

    const stats = getTotalChecked();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] uppercase text-center md:text-left">100-Point Inspection Lab</h2>
                    <p className="text-sm text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2">
                        <ClipboardList size={16} className="text-primary" /> Multi-Point Technical Integrity Protocol
                    </p>
                </div>
                <div className="flex bg-muted rounded-2xl p-1.5 gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                    {checklist.map((cat) => (
                        <button 
                            key={cat.category} onClick={() => setActiveTab(cat.category)}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                                activeTab === cat.category ? 'bg-white shadow-md text-primary' : 'text-muted-foreground hover:bg-white/50'
                            }`}
                        >
                            {cat.category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-card border border-border p-10 rounded-[40px] shadow-sm text-center flex flex-col items-center">
                        <div className="relative w-40 h-40 mb-8">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted/30" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className={`transition-all duration-1000 ${stats.percent === 100 ? 'text-emerald-500' : 'text-primary'}`} strokeDasharray={440} strokeDashoffset={440 - (440 * stats.percent) / 100} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-4xl font-black ${stats.percent === 100 ? 'text-emerald-500' : 'text-primary'}`}>{stats.percent}%</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-1">Verified</span>
                            </div>
                        </div>
                        <h4 className="text-xl font-black tracking-tight">Technical Hub Health</h4>
                        <p className="text-xs text-muted-foreground mt-2 font-medium">Progress for total 100 checking protocols.</p>
                        
                        <div className="w-full mt-8 pt-6 border-t border-border border-dashed space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground font-black uppercase tracking-widest opacity-60">Handled By</span>
                                <span className="font-black">R. Tiwari</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground font-black uppercase tracking-widest opacity-60">Status</span>
                                <span className="text-primary font-black animate-pulse">LIVE INSPECTION</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0f172a] p-10 rounded-[40px] text-white overflow-hidden relative group">
                        <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                             <PenTool size={160} />
                        </div>
                        <h4 className="text-xl font-black mb-6 relative z-10">Digital Authorization</h4>
                        <div className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl mb-6 flex flex-col items-center justify-center relative cursor-crosshair">
                            <PenTool className="text-white/20" />
                            <p className="text-[9px] font-black uppercase opacity-40 mt-2">Sign here for Final Release</p>
                        </div>
                        <button className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl relative z-10">
                            Push Certificate
                        </button>
                    </div>
                </div>

                <div className="xl:col-span-3">
                    <div className="bg-card border border-border rounded-[40px] p-10 shadow-sm h-full flex flex-col">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-2xl font-black tracking-tight uppercase">{activeTab} Checklist Protocol</h3>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">Verifying {checklist.find(c => c.category === activeTab)?.points.length} Critical Checkpoints</p>
                            </div>
                            <div className="p-3 bg-muted rounded-2xl">
                                {activeTab === 'Exterior' && <Car className="text-primary" />}
                                {activeTab === 'Interior' && <Layout className="text-primary" />}
                                {activeTab === 'Under-the-Hood' && <Wrench className="text-primary" />}
                                {activeTab === 'Documents' && <FileText className="text-primary" />}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                            {checklist.find(c => c.category === activeTab)?.points.map((point, index) => {
                                const catIdx = checklist.findIndex(c => c.category === activeTab);
                                return (
                                    <div 
                                        key={index} onClick={() => togglePoint(catIdx, index)}
                                        className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
                                            point.checked ? 'bg-emerald-500/5 border-emerald-500/20 shadow-inner' : 'bg-background border-border hover:border-primary/40'
                                        }`}
                                    >
                                        <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                            point.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-muted text-transparent'
                                        }`}>
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className={`text-[11px] font-black uppercase tracking-tight ${point.checked ? 'text-emerald-700 opacity-60' : 'text-foreground'}`}>{point.label}</h5>
                                            <p className={`text-[9px] mt-1 font-bold ${point.checked ? 'text-emerald-500' : 'text-muted-foreground opacity-40 italic'}`}>
                                                {point.checked ? 'Checkpoint Passed & Logged' : 'Verification Required'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-12 flex flex-col md:flex-row gap-4 pt-10 border-t border-border border-dashed">
                             <button className="flex-1 py-4 bg-muted text-muted-foreground rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-muted/80 transition-all flex items-center justify-center gap-2">
                                Save Progress Draft
                             </button>
                             <button className="flex-[2] py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                <ShieldCheck size={18} /> Complete & Mark Verified
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PDIChecklist;
