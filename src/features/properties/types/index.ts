import type { Canton, City, Category } from '@/features/locations/types';

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  cloudinary_public_id?: string;
  is_primary: boolean;
  order: number;
  alt_text?: string;
}

export interface Property {
  id: string;
  external_id: string;
  external_url?: string;
  source_language: 'en' | 'fr' | 'de' | 'it';

  title: string;
  description: string;

  category_id: string;
  category?: Category;
  agency_id?: string;
  agency?: {
    id: string;
    name: string;
    slug?: string;
    logo_url?: string;
  };
  owner_id?: string;

  transaction_type: 'rent' | 'buy';

  price: number;
  currency: string;
  additional_costs?: number;

  rooms?: number;
  surface?: number;

  address: string;
  city_id: string;
  city?: City;
  canton_id: string;
  canton?: Canton;
  postal_code?: string;

  proximity?: Record<string, string>;
  amenities?: string[];
  images?: PropertyImage[];

  status: 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'PUBLISHED' | 'ARCHIVED';

  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyQueryParams {
  page?: number;
  limit?: number;
  transaction_type?: 'rent' | 'buy';
  section?: 'residential' | 'commercial';
  category_id?: string;
  canton_id?: string;
  city_id?: string;
  status?: string;
  price_min?: number;
  price_max?: number;
  rooms_min?: number;
  rooms_max?: number;
  surface_min?: number;
  surface_max?: number;
  amenities?: string[];
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  q?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PropertyListResponse {
  success: boolean;
  message: string;
  data: Property[];
  meta: PaginationMeta;
  pagination?: PaginationMeta;
}

export interface PropertyResponse {
  success: boolean;
  message: string;
  data: Property;
}

export interface CreatePublicLeadRequest {
  property_id: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  inquiry_type?: 'general_inquiry' | 'viewing_request' | 'price_inquiry' | 'availability_check' | 'documentation_request' | 'other';
  message?: string;
  preferred_contact_method?: 'email' | 'phone' | 'both';
}

export interface CreateAuthenticatedLeadRequest {
  property_id: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  inquiry_type?: 'general_inquiry' | 'viewing_request' | 'price_inquiry' | 'availability_check' | 'documentation_request' | 'other';
  message?: string;
  preferred_contact_method?: 'email' | 'phone' | 'both';
}

export interface LeadResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    property_id: string;
    status: string;
    created_at: string;
  };
}
