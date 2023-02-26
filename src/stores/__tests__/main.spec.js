import {describe, it, expect, beforeEach} from 'vitest'
import {setActivePinia, createPinia} from 'pinia'
import {useBannerStore} from '@/stores/banner'


describe('Data Store Test', () => {
  let store = null

  beforeEach(() => {
    // create a fresh Pinia instance and make it active, so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())

    // create an instance of the data store
    store = useBannerStore()
  })

  it('initializes with correct values', () => {
    expect(store.bannerMessage).toMatch(/^$/)
    expect(store.bannerType).toMatch('Info')
  })

  it('test getters of the data store', () => {
    // Set the banner data
    store.bannerMessage = 'Successful Message'
    store.bannerType = 'Success'

    // Test the Getters
    expect(store.getBannerMessage).toMatch('Successful Message')
    expect(store.getBannerType).toMatch('Success')
  })

  it('test actions of the data store', () => {
    // Set the banner data
    store.bannerMessage = 'Successful Message'
    store.bannerType = 'Success'

    // Call the action
    store.setBannerData('Failed Message', 'Failure')

    // Test the results
    expect(store.bannerMessage).toMatch('Failed Message')
    expect(store.bannerType).toMatch('Failure')
  })
})