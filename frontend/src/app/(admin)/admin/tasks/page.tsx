'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, CheckSquare, FileText, CheckCircle, XCircle } from 'lucide-react';

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/admin/tasks/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.map(t => t._id === id ? { ...t, status: newStatus } : t));
    } catch (err) {
      console.error("Failed to update task status");
    }
  };

  const filteredTasks = tasks.filter(t => t.description?.toLowerCase().includes(search.toLowerCase()) || t.job?.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Execution Monitoring</h1>
          <p className="text-gray-500 text-sm mt-1">Review submissions and authorize task payouts.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        
        {/* Filters */}
        <div className="flex mb-6">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                 type="text" 
                 placeholder="Search task descriptions..." 
                 className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#080d1a] rounded-lg focus:ring-2 focus:ring-primary outline-none"
                 value={search}
                 onChange={e => setSearch(e.target.value)}
              />
           </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4">Task Context</th>
                <th className="px-6 py-4">Worker</th>
                <th className="px-6 py-4">Status & Evidence</th>
                <th className="px-6 py-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                 <tr>
                   <td colSpan={4} className="py-10 text-center">Loading tasks data...</td>
                 </tr>
              ) : filteredTasks.length === 0 ? (
                 <tr>
                   <td colSpan={4} className="py-10 text-center flex flex-col items-center">
                       <CheckSquare size={32} className="text-gray-300 mb-2 mt-4" />
                       <p>No task executions found in the database.</p>
                   </td>
                 </tr>
              ) : (
                filteredTasks.map(task => (
                  <tr key={task._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                       <div className="font-bold text-gray-900 dark:text-white">
                          {task.job?.title || 'Unknown Job'}
                       </div>
                       <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">{task.description}</div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="font-semibold text-gray-800 dark:text-gray-200">{task.worker?.name || 'Unassigned'}</div>
                       <div className="text-xs">{task.worker?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="mb-2">
                           <span className={`px-2 py-1 rounded text-xs font-bold ${
                               task.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                               task.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                               task.status === 'Submitted' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                           }`}>
                              {task.status}
                           </span>
                       </div>
                       {task.attachments && task.attachments.length > 0 && (
                          <div className="flex items-center text-primary text-xs font-medium cursor-pointer hover:underline">
                             <FileText size={14} className="mr-1" /> View {task.attachments.length} attachments
                          </div>
                       )}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end space-x-2">
                           <button 
                             onClick={() => updateTaskStatus(task._id, 'Approved')}
                             disabled={task.status === 'Approved'}
                             className="text-green-600 hover:bg-green-50 p-2 rounded disabled:opacity-30 disabled:cursor-not-allowed" title="Approve Execution"
                           >
                             <CheckCircle size={18} />
                           </button>
                           <button 
                             onClick={() => updateTaskStatus(task._id, 'Rejected')}
                             disabled={task.status === 'Rejected'}
                             className="text-red-500 hover:bg-red-50 p-2 rounded disabled:opacity-30 disabled:cursor-not-allowed" title="Reject Execution"
                           >
                             <XCircle size={18} />
                           </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
