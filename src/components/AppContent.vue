<script setup>
import { ref } from '@vue/reactivity'
import ListUsers from './ListUsers.vue'

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
</script>

<template>
    <main>
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
