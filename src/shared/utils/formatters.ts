export function formatPrice(price: number | null | undefined, currency: string = 'CHF'): string {
  if (price === null || price === undefined || price === 0) {
    return 'Prix sur demande';
  }
  const formatted = price.toLocaleString('de-CH');
  return `${currency} ${formatted}`;
}

export function formatRentalPrice(
  price: number | null | undefined,
  currency: string = 'CHF',
  monthLabel: string = '/mo',
): string {
  const basePrice = formatPrice(price, currency);
  if (price === null || price === undefined || price === 0) {
    return basePrice;
  }
  return `${basePrice}${monthLabel}`;
}

export function formatArea(area: number | null | undefined): string {
  if (area === null || area === undefined) {
    return '-';
  }
  return `${area.toLocaleString('de-CH')} m²`;
}

export function formatRooms(
  rooms: number | null | undefined,
  singular: string = 'room',
  plural: string = 'rooms',
): string {
  if (rooms === null || rooms === undefined) {
    return '-';
  }
  return `${rooms} ${rooms === 1 ? singular : plural}`;
}

export function formatDate(date: string | Date | null | undefined, locale: string = 'en-CH'): string {
  if (!date) {
    return '-';
  }
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatRelativeTime(date: string | Date | null | undefined, locale: string = 'en'): string {
  if (!date) {
    return '-';
  }
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return rtf.format(-diffMins, 'minute');
    }
    return rtf.format(-diffHours, 'hour');
  }

  if (diffDays < 30) {
    return rtf.format(-diffDays, 'day');
  }

  if (diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return rtf.format(-diffMonths, 'month');
  }

  const diffYears = Math.floor(diffDays / 365);
  return rtf.format(-diffYears, 'year');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength).trim()}...`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export type MultiLangName = {
  en?: string;
  fr?: string;
  de?: string;
  it?: string;
} | string;

export function getLocalizedName(name: MultiLangName | undefined | null, lang: string): string {
  if (!name) return '';
  if (typeof name === 'string') return name;
  return name[lang as keyof typeof name] || name.en || '';
}
