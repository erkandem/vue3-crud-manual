import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '@/router/index'
import AppHeader from '@/components/AppHeader.vue'

describe('AppHeader.vue Test', () => {
  it('renders message when component is created', async () => {
    await router.push("/")
    const wrapper = mount(AppHeader,
        {
          propsData: {
            title: 'Vue Project'
          },
          global: {
            plugins: [router]
          }
        }
    )

    // check that the title is displayed
    expect(wrapper.text()).toMatch('Vue Project')

    // check that the 3 navigation links are displayed
    const items = wrapper.findAll('li')
    expect(items.length).toEqual(3)
    expect(items[0].text()).toMatch('Home')
    expect(items[1].text()).toMatch('About')
    expect(items[2].text()).toMatch('Contact')
  })
})
