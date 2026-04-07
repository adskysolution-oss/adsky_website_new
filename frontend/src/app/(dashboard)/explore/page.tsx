'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, ChevronRight } from 'lucide-react';

export default function ExplorePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('http://localhost:5000/api/categories', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen pb-16">
      
      {/* Hero Search Section */}
      <div className="bg-white dark:bg-dark-surface pt-12 pb-24 px-4 sm:px-6 relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4"
          >
            Find part-time work that <span className="text-primary">fits you</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
          >
            Explore roles across logistics, remote work, operations and more. Thousands of gigs available daily across India.
          </motion.p>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="max-w-3xl mx-auto flex flex-col md:flex-row shadow-xl rounded-full overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-bg"
          >
            <div className="flex-1 flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
               <Search className="text-gray-400 mr-3" size={24} />
               <input 
                 type="text" 
                 placeholder="Search for roles (e.g. Delivery, Tester)" 
                 className="w-full bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
            <div className="flex-1 flex items-center px-6 py-4">
               <MapPin className="text-gray-400 mr-3" size={24} />
               <input 
                 type="text" 
                 placeholder="Select Location" 
                 className="w-full bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
               />
            </div>
            <button className="bg-primary hover:bg-primary-hover text-white font-bold px-10 py-4 transition-colors">
               Search Jobs
            </button>
          </motion.div>
        </div>
        
        {/* Background Visuals */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none" />
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
               <div key={i} className="h-64 bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse"></div>
            ))}
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat, idx) => (
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 key={cat._id}
               >
                 <Link 
                   href={`/office?category=${cat.title}`}
                   className="group block bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                 >
                    {/* Top Accent Strip */}
                    <div className="h-2 w-full bg-transparent group-hover:bg-primary transition-colors"></div>
                    
                    <div className="p-8">
                       <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/10 text-primary flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                         {cat.iconUrl}
                       </div>
                       
                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{cat.title}</h3>
                       <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed">
                         {cat.description}
                       </p>
                       
                       <div className="flex items-center text-primary font-bold text-sm border-t border-gray-100 dark:border-gray-800 pt-6">
                         Explore Opportunities <ChevronRight className="ml-auto w-5 h-5 group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                 </Link>
               </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-gray-800">
            <Briefcase size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No categories found</h3>
            <p className="text-gray-500">We couldn't find anything matching "{searchQuery}"</p>
            <button onClick={() => setSearchQuery('')} className="mt-4 text-primary font-bold hover:underline">Clear Search</button>
          </div>
        )}
      </div>
      
      {/* Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
         <div className="bg-[#0b1120] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative shadow-2xl">
            <div className="relative z-10 max-w-2xl">
               <h3 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h3>
               <p className="text-gray-400 text-lg mb-0">Join our talent pool. We'll notify you as soon as a relevant gig opens up near you.</p>
            </div>
            <div className="relative z-10 mt-8 md:mt-0 flex-shrink-0">
               <Link href="/onboarding" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold transition-colors inline-block shadow-lg">
                 Join Talent Pool
               </Link>
            </div>
            
            {/* Visual Flair */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full filter blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
         </div>
      </div>
    </div>
  );
}
