<script setup>
import { ref } from '@vue/reactivity'

const footerMessage = ref('TestDriven.io')
</script>

<template>
    <footer>
        <h4>{{ footerMessage }}</h4>
    </footer>
</template>

<style scoped>
footer {
  text-align: center;
  border-top: 1px solid #88BBD6;
  padding: 10px;
}
</style>
