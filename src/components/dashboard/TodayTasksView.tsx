import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Deal } from '@/data/dummyData';
import { Calendar, Search, CheckCircle2, Clock, MapPin, Phone, Car, X, Target, Briefcase } from 'lucide-react';
import MetricsCard from './MetricsCard';

const TodayTasksView: React.FC = () => {
  const { deals, currentUserId, updateDeal } = useDashboard();
  const [filterQuery, setFilterQuery] = useState('');
  const [rescheduleDeal, setRescheduleDeal] = useState<Deal | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTask, setNewTask] = useState('');

  // 1. Get leads for the current Sales Executive
  const myDeals = deals.filter((d) => d.salespersonId === currentUserId);

  // 2. Compute "Today Tasks" based on nextFollowUpDate or just Active status if no date is set
  const today = new Date().toISOString().split('T')[0];

  const todayTasks = myDeals.filter((d) => {
    if (d.status !== 'active') return false;
    if (filterQuery && !d.customerName.toLowerCase().includes(filterQuery.toLowerCase()) && !d.carModel.toLowerCase().includes(filterQuery.toLowerCase())) return false;
    if (!d.nextFollowUpDate) return true;
    return d.nextFollowUpDate <= today;
  });

  const completedToday = myDeals.filter(d => d.updatedAt === today && d.status === 'completed').length;
  const overdueTasks = todayTasks.filter(d => d.nextFollowUpDate && d.nextFollowUpDate < today).length;
  const conversions = myDeals.filter(d => d.status === 'completed').length;

  const markTaskDone = (dealId: string) => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    updateDeal(dealId, { nextFollowUpDate: nextWeek.toISOString().split('T')[0], nextFollowUpTask: 'Follow up after completion.' });
  };

  const handleReschedule = () => {
    if (rescheduleDeal && newDate) {
      updateDeal(rescheduleDeal.id, { 
        nextFollowUpDate: newDate, 
        nextFollowUpTask: newTask || rescheduleDeal.nextFollowUpTask 
      });
      setRescheduleDeal(null);
      setNewDate('');
      setNewTask('');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricsCard title="Pending Tasks" value={todayTasks.length.toString()} icon={<Calendar className="w-5 h-5"/>} color="#f59e0b" />
        <MetricsCard title="Overdue Leads" value={overdueTasks.toString()} icon={<Clock className="w-5 h-5"/>} color="#ef4444" />
        <MetricsCard title="Completed Today" value={completedToday.toString()} icon={<CheckCircle2 className="w-5 h-5"/>} color="#10b981" />
        <MetricsCard title="Total Converts" value={conversions.toString()} icon={<Target className="w-5 h-5"/>} color="#3b82f6" />
      </div>

      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Today's Action Plan</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text" placeholder="Search tasks..."
            className="w-full md:w-64 pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {todayTasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">All caught up! No pending tasks for today.</p>
          </div>
        ) : (
          todayTasks.map((deal) => (
            <div key={deal.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
              
              {/* Left Side: Summary info */}
              <div className="flex-1 flex flex-col md:flex-row gap-6 md:items-center">
                <div className="w-1.5 h-16 bg-rose-500 rounded-full hidden md:block" />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">{deal.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-rose-50 text-rose-600 border border-rose-100 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Due Today
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">{deal.customerName}</h4>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 font-medium">
                     <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> +91-XXXXXXXXXX</span>
                     <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Showroom Visit</span>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{deal.carModel} {deal.carVariant}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="font-bold text-gray-700">Agenda:</span> {deal.nextFollowUpTask || "Call customer to push for final booking confirmation and finance documents."}
                  </p>
                  
                  {/* Step-wise Status */}
                  <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                      {['General', 'Account', 'Finance', 'Delivery'].map((step, idx) => {
                          const isDone = deal.stageProgress?.[step as any]?.completed || deal.departmentStatus?.[step as any] === 'Completed' || (step === 'Delivery' && deal.status === 'completed');
                          return (
                              <div key={idx} className="flex items-center gap-1.5 flex-shrink-0">
                                  <div className={`w-3 h-3 rounded-full flex items-center justify-center ${isDone ? 'bg-emerald-500 ring-2 ring-emerald-100' : 'bg-gray-200'}`}>
                                      {isDone && <CheckCircle2 className="w-2 h-2 text-white" />}
                                  </div>
                                  <span className={`text-[9px] uppercase font-bold tracking-widest ${isDone ? 'text-emerald-700' : 'text-gray-400'}`}>{step}</span>
                                  {idx < 3 && <div className="w-3 h-px bg-gray-200 ml-1" />}
                              </div>
                          )
                      })}
                  </div>
                </div>
              </div>

              {/* Right Side: Actions */}
              <div className="flex flex-col justify-center gap-2 md:border-l md:border-gray-100 md:pl-6 min-w-[200px]">
                <button 
                  onClick={() => markTaskDone(deal.id)}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors border border-emerald-200"
                >
                  <CheckCircle2 className="w-4 h-4" /> Resolve Task
                </button>
                <button 
                  className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl text-sm font-bold transition-colors border border-gray-200"
                  onClick={() => {
                    setRescheduleDeal(deal);
                    setNewDate(deal.nextFollowUpDate || '');
                    setNewTask(deal.nextFollowUpTask || '');
                  }}
                >
                  <Calendar className="w-4 h-4" /> Reschedule Date
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Reschedule Modal */}
      {rescheduleDeal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Reschedule Follow-up</h3>
              <button onClick={() => setRescheduleDeal(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">New Date</label>
                <input 
                  type="date" 
                  value={newDate} 
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Next Task/Agenda</label>
                <textarea 
                  rows={3} 
                  value={newTask} 
                  onChange={(e) => setNewTask(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="E.g., Call customer to discuss finance options..."
                />
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={handleReschedule}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all"
              >
                <Clock className="w-5 h-5" /> Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TodayTasksView;
