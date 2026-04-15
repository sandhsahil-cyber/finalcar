import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { teams, salespeople, formatCurrency, formatFullCurrency } from '@/data/dummyData';
import { Target, TrendingUp, Award, AlertTriangle, CheckCircle2 } from 'lucide-react';

const TargetsView: React.FC = () => {
  const { currentRole } = useDashboard();

  const displayTeams = currentRole === 'teamleader' ? teams.filter(t => t.id === 'team-1') : teams;
  const totalTarget = displayTeams.reduce((sum, t) => sum + t.monthlyTarget, 0);
  const totalAchieved = displayTeams.reduce((sum, t) => sum + t.achieved, 0);
  const overallProgress = Math.round((totalAchieved / totalTarget) * 100);

  const getStatusColor = (percent: number) => {
    if (percent >= 80) return { text: 'text-emerald-700', bg: 'bg-emerald-100', bar: 'from-emerald-400 to-emerald-500', icon: CheckCircle2 };
    if (percent >= 50) return { text: 'text-amber-700', bg: 'bg-amber-100', bar: 'from-amber-400 to-amber-500', icon: TrendingUp };
    return { text: 'text-red-700', bg: 'bg-red-100', bar: 'from-red-400 to-red-500', icon: AlertTriangle };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Monthly Sales Goals</h2>
        <p className="text-sm text-gray-500">April 2026 performance tracking</p>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-orange-100 text-sm">Total Progress</p>
            <p className="text-4xl font-bold mt-1">{overallProgress}%</p>
            <p className="text-orange-100 text-sm mt-1">
              {Math.round(totalAchieved / 80000)} of {Math.round(totalTarget / 80000)} Units Goal
            </p>
          </div>
          <div className="w-full md:w-64">
            <div className="h-4 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${overallProgress}%` }} />
            </div>
            <p className="text-orange-100 text-xs mt-2 text-right">
              {Math.round((totalTarget - totalAchieved) / 80000)} Left to reach Goal
            </p>
          </div>
        </div>
      </div>

      {/* Team Targets */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Team Progress Goals</h3>
        <div className="space-y-4">
          {displayTeams.map(team => {
            const percent = Math.round((team.achieved / team.monthlyTarget) * 100);
            const status = getStatusColor(percent);
            const StatusIcon = status.icon;
            return (
              <div key={team.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team.color }} />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{team.name}</h4>
                      <p className="text-xs text-gray-500">Led by {team.leaderName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${status.bg} ${status.text}`}>
                      <StatusIcon className="w-3 h-3" />
                      {percent}%
                    </span>
                  </div>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${status.bar} transition-all duration-700`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Achieved: {Math.round(team.achieved / 80000)} Units</span>
                  <span>Target: {Math.round(team.monthlyTarget / 80000)} Units</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Targets */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Person-wise Goals</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">Rank</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">Name</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4 hidden md:table-cell">Team</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">Target</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">Achieved</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 w-32">Progress</th>
              </tr>
            </thead>
            <tbody>
              {[...salespeople]
                .filter(sp => currentRole === 'teamleader' ? sp.teamId === 'team-1' : true)
                .sort((a, b) => (b.achieved / b.monthlyTarget) - (a.achieved / a.monthlyTarget))
                .map((sp, i) => {
                  const percent = Math.round((sp.achieved / sp.monthlyTarget) * 100);
                  const status = getStatusColor(percent);
                  const team = teams.find(t => t.id === sp.teamId);
                  return (
                    <tr key={sp.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          i === 0 ? 'bg-yellow-100 text-yellow-700' :
                          i === 1 ? 'bg-gray-100 text-gray-600' :
                          i === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-50 text-gray-500'
                        }`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                            {sp.avatar}
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{sp.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 hidden md:table-cell">
                        <span className="text-xs text-gray-500">{team?.name}</span>
                      </td>
                      <td className="py-3 pr-4 text-right text-sm text-gray-600 font-medium">Goal: {Math.round(sp.monthlyTarget / 80000)} Units</td>
                      <td className="py-3 pr-4 text-right text-sm font-black text-gray-900">{Math.round(sp.achieved / 80000)} Units</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${status.bar}`}
                              style={{ width: `${Math.min(100, percent)}%` }}
                            />
                          </div>
                          <span className={`text-xs font-semibold ${status.text}`}>{percent}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TargetsView;
