import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { teams, salespeople, activities, formatCurrency, DEAL_STAGES, STAGE_COLORS } from '@/data/dummyData';
import MetricsCard from './MetricsCard';
import DealCard from './DealCard';
import TeamMemberCard from './TeamMemberCard';
import { PipelineSummary } from './PipelineTracker';
import ActivityTimeline from './ActivityTimeline';
import { Users, IndianRupee, Target, TrendingUp, Car, Plus, Award, ArrowUpRight } from 'lucide-react';

const TeamLeaderDashboard: React.FC = () => {
  const { searchQuery, stageFilter, setStageFilter, setShowNewDealForm, deals } = useDashboard();
  const [viewMode, setViewMode] = useState<'deals' | 'team'>('deals');

  // Current Team Leader: Rajesh Kumar (Alpha Squad)
  const team = teams.find(t => t.id === 'team-1')!;
  const teamMembers = salespeople.filter(sp => sp.teamId === 'team-1');
  const teamDeals = deals.filter(d => d.teamId === 'team-1');
  const progressPercent = Math.round((team.achieved / team.monthlyTarget) * 100);

  // Sort members by achieved revenue for leaderboard
  const sortedMembers = [...teamMembers].sort((a, b) => b.achieved - a.achieved);

  const filteredDeals = teamDeals.filter(deal => {
    const matchesSearch = !searchQuery ||
      deal.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'All' || deal.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const pendingApprovals = teamDeals.filter(d => d.status === 'pending' || d.status === 'blocked');
  const teamActivities = activities.filter(a => 
    teamMembers.some(m => m.name === a.user) || a.user === 'Rajesh Kumar'
  ).slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Team Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full -mb-24" />
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                  RK
                </div>
                <div>
                  <h2 className="text-xl font-bold">{team.name}</h2>
                  <p className="text-purple-200 text-sm">Led by {team.leaderName} • {team.memberCount} Members</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-purple-200 text-xs">Team Target</p>
                <p className="text-2xl font-bold">{formatCurrency(team.monthlyTarget)}</p>
              </div>
              <div>
                <p className="text-purple-200 text-xs">Achieved</p>
                <p className="text-2xl font-bold">{formatCurrency(team.achieved)}</p>
              </div>
              <div>
                <p className="text-purple-200 text-xs">Progress</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <span className="text-sm font-bold">{progressPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Team Members"
          value={String(team.memberCount)}
          subtitle="Active executives"
          icon={<Users className="w-5 h-5" />}
          color="#8b5cf6"
        />
        <MetricsCard
          title="Total Revenue"
          value={formatCurrency(team.achieved)}
          subtitle="This month"
          trend={15}
          icon={<IndianRupee className="w-5 h-5" />}
          color="#10b981"
        />
        <MetricsCard
          title="Active Deals"
          value={String(teamDeals.filter(d => d.status === 'active').length)}
          subtitle="In pipeline"
          trend={8}
          icon={<Car className="w-5 h-5" />}
          color="#3b82f6"
        />
        <MetricsCard
          title="Pending Actions"
          value={String(pendingApprovals.length)}
          subtitle="Needs attention"
          icon={<Target className="w-5 h-5" />}
          color="#f59e0b"
          onClick={() => setStageFilter('All')}
        />
      </div>

      {/* Pending Approvals */}
      {pendingApprovals.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-amber-800 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Pending Approvals & Blocked Deals
          </h3>
          <div className="space-y-2">
            {pendingApprovals.map(deal => (
              <DealCard key={deal.id} deal={deal} compact />
            ))}
          </div>
        </div>
      )}

      {/* View Toggle */}
      <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1 w-fit">
        <button
          onClick={() => setViewMode('deals')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            viewMode === 'deals' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Car className="w-4 h-4 inline mr-1.5" />
          Deals
        </button>
        <button
          onClick={() => setViewMode('team')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            viewMode === 'team' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Users className="w-4 h-4 inline mr-1.5" />
          Team Performance
        </button>
      </div>

      {viewMode === 'deals' ? (
        <>
          {/* Pipeline */}
          <PipelineSummary deals={teamDeals} onStageClick={(stage) => setStageFilter(stage)} />

          {/* Deals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Team Deals ({filteredDeals.length})</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
                  <button
                    onClick={() => setStageFilter('All')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      stageFilter === 'All' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    All
                  </button>
                  {DEAL_STAGES.map(stage => (
                    <button
                      key={stage}
                      onClick={() => setStageFilter(stage)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all hidden lg:block ${
                        stageFilter === stage ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowNewDealForm(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Deal</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDeals.map(deal => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Team Leaderboard */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Team Leaderboard</h3>
            <p className="text-sm text-gray-500 mb-4">Performance ranking for April 2026</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {sortedMembers.map((member, i) => (
                <TeamMemberCard key={member.id} member={member} rank={i + 1} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Activity */}
      <ActivityTimeline activities={teamActivities.length > 0 ? teamActivities : activities.slice(0, 6)} />
    </div>
  );
};

export default TeamLeaderDashboard;
