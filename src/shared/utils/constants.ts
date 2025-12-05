export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4003/api/v1';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Immobilier.ch';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'it'] as const;
export const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || 'en';

export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dzyyygr1x';

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const RENT_PRICE_RANGES = [
  { label: 'Any', min: null, max: null },
  { label: 'Under CHF 1,000', min: null, max: 1000 },
  { label: 'CHF 1,000 - 2,000', min: 1000, max: 2000 },
  { label: 'CHF 2,000 - 3,000', min: 2000, max: 3000 },
  { label: 'CHF 3,000 - 5,000', min: 3000, max: 5000 },
  { label: 'Over CHF 5,000', min: 5000, max: null },
];

export const BUY_PRICE_RANGES = [
  { label: 'Any', min: null, max: null },
  { label: 'Under CHF 500,000', min: null, max: 500000 },
  { label: 'CHF 500,000 - 1M', min: 500000, max: 1000000 },
  { label: 'CHF 1M - 2M', min: 1000000, max: 2000000 },
  { label: 'CHF 2M - 5M', min: 2000000, max: 5000000 },
  { label: 'Over CHF 5M', min: 5000000, max: null },
];

export const ROOM_OPTIONS = [
  { label: 'Any', value: null },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
  { label: '5+', value: 5 },
];

export const SURFACE_OPTIONS = [
  { label: 'Any', value: null },
  { label: '50+ m²', value: 50 },
  { label: '75+ m²', value: 75 },
  { label: '100+ m²', value: 100 },
  { label: '150+ m²', value: 150 },
  { label: '200+ m²', value: 200 },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rooms_asc', label: 'Rooms: Low to High' },
  { value: 'rooms_desc', label: 'Rooms: High to Low' },
];

export const TRANSACTION_TYPES = [
  { value: 'rent', label: 'Rent' },
  { value: 'buy', label: 'Buy' },
];

export const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
};

export const LANGUAGE_FLAGS: Record<string, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
};

export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: '/properties/:id',
  AGENCIES: '/agencies',
  AGENCY_DETAIL: '/agencies/:id',
  SIGN_IN: '/sign-in',
  REGISTER: '/register',
  ABOUT: '/about',
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  NEWSLETTER: '/newsletter',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_FAVORITES: '/dashboard/favorites',
  DASHBOARD_ALERTS: '/dashboard/alerts',
  DASHBOARD_INQUIRIES: '/dashboard/inquiries',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  MY_PROPERTIES: '/dashboard/properties',
  CREATE_PROPERTY: '/dashboard/properties/new',
} as const;

export const PLACEHOLDER_IMAGE = '/images/property-placeholder.jpg';
