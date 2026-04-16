'use client';
import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { Search, IndianRupee, RefreshCcw, DownloadCloud, CheckCircle, Clock } from 'lucide-react';
import { Payment } from '@/types/payment';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  

  const fetchPayments = async () => {
    try {
      const res = await apiClient.get('/admin/payments');
      setPayments(res.data);
    } catch (err :unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (id: string, newStatus: string) => {
    try {
      await apiClient.patch(`/admin/payments/${id}/status`, { status: newStatus });
      setPayments(payments.map(p => p._id === id ? { ...p, status: newStatus } : p));
    } catch (err:unknown) {
      console.error("Failed to update status");
    }
  };

  const query = search.toLowerCase();

const filteredPayments = payments.filter((p) => {
  const transactionId = p.transactionId?.toLowerCase() ?? '';
  const userName = p.user?.name?.toLowerCase() ?? '';

  return transactionId.includes(query) || userName.includes(query);
});

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transaction Logs</h1>
          <p className="text-gray-500 text-sm mt-1">Audit payouts, clear escrows, and manage commissions securely.</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-2 font-bold rounded-lg flex items-center shadow-sm">
           <DownloadCloud size={18} className="mr-2 text-gray-500" />
           Export CSV
        </button>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        
        {/* Filters */}
        <div className="flex mb-6">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                 type="text" 
                 placeholder="Search by Transaction ID or User..." 
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
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                 <tr>
                   <td colSpan={6} className="py-10 text-center">Loading transactions...</td>
                 </tr>
              ) : filteredPayments.length === 0 ? (
                 <tr>
                   <td colSpan={6} className="py-10 text-center flex flex-col items-center">
                       <IndianRupee size={32} className="text-gray-300 mb-2 mt-4" />
                       <p>No transaction history found.</p>
                   </td>
                 </tr>
              ) : (
                filteredPayments.map(payment => (
                  <tr key={payment._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                       {payment.transactionId || payment._id.toString().slice(-10).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                       <span className="font-bold text-gray-900 dark:text-white">{payment.user?.name || 'Unknown'}</span>
                    </td>
                    <td className="px-6 py-4">
                       <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-semibold">
                          {payment.type}
                       </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                       ₹{payment.amount}
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded text-xs font-bold flex items-center w-max ${
                           payment.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                           payment.status === 'Failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                       }`}>
                          {payment.status === 'Pending' ? <Clock size={12} className="mr-1"/> : <CheckCircle size={12} className="mr-1"/>}
                          {payment.status}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       {payment.status === 'Pending' && (
                           <div className="flex items-center justify-end space-x-2">
                               <button 
                                 onClick={() => updatePaymentStatus(payment._id, 'Completed')}
                                 className="text-white hover:bg-green-600 bg-green-500 px-3 py-1 font-bold text-xs rounded transition-colors"
                               >
                                 Clear
                               </button>
                               <button 
                                 onClick={() => updatePaymentStatus(payment._id, 'Failed')}
                                 className="text-white hover:bg-red-600 bg-red-500 px-3 py-1 font-bold text-xs rounded transition-colors"
                               >
                                 Fail
                               </button>
                           </div>
                       )}
                       {payment.status === 'Completed' && (
                           <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                              <RefreshCcw size={16} /> {/* Refund trigger icon placeholder */}
                           </button>
                       )}
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
