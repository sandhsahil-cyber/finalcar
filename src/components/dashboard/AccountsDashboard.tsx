import React, { useState, useMemo } from 'react';
import {
    IndianRupee, Landmark, History, Users2, Building2,
    PackageSearch, Search, Filter, ReceiptText, AlertCircle,
    FileText, CheckCircle2, Wallet, Send, ArrowRightLeft,
    TrendingUp, PieChart, Bell, ArrowUpRight, ShieldCheck,
    MoreHorizontal, CheckCircle, Clock, ListChecks, ArrowLeft
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar as RechartsBar } from 'recharts';

// --- Types & Mock Data ---
type Role = 'Accountant' | 'SalesManager' | 'CEO';
type LeadStatus = 'pending' | 'done';

interface Lead {
    id: string;
    name: string;
    car: string;
    exe: string;
    amt: string;
    booking: string;
    docs: number;
    status: LeadStatus;
}

const INITIAL_LEADS: Lead[] = [
    { id: 'L-101', name: 'Amit Verma', car: 'Fortuner GR-S', exe: 'Rajesh', amt: '₹52.4L', booking: '₹5.0L', docs: 2, status: 'pending' },
    { id: 'L-102', name: 'Surbhi Gupta', car: 'Hyryder V', exe: 'Anjali', amt: '₹22.1L', booking: '₹1.0L', docs: 3, status: 'pending' },
    { id: 'L-103', name: 'Karan Mehra', car: 'Innova Hycross', exe: 'Rajesh', amt: '₹34.8L', booking: '₹2.5L', docs: 1, status: 'pending' },
    { id: 'L-104', name: 'Priya Sharma', car: 'Glanza V', exe: 'Suresh', amt: '₹12.5L', booking: '₹0.5L', docs: 3, status: 'done' },
    { id: 'L-105', name: 'Rahul Singh', car: 'Fortuner', exe: 'Rajesh', amt: '₹48.0L', booking: '₹5.0L', docs: 3, status: 'done' },
];

const CHART_DATA = [
    { name: 'Mar', rev: 1.2, exp: 0.8 },
    { name: 'Apr', rev: 2.1, exp: 0.9 },
    { name: 'May', rev: 1.8, exp: 0.85 },
    { name: 'Jun', rev: 2.8, exp: 1.1 },
];

// --- Sub-Components ---

const StatCard = ({ title, value, sub, icon: Icon, color, percent }: any) => (
    <div className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group">
        <div className="flex justify-between items-start">
            <div className={`p-2.5 rounded-xl bg-muted group-hover:scale-110 transition-transform ${color}`}>
                <Icon size={22} />
            </div>
            {percent && (
                <span className={`text-[10px] font-bold ${percent.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10'} px-2 py-1 rounded-full flex items-center gap-1`}>
                    {percent} <ArrowUpRight size={10} />
                </span>
            )}
        </div>
        <div className="mt-4">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
            <h3 className="text-2xl font-black mt-1 tracking-tight">{value}</h3>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium">{sub}</p>
        </div>
    </div>
);

