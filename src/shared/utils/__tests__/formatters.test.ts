import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  formatRentalPrice,
  formatArea,
  formatRooms,
  formatDate,
  truncateText,
  slugify,
  getLocalizedName,
} from '../formatters';

describe('formatPrice', () => {
  it('formats a standard price', () => {
    const result = formatPrice(1500000);
    expect(result).toContain('CHF');
    expect(result).toContain('1');
  });

  it('uses custom currency', () => {
    expect(formatPrice(1000, 'EUR')).toContain('EUR');
  });

  it('returns "Prix sur demande" for null', () => {
    expect(formatPrice(null)).toBe('Prix sur demande');
  });

  it('returns "Prix sur demande" for undefined', () => {
    expect(formatPrice(undefined)).toBe('Prix sur demande');
  });

  it('returns "Prix sur demande" for 0', () => {
    expect(formatPrice(0)).toBe('Prix sur demande');
  });
});

describe('formatRentalPrice', () => {
  it('formats rental price with month label', () => {
    const result = formatRentalPrice(1500);
    expect(result).toContain('CHF');
    expect(result).toContain('/mo');
  });

  it('uses custom month label', () => {
    const result = formatRentalPrice(1500, 'CHF', '/mois');
    expect(result).toContain('/mois');
  });

  it('returns "Prix sur demande" for null', () => {
    expect(formatRentalPrice(null)).toBe('Prix sur demande');
  });
});

describe('formatArea', () => {
  it('formats area with m² suffix', () => {
    expect(formatArea(120)).toContain('120');
    expect(formatArea(120)).toContain('m²');
  });

  it('returns "-" for null', () => {
    expect(formatArea(null)).toBe('-');
  });

  it('returns "-" for undefined', () => {
    expect(formatArea(undefined)).toBe('-');
  });
});

describe('formatRooms', () => {
  it('uses singular for 1 room', () => {
    expect(formatRooms(1)).toBe('1 room');
  });

  it('uses plural for multiple rooms', () => {
    expect(formatRooms(3)).toBe('3 rooms');
  });

  it('accepts custom singular/plural', () => {
    expect(formatRooms(1, 'pièce', 'pièces')).toBe('1 pièce');
    expect(formatRooms(3, 'pièce', 'pièces')).toBe('3 pièces');
  });

  it('returns "-" for null', () => {
    expect(formatRooms(null)).toBe('-');
  });
});

describe('formatDate', () => {
  it('formats a date string', () => {
    const result = formatDate('2025-06-15');
    expect(result).toBeTruthy();
    expect(result).not.toBe('-');
  });

  it('returns "-" for null', () => {
    expect(formatDate(null)).toBe('-');
  });

  it('returns "-" for undefined', () => {
    expect(formatDate(undefined)).toBe('-');
  });
});

describe('truncateText', () => {
  it('returns full text if under max length', () => {
    expect(truncateText('hello', 10)).toBe('hello');
  });

  it('truncates and adds ellipsis', () => {
    expect(truncateText('hello world foo bar', 10)).toBe('hello worl...');
  });

  it('handles exact length', () => {
    expect(truncateText('hello', 5)).toBe('hello');
  });
});

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('handles multiple spaces', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  it('removes leading/trailing hyphens', () => {
    expect(slugify(' -hello- ')).toBe('hello');
  });
});

describe('getLocalizedName', () => {
  const multiLang = { en: 'Lausanne', fr: 'Lausanne', de: 'Lausanne', it: 'Losanna' };

  it('returns name for requested locale', () => {
    expect(getLocalizedName(multiLang, 'it')).toBe('Losanna');
  });

  it('falls back to English', () => {
    expect(getLocalizedName(multiLang, 'es')).toBe('Lausanne');
  });

  it('handles string input', () => {
    expect(getLocalizedName('Zurich', 'fr')).toBe('Zurich');
  });

  it('returns empty string for null', () => {
    expect(getLocalizedName(null, 'en')).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(getLocalizedName(undefined, 'en')).toBe('');
  });
});
