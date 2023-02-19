import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppContent from '@/components/AppContent.vue'

describe('AppContent.vue Test', () => {
  it('renders message when component is created', () => {
    const wrapper = shallowMount(AppContent)
    const h1Items = wrapper.findAll('h1')
    const expectedString = 'List of Users:'
    expect(wrapper.vm.message).toMatch(expectedString)
    expect(h1Items.length).toEqual(1)
    expect(h1Items[0].text()).toMatch(expectedString)
  })
})
