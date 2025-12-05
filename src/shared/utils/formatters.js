export function formatPrice(price, currency = 'CHF') {
    if (price === null || price === undefined || price === 0) {
        return 'Prix sur demande';
    }
    const formatted = price.toLocaleString('de-CH');
    return `${currency} ${formatted}`;
}
export function formatRentalPrice(price, currency = 'CHF', monthLabel = '/mo') {
    const basePrice = formatPrice(price, currency);
    if (price === null || price === undefined || price === 0) {
        return basePrice;
    }
    return `${basePrice}${monthLabel}`;
}
export function formatArea(area) {
    if (area === null || area === undefined) {
        return '-';
    }
    return `${area.toLocaleString('de-CH')} m²`;
}
export function formatRooms(rooms, singular = 'room', plural = 'rooms') {
    if (rooms === null || rooms === undefined) {
        return '-';
    }
    return `${rooms} ${rooms === 1 ? singular : plural}`;
}
export function formatDate(date, locale = 'en-CH') {
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
export function formatRelativeTime(date, locale = 'en') {
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
export function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return `${text.substring(0, maxLength).trim()}...`;
}
export function slugify(text) {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}
export function getLocalizedName(name, lang) {
    if (!name)
        return '';
    if (typeof name === 'string')
        return name;
    return name[lang] || name.en || '';
}
