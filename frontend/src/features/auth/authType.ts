export type Role = 'teacher' | 'student';

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  roleId: number;
}

export interface LoginPayload {
 // authThunk.ts
  email: string;
  password: string;
  remember?: boolean; // 👈 thêm dòng này
};



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