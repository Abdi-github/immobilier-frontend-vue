import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LoadingSpinner from '../LoadingSpinner.vue';

describe('LoadingSpinner', () => {
  it('renders with default medium size', () => {
    const wrapper = mount(LoadingSpinner);
    const icon = wrapper.find('i');
    expect(icon.classes()).toContain('pi-spinner');
    expect(icon.classes()).toContain('text-3xl');
  });

  it('renders small size', () => {
    const wrapper = mount(LoadingSpinner, { props: { size: 'sm' } });
    const icon = wrapper.find('i');
    expect(icon.classes()).toContain('text-xl');
  });

  it('renders large size', () => {
    const wrapper = mount(LoadingSpinner, { props: { size: 'lg' } });
    const icon = wrapper.find('i');
    expect(icon.classes()).toContain('text-5xl');
  });

  it('has spin animation class', () => {
    const wrapper = mount(LoadingSpinner);
    const icon = wrapper.find('i');
    expect(icon.classes()).toContain('pi-spin');
  });
});
