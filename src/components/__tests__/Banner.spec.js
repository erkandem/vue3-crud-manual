import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest'
import {shallowMount} from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import Banner from '@/components/Banner.vue'
import { useBannerStore } from '@/stores/banner'

describe('Banner.Vue renders the message into the component', () => {
  const factory = (
    initialBannerMessage = '',
    initialBannerType = 'Info'
  ) => {
    const wrapper = shallowMount(Banner, {
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
              initialState: {
                banner: {
                  bannerMessage: initialBannerMessage,
                  bannerType: initialBannerType
                }
              }
            })
          ]
        }
      }
    )
    const bannerStore  = useBannerStore()
    return { wrapper, bannerStore }
  }

  it('initializes with correct elements', () => {
    const { wrapper, bannerStore } = factory()
    const banner = wrapper.find('div')
    expect(banner.text()).toMatch('')
    expect(banner.isVisible()).toBe(false)
    expect(banner.attributes().style).toMatch('background-color: blue;')
  })

  it('renders the error style banner correctly', () => {
    const { wrapper, bannerStore } = factory('Banner message 123', 'Error')

    // check that the banner message displays the error message
    const banner = wrapper.find('div')
    expect(banner.text()).toMatch('Banner message 123')
    expect(banner.isVisible()).toBe(true)
    expect(banner.attributes().style).toMatch('background-color: red;')
  })
  it('renders the success style banner correctly',  () => {
    const { wrapper, bannerStore } = factory('Banner message 456', 'Success')

    // check that the banner message displays the success message
    const banner = wrapper.find('div')
    expect(banner.text()).toMatch('Banner message 456')
    expect(banner.isVisible()).toBe(true)
    expect(banner.attributes().style).toMatch('background-color: green;')
  })
  it('renders the info style banner correctly',  () => {
    // set the store data to display an info message
    const sampleMessage = 'Banner message 789'
    const { wrapper, bannerStore } = factory(sampleMessage, 'Info')

    // check that the banner message displays the info message
    const banner = wrapper.find('div')
    expect(banner.text()).toMatch(sampleMessage)
    expect(banner.isVisible()).toBe(true)
    expect(banner.attributes().style).toMatch('background-color: blue;')
  })
  it('emits an event when the clear button is clicked', async () => {
    // set the prop data to display an error message
    const { wrapper, bannerStore } = factory('Banner message 123', 'Error')

    // trigger an event when the 'Clear' button is clicked
    await wrapper.find('span').trigger('click')

    // check that 1 call was made to `store.setBannerData`
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(1)
    expect(bannerStore.setBannerData).toHaveBeenLastCalledWith('', 'Info')
  })
})
