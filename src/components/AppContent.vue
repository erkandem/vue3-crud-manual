<script setup>
import { ref } from '@vue/reactivity'

const message = ref('Content goes here!')
</script>

<template>
    <main>
        <h1>{{ message }}</h1>
    </main>
</template>

<style scoped>
main {
  margin: 0 auto;
  max-width: 400px;
  padding: 1em;
}
</style>
