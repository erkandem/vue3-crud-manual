<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { onMounted } from 'vue'
import ListUsers from './ListUsers.vue'
import AddNewUser from './AddNewUser.vue'
import Banner from './Banner.vue'
import { useBannerStore } from '@/stores/banner'

const store = useBannerStore()

const usersUrl = 'https://jsonplaceholder.typicode.com/users'
const message = ref('List of Users:')
const users = ref([])
const largestUserIndex = ref(0)

const createNewUser = (user) => {
    if (
        (user.name !== '')
        && (user.email !== '')
        && (user.username !== '')
    ) {

        let newUser = {
            id: largestUserIndex.value + 1, // the ID would actually be assigned by the remote backend
            name: user.name,
            username: user.username,
            email: user.email
        }
        // Add the new user to the database via a HTTP POST call
        axios.post(usersUrl, newUser)
            .then((response) => {  // eslint-disable-line no-unused-vars
                // handle success
                store.setBannerData('SUCCESS! User data was saved!', 'Success')
                // Add the user to the local array of users
                users.value.push(newUser) // actually, we would inspect the returned object and modify our component data based on the that
                // Increase the largest index used in the database
                largestUserIndex.value++
            })
            .catch((error) => {
                // handle error
                store.setBannerData('ERROR! Unable to save user data!', 'Error')
                console.log(String(error))
            })
            .finally((response) => {  // eslint-disable-line no-unused-vars
                // always executed
                console.log('HTTP POST Finished!')
            })
    }
}

const deleteUser = (user) => {
    const userIndex = users.value.indexOf(user)
    axios.delete(usersUrl + '/' + user.id)
        .then((response) => {  // eslint-disable-line no-unused-vars
            store.setBannerData(`SUCCESS! User #${user.id} was deleted!`, 'Success')
            users.value.splice(userIndex, 1)
        })
        .catch((error) => {
            store.setBannerData(`ERROR! Unable to delete user #${user.id}!`, 'Error')
            console.log(String(error))
        })
        .finally((response) => {  // eslint-disable-line no-unused-vars
            console.log('HTTP DELETE Finished!')
        })
}

const updateUser = (user) => {
    const userIndex = users.value.findIndex((currentUser) => {
        if (currentUser.id === user.id) {
            return true
        }
    })

    axios.put(`${usersUrl}/${user.id}`, user)
        .then((response) => {  // eslint-disable-line no-unused-vars
            store.setBannerData(`SUCCESS! User #${user.id} was updated!`, 'Success')
            // Update the user in the local array of users
            // Big no, no ? Would do a GET or use the returned data at least
            // to modify the in-app data.
              users.value[userIndex].name = user.name
              users.value[userIndex].username = user.username
              users.value[userIndex].email = user.email
        })
        .catch((error) => {
            store.setBannerData(`ERROR! Unable to update user #${user.id}!`, 'Error')
            console.log(String(error))
        })
        .finally((response) => {  // eslint-disable-line no-unused-vars
      // always executed
      console.log('HTTP PUT Finished!')
    })
}

onMounted(
    async () => {
        axios.get(
            usersUrl
        ).then(
            (response) => {
                users.value = response.data
                largestUserIndex.value = users.value.length
                store.setBannerData('SUCCESS! Loaded user data!', 'Success')
            }
        ).catch(
            (error) => {  // eslint-disable-line no-unused-vars
                console.log('An error occurred')
                store.setBannerData('ERROR! Unable to load user data!', 'Error')
            }
        ).finally(
            () => {
                console.log('HTTP GET Users Finished!')
            }
        );
    }
)

</script>

<template>
    <main>
        <Banner></Banner>
        <AddNewUser v-on:createUser="createNewUser"></AddNewUser>
        <h1>{{ message }}</h1>
        <ListUsers
            v-bind:users="users"
            v-on:deleteUser="deleteUser"
            v-on:updateUser="updateUser"
        ></ListUsers>
    </main>
</template>

<style scoped>
main {
    margin: 0 auto;
    max-width: 450px;
    padding: 1em;
}
</style>
