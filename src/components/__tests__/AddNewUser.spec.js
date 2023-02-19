import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AddNewUser from '@/components/AddNewUser.vue'

let wrapper = null

beforeEach(() => {
    wrapper = shallowMount(AddNewUser)
})

afterEach(() => {
    wrapper.unmount()
})


describe('AddNewUser.vue Test', () => {
  it('initializes with correct elements', () => {
      const heading = wrapper.findAll('h1')
      expect(heading.length).toEqual(1)
      expect(heading[0].text()).toMatch('Add a New User:')

      const labels = wrapper.findAll('label')
      expect(labels.length).toEqual(3)
      expect(labels[0].text()).toMatch('Name:')
      expect(labels[1].text()).toMatch('Email:')
      expect(labels[2].text()).toMatch('Username:')
  })

  it('emits an event when a new user with valid data is added', async () => {
    // arrange
      const nameInput = wrapper.find('#newName')
      const emailInput = wrapper.find('#newEmail')
      const usernameInput = wrapper.find('#newUsername')
      const sampleUser = {
          name: 'name',
          email: 'user@example.com',
          username: 'username'
      }
      await nameInput.setValue(sampleUser.name)
      await emailInput.setValue(sampleUser.email)
      await usernameInput.setValue(sampleUser.username)
      // act
      await wrapper.find('button').trigger('click')
      // https://test-utils.vuejs.org/guide/essentials/forms.html#triggering-events
      // assert
      const emittedEvent = wrapper.emitted('createUser')
      expect(emittedEvent).toHaveLength(1)
      expect(emittedEvent[0]).toEqual([sampleUser])
      expect(nameInput.element.value).toBe('')
      expect(usernameInput.element.value).toBe('')
      expect(emailInput.element.value).toBe('')
      console.log(wrapper.emitted())
   })
  it('does not emit an event when a new user without data is added', async () => {
    await wrapper.find('button').trigger('click')
    // check that the event has NOT been emitted
    expect(wrapper.emitted('createUser')).toBeUndefined()
  })

})