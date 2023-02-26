import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest'
import {flushPromises, shallowMount} from '@vue/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import AppContent from '@/components/AppContent.vue'
import {useBannerStore} from '@/stores/banner'
import {createTestingPinia} from '@pinia/testing'

let mock = new MockAdapter(axios)
const usersURL = 'https://jsonplaceholder.typicode.com/users'

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

const getUpdateUser = () => {
  return {
    id: 1,
    name: 'Patrick',
    username: 'patrick456',
    email: 'patrick@email.com'
  }
}

const getSampleUser1 = () => {
  return {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz'
  }
}

const getSampleUser2 = () => {
  return {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv'
  }
}

const getSampleUsers = () => {
  return [getSampleUser1(), getSampleUser2()]

}

describe('AppContent.vue Test with a successful HTTP calls', () => {
  let wrapper = null
  let bannerStore = null

  beforeEach(() => {
    mock.onGet(usersURL).reply(200, getSampleUsers())
    mock.onPost(usersURL).reply(201, [getNewUser3()])
    mock.onDelete(usersURL + "/2").reply(200, [{id: 2}])
    mock.onPut(usersURL + "/1").reply(200, [])

    wrapper = shallowMount(AppContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    bannerStore = useBannerStore()
  })

  afterEach(() => {
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
    expect(mock.history.get[0].url).toMatch(usersURL)
    expect(mock.history.get[0].method).toMatch('get')
    // inspect fetched data
    expect(wrapper.vm.users.length).toEqual(2)
    expect(wrapper.vm.users[0].name).toMatch('Leanne Graham')
    expect(wrapper.vm.users[0].username).toMatch('Bret')
    expect(wrapper.vm.users[0].email).toMatch('Sincere@april.biz')
    expect(wrapper.vm.users[1].name).toMatch('Ervin Howell')
    expect(wrapper.vm.users[1].username).toMatch('Antonette')
    expect(wrapper.vm.users[1].email).toMatch('Shanna@melissa.tv')

    // inspect side effect in the axios call in the onMounted
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(1)
    expect(bannerStore.setBannerData).toHaveBeenCalledWith("SUCCESS! Loaded user data!", "Success")

  })

  it('saved the user data', async () => {
    expect(wrapper.vm.users.length).toEqual(2)
    const newUser3 = getNewUser3()

    wrapper.vm.createNewUser(newUser3)
    await flushPromises() //  bc already know that we will place an axios call in there

    // Check that one call was made to axios.post()
    expect(mock.history.post.length).toEqual(1)
    expect(mock.history.post[0].url).toMatch(usersURL)
    expect(mock.history.post[0].method).toMatch('post')
    expect(JSON.parse(mock.history.post[0].data)).toEqual(newUser3)

    expect(wrapper.vm.users.length).toEqual(3)
    expect(wrapper.vm.users[2].name).toMatch(newUser3.name)
    expect(wrapper.vm.users[2].username).toMatch(newUser3.username)
    expect(wrapper.vm.users[2].email).toMatch(newUser3.email)

    // check that the banner message indicates success
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(
      1 // GET request result when component is mounted
      + 1 // POST request is made
    )
    expect(bannerStore.setBannerData).toHaveBeenCalledWith("SUCCESS! User data was saved!", "Success")
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
    expect(mock.history.delete[0].url).toMatch(usersURL + "/" + deleteUser2.id)
    expect(mock.history.delete[0].method).toMatch('delete')
    // Check that the user data is properly set
    expect(wrapper.vm.users.length).toEqual(1)
    // check that the banner message indicates success
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(2)
    expect(bannerStore.setBannerData).toHaveBeenCalledWith(`SUCCESS! User #${deleteUser2.id} was deleted!`, "Success")
  })
  it('updates the data for user #1', async () => {
    // set the input data for the user to update
    const user1 = getSampleUser1()
    const updateUser = getUpdateUser()
    const user2 = getSampleUser2()
    expect(wrapper.vm.users[0].name).toMatch(user1.name)
    expect(wrapper.vm.users[0].username).toMatch(user1.username)
    expect(wrapper.vm.users[0].email).toMatch(user1.email)

    wrapper.vm.updateUser(updateUser)
    await flushPromises()

    // Check that one call was made to axios.put()
    expect(mock.history.put.length).toBe(1);
    expect(mock.history.put[0].url).toMatch(usersURL + '/1')
    expect(mock.history.put[0].method).toMatch('put')
    expect(JSON.parse(mock.history.put[0].data)).toEqual(updateUser) // note sure if this is able to work

    // Check that the user data is properly set
    expect(wrapper.vm.users.length).toEqual(2)
    expect(wrapper.vm.users[0].name).toMatch(updateUser.name)
    expect(wrapper.vm.users[0].username).toMatch(updateUser.username)
    expect(wrapper.vm.users[0].email).toMatch(updateUser.email)
    // ensure the second user wasn't modified
    expect(wrapper.vm.users[1].name).toMatch(user2.name)
    expect(wrapper.vm.users[1].username).toMatch(user2.username)
    expect(wrapper.vm.users[1].email).toMatch(user2.email)

    // check that the banner message indicates success
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(2)
    expect(bannerStore.setBannerData).toHaveBeenCalledWith(`SUCCESS! User #${updateUser.id} was updated!`, "Success")
  })
})

describe('AppContent.vue after a failed HTTP GET request', () => {
  let wrapper = null
  let bannerStore = null
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
    mock.onGet(usersURL).timeout()
    wrapper = shallowMount(AppContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    bannerStore = useBannerStore()
    await flushPromises()

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toMatch(usersURL)
    expect(mock.history.get[0].method).toMatch('get')
    expect(wrapper.vm.users.length).toEqual(0)
    // inspect side effect of changing banner status
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(1)
    expect(bannerStore.setBannerData).toHaveBeenCalledWith('ERROR! Unable to load user data!', "Error")
  })

  it('loads no user data when the HTTP GET request returned a 404', async () => {
    mock.onGet(usersURL).reply(404)
    wrapper = shallowMount(AppContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    bannerStore = useBannerStore()
    await flushPromises()

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toMatch(usersURL)
    expect(mock.history.get[0].method).toMatch('get')
    expect(wrapper.vm.users.length).toEqual(0)

    // check if store data was updated
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(1)
    expect(bannerStore.setBannerData).toHaveBeenCalledWith('ERROR! Unable to load user data!', "Error")
  })
})

describe('AppContent.vue Test with Successful HTTP GET, Failed HTTP POST and failed HTTP DELETE', () => {
  let wrapper = null
  let bannerStore = null

  beforeEach(() => {
    // Mock any GET request to the specified URL
    // NOTE: arguments for reply are (status, data, headers)
    mock.onGet(usersURL).reply(200, [
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
    mock.onPost(usersURL).reply(404)
    mock.onDelete(usersURL + "/2").reply(404)
    wrapper = shallowMount(AppContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    bannerStore = useBannerStore()
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
    expect(mock.history.post[0].url).toEqual(usersURL)
    expect(mock.history.post[0].method).toEqual('post')
    expect(JSON.parse(mock.history.post[0].data)).toEqual(newUser3) // note sure if this is able to work

    // check if store data was updated
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(2)
    expect(bannerStore.setBannerData).toHaveBeenCalledWith("ERROR! Unable to save user data!", "Error")

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
    expect(mock.history.delete[0].url).toMatch(usersURL + '/2')
    expect(mock.history.delete[0].method).toMatch('delete')

    // Check that the user data was not deleted
    expect(wrapper.vm.users.length).toEqual(2)

    // check that the banner message indicates failure
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(2)
    expect(bannerStore.setBannerData).toHaveBeenCalledWith(`ERROR! Unable to delete user #${deleteUser2.id}!`, "Error")
  })
})


