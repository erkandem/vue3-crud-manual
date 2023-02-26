import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import  App  from '@/App.vue'

describe('App.Vue Test', () => {
    it('components are utilized', () => {
        const wrapper = mount(App, {
              global: {
                  plugins: [
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
})