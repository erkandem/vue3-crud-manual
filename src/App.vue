<script setup>
    import { ref } from 'vue';

    // @ is an alias for the src directory
    import AppHeader from '@/components/AppHeader.vue'
    import AppContent from '@/components/AppContent.vue'
    import AppFooter from '@/components/AppFooter.vue'
    const headerTitle = ref("Vue Project (Dynamic)")
</script>

<template>
    <AppHeader v-bind:title="headerTitle"></AppHeader>
    <AppContent>

    </AppContent>
    <AppFooter>
        <template v-slot:message>Vue Project from TestDriven.io</template>
        <template #:link><a href="https://testdriven.io">TestDriven.io</a></template>
    </AppFooter>
</template>

<style scoped>
</style>
