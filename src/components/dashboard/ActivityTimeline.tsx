import React from 'react';
import { Activity } from '@/data/dummyData';
import { Plus, ArrowRight, CheckCircle2, AlertCircle, FileText, Shield } from 'lucide-react';

const activityIcons = {
  deal_created: { icon: Plus, color: '#3b82f6', bg: '#eff6ff' },
  stage_moved: { icon: ArrowRight, color: '#8b5cf6', bg: '#f5f3ff' },
  deal_completed: { icon: CheckCircle2, color: '#10b981', bg: '#ecfdf5' },
  deal_blocked: { icon: AlertCircle, color: '#ef4444', bg: '#fef2f2' },
  note_added: { icon: FileText, color: '#f59e0b', bg: '#fffbeb' },
  approval_requested: { icon: Shield, color: '#ff6b35', bg: '#fff7ed' },
};

interface ActivityTimelineProps {
  activities: Activity[];
  maxItems?: number;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities, maxItems = 8 }) => {
  const displayActivities = activities.slice(0, maxItems);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date('2026-04-10T16:08:00');
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-1">
        {displayActivities.map((activity, i) => {
          const config = activityIcons[activity.type];
          const Icon = config.icon;

          return (
            <div key={activity.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 mt-0.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: config.bg }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                  </div>
                  {i < displayActivities.length - 1 && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gray-100" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 leading-snug">{activity.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{activity.user}</span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-400">{formatTime(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTimeline;
