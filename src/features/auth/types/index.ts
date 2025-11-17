export type SupportedLanguage = 'en' | 'fr' | 'de' | 'it';

export type UserType =
  | 'end_user'
  | 'owner'
  | 'agent'
  | 'agency_admin'
  | 'platform_admin'
  | 'super_admin';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
  user_type: UserType;
  agency_id?: string;
  agency?: {
    id: string;
    name: string;
    slug: string;
  };
  preferred_language: SupportedLanguage;
  status: string;
  email_verified: boolean;
  created_at: string;
  roles: string[];
  permissions: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  user_type?: UserType;
  preferred_language?: SupportedLanguage;
  agency_name?: string;
  agency_phone?: string;
  agency_email?: string;
  agency_address?: string;
  city_id?: string;
  canton_id?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface TokensResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface AuthResponse {
  user: User;
  tokens: TokensResponse;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
