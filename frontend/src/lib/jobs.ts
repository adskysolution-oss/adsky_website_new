import axios from 'axios';
import { JOBS_API_URL } from '@/lib/auth';
import type { Job, JobQuery, JobsResponse } from '@/types/job';

export const JOB_CATEGORIES = [
  'All',
  'Delivery Jobs',
  'Field Sales',
  'Data Entry',
  'Marketing',
  'Work From Home',
  'Testing & QA',
];

export const JOB_SALARY_TYPES = ['All', 'Fixed', 'Gig', 'Hourly', 'Monthly'];

export function getCompanyName(job: Pick<Job, 'companyName' | 'client'>) {
  return job.companyName || job.client?.companyName || job.client?.name || 'AdSky Partner';
}

export function formatCompensation(job: Pick<Job, 'salaryAmount' | 'salaryType'>) {
  const amount = new Intl.NumberFormat('en-IN').format(job.salaryAmount ?? 0);

  switch (job.salaryType) {
    case 'Hourly':
      return `₹${amount}/hr`;
    case 'Monthly':
      return `₹${amount}/month`;
    case 'Gig':
      return `₹${amount}/task`;
    case 'Fixed':
      return `₹${amount}/fixed`;
    default:
      return `₹${amount}/${job.salaryType.toLowerCase()}`;
  }
}

export function formatPostedLabel(createdAt: string) {
  const createdTime = new Date(createdAt).getTime();

  if (Number.isNaN(createdTime)) {
    return 'Recently added';
  }

  const daysAgo = Math.max(0, Math.floor((Date.now() - createdTime) / 86400000));

  if (daysAgo === 0) return 'Posted today';
  if (daysAgo === 1) return 'Posted yesterday';

  return `Posted ${daysAgo} days ago`;
}

export async function fetchJobs(query: JobQuery = {}) {
  const params: Record<string, string> = {
    page: String(query.page ?? 1),
    limit: String(query.limit ?? 12),
  };

  if (query.category && query.category !== 'All') {
    params.category = query.category;
  }

  if (query.search) {
    params.search = query.search;
  }

  if (query.salaryType && query.salaryType !== 'All') {
    params.salaryType = query.salaryType;
  }

  const response = await axios.get<JobsResponse>(JOBS_API_URL, { params });
  return response.data;
}

export async function fetchJobById(id: string) {
  const response = await axios.get<Job>(`${JOBS_API_URL}/${id}`);
  return response.data;
}
