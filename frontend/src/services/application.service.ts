import { apiClient } from '@/lib/api';

export type ApplicationStatus =
  | 'Pending'
  | 'Reviewed'
  | 'Shortlisted'
  | 'Rejected'
  | 'Hired';

export interface JobApplicationPayload {
  jobId: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail?: string;
  applicantDob?: string;
  applicantLanguages?: string[];
  applicantLocation?: string;
  applicantAvailability?: string;
  applicantNote?: string;
  coverLetter?: string;
}

export interface ApplicationItem {
  _id: string;
  job: string | {
    _id: string;
    title?: string;
    category?: string;
    companyName?: string;
    location?: string;
    status?: string;
    salaryAmount?: number;
    salaryType?: string;
  };
  worker?: string | {
    _id: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  applicantName: string;
  applicantPhone: string;
  applicantEmail?: string;
  applicantDob?: string;
  applicantLanguages?: string[];
  applicantLocation?: string;
  applicantAvailability?: string;
  applicantNote?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedAt?: string;
  updatedAt?: string;
}

export const applicationService = {
  async apply(data: JobApplicationPayload) {
    const response = await apiClient.post<ApplicationItem>('/applications', data);
    return response.data;
  },

  async getMyApplications() {
    const response = await apiClient.get<ApplicationItem[]>('/applications/my');
    return response.data;
  },

  async getJobApplications(jobId: string) {
    const response = await apiClient.get<ApplicationItem[]>(`/applications/job/${jobId}`);
    return response.data;
  },

  async getAllForAdmin() {
    const response = await apiClient.get<ApplicationItem[]>('/applications/all');
    return response.data;
  },

  async updateStatus(id: string, status: ApplicationStatus) {
    const response = await apiClient.patch<ApplicationItem>(`/applications/${id}/status`, { status });
    return response.data;
  }
};
