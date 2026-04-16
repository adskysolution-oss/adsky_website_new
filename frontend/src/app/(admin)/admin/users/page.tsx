'use client';

import { useState, useEffect, useCallback } from 'react';
import { adminService, type AdminUser, type AccountStatus, type UserRole } from '@/services/admin.service';
import { extractErrorMessage } from '@/lib/api';
import { Search, UserX, UserCheck } from 'lucide-react';

type RoleFilter = 'All' | UserRole;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('All');

  const fetchUsers = useCallback(async () => {
    try {
      const data = await adminService.getAllUsers(
        roleFilter !== 'All' ? { role: roleFilter } : {},
      );
      setUsers(data);
    } catch (error: unknown) {
      console.error(extractErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [roleFilter]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const toggleUserStatus = async (id: string, currentStatus: AccountStatus) => {
    try {
      const newStatus: AccountStatus =
        currentStatus === 'Active' ? 'Blocked' : 'Active';

      await adminService.updateUserStatus(id, newStatus);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, accountStatus: newStatus } : user,
        ),
      );
    } catch (error: unknown) {
      console.error(extractErrorMessage(error));
    }
  };

  const query = search.toLowerCase();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query),
  );

  return (
    <div className="space-y-6">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Control access, view roles, and manage all platform users.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#111827] sm:p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-[#080d1a]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-[#080d1a]"
            >
              <option value="All">All Roles</option>
              <option value="Worker">Worker</option>
              <option value="Client">Client</option>
              <option value="Gig Vendor">Gig Vendor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-300">
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
                  <td colSpan={5} className="py-10 text-center">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const accountStatus: AccountStatus = user.accountStatus ?? 'Active';

                  return (
                    <tr
                      key={user._id}
                      className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/30"
                    >
                      <td className="flex items-center px-6 py-4 font-medium text-gray-900 dark:text-white">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        {user.name}
                      </td>

                      <td className="px-6 py-4">
                        <div>{user.email}</div>
                        <div className="text-xs text-gray-400">
                          {user.phone || 'No phone'}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold dark:bg-gray-800">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`flex w-max items-center rounded px-2 py-1 text-xs font-bold ${
                            accountStatus === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {accountStatus === 'Active' ? (
                            <UserCheck size={14} className="mr-1" />
                          ) : (
                            <UserX size={14} className="mr-1" />
                          )}
                          {accountStatus}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => toggleUserStatus(user._id, accountStatus)}
                          className="text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-white"
                        >
                          {accountStatus === 'Active' ? (
                            <span className="rounded border border-red-200 px-2 py-1 text-xs font-semibold text-red-500 hover:text-red-700">
                              Block
                            </span>
                          ) : (
                            <span className="rounded border border-green-200 px-2 py-1 text-xs font-semibold text-green-500 hover:text-green-700">
                              Unblock
                            </span>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
