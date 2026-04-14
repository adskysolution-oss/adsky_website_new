import type { BlogCategory } from '@/lib/blogs';

export default function BlogFilters({
  categories,
  activeCategory,
  onChange,
}: {
  categories: BlogCategory[];
  activeCategory: BlogCategory;
  onChange: (category: BlogCategory) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-[0.95rem] font-medium transition-colors ${
            activeCategory === category
              ? 'bg-[#0f172a] text-white'
              : 'bg-white text-[#475467] ring-1 ring-[#e4e7ec] hover:bg-[#f8fafc]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
