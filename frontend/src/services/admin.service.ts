import { apiClient } from '@/lib/api';

export type UserRole = 'Worker' | 'Client' | 'Admin' | 'Gig Vendor';
export type AccountStatus = 'Active' | 'Blocked';
export type JobStatus = 'Open' | 'Closed' | 'In Progress';
export type SalaryType = 'Gig' | 'Hourly' | 'Monthly' | 'Fixed';

export type AdminStats = {
  totalUsers: number;
  activeJobs: number;
  totalApplications: number;
  totalVendors: number;
  totalRevenue: number;
};

export type ChartPoint = {
  label: string;
  value: number;
};

export type AdminCharts = {
  revenue?: ChartPoint[];
  applications?: ChartPoint[];
};

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  accountStatus?: AccountStatus;
  companyName?: string;
  createdAt?: string;
};

export type Job = {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  companyName?: string;
  location?: string;
  status: JobStatus;
  applicationsCount?: number;
  salaryAmount: number;
  salaryType?: SalaryType;
  openings?: number;
  requirements?: string[];
  tags?: string[];
  createdAt?: string;
};

export type CreateOrUpdateJobPayload = {
  title: string;
  description: string;
  category?: string;
  companyName?: string;
  location?: string;
  status?: JobStatus;
  salaryAmount: number;
  salaryType?: SalaryType;
  openings?: number;
  requirements?: string[];
  tags?: string[];
};

export type StatusMessageResponse = {
  message?: string;
};

export const adminService = {
  async getStats(): Promise<AdminStats> {
    const response = await apiClient.get<AdminStats>('/admin/stats');
    return response.data;
  },

  async getCharts(): Promise<AdminCharts> {
    const response = await apiClient.get<AdminCharts>('/admin/charts');
    return response.data;
  },

  async getAllUsers(params?: {
    role?: string;
    status?: string;
  }): Promise<AdminUser[]> {
    const response = await apiClient.get<AdminUser[]>('/admin/users', { params });
    return response.data;
  },

  async updateUserStatus(
    id: string,
    status: AccountStatus
  ): Promise<AdminUser | StatusMessageResponse> {
    const response = await apiClient.patch<AdminUser | StatusMessageResponse>(
      `/admin/users/${id}/status`,
      { status }
    );
    return response.data;
  },

  async getAllJobs(): Promise<Job[]> {
    const response = await apiClient.get<Job[]>('/admin/jobs');
    return response.data;
  },

  async createJob(data: CreateOrUpdateJobPayload): Promise<Job> {
    const response = await apiClient.post<Job>('/admin/jobs', data);
    return response.data;
  },

  async updateJob(id: string, data: CreateOrUpdateJobPayload): Promise<Job> {
    const response = await apiClient.put<Job>(`/admin/jobs/${id}`, data);
    return response.data;
  },

  async deleteJob(id: string): Promise<StatusMessageResponse> {
    const response = await apiClient.delete<StatusMessageResponse>(`/admin/jobs/${id}`);
    return response.data;
  },

  async updateJobStatus(
    id: string,
    status: JobStatus
  ): Promise<Job | StatusMessageResponse> {
    const response = await apiClient.patch<Job | StatusMessageResponse>(
      `/admin/jobs/${id}/status`,
      { status }
    );
    return response.data;
  },
};