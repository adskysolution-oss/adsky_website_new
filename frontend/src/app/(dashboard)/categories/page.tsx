'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Explore Job Categories</h2>
         <p className="text-gray-500 dark:text-gray-400 text-lg">Browse through our vast network of enterprise gigs and field operation opportunities tailored for you.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
             <div key={i} className="h-40 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               key={cat._id}
             >
               <Link 
                 href={`/office?category=${cat.title}`}
                 className="group block bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-primary/10"></div>
                  
                  <div className="text-4xl mb-4 relative z-10">{cat.iconUrl}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 relative z-10 group-hover:text-primary transition-colors">{cat.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 relative z-10 line-clamp-2">{cat.description}</p>
                  
                  <div className="flex items-center text-primary font-bold text-sm mt-auto relative z-10">
                    Apply Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
               </Link>
             </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
