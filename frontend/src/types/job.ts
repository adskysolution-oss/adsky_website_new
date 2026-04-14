export interface JobClient {
  name?: string;
  companyName?: string;
  email?: string;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  requirements?: string[];
  category: string;
  location?: string;
  salaryType: string;
  salaryAmount: number;
  openings?: number;
  companyName?: string;
  experienceLevel?: string;
  qualification?: string;
  applicationsCount: number;
  status: string;
  createdAt: string;
  tags?: string[];
  client?: JobClient;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  pages: number;
}

export interface JobQuery {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  salaryType?: string;
}
