import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EmptyState from '../EmptyState.vue';

describe('EmptyState', () => {
  it('renders title', () => {
    const wrapper = mount(EmptyState, { props: { title: 'No results' } });
    expect(wrapper.find('h3').text()).toBe('No results');
  });

  it('renders description when provided', () => {
    const wrapper = mount(EmptyState, {
      props: { title: 'No results', description: 'Try adjusting your filters' },
    });
    expect(wrapper.find('p').text()).toBe('Try adjusting your filters');
  });

  it('hides description when not provided', () => {
    const wrapper = mount(EmptyState, { props: { title: 'No results' } });
    expect(wrapper.find('p').exists()).toBe(false);
  });

  it('uses default icon when not specified', () => {
    const wrapper = mount(EmptyState, { props: { title: 'Empty' } });
    const icon = wrapper.find('i');
    expect(icon.classes()).toContain('pi-inbox');
  });

  it('uses custom icon when specified', () => {
    const wrapper = mount(EmptyState, { props: { title: 'Empty', icon: 'pi-heart' } });
    const icon = wrapper.find('i');
    expect(icon.classes()).toContain('pi-heart');
  });

  it('renders slot content', () => {
    const wrapper = mount(EmptyState, {
      props: { title: 'Empty' },
      slots: { default: '<button>Reset filters</button>' },
    });
    expect(wrapper.find('button').text()).toBe('Reset filters');
  });
});
