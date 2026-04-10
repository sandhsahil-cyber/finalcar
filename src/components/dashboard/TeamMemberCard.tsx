import React from 'react';
import { SalesPerson, formatCurrency, deals as allDeals } from '@/data/dummyData';
import { Phone, Mail, Star, TrendingUp, Target } from 'lucide-react';

interface TeamMemberCardProps {
  member: SalesPerson;
  rank?: number;
  onClick?: () => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, rank, onClick }) => {
  const progressPercent = Math.min(100, Math.round((member.achieved / member.monthlyTarget) * 100));
  const memberDeals = allDeals.filter(d => d.salespersonId === member.id);
  const activeDeals = memberDeals.filter(d => d.status === 'active').length;

  const getRankBadge = (r: number) => {
    if (r === 1) return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white';
    if (r === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
    if (r === 3) return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {member.avatar}
            </div>
            {rank && (
              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${getRankBadge(rank)}`}>
                {rank}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900 truncate">{member.name}</h4>
            <p className="text-xs text-gray-500">{activeDeals} active deals</p>
          </div>
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-gray-700">{member.rating}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Monthly Target</span>
            <span className="text-xs font-semibold text-gray-700">{progressPercent}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                progressPercent >= 80 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' :
                progressPercent >= 50 ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
                'bg-gradient-to-r from-red-400 to-red-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-gray-400">{formatCurrency(member.achieved)}</span>
            <span className="text-[10px] text-gray-400">{formatCurrency(member.monthlyTarget)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <p className="text-xs font-bold text-blue-700">{member.dealsCount}</p>
            <p className="text-[10px] text-blue-500">Deals</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-2 text-center">
            <p className="text-xs font-bold text-emerald-700">{member.conversionRate}%</p>
            <p className="text-[10px] text-emerald-500">Conv.</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-2 text-center">
            <p className="text-xs font-bold text-purple-700">{formatCurrency(member.achieved)}</p>
            <p className="text-[10px] text-purple-500">Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
