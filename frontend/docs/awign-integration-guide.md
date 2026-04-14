# Awign Figma Integration Guide

## What was added

This integration keeps the existing Next.js app intact and extends it with reusable React + Tailwind modules for the Awign-style jobs flow.

## Folder structure

```text
src/
  app/
    page.tsx
    jobs/
      page.tsx
      [id]/page.tsx
  components/
    Navbar.tsx
    Footer.tsx
    home/
      HeroSection.tsx
      TrustedBySection.tsx
      WhyWorkWithUsSection.tsx
      SolutionsSection.tsx
      JobCategoriesSection.tsx
      FeaturedJobsSection.tsx
      HowItWorksSection.tsx
      CTASection.tsx
    jobs/
      ApplicationModal.tsx
      JobCard.tsx
      JobCardSkeleton.tsx
      JobDetailContent.tsx
      JobDetailOverview.tsx
      JobsEmptyState.tsx
      JobsHero.tsx
      JobsPagination.tsx
  lib/
    auth.ts
    jobs.ts
  types/
    job.ts
```

## Where each component is used

- `src/components/Navbar.tsx`
  - Existing global navigation component rendered from the root layout.
- `src/components/Footer.tsx`
  - Existing global footer component rendered from the root layout.
- `src/app/page.tsx`
  - Uses the section-level homepage components.
- `src/components/home/HeroSection.tsx`
  - Landing hero mapped to the Figma-inspired visual direction.
- `src/components/home/TrustedBySection.tsx`
  - Enterprise proof/stat section.
- `src/components/home/WhyWorkWithUsSection.tsx`
  - Feature/value card section.
- `src/components/home/FeaturedJobsSection.tsx`
  - Home-page job preview using the shared `JobCard` component.
- `src/app/jobs/page.tsx`
  - Main job listing route.
- `src/app/jobs/[id]/page.tsx`
  - Dynamic job detail route.
- `src/components/jobs/ApplicationModal.tsx`
  - Reusable application modal invoked from cards, listing, and detail page.

## Data flow

- `src/lib/jobs.ts`
  - Central place for job fetch functions and shared formatting.
- `fetchJobs()`
  - Used by the listing page and homepage featured jobs.
- `fetchJobById()`
  - Used by the dynamic detail page.
- `formatCompensation()` and `formatPostedLabel()`
  - Keep labels consistent across cards, detail, and modal.

## Step-by-step integration notes

1. Keep the root layout as-is.
   - `src/app/layout.tsx` already wraps pages with the global navbar and footer.
2. Home page sections live in `src/components/home`.
   - If you want to reorder homepage blocks, edit `src/app/page.tsx` only.
3. Job listing UI lives in `src/app/jobs/page.tsx`.
   - Filters, search, pagination, loading, and empty states are already wired.
4. Job detail UI lives in `src/app/jobs/[id]/page.tsx`.
   - The route expects an ID and fetches from your existing backend API.
5. To trigger the apply modal anywhere else in the app:
   - Import `ApplicationModal`.
   - Pass a `job` object with the same `Job` shape from `src/types/job.ts`.
6. To reuse the same job card elsewhere:
   - Import `JobCard`.
   - Pass `job` and an `onApply` callback.

## Next.js routing example

### App Router

```tsx
// src/app/jobs/[id]/page.tsx
// Existing route already implemented.
// Visiting /jobs/123 renders the detail page and fetches job 123.
```

### Linking from any component

```tsx
import Link from 'next/link';

<Link href={`/jobs/${job._id}`}>View details</Link>
```

## If you ever need React Router instead

```tsx
<Route path="/jobs" element={<JobsPage />} />
<Route path="/jobs/:id" element={<JobDetailPage />} />
```

## Safe extension points

- Add more homepage sections by editing `src/app/page.tsx`.
- Add more job filters in `src/lib/jobs.ts` and `src/app/jobs/page.tsx`.
- Expand the modal fields in `src/components/jobs/ApplicationModal.tsx`.
- Swap API URLs through `NEXT_PUBLIC_API_URL` without changing component code.

## Notes

- No new project was created.
- Existing routes were extended instead of replaced with a separate app.
- The shared jobs layer is now modular enough to drop into other pages without duplicating logic.
