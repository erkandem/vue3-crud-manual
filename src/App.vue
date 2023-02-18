<script setup>
    import {ref} from '@vue/reactivity';

    // @ is an alias for the src directory
    import AppHeader from '@/components/AppHeader.vue'
    import AppContent from '@/components/AppContent.vue'
    import AppFooter from '@/components/AppFooter.vue'
    const headerTitle = ref("Vue Project (Dynamic)")
</script>

<template>
    <AppHeader v-bind:title="headerTitle"></AppHeader>
    <AppContent></AppContent>
    <AppFooter></AppFooter>
</template>

<style scoped>
</style>
