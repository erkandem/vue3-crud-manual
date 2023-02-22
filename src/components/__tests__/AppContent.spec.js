import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import AppContent from '@/components/AppContent.vue'

let mock = new MockAdapter(axios)
const usersUrl = 'https://jsonplaceholder.typicode.com/users'

describe('AppContent.vue Test with a successful HTTP GET method', () => {
  let wrapper = null
  beforeEach(() => {
    mock.onGet(
        usersUrl
    ).reply(
      200,
      [
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz'
        },
        {
          id: 2,
          name: 'Ervin Howell',
          username: 'Antonette',
          email: 'Shanna@melissa.tv'
        }
      ]
    );
  wrapper = shallowMount(AppContent)
  })

  afterEach(() =>{
    mock.reset();
    wrapper.unmount()
  })

  it('renders message when the component is created', () => {
    // inspect heading
    const h1Items = wrapper.findAll('h1')
    const expectedString = 'List of Users:'
    expect(wrapper.vm.message).toMatch(expectedString)
    expect(h1Items.length).toEqual(1)
    expect(h1Items[0].text()).toMatch(expectedString)
    // inspect mock
    expect(mock.history.get.length).toBe(1)
    expect(mock.history.get[0].url).toMatch(usersUrl)
    expect(mock.history.get[0].method).toMatch('get')
    // inspect fetched data
    expect(wrapper.vm.users.length).toEqual(2)
    expect(wrapper.vm.users[0].name).toMatch('Leanne Graham')
    expect(wrapper.vm.users[0].username).toMatch('Bret')
    expect(wrapper.vm.users[0].email).toMatch('Sincere@april.biz')
    expect(wrapper.vm.users[1].name).toMatch('Ervin Howell')
    expect(wrapper.vm.users[1].username).toMatch('Antonette')
    expect(wrapper.vm.users[1].email).toMatch('Shanna@melissa.tv')
    // inspect side effect of changing banner status
    expect(wrapper.vm.messageToDisplay).toMatch('SUCCESS! Loaded user data!')
    expect(wrapper.vm.messageType).toMatch('Success')

  })
})

describe('AppContent.vue after a failed HTTP GET request',() => {
  let wrapper = null
  afterEach(() => {
    mock.reset();
    wrapper.unmount()
  })
  it('does not have users data if the request times out', async () => {
    // we need to configure the mock before we mount the component
    // because we expect a request to be run after the app is mounted.
    // Configuring the mock after `shallowMount` would miss the e.g.
    // the onMount() lifecycle hook.
    // Why call data after mount? To decrease the time for the first render (i.e. UX)
    mock.onGet(usersUrl).timeout()

    wrapper = shallowMount(AppContent)
    await flushPromises()

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toMatch(usersUrl)
    expect(mock.history.get[0].method).toMatch('get')
    expect(wrapper.vm.users.length).toEqual(0)
    // inspect side effect of changing banner status
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to load user data!')
    expect(wrapper.vm.messageType).toMatch('Error')

  })

    it('loads no user data when the HTTP GET request returned a 404', async () => {
    mock.onGet(usersUrl).reply(404)

    wrapper = shallowMount(AppContent)
    await flushPromises()

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toMatch(usersUrl)
    expect(mock.history.get[0].method).toMatch('get')
    expect(wrapper.vm.users.length).toEqual(0)
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to load user data!')
    expect(wrapper.vm.messageType).toMatch('Error')
  })
})
