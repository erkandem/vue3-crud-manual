<script setup>
import axios from 'axios'
import { ref } from '@vue/reactivity'
import { onMounted } from 'vue'
import ListUsers from './ListUsers.vue'
import AddNewUser from './AddNewUser.vue'
import Banner from './Banner.vue'

const usersUrl = 'https://jsonplaceholder.typicode.com/users'
const message = ref('List of Users:')
const  users = ref([])
const messageToDisplay = ref('')
const messageType = ref('info')

const createNewUser = (user) => {
    if (
        (user.name !== '')
        && (user.email !== '')
        && (user.username !== '')
    ) {
        let newUser = {
            id: users.value.length + 1 ,
            name: user.name,
            username: user.username,
            email: user.email
        }
        users.value.push(newUser)
    }
}

onMounted(
    async () => {
        axios.get(
            usersUrl
        ).then(
            (response) => {
                users.value = response.data
                console.log(users.value)
                messageType.value = 'Success'
                messageToDisplay.value = 'SUCCESS! Loaded user data!'
            }
        ).catch(
            (error) => {
                console.log('An error occurred')
                console.log('' + error)
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
