<script setup> // eslint-disable-line vue/multi-word-component-names
import { computed } from 'vue'

const props = defineProps({
    bannerMessage: String,
    bannerType: String
})

// sending a message/data/signal from the child to the parent component
const emit = defineEmits(['clearBanner'])

// -------------------
// Computed Properties
// -------------------
const bannerBackgroundColor = computed(() => {
    if (props.bannerType === 'Error') {
        return 'red'
    } else if (props.bannerType === 'Success') {
        return 'green'
    } else {
        return 'blue'
    }
})

// -------
// Methods
// -------
const clearBannerMessage = () => {
    emit('clearBanner')
}

</script>

<template>
    <div v-show="bannerMessage" v-bind:style="{ 'background-color': bannerBackgroundColor }">
        <span id="errorMessageClear" v-on:click="clearBannerMessage">Clear</span>
        <p> {{ bannerMessage }}</p>
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
