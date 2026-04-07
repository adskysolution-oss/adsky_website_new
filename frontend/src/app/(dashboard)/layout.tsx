import Link from 'next/link';
import ProfileDropdown from '@/components/dashboard/ProfileDropdown';
import HelpDropdown from '@/components/dashboard/HelpDropdown';
import NotificationDropdown from '@/components/dashboard/NotificationDropdown';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex flex-col">
      {/* Dashboard Top Navbar */}
      <nav className="w-full bg-primary py-3 px-4 sm:px-8 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Main Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center">
              <span className="text-blue-200 mr-1">Ad</span>Sky
            </Link>

            <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
              <div className="hidden lg:flex items-center space-x-6 mr-4 opacity-90 border-r border-white/20 pr-6">
                <Link href="/business" className="font-semibold text-sm hover:text-white transition-colors">
                  Business
                </Link>
                <Link href="/jobs" className="font-semibold text-sm hover:text-white transition-colors">
                  Jobs
                </Link>
                <Link href="/blogs" className="font-semibold text-sm hover:text-white transition-colors">
                  Blog
                </Link>
              </div>

              <Link href="/explore" className="px-4 py-2 hover:bg-white/10 rounded-md font-medium text-sm transition-colors">
                Explore
              </Link>
              <Link href="/office" className="px-4 py-2 bg-blue-900 rounded-md font-bold text-sm shadow-inner text-white">
                Office
              </Link>
            </div>
          </div>

          {/* Right Area */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <HelpDropdown />
            <NotificationDropdown />
            <ProfileDropdown />
          </div>

        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
