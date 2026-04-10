import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { teams, salespeople, formatCurrency, deals as allDeals } from '@/data/dummyData';
import TeamCard from './TeamCard';
import TeamMemberCard from './TeamMemberCard';
import { Users, Award, TrendingUp, Target } from 'lucide-react';
import MetricsCard from './MetricsCard';

const TeamView: React.FC = () => {
  const { currentRole, deals } = useDashboard();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const displayTeams = currentRole === 'teamleader' ? teams.filter(t => t.id === 'team-1') : teams;
  const totalMembers = salespeople.length;
  const avgConversion = Math.round(salespeople.reduce((sum, sp) => sum + sp.conversionRate, 0) / salespeople.length);
  const topPerformer = [...salespeople].sort((a, b) => b.achieved - a.achieved)[0];

  const selectedTeamMembers = selectedTeam
    ? salespeople.filter(sp => sp.teamId === selectedTeam)
    : currentRole === 'teamleader'
    ? salespeople.filter(sp => sp.teamId === 'team-1')
    : salespeople;

  const sortedMembers = [...selectedTeamMembers].sort((a, b) => b.achieved - a.achieved);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
        <p className="text-sm text-gray-500">Monitor team performance and individual metrics</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Total Members"
          value={String(currentRole === 'teamleader' ? teams.find(t => t.id === 'team-1')?.memberCount || 0 : totalMembers)}
          icon={<Users className="w-5 h-5" />}
          color="#3b82f6"
        />
        <MetricsCard
          title="Avg. Conversion"
          value={`${avgConversion}%`}
          trend={3}
          icon={<TrendingUp className="w-5 h-5" />}
          color="#10b981"
        />
        <MetricsCard
          title="Top Performer"
          value={topPerformer.name.split(' ')[0]}
          subtitle={formatCurrency(topPerformer.achieved)}
          icon={<Award className="w-5 h-5" />}
          color="#f59e0b"
        />
        <MetricsCard
          title="Teams"
          value={String(displayTeams.length)}
          icon={<Target className="w-5 h-5" />}
          color="#8b5cf6"
        />
      </div>

      {/* Team Cards */}
      {currentRole === 'salesmanager' && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Teams</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {displayTeams.map(team => (
              <div
                key={team.id}
                className={`${selectedTeam === team.id ? 'ring-2 ring-orange-500 ring-offset-2' : ''} rounded-2xl`}
              >
                <TeamCard team={team} onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Members */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {selectedTeam ? `${teams.find(t => t.id === selectedTeam)?.name} Members` : 'All Members'}
        </h3>
        <p className="text-sm text-gray-500 mb-4">Ranked by revenue achievement</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {sortedMembers.map((sp, i) => (
            <TeamMemberCard key={sp.id} member={sp} rank={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamView;
