<script setup>
import { ref } from 'vue'
import EditUserModal from './EditUserModal.vue'

defineProps({
        users: {type: Array, required: true}
    })

const emit = defineEmits([
    'deleteUser',
    'updateUser'
])

const showEditModal = ref(false)
const userEditing = ref({})
const deleteUserCallback = (user) => {
    emit('deleteUser', user)
}

const updateUser = (user) => {
      showEditModal.value = false
    emit('updateUser',
        {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
        }
    )
}
const cancelEdit = () => {
  showEditModal.value = false
}

const editUser = (user) => {
    userEditing.value = user
    showEditModal.value = true
}
</script>

<template>
<table>
    <tr>
        <th>User ID</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Actions</th>
    </tr>
    <tr v-for="user in users" v-bind:key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>
            <!--
            the tutorial adds ID attributes to both with a constant value. that smells
            since ID attributes of an tag should be unique for a page

            -->
            <button
                class="deleteButton"
                v-bind:id="`deleteButton-${user.id}`"
                v-on:click="deleteUserCallback(user)"
            >
                Delete
            </button>
            <button
                class="editButton"
                v-bind:id="`editButton-${user.id}`"
                v-on:click="editUser(user)"
            >
                Edit
            </button>
        </td>
    </tr>
</table>
    <EditUserModal
        v-if="showEditModal"
        v-bind:user="userEditing"
        v-on:cancelEdit="cancelEdit"
        v-on:updateUser="updateUser"
    >
    </EditUserModal>
</template>

<style scoped>
table {
    margin-top: 0.5em;
    table-layout: fixed;
    border-collapse: collapse;
}
td, th {
    border: 1px solid #88BBD6;
    padding: 0.8rem;
    overflow: hidden;
}
th {
    text-align: center;
    background-color: #88BBD6;
    color: black;
}
tr:nth-child(even) {
      background-color: #CDCDCDB0;
}
tr:nth-child(odd) {
      background-color: #CDCDCD40;
}
button {
  background-color: #99D3Df;
  padding: 4px;
  border-radius: 4px;
  font-size: 0.8em;
  text-align: center;
  border: 1px solid black;
}
button:hover {
  background-color: #88BBD6;
  cursor: pointer;
}
button + button {
    margin-left: 0.4em;
}
</style>
