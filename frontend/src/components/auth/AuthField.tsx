'use client';

import type { InputHTMLAttributes } from 'react';

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  requiredMark?: boolean;
};

export function AuthField({
  label,
  hint,
  error,
  id,
  className = '',
  requiredMark = false,
  ...props
}: AuthFieldProps) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700 !m-[5px]">
        {label}
        {requiredMark ? <span className="ml-1 text-rose-500">*</span> : null}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        className={`w-full rounded-2xl border px-4 py-3.5 !p-[10px] !mb-[10px] text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 ${
          error
            ? 'border-rose-300 bg-rose-50/70 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'
            : 'border-slate-200 bg-slate-50/80 focus:border-[#2b64f0] focus:ring-4 focus:ring-[#dbe8ff]'
        } ${className}`}
        {...props}
      />
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-5 text-slate-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs font-medium leading-5 text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
