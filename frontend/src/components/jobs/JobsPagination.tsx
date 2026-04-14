interface JobsPaginationProps {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}

export default function JobsPagination({ page, pages, onChange }: JobsPaginationProps) {
  if (pages <= 1) {
    return null;
  }

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="btn-secondary px-5 py-3 disabled:cursor-not-allowed disabled:opacity-45"
      >
        Previous
      </button>
      {Array.from({ length: pages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onChange(pageNumber)}
          className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-black transition ${
            pageNumber === page
              ? 'bg-secondary text-[#05101f] shadow-[0_16px_34px_rgba(184,255,71,0.22)]'
              : 'border border-white/10 bg-white/5 text-[#dce7ff] hover:border-secondary/40'
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        className="btn-secondary px-5 py-3 disabled:cursor-not-allowed disabled:opacity-45"
      >
        Next
      </button>
    </div>
  );
}
