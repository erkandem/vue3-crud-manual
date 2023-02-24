import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {shallowMount, flushPromises} from '@vue/test-utils'
import EditUserModal from '@/components/EditUserModal.vue'

const getSampleUser = () => {
  return {
    id: 1,
    name: 'test',
    username: 'testUsername',
    email: 'test@example.com'
  }
}

describe('EditUserModal.vue Test', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = shallowMount(EditUserModal, {
      propsData: {
        user: getSampleUser()
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the fields for editing a user when component is created', async () => {
    await flushPromises()
    // check that the heading text is rendered
    const heading = wrapper.findAll('h1')
    expect(heading.length).toEqual(1)
    expect(heading[0].text()).toMatch('Edit User:')

    // check that 3 labels are created
    const labels = wrapper.findAll('label')
    expect(labels.length).toEqual(3)
    expect(labels[0].text()).toMatch('Name:')
    expect(labels[1].text()).toMatch('Username:')
    expect(labels[2].text()).toMatch('Email:')

    const sampleUser = getSampleUser()
    // check that the prop data is used to initialize the input fields
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toEqual(3)
    expect(inputs[0].element.value).toMatch(sampleUser.name)
    expect(inputs[1].element.value).toMatch(sampleUser.username)
    expect(inputs[2].element.value).toMatch(sampleUser.email)

    // check that 2 buttons are created
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toEqual(2)
    expect(buttons[0].text()).toMatch('Update')
    expect(buttons[1].text()).toMatch('Cancel')
  })

  it('emits an event the cancel button is clicked', async () => {
    // trigger an event when the 'Cancel' button is clicked
    await wrapper.find('.cancelButton').trigger('click')

    // check that 1 occurrence of the event has been emitted
    const emittedEvent = wrapper.emitted('cancelEdit')
    expect(emittedEvent).toHaveLength(1)
  })

  it('emits an event the backdrop is clicked', async () => {
    // trigger an event when the modal backdrop is clicked
    await wrapper.find('.modal-backdrop').trigger('click')

    // check that 1 occurrence of the event has been emitted
    const emittedEvent = wrapper.emitted('cancelEdit')
    expect(emittedEvent).toHaveLength(1)
  })

  it('emits an event when the update button is clicked', async () => {
        const sampleUser = getSampleUser()

  // set the input data for the user
  const nameInput = wrapper.find('#newName')
  const usernameInput = wrapper.find('#newUsername')
  const emailInput = wrapper.find('#newEmail')
  await nameInput.setValue(sampleUser.name)
  await usernameInput.setValue(sampleUser.username)
  await emailInput.setValue(sampleUser.email)

  // trigger an event when the 'Submit' button is clicked
  await wrapper.find('.submitButton').trigger('click')

  // check that 1 occurrence of the event has been emitted
  const emittedEvent = wrapper.emitted('updateUser')
  expect(emittedEvent).toHaveLength(1)
  expect(emittedEvent[0]).toEqual([sampleUser])
})
})