'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Settings, ShieldCheck, Mail, Building, Globe } from 'lucide-react';

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/vendors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = vendors.filter(v => 
    v.companyName?.toLowerCase().includes(search.toLowerCase()) || 
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendor & Services Control</h1>
          <p className="text-gray-500 text-sm mt-1">Manage IT and Gig verified vendors operating on your marketplace.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        
        {/* Filters */}
        <div className="flex mb-6">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                 type="text" 
                 placeholder="Search by company or vendor name..." 
                 className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#080d1a] rounded-lg focus:ring-2 focus:ring-primary outline-none"
                 value={search}
                 onChange={e => setSearch(e.target.value)}
              />
           </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
             [1,2,3].map(i => <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>)
          ) : filteredVendors.length === 0 ? (
             <div className="col-span-full py-16 text-center text-gray-500 flex items-center justify-center flex-col">
                <Building size={48} className="text-gray-300 mb-4" />
                No verified vendors currently assigned to the platform.
             </div>
          ) : (
            filteredVendors.map(vendor => (
               <div key={vendor._id} className="bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-md transition-shadow relative">
                 <div className="absolute top-4 right-4 text-primary bg-blue-50 dark:bg-blue-900/10 p-2 rounded-lg">
                    <ShieldCheck size={20} />
                 </div>
                 
                 <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white dark:bg-[#111827] rounded-xl shadow-sm flex items-center justify-center font-black text-xl text-gray-700 dark:text-gray-300 mr-4 border border-gray-100 dark:border-gray-700">
                       {vendor.companyName ? vendor.companyName.charAt(0).toUpperCase() : vendor.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{vendor.companyName || vendor.name}</h3>
                       <span className="text-xs font-semibold text-primary">{vendor.role}</span>
                    </div>
                 </div>
                 
                 <div className="space-y-2 mt-6">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                       <Mail size={16} className="mr-2" /> {vendor.email}
                    </div>
                    {vendor.portfolioUrl && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                           <Globe size={16} className="mr-2" /> <a href={vendor.portfolioUrl} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">Website Portfolio</a>
                        </div>
                    )}
                 </div>
                 
                 <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <button className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex items-center">
                       <Settings size={14} className="mr-1" /> Service Config
                    </button>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                       Verified
                    </span>
                 </div>
               </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
