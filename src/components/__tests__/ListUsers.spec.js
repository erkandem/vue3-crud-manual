import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {shallowMount} from '@vue/test-utils'
import ListUsers from '@/components/ListUsers.vue'

function getSampleUsers(){
    return [{
            id: 1,
            name: 'User #1',
            username: 'user_1',
            email: 'email1@gmail.com',
        }, {
            id: 2,
            name: 'User #2',
            username: 'user_2',
            email: 'email2@gmail.com',
        }]
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
        expect(tableCells[0].text()).toMatch('1')
        expect(tableCells[1].text()).toMatch('User #1')
        expect(tableCells[2].text()).toMatch('user_1')
        expect(tableCells[3].text()).toMatch('email1@gmail.com')
        expect(tableCells[4].text()).toMatch('Delete')
    })

    it('emits an event when a user is deleted', async () => {
        const users = getSampleUsers()

        await wrapper.find('button').trigger('click')

        const emittedEvent = wrapper.emitted('deleteUser')
        expect(emittedEvent).toBeTruthy()
        expect(emittedEvent).toHaveLength(1)

    })
})
