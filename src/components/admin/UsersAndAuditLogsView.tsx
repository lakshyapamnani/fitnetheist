import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AdminRole } from '../../types/admin';
import { 
  ShieldCheck, 
  History, 
  UserCheck, 
  UserX, 
  Search, 
  Clock, 
  Key, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const UsersAndAuditLogsView: React.FC = () => {
  const { auditLogs, currentRole, logAuditAction } = useAdmin();
  const [activeTab, setActiveTab] = useState<'TEAM' | 'AUDIT_LOGS'>('TEAM');
  const [searchLog, setSearchLog] = useState('');

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 'usr_01',
      name: 'Alex Mercer',
      email: 'alex.mercer@fitnetheist.com',
      role: 'SUPER_ADMIN' as AdminRole,
      status: 'ACTIVE',
      lastLogin: '10 minutes ago'
    },
    {
      id: 'usr_02',
      name: 'Vikram Mehta',
      email: 'vikram.mehta@fitnetheist.com',
      role: 'SALES_LEAD_MANAGER' as AdminRole,
      status: 'ACTIVE',
      lastLogin: '1 hour ago'
    },
    {
      id: 'usr_03',
      name: 'Ananya Roy',
      email: 'ananya.roy@fitnetheist.com',
      role: 'COACH' as AdminRole,
      status: 'ACTIVE',
      lastLogin: '3 hours ago'
    },
    {
      id: 'usr_04',
      name: 'Rohan Deshmukh',
      email: 'rohan.deshmukh@fitnetheist.com',
      role: 'CONTENT_MANAGER' as AdminRole,
      status: 'ACTIVE',
      lastLogin: 'Yesterday'
    }
  ]);

  const filteredLogs = auditLogs.filter(log =>
    log.action.toLowerCase().includes(searchLog.toLowerCase()) ||
    log.actor.toLowerCase().includes(searchLog.toLowerCase()) ||
    log.targetResource.toLowerCase().includes(searchLog.toLowerCase())
  );

  return (
    <div id="users-audit-logs-admin" className="space-y-6 font-mono-num text-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#d8ff38]"></span>
            <span className="text-xs font-mono-num font-bold uppercase tracking-[0.25em] text-[#d8ff38]">
              SECURITY & SYSTEM GOVERNANCE
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
            STAFF ROLES & AUDIT TRAILS
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono-num mt-1">
            Role-Based Access Control (RBAC), team permissions, and immutable system audit log records.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-zinc-900 border border-white/10 p-1">
          <button
            onClick={() => setActiveTab('TEAM')}
            className={`px-3.5 py-1.5 uppercase font-bold text-[10px] ${
              activeTab === 'TEAM' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            STAFF DIRECTORY ({teamMembers.length})
          </button>
          <button
            onClick={() => setActiveTab('AUDIT_LOGS')}
            className={`px-3.5 py-1.5 uppercase font-bold text-[10px] ${
              activeTab === 'AUDIT_LOGS' ? 'bg-[#d8ff38] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            AUDIT TRAIL ({auditLogs.length})
          </button>
        </div>
      </div>

      {activeTab === 'TEAM' ? (
        /* Staff Directory Table */
        <div className="bg-zinc-950 border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                  <th className="p-3.5">TEAM MEMBER</th>
                  <th className="p-3.5">EMAIL</th>
                  <th className="p-3.5">SYSTEM ROLE</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5">LAST ACTIVE</th>
                  <th className="p-3.5 text-right">PERMISSIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {teamMembers.map(member => (
                  <tr key={member.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="p-3.5 font-bold text-white">
                      {member.name}
                    </td>

                    <td className="p-3.5 text-zinc-400">
                      {member.email}
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-[#d8ff38] font-bold text-[10px] uppercase">
                        {member.role.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-emerald-400 font-bold uppercase text-[10px]">
                        ● {member.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-zinc-400 text-[11px]">
                      {member.lastLogin}
                    </td>

                    <td className="p-3.5 text-right text-zinc-500 text-[10px] uppercase">
                      {member.role === 'SUPER_ADMIN' ? 'ALL PRIVILEGES' : 'RESTRICTED SCOPE'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Audit Logs */
        <div className="space-y-4">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchLog}
              onChange={(e) => setSearchLog(e.target.value)}
              placeholder="Search audit trail by actor, action, or target resource..."
              className="w-full bg-zinc-950 border border-white/10 pl-9 pr-4 py-2 text-white placeholder-zinc-500"
            />
          </div>

          <div className="bg-zinc-950 border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/80 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                    <th className="p-3.5">TIMESTAMP</th>
                    <th className="p-3.5">ACTOR</th>
                    <th className="p-3.5">ROLE</th>
                    <th className="p-3.5">ACTION</th>
                    <th className="p-3.5">TARGET RESOURCE</th>
                    <th className="p-3.5">VALUES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="p-3.5 text-zinc-500 text-[11px] whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'medium' })}
                      </td>

                      <td className="p-3.5 font-bold text-white">
                        {log.actor}
                      </td>

                      <td className="p-3.5">
                        <span className="text-[10px] text-zinc-400 uppercase">
                          {log.actorRole}
                        </span>
                      </td>

                      <td className="p-3.5 font-bold text-[#d8ff38]">
                        {log.action.replace(/_/g, ' ')}
                      </td>

                      <td className="p-3.5 text-white font-bold">
                        {log.targetResource}
                      </td>

                      <td className="p-3.5 text-zinc-400 text-[11px]">
                        {log.newValue ? `Set to: ${log.newValue}` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
