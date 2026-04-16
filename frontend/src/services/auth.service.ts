import { apiClient } from '@/lib/api';

export type UserRole = 'Worker' | 'Client' | 'Admin';

export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  onboardingCompleted?: boolean;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: 'Worker' | 'Client';
  phone?: string;
  companyName?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  newPassword: string;
};

export type AuthMessageResponse = {
  message: string;
};

export const authService = {
  async register(data: RegisterPayload): Promise<AuthUser> {
    const response = await apiClient.post<AuthUser>('/auth/register', data);
    return response.data;
  },

  async login(credentials: LoginPayload): Promise<AuthUser> {
    const response = await apiClient.post<AuthUser>('/auth/login', credentials);
    return response.data;
  },

  async logout(): Promise<AuthMessageResponse> {
    const response = await apiClient.post<AuthMessageResponse>('/auth/logout');
    return response.data;
  },

  async me(): Promise<AuthUser> {
    const response = await apiClient.get<AuthUser>('/auth/profile');
    return response.data;
  },

  async forgotPassword(email: string): Promise<AuthMessageResponse> {
    const response = await apiClient.post<AuthMessageResponse>(
      '/auth/forgot-password',
      { email }
    );
    return response.data;
  },

  async resetPassword(
    token: string,
    data: ResetPasswordPayload
  ): Promise<AuthMessageResponse> {
    const response = await apiClient.post<AuthMessageResponse>(
      `/auth/reset-password/${token}`,
      data
    );
    return response.data;
  },
};