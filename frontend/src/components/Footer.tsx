import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#081528] text-slate-300 pt-20 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-extrabold tracking-[-0.04em] text-white flex items-center mb-6">
              <span className="text-[#ff5572] mr-1">AD</span>Sky Solution
            </Link>
            <p className="text-sm text-slate-400 mb-6 max-w-sm leading-7">
              Empowering businesses and individuals through expert consulting, strategic execution, and scalable workforce solutions.
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <p>126 Satyam Enclave Sahibabad, Ghaziabad, Uttar Pradesh 201003</p>
              <p>+91 8076611842</p>
              <p>info@adskysolution.in</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/business" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><Link href="/jobs" className="hover:text-white transition-colors">Career Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/business" className="hover:text-white transition-colors">IT Project Planning</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Web & App Strategy</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Process Automation</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Architecture Advisory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Delivery Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AD Sky Solution. All rights reserved.
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
