import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppFooter from '@/components/AppFooter.vue'

describe('AppFooter.vue Test', () => {
    it('renders the message in the footer corectly', () => {
        const wrapper = shallowMount(
            AppFooter,
            {
                slots: {
                    message: 'Vue Project',
                    link: '<a href="https://testdriven.io">TestDriven.io</a>'
                }
            }
        );
        expect(wrapper.text()).toMatch('Vue Project')

        const items = wrapper.findAll('a')
        expect(items.length).toEqual(1)
        expect(items[0].text()).toMatch('TestDriven.io')

    })

})