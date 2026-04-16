import { apiClient } from '@/lib/api';
import type { Job, JobsResponse, JobQuery } from '@/types/job';

export interface JobCategory {
  _id: string;
  title: string;
  description: string;
  iconUrl?: string;
  isActive?: boolean;
}

export const jobService = {
  async getAll(params?: JobQuery) {
    const response = await apiClient.get<JobsResponse>('/jobs', { params });
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get<Job>(`/jobs/${id}`);
    return response.data;
  },

  async getCategories() {
    const response = await apiClient.get<JobCategory[]>('/categories');
    return response.data;
  },
};
