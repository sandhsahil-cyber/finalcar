import React from 'react';
import { Team, formatCurrency, salespeople, deals as allDeals } from '@/data/dummyData';
import { Users, TrendingUp, Target, ChevronRight } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  onClick?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onClick }) => {
  const progressPercent = Math.min(100, Math.round((team.achieved / team.monthlyTarget) * 100));
  const teamMembers = salespeople.filter(sp => sp.teamId === team.id);
  const teamDeals = allDeals.filter(d => d.teamId === team.id);
  const activeDeals = teamDeals.filter(d => d.status === 'active').length;
  const completedDeals = teamDeals.filter(d => d.status === 'completed').length;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      {/* Color bar */}
      <div className="h-1.5" style={{ backgroundColor: team.color }} />
      
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">{team.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white text-[10px] font-bold">
                {team.leaderAvatar}
              </div>
              <span className="text-xs text-gray-500">Led by {team.leaderName}</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-500">Target Achievement</span>
            <span className="text-sm font-bold" style={{ color: team.color }}>{progressPercent}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%`, backgroundColor: team.color }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-gray-400">Achieved: {completedDeals}</span>
            <span className="text-[10px] text-gray-400">Goal: {Math.round(team.monthlyTarget / 80000)} Units</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <Users className="w-4 h-4 mx-auto text-gray-400 mb-1" />
            <p className="text-sm font-bold text-gray-900">{team.memberCount}</p>
            <p className="text-[10px] text-gray-500">Members</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <TrendingUp className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
            <p className="text-sm font-bold text-gray-900">{activeDeals}</p>
            <p className="text-[10px] text-gray-500">Active</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <Target className="w-4 h-4 mx-auto text-blue-500 mb-1" />
            <p className="text-sm font-bold text-gray-900">{completedDeals}</p>
            <p className="text-[10px] text-gray-500">Closed</p>
          </div>
        </div>

        {/* Member Avatars */}
        <div className="mt-4 flex items-center">
          <div className="flex -space-x-2">
            {teamMembers.slice(0, 4).map(m => (
              <div
                key={m.id}
                className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
                style={{ backgroundColor: team.color }}
                title={m.name}
              >
                {m.avatar}
              </div>
            ))}
            {teamMembers.length > 4 && (
              <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-600">
                +{teamMembers.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