const AccountDashboard: React.FC = () => {
    const [viewMode, setViewMode] = useState<Role>('Accountant');
    const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<LeadStatus>('pending');

    // --- Logic: Derived Data ---
    const filteredLeads = useMemo(() => {
        return leads.filter(l => 
            l.status === activeTab && 
            (l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             l.car.toLowerCase().includes(searchQuery.toLowerCase()) ||
             l.id.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [leads, activeTab, searchQuery]);

    const pendingCount = leads.filter(l => l.status === 'pending').length;
    const doneCount = leads.filter(l => l.status === 'done').length;

    const handleMarkAsDone = (id: string) => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: 'done' } : l));
        setSelectedLead(null);
    };

    const handleMarkAsPending = (id: string) => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: 'pending' } : l));
        setSelectedLead(null);
    };

    return (
        <div className="p-6 space-y-8 bg-[#fdfdfd] dark:bg-background min-h-screen font-sans">

            {/* 1. HEADER & ROLE SELECTOR */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Finance Control
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-tighter">
                            <ShieldCheck size={12} /> Secure Portal
                        </span>
                        <p className="text-muted-foreground text-[13px] font-medium italic underline decoration-primary/30 underline-offset-4">
                           Operational Cashflow & Settlement Workflow
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-muted/50 backdrop-blur-sm p-1.5 rounded-2xl border border-border shadow-inner">
                    {(['Accountant', 'SalesManager', 'CEO'] as Role[]).map((r) => (
                        <button
                            key={r}
                            onClick={() => setViewMode(r)}
                            className={`px-5 py-2 text-xs font-black rounded-xl transition-all duration-300 ${viewMode === r 
                                ? 'bg-background text-primary shadow-xl ring-1 ring-border translate-y-[-1px]' 
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                        >
                            {r === 'CEO' ? 'Executive View' : r}
                        </button>
                    ))}
                </div>
            </header>

            {/* 2. DYNAMIC METRICS BASED ON ROLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Ledger Inflow" 
                    value="₹1.24 Cr" 
                    sub="Total receivables" 
                    icon={IndianRupee} 
                    color="text-emerald-500" 
                    percent="+14%"
                />
                <StatCard 
                    title="Finance Pipeline" 
                    value="₹85.2 L" 
                    sub="Awaiting bank NOCs" 
                    icon={Landmark} 
                    color="text-blue-500" 
                    percent="+8%"
                />

                {viewMode !== 'Accountant' ? (
                    <>
                        <StatCard 
                            title="Net Profit" 
                            value="₹82.4 L" 
                            sub="Quarterly performance" 
                            icon={TrendingUp} 
                            color="text-purple-500" 
                            percent="+22%"
                        />
                        <StatCard 
                            title="Asset Value" 
                            value="₹12.4 Cr" 
                            sub="Floor inventory" 
                            icon={PackageSearch} 
                            color="text-orange-500" 
                        />
                    </>
                ) : (
                    <>
                        <StatCard 
                            title="Awaiting Process" 
                            value={pendingCount.toString()} 
                            sub="Pending settlements" 
                            icon={Clock} 
                            color="text-amber-500" 
                        />
                        <StatCard 
                            title="Completed Today" 
                            value={doneCount.toString()} 
                            sub="Processed entries" 
                            icon={CheckCircle} 
                            color="text-emerald-500" 
                        />
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* 3. MAIN WORK QUEUE */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm ring-1 ring-border/50">
                        <div className="p-8 border-b border-border space-y-6 bg-muted/10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h3 className="font-black text-xl tracking-tight">Lead Settlement Workflow</h3>
                                    <p className="text-[12px] text-muted-foreground font-medium">Verify documents and complete account settlements</p>
                                </div>
                                <div className="flex bg-muted p-1 rounded-2xl border border-border">
                                    <button 
                                        onClick={() => setActiveTab('pending')}
                                        className={`flex items-center gap-2 px-6 py-2.5 text-[11px] font-black rounded-xl transition-all ${activeTab === 'pending' ? 'bg-background text-amber-600 shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                                    >
                                        <Clock size={14} /> PENDING ({pendingCount})
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('done')}
                                        className={`flex items-center gap-2 px-6 py-2.5 text-[11px] font-black rounded-xl transition-all ${activeTab === 'done' ? 'bg-background text-emerald-600 shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                                    >
                                        <ListChecks size={14} /> PROCESSED ({doneCount})
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative flex-1 group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, ID or vehicle model..."
                                        className="w-full pl-11 pr-4 py-3.5 bg-background border border-border rounded-2xl text-xs font-medium outline-none focus:ring-4 ring-primary/10 transition-all shadow-inner"
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button className="p-3.5 bg-background border border-border rounded-2xl text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-sm">
                                    <Filter size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted/30 text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">
                                    <tr>
                                        <th className="px-8 py-5">Customer & Asset</th>
                                        <th className="px-8 py-5">Value details</th>
                                        <th className="px-8 py-5">Verification</th>
                                        <th className="px-8 py-5 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredLeads.map((item, idx) => (
                                        <tr key={idx}
                                            onClick={() => setSelectedLead(item)}
                                            className={`group transition-all cursor-pointer ${selectedLead?.id === item.id ? 'bg-primary/5' : 'hover:bg-muted/30'}`}
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${item.status === 'done' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                                        {item.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-[14px] group-hover:text-primary transition-colors">{item.name}</p>
                                                        <p className="text-[10px] text-muted-foreground font-bold tracking-tight uppercase flex items-center gap-2 mt-0.5">
                                                            {item.car} <span className="w-1 h-1 rounded-full bg-muted-foreground/30" /> ID: {item.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-[14px] font-mono font-black">{item.amt}</p>
                                                <p className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1 mt-0.5">
                                                    <Wallet size={10} /> Paid: {item.booking}
                                                </p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex gap-1.5 mb-1.5">
                                                    {[...Array(3)].map((_, i) => (
                                                        <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-500 ${i < item.docs ? (item.status === 'done' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-primary shadow-[0_0_8px_rgba(99,102,241,0.3)]') : 'bg-muted'}`} />
                                                    ))}
                                                </div>
                                                <p className="text-[10px] font-black text-muted-foreground lowercase tabular-nums">{item.docs}/3 verified</p>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest border transition-all ${
                                                    item.status === 'done' 
                                                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                                                    : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                                                }`}>
                                                    {item.status === 'done' ? 'SETTLED' : 'PENDING ACTION'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredLeads.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="p-4 bg-muted rounded-full">
                                                        <PackageSearch className="text-muted-foreground" size={32} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="font-black text-muted-foreground">No leads found</p>
                                                        <p className="text-xs text-muted-foreground/60">Try adjusting your search or filters</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* CEO/MANAGER SECTION: Revenue Analytics */}
                    {viewMode !== 'Accountant' && (
                        <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <div className="space-y-1">
                                    <h3 className="font-black text-xl tracking-tight">Institutional Performance</h3>
                                    <p className="text-[12px] text-muted-foreground font-medium italic">Revenue (Cr) vs Operational Expenditure</p>
                                </div>
                                <button className="px-4 py-2 bg-muted text-[11px] text-primary font-black rounded-xl hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20 flex items-center gap-2">
                                    <History size={14} /> Full Audit Report
                                </button>
                            </div>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={CHART_DATA} barGap={8}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                                        <XAxis 
                                            dataKey="name" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fontSize: 11, fontWeight: 800, fill: 'hsl(var(--muted-foreground))' }} 
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fontSize: 11, fontWeight: 800, fill: 'hsl(var(--muted-foreground))' }} 
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                                            contentStyle={{ 
                                                borderRadius: '20px', 
                                                border: '1px solid hsl(var(--border))', 
                                                backgroundColor: 'hsl(var(--card))',
                                                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                                                padding: '12px 16px'
                                            }}
                                            itemStyle={{ fontSize: '12px', fontWeight: 900 }}
                                        />
                                        <Bar dataKey="rev" fill="hsl(var(--primary))" radius={[8, 8, 8, 8]} name="Revenue" barSize={32} />
                                        <Bar dataKey="exp" fill="hsl(var(--destructive))" radius={[8, 8, 8, 8]} opacity={0.4} name="Expense" barSize={32} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>

                {/* 4. SETTLEMENT SIDEBAR / ACTION PANEL */}
                <div className="space-y-6">
                    {selectedLead ? (
                        <div className={`bg-card border-2 ${selectedLead.status === 'done' ? 'border-emerald-500/20' : 'border-primary/20'} rounded-[32px] p-8 shadow-2xl sticky top-6 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                            <div className="flex justify-between items-start mb-8">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-black text-2xl group-hover:text-primary transition-colors">
                                            {selectedLead.status === 'done' ? 'Processed' : 'Settlement'}
                                        </h3>
                                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tighter ${selectedLead.status === 'done' ? 'bg-emerald-500 text-white' : 'bg-primary text-white'}`}>
                                            {selectedLead.id}
                                        </span>
                                    </div>
                                    <p className="text-[12px] text-muted-foreground font-black uppercase tracking-widest">{selectedLead.name} <span className="mx-1 opacity-20">|</span> {selectedLead.car}</p>
                                </div>
                                <button 
                                    onClick={() => setSelectedLead(null)} 
                                    className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                            </div>

                            <div className="space-y-5 mb-10">
                                <div className="p-5 bg-muted/40 rounded-3xl border border-border">
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Mandatory Checklist</p>
                                        <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">{selectedLead.docs}/3 Done</span>
                                    </div>
                                    <div className="space-y-3">
                                        <DocRow label="PAN Card Verification" status="verified" />
                                        <DocRow label="National Identity Check" status="verified" />
                                        <DocRow label="Pre-Delivery Inspection Form" status={selectedLead.docs >= 3 ? 'verified' : 'pending'} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-background border border-border rounded-2xl shadow-sm">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Due Balance</p>
                                        <p className="font-black text-lg text-foreground tabular-nums">{selectedLead.amt}</p>
                                    </div>
                                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl shadow-sm">
                                        <p className="text-[9px] font-black text-emerald-600/70 uppercase tracking-widest mb-1">Receipt Amt</p>
                                        <p className="font-black text-lg text-emerald-600 tabular-nums">{selectedLead.booking}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {selectedLead.status === 'pending' ? (
                                    <>
                                        <button 
                                            onClick={() => handleMarkAsDone(selectedLead.id)}
                                            className="w-full py-5 bg-primary text-primary-foreground rounded-[20px] font-black text-[13px] tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                                        >
                                            <ReceiptText size={20} className="group-hover:rotate-12 transition-transform" /> COMPLETE SETTLEMENT
                                        </button>
                                        <button className="w-full py-5 bg-background text-foreground border border-border rounded-[20px] font-black text-[13px] tracking-widest flex items-center justify-center gap-3 hover:bg-muted/80 transition-all">
                                            <Send size={18} /> NOTIFY SALES EXEC.
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-[20px] text-emerald-600 flex flex-col items-center gap-3">
                                            <CheckCircle2 size={32} />
                                            <p className="font-black text-sm tracking-tight text-center">Lead Processed Successfully</p>
                                            <button 
                                                onClick={() => handleMarkAsPending(selectedLead.id)}
                                                className="text-[10px] font-black underline underline-offset-4 mt-2 hover:text-emerald-700 transition-colors"
                                            >
                                                Undo Settlement
                                            </button>
                                        </div>
                                        <button className="w-full py-5 bg-background text-foreground border border-border rounded-[20px] font-black text-[13px] tracking-widest flex items-center justify-center gap-3 hover:bg-muted transition-all">
                                            <FileText size={18} /> DOWNLOAD RECEIPT
                                        </button>
                                    </>
                                )}
                                <button className="w-full py-2 text-[10px] text-destructive font-black tracking-widest opacity-50 hover:opacity-100 transition-opacity">
                                    ESCALATE TO DISCREPANCY MANAGER
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-muted/10 border-2 border-dashed border-border rounded-[32px] p-12 text-center flex flex-col items-center justify-center min-h-[500px] group">
                            <div className="w-20 h-20 bg-background border border-border rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                <ListChecks className="w-8 h-8 text-muted-foreground/40 group-hover:text-primary/40 transition-colors" />
                            </div>
                            <h4 className="font-black text-muted-foreground tracking-tight">Select a work item</h4>
                            <p className="text-[12px] text-muted-foreground/60 max-w-[220px] mt-3 font-medium leading-relaxed italic">
                                Pick a lead from the queue to start verification, process cash/online payments, & generate invoices.
                            </p>
                        </div>
                    )}

                    {/* RECENT SETTLEMENT FEED */}
                    <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-[13px] flex items-center gap-2 uppercase tracking-widest">
                                <History className="w-4 h-4 text-primary" /> Live Activity
                            </h3>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="space-y-6">
                            <ActivityItem
                                icon={<CheckCircle2 className="text-emerald-500" size={16} />}
                                text="Receipt generated for Rahul's Fortuner"
                                sub="Processed by Accountant"
                                time="12 mins ago"
                            />
                            <ActivityItem
                                icon={<Bell className="text-blue-500" size={16} />}
                                text="Rajesh posted new settlement lead"
                                sub="Innova Hycross (L-109)"
                                time="45 mins ago"
                            />
                            <ActivityItem
                                icon={<AlertCircle className="text-destructive" size={16} />}
                                text="System Flag: Document Mismatch"
                                sub="Priya Sharma (Expired ID)"
                                time="2h ago"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Small Helper Components ---

const DocRow = ({ label, status }: { label: string, status: 'verified' | 'pending' }) => (
    <div className="flex items-center justify-between group/row">
        <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${status === 'verified' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
            <span className={`text-[11px] font-black tracking-tight ${status === 'verified' ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
        </div>
        {status === 'verified' ? (
            <div className="p-1 bg-emerald-50 rounded-full text-emerald-500 group-hover/row:scale-110 transition-transform">
                <CheckCircle2 size={12} />
            </div>
        ) : (
            <div className="w-4 h-4 rounded-full border-2 border-dashed border-muted-foreground/30 animate-[spin_4s_linear_infinite]" />
        )}
    </div>
);

const ActivityItem = ({ icon, text, sub, time }: any) => (
    <div className="flex gap-4 group/item">
        <div className="mt-1 p-2 bg-muted/50 rounded-xl group-hover/item:bg-background transition-colors shadow-sm">{icon}</div>
        <div className="space-y-0.5">
            <p className="text-[12px] font-black leading-tight tracking-tight group-hover/item:text-primary transition-colors">{text}</p>
            {sub && <p className="text-[10px] text-muted-foreground/70 font-medium">{sub}</p>}
            <p className="text-[9px] text-muted-foreground/50 font-black flex items-center gap-1.5 tabular-nums">
                <Clock size={8} /> {time}
            </p>
        </div>
    </div>
);

export default AccountDashboard;