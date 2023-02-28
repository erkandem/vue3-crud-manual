<script setup>
    import { ref } from 'vue'
    import { RouterView } from 'vue-router'
    import AppHeader from '@/components/AppHeader.vue'
    import AppFooter from '@/components/AppFooter.vue'

    const headerTitle = ref("Vue Project (Dynamic)")
</script>

<template>
    <AppHeader v-bind:title="headerTitle"></AppHeader>
    <RouterView></RouterView>
    <AppFooter>
        <template v-slot:message>Vue Project from TestDriven.io</template>
        <template #:link><a href="https://testdriven.io">TestDriven.io</a></template>
    </AppFooter>
</template>

<style scoped>
</style>
