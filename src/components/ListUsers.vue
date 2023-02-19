<script setup>
const props = defineProps({
        users: {type: Array, required: true}
    })
</script>

<template>
<table>
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
    </tr>
    <tr v-for="user in users" v-bind:key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
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
</style>
