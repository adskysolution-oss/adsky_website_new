import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-[#2f67ff] px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-extrabold tracking-[-0.05em] sm:text-6xl">Ready to transform your workforce?</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/88 sm:text-xl">
          Join thousands of businesses and workers already growing with a calmer, more structured workforce platform.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#2f67ff] transition hover:shadow-xl"
          >
            Get Started Free
          </Link>
          <Link
            href="/business"
            className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Schedule a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
