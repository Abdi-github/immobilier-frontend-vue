import type { SupportedLanguage } from '@/features/auth/types';

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  phone?: string;
  preferred_language?: SupportedLanguage;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface NotificationPreferences {
  email_new_properties: boolean;
  email_price_changes: boolean;
  email_favorites_updates: boolean;
  email_newsletter: boolean;
  push_enabled: boolean;
}

export interface UserSettings {
  notifications: NotificationPreferences;
  language: SupportedLanguage;
  currency: 'CHF';
}

export interface Favorite {
  id: string;
  property_id: string;
  user_id: string;
  created_at: string;
  property?: {
    id: string;
    title: string;
    price: number;
    currency: string;
    rooms?: number;
    surface?: number;
    address: string;
    transaction_type: 'rent' | 'buy';
    status: string;
    primary_image_url?: string;
    city?: {
      id: string;
      name: string;
    };
    canton?: {
      id: string;
      code: string;
      name: string;
    };
    category?: {
      id: string;
      slug: string;
      name: string;
    };
  };
}

export interface PropertyAlert {
  id: string;
  user_id: string;
  name: string;
  criteria: AlertFilters;
  is_active: boolean;
  frequency: 'instant' | 'daily' | 'weekly';
  last_sent_at?: string;
  created_at: string;
  updated_at: string;
  match_count?: number;
}

export interface AlertFilters {
  transaction_type?: 'rent' | 'buy';
  category_id?: string;
  canton_id?: string;
  city_id?: string;
  price_min?: number;
  price_max?: number;
  rooms_min?: number;
  rooms_max?: number;
  surface_min?: number;
  surface_max?: number;
}

export interface CreateAlertRequest {
  name: string;
  criteria: AlertFilters;
  frequency: 'instant' | 'daily' | 'weekly';
}

export interface UpdateAlertRequest {
  name?: string;
  criteria?: AlertFilters;
  frequency?: 'instant' | 'daily' | 'weekly';
  is_active?: boolean;
}

export interface DashboardStats {
  favorites_count: number;
  alerts_count: number;
  recent_views_count: number;
}

export interface Inquiry {
  id: string;
  property_id: string;
  status: string;
  inquiry_type: string;
  message: string;
  first_response_at?: string;
  created_at: string;
  property?: {
    id: string;
    title: string;
    images?: { url: string }[];
  };
}
