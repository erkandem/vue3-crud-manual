<script setup>
import { ref } from 'vue'

const emit = defineEmits(['createUser'])
const user = ref({
    name: '',
    email: '',
    username: ''
})

// function addNewUser() {}
// const addNewUser => {}
const addNewUser = () => {
    if ((user.value.name !== '') && (user.value.username !== '') && (user.value.email !== '')) {

        emit('createUser', {
            name: user.value.name,
            email: user.value.email,
            username: user.value.username
        })
        user.value.name = ''
        user.value.email = ''
        user.value.username = ''
    }
}
</script>

<template>
    <form>
        <h1>Add a New User:</h1>
        <div class="field">
            <label for="newName">Name:</label>
            <input type="text" id="newName" v-model="user.name" placeholder="Name">
        </div>
        <div class="field">
            <label for="newEmail">Email:</label>
            <input type="text" id="newEmail" v-model="user.email" placeholder="Email">
        </div>
        <div class="field">
            <label for="newUsername">Username:</label>
            <input type="text" id="newUsername" v-model="user.username" placeholder="Username">
        </div>
        <div class="field">
            <button v-on:click.prevent="addNewUser">Add User</button>
        </div>
    </form>
</template>


<style scoped>
form {
    padding: 0.5px 0;
}

.field {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

label {
    margin: auto 0;
    font-weight: 600;
}

input {
    width: 80%;
    padding: 0.5em;
    border: 1px solid #999;
    border-radius: 2px;
}

.field + .field {
    margin-top: 0.2rem;
}

button, input[type="submit"] {
    background-color: #99D3Df;
    padding: 0.5em 2.5em;
    text-align: center;
    font-size: 1.2em;
    border-radius: 4px;
    border: 1px solid black;
}

button:hover, input[type="submit"]:hover {
    background-color: #88BBD6;
    cursor: pointer;
}
</style>