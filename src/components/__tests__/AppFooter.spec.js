import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppFooter from '@/components/AppFooter.vue'

describe('AppFooter.vue Test', () => {
    it('renders the message in the footer corectly', () => {
        const wrapper = shallowMount(AppFooter);
        expect(wrapper.text()).toMatch('TestDriven.io');
    })

})