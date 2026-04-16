import Link from 'next/link';
import Image from 'next/image';

function AdSkyLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-full ${className}`}>
      <Image
        src="/logo.png"
        alt="AD Sky Solution"
        width={40}
        height={40}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

const footerLinks = [
  {
    title: 'For Jobs',
    links: [
      { href: '/jobs', label: 'Explore Jobs' },
      { href: '/gig', label: 'Gig Work' },
      { href: '/register', label: 'Create Account' },
      { href: '/login', label: 'Login' },
    ],
  },
  {
    title: 'For Business',
    links: [
      { href: '/business', label: 'Solutions Overview' },
      { href: '/business', label: 'Book a Meeting' },
      { href: '/business', label: 'Data Annotation' },
      { href: '/business', label: 'Promoter Deployment' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/blogs', label: 'Blog' },
      { href: '/business', label: 'About Us' },
      { href: '/business', label: 'Careers' },
      { href: '/business', label: 'Contact Us' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy_policy', label: 'Privacy Policy' },
      { href: '/terms_and_conditions', label: 'Terms & Conditions' },
      { href: '/terms_and_conditions', label: 'Security' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#080d14] px-6 py-20 text-white lg:px-8 ">
      <div className="mx-auto max-w-[1200px]">
        {/* Top: Logo + tagline + links grid */}
        <div className="grid gap-14 lg:grid-cols-[280px_1fr]">
          {/* Brand col */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group" aria-label="AD Sky Solution Home">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8 transition-colors group-hover:bg-white/15 overflow-hidden">
                <AdSkyLogo className="h-full w-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] font-semibold tracking-[0.02em] text-white uppercase">AD Sky Solution</span>
              </div>
            </Link>
            <p className="mt-6 max-w-[260px] text-[0.9rem] leading-6 text-white/58">
              India&apos;s #1 Work‑as‑a‑Service platform connecting 1.5M+ gig workers with 175+ enterprises.
            </p>

            {/* Social icons */}
            <div className="mt-8 flex items-center gap-4">
              {[
                { label: 'Twitter / X', href: 'https://twitter.com/adskysolution/', icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                ) },
                { label: 'Instagram', href: 'https://www.instagram.com/adskysolution/', icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                ) },
                { label: 'LinkedIn', href: 'https://in.linkedin.com/company/ad-sky-solution', icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                ) },
                { label: 'Facebook', href: 'https://www.facebook.com/adskysolution', icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                ) },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/6 text-white/70 transition-colors hover:bg-white/14 hover:text-white"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h4 className="mb-5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white/50">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.9rem] text-white/68 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[0.82rem] text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} AD Sky Solution Pvt. Ltd. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy_policy" className="transition-colors hover:text-white">Privacy</Link>
            <Link href="/terms_and_conditions" className="transition-colors hover:text-white">Terms</Link>
            <a href="mailto:support@adskysolution.com" className="transition-colors hover:text-white">support@adskysolution.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
