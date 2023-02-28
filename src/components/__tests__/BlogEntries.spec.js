import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BlogEntries from '@/components/BlogEntries.vue'

describe('BlogEntries.vue test', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(BlogEntries)
    // the test is a bit problematic since it is based on
    // static data, both in terms of the array length and the array content
    // I think, the tests should be not that tight
    // that would change if we would fetch the blog entries
    // from a utility function, which we could mock.
    const numberOfEntries = 3
    expect(wrapper.vm.blogEntries.length).toEqual(numberOfEntries)
    const titles = wrapper.findAll('h2')
    expect(titles.length).toEqual(numberOfEntries)
    expect(titles[0].text()).toMatch('My Favorite Aspects of Vue')
  })
})
