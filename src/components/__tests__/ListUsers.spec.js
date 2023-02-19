import {describe, it, expect} from 'vitest'
import {shallowMount} from '@vue/test-utils'
import ListUsers from '@/components/ListUsers.vue'

describe('ListUsers.vue Test', () => {
    it('it renders the users into a table', () => {
        const users = [{
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
        const wrapper = shallowMount(
            ListUsers, {
                propsData: {
                    users: users
                }
            })
        const tableRows = wrapper.findAll('tr')
        expect(tableRows.length).toEqual(1 + users.length) // 1 * th + n * 'user objects in array'

        const tableHeaderRow = wrapper.findAll('th')
        expect(tableHeaderRow.length).toEqual(4)
        const tableCells = wrapper.findAll('td')
        expect(tableCells.length).toEqual(4 * users.length)
        expect(tableCells[0].text()).toMatch('1')
        expect(tableCells[1].text()).toMatch('User #1')
        expect(tableCells[2].text()).toMatch('user_1')
        expect(tableCells[3].text()).toMatch('email1@gmail.com')
    })
})
