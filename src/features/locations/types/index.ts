export interface MultiLangName {
  [key: string]: string;
  en: string;
  fr: string;
  de: string;
  it: string;
}

export interface Canton {
  id: string;
  name: MultiLangName;
  code: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  propertyCount?: number;
}

export interface City {
  id: string;
  name: MultiLangName;
  postal_code?: string;
  canton_id: string;
  canton?: Canton;
  image_url?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  propertyCount?: number;
}

export interface PopularCity {
  id: string;
  name: string | MultiLangName;
  canton_code: string;
  canton_name: string | MultiLangName;
  image_url?: string;
  rent_count: number;
  buy_count: number;
  total_count: number;
}

export interface Category {
  id: string;
  name: MultiLangName;
  slug: string;
  section: string;
  sort_order?: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  count?: number;
}

export interface Amenity {
  id: string;
  name: MultiLangName;
  icon?: string;
  group?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}
