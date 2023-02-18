import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import  App  from '@/App.vue'

describe('App.Vue Test', () => {
    it('components are utilized', () => {
        const wrapper = mount(App);
        expect(wrapper.getComponent({name: 'AppHeader'}).exists()).toBeTruthy();
        expect(wrapper.getComponent({name: 'AppContent'}).exists()).toBeTruthy();
        expect(wrapper.getComponent({name: 'AppFooter'}).exists()).toBeTruthy();
    })
})