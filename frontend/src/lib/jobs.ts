import { jobService } from '@/services/job.service';
import type { Job, JobQuery } from '@/types/job';

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

type JobCompanyInfo = Pick<Job, 'companyName' | 'client'>;
type JobCompensationInfo = Pick<Job, 'salaryAmount' | 'salaryType'>;

export function getCompanyName(job: JobCompanyInfo) {
  return job.companyName || job.client?.companyName || job.client?.name || 'AdSky Partner';
}

export function formatCompensation(job: JobCompensationInfo) {
  const amount = new Intl.NumberFormat('en-IN').format(job.salaryAmount ?? 0);

  switch (job.salaryType) {
    case 'Hourly':
      return `Rs ${amount}/hr`;
    case 'Monthly':
      return `Rs ${amount}/month`;
    case 'Gig':
      return `Rs ${amount}/task`;
    case 'Fixed':
      return `Rs ${amount}/fixed`;
    default:
      return `Rs ${amount}/${(job.salaryType || '').toLowerCase()}`;
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
  return jobService.getAll(query);
}

export async function fetchJobById(id: string) {
  return jobService.getById(id);
}
