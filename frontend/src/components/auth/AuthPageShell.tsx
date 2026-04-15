'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

type AuthPageShellProps = {
  children: ReactNode;
  sideEyebrow?: string;
  sideTitle: string;
  sideDescription: string;
  sideHighlights: string[];
  sideImage: string;
  panelPosition?: 'left' | 'right';
};

export function AuthPageShell({
  children,
  sideEyebrow,
  sideTitle,
  sideDescription,
  sideHighlights,
  sideImage,
  panelPosition = 'left',
}: AuthPageShellProps) {
  const showVisualFirst = panelPosition === 'left';

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e0ebff,transparent_28%),linear-gradient(180deg,#f7f9fc_0%,#eef3f8_100%)]">
      <div className="grid min-h-screen max-w-[1900px] gap-6 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-8">
        <div className={`${showVisualFirst ? 'lg:order-1' : 'lg:order-2'} !ml-[10px] relative hidden overflow-hidden rounded-[0px] border border-white/15 bg-[#09162b] text-white shadow-[0_30px_90px_rgba(9,22,43,0.28)] lg:flex`}>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url('${sideImage}')` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(84,141,255,0.2),transparent_35%),linear-gradient(180deg,rgba(7,18,33,0.55),rgba(7,18,33,0.92))]" />
          <div className="absolute -left-16 bottom-[-5rem] h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute right-[-3rem] top-[-3rem] h-40 w-40 rounded-full border border-white/10" />

          <div className="relative z-10 flex h-full w-full flex-col justify-between p-10 xl:p-14">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 !ml-[300px] !mt-[50px] text-white">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold">
                  AD
                </span>
                <span>
                  <span className="block text-lg font-semibold tracking-[0.08em]">Sky Solution</span>
                  <span className="block text-xs text-white/60">Secure workforce platform</span>
                </span>
              </Link>
            </div>

            <div className="max-w-[520px] !ml-[200px]">
              {sideEyebrow ? (
                <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                  {sideEyebrow}
                </div>
              ) : null}
              <h2 className="text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white xl:text-[3.15rem]">
                {sideTitle}
              </h2>
              <p className="mt-5 max-w-[460px] text-base leading-7 text-white/74 xl:text-lg xl:leading-8">
                {sideDescription}
              </p>
            </div>

            <div className="grid gap-3 !ml-[200px] !mb-[50px]">
              {sideHighlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm leading-6 text-white/78">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#c9ff45]" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${showVisualFirst ? 'lg:order-2' : 'lg:order-1'}  !h-full flex w-full items-start justify-start py-6 lg:py-8`}>
          <div className="w-full max-w-[900px]  !h-full  !pt-[100px] !pl-[50px]  !pr-[50px] !pb-[200px] rounded-[0px] border border-[#e4ebf5] bg-white px-6 py-8 shadow-[0_28px_70px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10 lg:px-10">
            <div className="mb-8 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-3 text-[#0f172a]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0f172a] text-sm font-semibold text-white">
                  AD
                </span>
                <span>
                  <span className="block text-lg font-semibold tracking-[0.08em]">Sky Solution</span>
                  <span className="block text-xs text-slate-500">Secure workforce platform</span>
                </span>
              </Link>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
