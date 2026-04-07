'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Users, Briefcase, CheckSquare, Settings, BarChart2, 
  CreditCard, Menu, X, Bell, LogOut 
} from 'lucide-react';
import axios from 'axios';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Temporary backdoor to promote user to admin 
  const upgradeToAdmin = async () => {
      try {
          const token = localStorage.getItem('token');
          if (token) {
              await axios.post('http://localhost:5000/api/admin/make-me-admin', {}, {
                  headers: { Authorization: `Bearer ${token}` }
              });
              alert("You are now Admin! Please log out and log back in to refresh your token.");
              localStorage.removeItem('token');
              localStorage.removeItem('role');
              router.push('/login');
          }
      } catch(e) {
          console.error(e);
      }
  }

  // Sidebar mapping
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <BarChart2 size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Jobs', path: '/admin/jobs', icon: <Briefcase size={20} /> },
    { name: 'Tasks', path: '/admin/tasks', icon: <CheckSquare size={20} /> },
    { name: 'Vendors', path: '/admin/vendors', icon: <Settings size={20} /> },
    { name: 'Payments', path: '/admin/payments', icon: <CreditCard size={20} /> },
  ];

  if (!isAdmin) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-4 flex-col">
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Access Denied</h1>
              <p className="text-gray-500 mb-8 max-w-sm text-center">You need Admin privileges to view this area.</p>
              
              <button onClick={upgradeToAdmin} className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl mb-4">
                  Test Hack: Make Me Admin
              </button>
              
              <Link href="/" className="text-primary font-bold hover:underline">
                  Return to User App
              </Link>
          </div>
      )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#080d1a] overflow-hidden">
      
      {/* Sidebar */}
      <aside 
        className={`bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-gray-800 transition-all duration-300 flex flex-col
          ${sidebarOpen ? 'w-64' : 'w-20'} 
          hidden md:flex
        `}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
           {sidebarOpen ? (
               <div className="text-2xl font-black text-gray-900 dark:text-white">
                  <span className="text-red-500 mr-1">Admin</span>Panel
               </div>
           ) : (
               <div className="text-2xl font-black text-red-500">A</div>
           )}
        </div>

        <div className="flex-1 py-6 overflow-y-auto space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            // Exact match for dashboard
            const isStrictActive = item.name === 'Dashboard' ? pathname === item.path : isActive;
            
            return (
              <Link key={item.name} href={item.path}
                className={`
                  flex items-center px-3 py-3 rounded-lg transition-colors
                  ${isStrictActive ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-500 font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}
                  ${!sidebarOpen && 'justify-center'}
                `}
              >
                <div className={`${isStrictActive ? 'text-red-500' : 'text-gray-400'} ${!sidebarOpen ? '' : 'mr-3'}`}>
                  {item.icon}
                </div>
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link href="/office" className={`flex items-center px-3 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${!sidebarOpen && 'justify-center'}`}>
            <LogOut size={20} className={`${sidebarOpen && 'mr-3'}`} />
            {sidebarOpen && <span>Exit Admin</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Space */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 z-10 shadow-sm">
           <div className="flex items-center">
             <button 
               onClick={() => setSidebarOpen(!sidebarOpen)}
               className="text-gray-500 hover:text-gray-900 dark:hover:text-white mr-4 focus:outline-none hidden md:block"
             >
               <Menu size={20} />
             </button>
             
             {/* Mobile Menu Toggle (Simplified) */}
             <button className="md:hidden text-gray-500 mr-2">
               <Menu size={24} />
             </button>

             <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 capitalize">
                {pathname.split('/').pop() === 'admin' ? 'Dashboard Overview' : pathname.split('/').pop()}
             </h2>
           </div>

           <div className="flex items-center space-x-4">
             <button className="relative p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors bg-gray-50 dark:bg-gray-800 rounded-full">
               <Bell size={20} />
               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
             
             <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-4">
               <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                 A
               </div>
               <div className="hidden md:block">
                 <div className="text-sm font-bold text-gray-900 dark:text-white leading-none">Super Admin</div>
                 <div className="text-xs text-gray-500 mt-1">System Control</div>
               </div>
             </div>
           </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-[#080d1a] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
