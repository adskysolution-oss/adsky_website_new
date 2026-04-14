import Link from 'next/link';

const columns = [
  {
    title: 'Product',
    links: [
      { href: '/services', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/business', label: 'Case Studies' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/business', label: 'About Us' },
      { href: '/jobs', label: 'Careers' },
      { href: '/blogs', label: 'Blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/services', label: 'Help Center' },
      { href: '/services', label: 'API Docs' },
      { href: '/blogs', label: 'Community' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy_policy', label: 'Privacy' },
      { href: '/terms_and_conditions', label: 'Terms' },
      { href: '/terms_and_conditions', label: 'Security' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#121826] px-6 py-16 text-white">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid justify-items-center gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title} className="w-full max-w-[180px]">
              <h4 className="mb-4 text-base font-semibold text-white">{column.title}</h4>
              <ul className="space-y-3 text-sm text-white/68">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/12 pt-8 text-center text-sm text-white/52">
          Copyright {new Date().getFullYear()} Awign. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
