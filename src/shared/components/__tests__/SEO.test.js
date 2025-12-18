import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SEO from '../SEO.vue';
vi.mock('@unhead/vue', () => ({
    useHead: vi.fn(),
}));
import { useHead } from '@unhead/vue';
describe('SEO', () => {
    it('calls useHead with default title', () => {
        mount(SEO);
        expect(useHead).toHaveBeenCalled();
    });
    it('appends site name suffix to custom title', () => {
        mount(SEO, { props: { title: 'Properties' } });
        const call = vi.mocked(useHead).mock.calls.at(-1)?.[0];
        // title is a computed ref, resolve it
        const titleValue = typeof call.title?.value === 'string' ? call.title.value : call.title;
        expect(titleValue).toContain('Properties');
        expect(titleValue).toContain('Immobilier.ch');
    });
    it('does not duplicate suffix for default title', () => {
        mount(SEO, { props: { title: 'Immobilier.ch' } });
        const call = vi.mocked(useHead).mock.calls.at(-1)?.[0];
        const titleValue = typeof call.title?.value === 'string' ? call.title.value : call.title;
        expect(titleValue).toBe('Immobilier.ch');
    });
    it('renders slot content', () => {
        const wrapper = mount(SEO, {
            slots: { default: '<h1>Hello</h1>' },
        });
        expect(wrapper.find('h1').text()).toBe('Hello');
    });
});
