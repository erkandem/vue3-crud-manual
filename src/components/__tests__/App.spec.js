import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import router from '@/router'

import  App  from '@/App.vue'

describe('App.Vue Test', () => {
    it('Renders the Home Page', async () => {
        await router.push('/')
        const wrapper = mount(App, {
              global: {
                  plugins: [
                      router,
                      createTestingPinia({
                          createSpy: vi.fn
                      })
                  ]
              }
        });
        expect(wrapper.getComponent({name: 'AppHeader'}).exists()).toBeTruthy();
        expect(wrapper.getComponent({name: 'AppContent'}).exists()).toBeTruthy();
        expect(wrapper.getComponent({name: 'AppFooter'}).exists()).toBeTruthy();
    })

    it('Renders the About Page', async () => {
      await router.push('/about')
      const wrapper = mount(App, {
        global: {
          plugins: [
            router,
            createTestingPinia({
              createSpy: vi.fn
            })
          ]
        }
      })

      // check that the two subcomponents are rendered
      expect(wrapper.getComponent({ name: 'AppHeader' }).exists()).toBeTruthy()
      expect(wrapper.getComponent({ name: 'AppFooter' }).exists()).toBeTruthy()

      const heading = wrapper.findAll('h2')
      expect(heading.length).toEqual(1)
      expect(heading[0].text()).toMatch('About')
    })

    it('Renders the Blog page', async () => {
        await router.push('/blog')
        const wrapper = mount(App, {
              global: {
                  plugins: [
                      router,
                      createTestingPinia({
                          createSpy: vi.fn
                      })
                  ]
              }
        })
      // check that all 3 sub-components are rendered
      expect(wrapper.getComponent({ name: 'AppHeader' }).exists()).toBeTruthy()
      expect(wrapper.getComponent({ name: 'BlogEntries' }).exists()).toBeTruthy()
      expect(wrapper.getComponent({ name: 'AppFooter' }).exists()).toBeTruthy()
    })
})