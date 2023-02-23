import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import AppContent from '@/components/AppContent.vue'

let mock = new MockAdapter(axios)
const usersGETUrl = 'https://jsonplaceholder.typicode.com/users'
const usersPOSTUrl = 'https://jsonplaceholder.typicode.com/users'

const getNewUser3 = () => {
  /* obviously, I should use a library to create random fake data like faker in python
  */
  return {
    id: 3,
    name: 'Patrick',
    username: 'patrick123',
    email: 'patrick@email.com'
  }
}
describe('AppContent.vue Test with a successful HTTP calls', () => {
  let wrapper = null
  beforeEach(() => {
    mock.onGet(
        usersGETUrl
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
    )
    mock.onPost(
        usersPOSTUrl
    ).reply(
        201,
        [
        getNewUser3()
        ]);
      mock.onDelete("https://jsonplaceholder.typicode.com/users/2").reply(200, [
    {
      id: 2
    }
  ])
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
    expect(mock.history.get[0].url).toMatch(usersGETUrl)
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

  it('saved the user data', async () => {
    expect(wrapper.vm.users.length).toEqual(2)
    const newUser3 = getNewUser3()

    wrapper.vm.createNewUser(newUser3)
    await flushPromises() //  bc already know that we will place an axios call in there

    // Check that one call was made to axios.post()
    expect(mock.history.post.length).toEqual(1)
    expect(mock.history.post[0].url).toMatch(usersPOSTUrl)
    expect(mock.history.post[0].method).toMatch('post')
    expect(JSON.parse(mock.history.post[0].data)).toEqual(newUser3)

    expect(wrapper.vm.users.length).toEqual(3)
    expect(wrapper.vm.users[2].name).toMatch(newUser3.name)
    expect(wrapper.vm.users[2].username).toMatch(newUser3.username)
    expect(wrapper.vm.users[2].email).toMatch(newUser3.email)

    // check that the banner message indicates success
    expect(wrapper.vm.messageType).toMatch('Success')
    expect(wrapper.vm.messageToDisplay).toMatch('SUCCESS! User data was saved!')
  })

  it('deletes the user #2 data', async () => {
    let deleteUser2 = {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv'
    }
    // our AppContent component is going to call the API.
    // We mocked it in the `beforeEach` above to return 2 users
    expect(wrapper.vm.users.length).toEqual(2)

    wrapper.vm.deleteUser(deleteUser2)
    await flushPromises()

    // Check that one call was made to axios.delete()
    expect(mock.history.delete.length).toBe(1)
    expect(mock.history.delete[0].url).toMatch('https://jsonplaceholder.typicode.com/users/2')
    expect(mock.history.delete[0].method).toMatch('delete')
    // Check that the user data is properly set
    expect(wrapper.vm.users.length).toEqual(1)
    // check that the banner message indicates success
    expect(wrapper.vm.messageToDisplay).toMatch('SUCCESS! User #2 was deleted!')
    expect(wrapper.vm.messageType).toMatch('Success')

  })

})

describe('AppContent.vue after a failed HTTP GET request', () => {
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
    mock.onGet(usersGETUrl).timeout()

    wrapper = shallowMount(AppContent)
    await flushPromises()

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toMatch(usersGETUrl)
    expect(mock.history.get[0].method).toMatch('get')
    expect(wrapper.vm.users.length).toEqual(0)
    // inspect side effect of changing banner status
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to load user data!')
    expect(wrapper.vm.messageType).toMatch('Error')

  })

    it('loads no user data when the HTTP GET request returned a 404', async () => {
    mock.onGet(usersGETUrl).reply(404)

    wrapper = shallowMount(AppContent)
    await flushPromises()

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toMatch(usersGETUrl)
    expect(mock.history.get[0].method).toMatch('get')
    expect(wrapper.vm.users.length).toEqual(0)
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to load user data!')
    expect(wrapper.vm.messageType).toMatch('Error')
  })
})

describe('AppContent.vue Test with Successful HTTP GET, Failed HTTP POST and failed HTTP DELETE', () => {
  let wrapper = null

  beforeEach(() => {
    // Mock any GET request to the specified URL
    // NOTE: arguments for reply are (status, data, headers)
    mock.onGet(usersGETUrl).reply(200, [
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
    ])

    // Mock any POST request to the specified URL
    // NOTE: arguments for reply are (status, data, headers)
    mock.onPost(usersPOSTUrl).reply(404)

  mock.onDelete(
    "https://jsonplaceholder.typicode.com/users/2"
  ).reply(
    404,
  )
    // render the component
    wrapper = shallowMount(AppContent)
  })

  afterEach(() => {
    mock.reset();
    wrapper.unmount()
  })

  it('does not save the new user data on failed HTTP POST call', async () => {
    const newUser3 = getNewUser3()
    expect(wrapper.vm.users.length).toEqual(2)

    wrapper.vm.createNewUser(newUser3)
    await flushPromises()

    expect(mock.history.post.length).toEqual(1)
    expect(mock.history.post[0].url).toEqual(usersPOSTUrl)
    expect(mock.history.post[0].method).toEqual('post')
    expect(JSON.parse(mock.history.post[0].data)).toEqual(newUser3) // note sure if this is able to work

    // check if props were set via side effects
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to save user data!')
    expect(wrapper.vm.messageType).toMatch('Error')

    // check that the component users data was not changed
    expect(wrapper.vm.users.length).toEqual(2)

  })

  it('does not delete the user data on failed HTTP DELETE call', async () => {
    // set the input data for the user to delete
    let deleteUser2 = {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    }

    wrapper.vm.deleteUser(deleteUser2)
    await flushPromises()

    // Check that one call was made to axios.delete()
    expect(mock.history.delete.length).toBe(1);
    expect(mock.history.delete[0].url).toMatch('https://jsonplaceholder.typicode.com/users/2')
    expect(mock.history.delete[0].method).toMatch('delete')

    // Check that the user data was not deleted
    expect(wrapper.vm.users.length).toEqual(2)

    // check that the banner message indicates failure
    expect(wrapper.vm.messageType).toMatch('Error')
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to delete user #2')
  })
})


