<script setup>
const props = defineProps({
        users: {type: Array, required: true}
    })
const emit = defineEmits(['deleteUser'])

const deleteUserCallback = (user) => {
    emit('deleteUser',
        {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
        }
    )
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
        <td><button v-on:click="deleteUserCallback(user)">Delete</button></td>

    </tr>
</table>
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
</style>
