export type Role = 'teacher' | 'student';

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  roleId: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  dateOfBirth: string;
  avatarUrl?: string;
  token?: string; // access token
}

export interface AuthResponse {
  userWithoutPassword: User;
  backendTokens: {
    accessToken: string;
    refreshToken?: string; // Có thể bỏ, vì refresh token lưu cookie
  };
}