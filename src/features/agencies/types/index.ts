import type { MultiLangName } from '@/features/locations/types';

export interface Agency {
  id: string;
  name: string;
  slug?: string;
  address: string;
  postal_code: string;
  website?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  logo?: string;
  is_verified?: boolean;
  verified?: boolean;
  status?: string;
  total_properties: number;
  canton_id?: string;
  city_id?: string;
  city?: {
    id: string;
    name: MultiLangName;
  };
  canton?: {
    id: string;
    name: MultiLangName;
    code: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface AgencyListResponse {
  success: boolean;
  data: Agency[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface AgencyQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  canton_id?: string;
  city_id?: string;
}
