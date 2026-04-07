import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center mb-6">
              <span className="text-blue-500 mr-1">Work</span>Hustle
            </Link>
            <p className="text-sm text-slate-400 mb-6 max-w-xs">
              Empowering businesses to scale execution, and empowering individuals to find flexible, verified work.
            </p>
            <div className="flex space-x-4">
              <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">𝕏</span>
              <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">in</span>
              <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">f</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">For Business</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/business/data-annotation" className="hover:text-blue-400 transition-colors">Data Annotation</Link></li>
              <li><Link href="/business/audit" className="hover:text-blue-400 transition-colors">Audit & QA</Link></li>
              <li><Link href="/business/promoter" className="hover:text-blue-400 transition-colors">Promoter Deployment</Link></li>
              <li><Link href="/business/tech" className="hover:text-blue-400 transition-colors">Hire Tech Teams</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">For Jobs</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/categories/field" className="hover:text-blue-400 transition-colors">Field Sales</Link></li>
              <li><Link href="/categories/exam" className="hover:text-blue-400 transition-colors">Exam Invigilation</Link></li>
              <li><Link href="/categories/digital" className="hover:text-blue-400 transition-colors">Digital Gigs</Link></li>
              <li><Link href="/categories/delivery" className="hover:text-blue-400 transition-colors">Delivery Partners</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link href="/blogs" className="hover:text-blue-400 transition-colors">Blogs</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center bg-slate-900">
          <p className="text-sm text-slate-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} WorkHustle by Awign Clone. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-slate-500">
            <Link href="/terms" className="hover:text-slate-300">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
