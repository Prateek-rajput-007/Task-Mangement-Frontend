// client/components/TaskStats.jsx
'use client'

import { useTasks } from '../contexts/TaskContext';
import { useEffect } from 'react';

export default function TaskStats() {
  const { stats, fetchTaskStats } = useTasks();

  useEffect(() => {
    fetchTaskStats();
  }, []);

  if (!stats) return null;

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
            </svg>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-400 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-100">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <StatCard
        title="Total Tasks"
        value={stats.total}
        icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        color="bg-blue-600"
      />
      <StatCard
        title="Completed"
        value={stats.completed}
        icon="M5 13l4 4L19 7"
        color="bg-green-600"
      />
      <StatCard
        title="Overdue"
        value={stats.overdue}
        icon="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        color="bg-red-600"
      />
    </div>
  );
}