import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">IT <span className="gradient-text">Services</span> Marketplace</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">Hire elite agencies and freelancers for your complex projects.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card Placeholder */}
           {[1, 2, 3, 4, 5, 6].map((item) => (
             <div key={item} className="rounded-2xl glass-panel border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col group hover:shadow-xl transition-all">
               <div className="h-48 bg-gray-200 dark:bg-gray-800 w-full relative">
                 {/* Image Placeholder */}
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400">Portfolio Image</div>
               </div>
               <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">Full-Stack Web App Development using React & Node.js</h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">I will build a high-performance web application tailored to your business needs using the MERN stack.</p>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                     <span className="font-bold">From ₹25,000</span>
                     <span className="text-orange-500 text-sm font-semibold flex items-center">⭐ 4.9 (120)</span>
                  </div>
               </div>
             </div>
           ))}
      </div>
    </div>
  );
}
