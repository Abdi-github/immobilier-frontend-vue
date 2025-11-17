import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PropertyCardGrid from '../PropertyCardGrid.vue';
vi.mock('vue-i18n', () => ({
    useI18n: () => ({ locale: { value: 'en' }, t: (key) => key }),
}));
vi.mock('@/shared/composables/useLocalizedName', () => ({
    useLocalizedName: () => (name) => name?.en ?? '',
}));
vi.mock('@/shared/utils/formatters', () => ({
    formatPrice: (price, currency) => `${currency ?? 'CHF'} ${price?.toLocaleString() ?? '0'}`,
}));
const mockProperty = {
    id: '42',
    external_id: 'ext-42',
    source_language: 'en',
    title: 'Modern Apartment',
    description: 'A lovely apartment',
    category_id: '1',
    category: { id: '1', name: { en: 'Apartment', fr: 'Appartement', de: 'Wohnung', it: 'Appartamento' }, slug: 'apartment', section: 'residential', is_active: true },
    transaction_type: 'rent',
    price: 2500,
    currency: 'CHF',
    additional_costs: 150,
    rooms: 3.5,
    surface: 85,
    address: 'Rue du Lac 10',
    city_id: '1',
    city: { id: '1', name: { en: 'Lausanne', fr: 'Lausanne', de: 'Lausanne', it: 'Losanna' }, canton_id: '1', postal_code: '1000', is_active: true },
    canton_id: '1',
    canton: { id: '1', name: { en: 'Vaud', fr: 'Vaud', de: 'Waadt', it: 'Vaud' }, code: 'VD', is_active: true },
    images: [
        { id: '1', property_id: '42', url: 'https://example.com/img1.jpg', is_primary: true, order: 0 },
        { id: '2', property_id: '42', url: 'https://example.com/img2.jpg', is_primary: false, order: 1 },
    ],
    status: 'PUBLISHED',
    published_at: new Date().toISOString(),
    created_at: '2025-01-01',
    updated_at: '2025-01-01',
};
const mountCard = (overrides = {}, isFavorite = false) => mount(PropertyCardGrid, {
    props: { property: { ...mockProperty, ...overrides }, isFavorite },
    global: {
        stubs: { 'router-link': { template: '<a :href="to"><slot /></a>', props: ['to'] } },
    },
});
describe('PropertyCardGrid', () => {
    it('renders property price', () => {
        const wrapper = mountCard();
        expect(wrapper.text()).toContain('CHF 2,500');
    });
    it('shows /month for rental properties', () => {
        const wrapper = mountCard({ transaction_type: 'rent' });
        expect(wrapper.text()).toContain('/month');
    });
    it('does not show /month for buy properties', () => {
        const wrapper = mountCard({ transaction_type: 'buy' });
        expect(wrapper.text()).not.toContain('/month');
    });
    it('renders category and rooms', () => {
        const wrapper = mountCard();
        expect(wrapper.text()).toContain('Apartment');
        expect(wrapper.text()).toContain('3.5 rooms');
    });
    it('renders city name and address', () => {
        const wrapper = mountCard();
        expect(wrapper.text()).toContain('Lausanne');
        expect(wrapper.text()).toContain('Rue du Lac 10');
    });
    it('renders surface area', () => {
        const wrapper = mountCard();
        expect(wrapper.text()).toContain('85 m²');
    });
    it('shows additional costs when present', () => {
        const wrapper = mountCard();
        expect(wrapper.text()).toContain('150');
        expect(wrapper.text()).toContain('costs');
    });
    it('has correct test id', () => {
        const wrapper = mountCard();
        expect(wrapper.find('[data-testid="property-card-42"]').exists()).toBe(true);
    });
    it('shows NEW badge for recently published property', () => {
        const wrapper = mountCard({ published_at: new Date().toISOString() });
        expect(wrapper.text()).toContain('NEW');
    });
    it('does not show NEW badge for old property', () => {
        const wrapper = mountCard({ published_at: '2020-01-01' });
        expect(wrapper.text()).not.toContain('NEW');
    });
    it('emits favorite event when heart is clicked', async () => {
        const wrapper = mountCard();
        const heartBtn = wrapper.find('button[aria-label="Add to favorites"]');
        await heartBtn.trigger('click');
        expect(wrapper.emitted('favorite')).toEqual([['42']]);
    });
    it('shows filled heart when isFavorite is true', () => {
        const wrapper = mountCard({}, true);
        const heartBtn = wrapper.find('button[aria-label="Remove from favorites"]');
        expect(heartBtn.exists()).toBe(true);
    });
    it('shows image navigation when multiple images', () => {
        const wrapper = mountCard();
        expect(wrapper.find('button[aria-label="Previous image"]').exists()).toBe(true);
        expect(wrapper.find('button[aria-label="Next image"]').exists()).toBe(true);
    });
    it('hides image navigation for single image', () => {
        const wrapper = mountCard({
            images: [{ id: '1', property_id: '42', url: 'https://example.com/img.jpg', is_primary: true, order: 0 }],
        });
        expect(wrapper.find('button[aria-label="Previous image"]').exists()).toBe(false);
    });
    it('renders placeholder when no images', () => {
        const wrapper = mountCard({ images: [] });
        expect(wrapper.find('img').exists()).toBe(false);
    });
});
