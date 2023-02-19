<script setup>
import { ref } from '@vue/reactivity'
import ListUsers from './ListUsers.vue'
import AddNewUser from './AddNewUser.vue'

const message = ref('List of Users:')

const  users = ref([
  {
    id: 1,
    name: 'User #1',
    username: 'user_1',
    email: 'email1@gmail.com',
  },
  {
    id: 2,
    name: 'User #2',
    username: 'user_2',
    email: 'email2@gmail.com',
  },
  {
    id: 3,
    name: 'User #3',
    username: 'user_3',
    email: 'email3@gmail.com',
  },
])
const createNewUser = (user) => {
    if ((user.name !== '') && (user.email !== '') && (user.username !== '')) {
        let newUser = {
            id: users.value.length + 1 ,
            name: user.name,
            username: user.username,
            email: user.email
        }
        users.value.push(newUser)
    }
}
</script>

<template>
    <main>
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
