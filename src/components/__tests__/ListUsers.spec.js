import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {shallowMount} from '@vue/test-utils'
import ListUsers from '@/components/ListUsers.vue'

const getSampleUser1 = () => {
  return {
    id: 1,
    name: 'Test User #1',
    username: 'user_1',
    email: 'test1@gmail.com',
  }
}

const getSampleUser2 = () => {
  return {
    id: 2,
    name: 'Test User #2',
    username: 'user_2',
    email: 'test2@gmail.com',
  }
}

const getSampleUsers = () => {
  return [getSampleUser1(), getSampleUser2()]
}

describe('ListUsers.vue Test', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(
      ListUsers, {
        propsData: {
          users: getSampleUsers()
        }
      })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('it renders the users into a table', () => {
    const users = getSampleUsers()

    const tableRows = wrapper.findAll('tr')
    expect(tableRows.length).toEqual(1 + users.length) // 1 * th + n * 'user objects in array'

    const tableHeaderRow = wrapper.findAll('th')
    expect(tableHeaderRow.length).toEqual(5)
    // check that 5 columns are created in the table
    expect(tableHeaderRow[0].text()).toMatch('User ID')
    expect(tableHeaderRow[1].text()).toMatch('Name')
    expect(tableHeaderRow[2].text()).toMatch('Username')
    expect(tableHeaderRow[3].text()).toMatch('Email')
    expect(tableHeaderRow[4].text()).toMatch('Actions')

    const tableCells = wrapper.findAll('td')
    expect(tableCells.length).toEqual(5 * users.length)
    expect(tableCells[0].text()).toMatch(String(users[0].id))
    expect(tableCells[1].text()).toMatch(users[0].name)
    expect(tableCells[2].text()).toMatch(users[0].username)
    expect(tableCells[3].text()).toMatch(users[0].email)
    expect(tableCells[4].text()).toMatch('Delete')
    expect(tableCells[4].text()).toMatch('Edit')

    // check that the Delete and Edit buttons are displayed
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toEqual(
      (
        1 // delete button
        + 1 // edit button
      ) * users.length
    )

    const deleteButtons = wrapper.findAll('.deleteButton') // switch ID for class selector and changed it in template aswell
    expect(deleteButtons.length).toEqual(2)
    expect(deleteButtons[0].isVisible()).toBe(true)
    expect(deleteButtons[1].isVisible()).toBe(true)

    const editButtons = wrapper.findAll('.editButton') // switch ID for class selector and changed it in template aswell
    expect(editButtons.length).toEqual(2)
    expect(editButtons[0].isVisible()).toBe(true)
    expect(editButtons[1].isVisible()).toBe(true)

  })

  it('emits an event when a user is deleted', async () => {
    await wrapper.find('button').trigger('click')

    const emittedEvent = wrapper.emitted('deleteUser')
    expect(emittedEvent).toBeTruthy()
    expect(emittedEvent).toHaveLength(1)
  })


  it('enables the modal when an edit button is clicked', async () => {
    const user1 = getSampleUser1()
    // trigger an event when the 'Edit' button is clicked
    await wrapper.findAll('button')[1].trigger('click')

    // check that the flag to enable the modal is set
    expect(wrapper.vm.showEditModal).toBeTruthy()

    // check that user #1 is set as the prop data for the modal
    expect(wrapper.vm.userEditing.id).toEqual(1)
    expect(wrapper.vm.userEditing.name).toMatch(user1.name)
    expect(wrapper.vm.userEditing.username).toMatch(user1.username)
    expect(wrapper.vm.userEditing.email).toMatch(user1.email)
  })

  it('disables the modal when the cancel event occurs', async () => {
    // set the flag to enable the modal
    wrapper.vm.showEditModal = true

    // simulate the 'cancelEdit' event being generated
    wrapper.vm.cancelEdit()

    // check that the flag to enable the modal is cleared
    expect(wrapper.vm.showEditModal).not.toBeTruthy()
  })

  it('emits an event when a user is updated', async () => {
    const user1 = {
      'id': 1,
      'name': 'Name1',
      'username': 'Username1',
      'email': 'Email1'
    }

    wrapper.vm.updateUser(user1)

    // check that 1 occurrence of the event has been emitted
    const emittedEvent = wrapper.emitted('updateUser')
    expect(emittedEvent).toHaveLength(1)
    expect(emittedEvent[0]).toEqual([user1])
  })
})
