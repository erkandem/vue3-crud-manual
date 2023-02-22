<script setup>
import axios from 'axios'
import {ref} from '@vue/reactivity'
import {onMounted} from 'vue'
import ListUsers from './ListUsers.vue'
import AddNewUser from './AddNewUser.vue'
import Banner from './Banner.vue'

const usersUrl = 'https://jsonplaceholder.typicode.com/users'
const message = ref('List of Users:')
const users = ref([])
const messageToDisplay = ref('')
const messageType = ref('info')
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
            .then((response) => {
                // handle success
                messageType.value = 'Success'
                messageToDisplay.value = 'SUCCESS! User data was saved!'
                // Add the user to the local array of users
                users.value.push(newUser) // actually, we would inspect the returned object and modify our component data based on the that
                // Increase the largest index used in the database
                largestUserIndex.value++
            })
            .catch((error) => {
                // handle error
                messageType.value = 'Error'
                messageToDisplay.value = 'ERROR! Unable to save user data!'
                console.log(String(error))
            })
            .finally((response) => {
                // always executed
                console.log('HTTP POST Finished!')
            })
    }
}

onMounted(
    async () => {
        axios.get(
            usersUrl
        ).then(
            (response) => {
                users.value = response.data
                console.log('GET successful: ' + response.request.url)
                largestUserIndex.value = users.value.length
                messageType.value = 'Success'
                messageToDisplay.value = 'SUCCESS! Loaded user data!'
            }
        ).catch(
            (error) => {
                console.log('An error occurred')
                messageType.value = 'Error'
                messageToDisplay.value = 'ERROR! Unable to load user data!'
            }
        ).finally(
            () => {
                console.log('Possibility to do clean up')
            }
        );
    }
)
const clearMessage = () => {
    messageToDisplay.value = ''
    messageType.value = 'Info' // which is the default
}
</script>

<template>
    <main>
        <Banner v-bind:bannerMessage="messageToDisplay" v-bind:bannerType="messageType" v-on:clearBanner="clearMessage"></Banner>
        <AddNewUser v-on:createUser="createNewUser"></AddNewUser>
        <h1>{{ message }}</h1>
        <ListUsers v-bind:users="users"></ListUsers>
    </main>
</template>

<style scoped>
main {
    margin: 0 auto;
    max-width: 450px;
    padding: 1em;
}
</style>
