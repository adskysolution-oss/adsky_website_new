import Link from 'next/link';

export default function JobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Gigs & Jobs</h1>
        <div className="flex space-x-4">
            <input type="text" placeholder="Search jobs..." className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-primary outline-none" />
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium">Search</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden md:block col-span-1">
          <div className="p-6 rounded-2xl glass-panel border border-gray-100 dark:border-gray-800">
             <h3 className="font-bold text-lg mb-4">Filters</h3>
             {/* Filter Checkboxes Placeholder */}
             <div className="space-y-3">
               <div><input type="checkbox" className="mr-2"/> Gig Work</div>
               <div><input type="checkbox" className="mr-2"/> Full-time</div>
               <div><input type="checkbox" className="mr-2"/> Freelance</div>
             </div>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-3 space-y-4">
            {/* Job Card Placeholder */}
           {[1, 2, 3, 4, 5].map((item) => (
             <div key={item} className="p-6 rounded-2xl glass-panel border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors flex justify-between items-center">
               <div>
                  <h3 className="text-xl font-bold mb-1">Field Data Collection Task</h3>
                  <p className="text-gray-500 mb-2">Remote / Field Work</p>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold dark:bg-green-900 dark:text-green-200">₹500 / task</span>
               </div>
               <div>
                  <Link href={`/jobs/${item}`} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors font-medium">View Details</Link>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
