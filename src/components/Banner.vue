<script setup> // eslint-disable-line vue/multi-word-component-names
import { computed } from 'vue'
import  { useBannerStore } from '@/stores/banner'

const store = useBannerStore()

// -------------------
// Computed Properties
// -------------------
const bannerBackgroundColor = computed(() => {
    if (store.bannerType === 'Error') {
        return 'red'
    } else if (store.bannerType === 'Success') {
        return 'green'
    } else {
        return 'blue'
    }
})

// -------
// Methods
// -------
const clearBannerMessage = () => {
    store.setBannerData('', 'Info')
}

</script>

<template>
    <div v-show="store.getBannerMessage" v-bind:style="{ 'background-color': bannerBackgroundColor }">
        <span id="errorMessageClear" v-on:click="clearBannerMessage">Clear</span>
        <p> {{ store.getBannerMessage }}</p>
    </div>
</template>


<style scoped>
div {
  width: 100%;
  display:inline-block;
  margin-bottom: 15px;
}
span, p {
  padding: 15px;
  color: white;
  width: auto;
}
div {
  float: left;
}
#errorMessageClear {
  float: right;
}
#errorMessageClear:hover {
  color: black;
  cursor: pointer;
}
</style>
