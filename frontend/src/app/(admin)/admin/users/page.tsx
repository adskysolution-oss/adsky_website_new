'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, UserCheck, UserX, MoreVertical, ShieldAlert } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/admin/users${roleFilter !== 'All' ? `?role=${roleFilter}` : ''}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (id: string, currentStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
      await axios.patch(`http://localhost:5000/api/admin/users/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.map(u => u._id === id ? { ...u, accountStatus: newStatus } : u));
    } catch (err) {
      console.error("Failed to toggle status");
    }
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Control access, view roles, and manage all platform users.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                 type="text" 
                 placeholder="Search by name or email..." 
                 className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#080d1a] rounded-lg focus:ring-2 focus:ring-primary outline-none"
                 value={search}
                 onChange={e => setSearch(e.target.value)}
              />
           </div>
           <div className="flex space-x-2">
              <select 
                value={roleFilter} 
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#080d1a] rounded-lg focus:ring-2 focus:ring-primary outline-none"
              >
                 <option value="All">All Roles</option>
                 <option value="Worker">Worker</option>
                 <option value="Client">Client</option>
                 <option value="Gig Vendor">Gig Vendor</option>
                 <option value="Admin">Admin</option>
              </select>
           </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                 <tr>
                   <td colSpan={5} className="py-10 text-center">Loading users...</td>
                 </tr>
              ) : filteredUsers.length === 0 ? (
                 <tr>
                   <td colSpan={5} className="py-10 text-center">No users found.</td>
                 </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center">
                       <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 font-bold">
                         {user.name.charAt(0).toUpperCase()}
                       </div>
                       {user.name}
                    </td>
                    <td className="px-6 py-4">
                       <div>{user.email}</div>
                       <div className="text-xs text-gray-400">{user.phone || 'No phone'}</div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-semibold">
                          {user.role}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded text-xs font-bold flex items-center w-max ${user.accountStatus === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {user.accountStatus === 'Active' ? <UserCheck size={14} className="mr-1"/> : <UserX size={14} className="mr-1"/>}
                          {user.accountStatus || 'Active'}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button 
                         onClick={() => toggleUserStatus(user._id, user.accountStatus || 'Active')}
                         className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                       >
                         {user.accountStatus === 'Active' ? (
                            <span className="text-red-500 hover:text-red-700 font-semibold text-xs border border-red-200 px-2 py-1 rounded">Block</span>
                         ) : (
                            <span className="text-green-500 hover:text-green-700 font-semibold text-xs border border-green-200 px-2 py-1 rounded">Unblock</span>
                         )}
                       </button>
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
