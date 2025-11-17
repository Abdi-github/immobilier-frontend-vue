import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSearchStore } from '../search.store';
describe('useSearchStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    it('starts with default values', () => {
        const store = useSearchStore();
        expect(store.transactionType).toBeNull();
        expect(store.categoryId).toBeNull();
        expect(store.cantonId).toBeNull();
        expect(store.page).toBe(1);
        expect(store.sort).toBe('newest');
        expect(store.hasActiveFilters).toBe(false);
    });
    it('computes hasActiveFilters correctly', () => {
        const store = useSearchStore();
        expect(store.hasActiveFilters).toBe(false);
        store.transactionType = 'rent';
        expect(store.hasActiveFilters).toBe(true);
    });
    it('includes only non-null params in queryParams', () => {
        const store = useSearchStore();
        store.transactionType = 'buy';
        store.cantonId = '5';
        const params = store.queryParams;
        expect(params.transaction_type).toBe('buy');
        expect(params.canton_id).toBe('5');
        expect(params.category_id).toBeUndefined();
        expect(params.city_id).toBeUndefined();
    });
    it('resets all filters', () => {
        const store = useSearchStore();
        store.transactionType = 'rent';
        store.categoryId = '1';
        store.cantonId = '2';
        store.cityId = '3';
        store.priceMin = 500;
        store.priceMax = 2000;
        store.roomsMin = 2;
        store.amenityIds = ['a1', 'a2'];
        store.sort = 'price_asc';
        store.page = 3;
        store.resetFilters();
        expect(store.transactionType).toBeNull();
        expect(store.categoryId).toBeNull();
        expect(store.cantonId).toBeNull();
        expect(store.cityId).toBeNull();
        expect(store.priceMin).toBeNull();
        expect(store.priceMax).toBeNull();
        expect(store.roomsMin).toBeNull();
        expect(store.amenityIds).toEqual([]);
        expect(store.sort).toBe('newest');
        expect(store.page).toBe(1);
        expect(store.hasActiveFilters).toBe(false);
    });
    it('sets page', () => {
        const store = useSearchStore();
        store.setPage(5);
        expect(store.page).toBe(5);
    });
    it('updates from URL query params', () => {
        const store = useSearchStore();
        store.updateFromQuery({
            transaction_type: 'rent',
            canton_id: '3',
            price_min: '1000',
            price_max: '3000',
            rooms_min: '2',
            sort_by: 'price_asc',
            page: '2',
        });
        expect(store.transactionType).toBe('rent');
        expect(store.cantonId).toBe('3');
        expect(store.priceMin).toBe(1000);
        expect(store.priceMax).toBe(3000);
        expect(store.roomsMin).toBe(2);
        expect(store.sort).toBe('price_asc');
        expect(store.page).toBe(2);
    });
});
