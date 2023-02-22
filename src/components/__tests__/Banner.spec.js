import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {shallowMount} from '@vue/test-utils'
import Banner from '@/components/Banner.vue'

describe('Banner.Vue renders the message into the component', () => {
    let wrapper = null
    beforeEach(() => {
        wrapper = shallowMount(
            Banner, {
                propsData: {
                    bannerMessage: '',
                    bannerType: ''
                }
            }
        )
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('initializes with correct elements', () => {
        const banner = wrapper.find('div')
        expect(banner.text()).toMatch('')
        expect(banner.isVisible()).toBe(false)
        expect(banner.attributes().style).toMatch('background-color: blue;')
    })
    it('renders the success style banner correctly', async () => {
        await wrapper.setProps({
            bannerMessage: 'Banner message 123',
            bannerType: 'Error'
        })

        // check that the banner message displays the error message
        const banner = wrapper.find('div')
        expect(banner.text()).toMatch('Banner message 123')
        expect(banner.isVisible()).toBe(true)
        expect(banner.attributes().style).toMatch('background-color: red;')
    })
    it('renders the error style banner correctly', async () => {
        await wrapper.setProps({
            bannerMessage: 'Banner message 456',
            bannerType: 'Success'
        })

        // check that the banner message displays the success message
        const banner = wrapper.find('div')
        expect(banner.text()).toMatch('Banner message 456')
        expect(banner.isVisible()).toBe(true)
        expect(banner.attributes().style).toMatch('background-color: green;')
    })
    it('renders the success style banner correctly', async () => {
        // set the prop data to display an info message
        await wrapper.setProps({
            bannerMessage: 'Banner message 789',
            bannerType: 'Info'
        })

        // check that the banner message displays the info message
        const banner = wrapper.find('div')
        expect(banner.text()).toMatch('Banner message 789')
        expect(banner.isVisible()).toBe(true)
        expect(banner.attributes().style).toMatch('background-color: blue;')
    })
    it('emits an event when the clear button is clicked', async () => {
        // set the prop data to display an error message
        await wrapper.setProps({
            bannerMessage: 'Banner message 123',
            bannerType: 'Error'
        })

        // trigger an event when the 'Clear' button is clicked
        await wrapper.find('span').trigger('click')

        // check that 1 occurrence of the event has been emitted
        const emittedEvent = wrapper.emitted('clearBanner')
        expect(emittedEvent).toHaveLength(1)
    })
})
