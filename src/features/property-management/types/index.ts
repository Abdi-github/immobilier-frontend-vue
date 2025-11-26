import type { SupportedLanguage } from '@/features/auth/types';
import type { MultiLangName } from '@/features/locations/types';

export type PropertyStatus =
  | 'DRAFT'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'REJECTED'
  | 'PUBLISHED'
  | 'ARCHIVED';

export type TransactionType = 'rent' | 'buy';

export type CategorySection = 'residential' | 'commercial';

export interface PropertyImage {
  id: string;
  url: string;
  secure_url?: string;
  thumbnail_url?: string;
  alt_text?: string;
  caption?: string;
  sort_order: number;
  is_primary: boolean;
  public_id?: string;
  width?: number;
  height?: number;
}

export interface PropertyTranslation {
  id: string;
  property_id: string;
  language: SupportedLanguage;
  title: string;
  description: string;
  source: 'original' | 'deepl' | 'libretranslate' | 'human';
  quality_score?: number;
  approval_status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface CreatePropertyRequest {
  source_language: SupportedLanguage;
  category_id: string;
  transaction_type: TransactionType;
  price: number;
  additional_costs?: number;
  canton_id?: string;
  city_id?: string;
  address?: string;
  postal_code?: string;
  rooms?: number;
  surface?: number;
  title: string;
  description: string;
  amenities?: string[];
  agency_id?: string;
  owner_id?: string;
  external_id?: string;
  external_url?: string;
  proximity?: Record<string, string>;
}

export interface UpdatePropertyRequest {
  source_language?: SupportedLanguage;
  category_id?: string;
  transaction_type?: TransactionType;
  price?: number;
  additional_costs?: number;
  canton_id?: string;
  city_id?: string;
  address?: string;
  postal_code?: string;
  rooms?: number;
  surface?: number;
  amenities?: string[];
  proximity?: Record<string, string>;
}

export interface ManagedProperty {
  id: string;
  external_id: string;
  external_url?: string;
  source_language: SupportedLanguage;
  transaction_type: TransactionType;
  price: number;
  currency: 'CHF';
  additional_costs?: number;
  rooms?: number;
  surface?: number;
  address: string;
  postal_code?: string;
  proximity?: Record<string, string>;
  status: PropertyStatus;
  published_at?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
  title?: string;
  description?: string;
  category_id: string;
  agency_id?: string;
  owner_id?: string;
  city_id: string;
  canton_id: string;
  amenities: string[];
  category?: {
    id: string;
    name: MultiLangName;
    slug: string;
    section: CategorySection;
  };
  agency?: {
    id: string;
    name: string;
    slug: string;
  };
  city?: {
    id: string;
    name: MultiLangName;
    canton_id: string;
  };
  canton?: {
    id: string;
    name: MultiLangName;
    code: string;
  };
  images?: PropertyImage[];
  translation?: PropertyTranslation;
}

export interface MyPropertiesResponse {
  data: ManagedProperty[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface PropertyFormState {
  currentStep: number;
  source_language: SupportedLanguage;
  category_id: string;
  transaction_type: TransactionType;
  price: string;
  additional_costs: string;
  canton_id: string;
  city_id: string;
  address: string;
  postal_code: string;
  rooms: string;
  surface: string;
  title: string;
  description: string;
  amenities: string[];
  imageFiles: File[];
  imagePreviews: string[];
  isSubmitting: boolean;
  createdPropertyId?: string;
}

export interface PropertyFormErrors {
  category_id?: string;
  transaction_type?: string;
  price?: string;
  canton_id?: string;
  city_id?: string;
  address?: string;
  title?: string;
  description?: string;
  images?: string;
  [key: string]: string | undefined;
}

export interface UploadImageResponse {
  id: string;
  url: string;
  secure_url: string;
  thumbnail_url?: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  is_primary: boolean;
  sort_order: number;
}

export interface CreateTranslationRequest {
  property_id: string;
  language: SupportedLanguage;
  title: string;
  description: string;
  source?: 'original' | 'human';
}

export interface PropertyStats {
  total: number;
  draft: number;
  pending: number;
  approved: number;
  published: number;
  rejected: number;
  archived: number;
}
