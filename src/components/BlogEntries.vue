<script setup>
import { ref } from 'vue'

// typically these entries would have been sored in a database
const blogEntries = ref([
  {
    index: 1,
    title: 'My Favorite Aspects of Vue',
    summary: 'This blog post describes my favorite aspects of Vue and how I came to pick Vue as my favorite JavaScript framework.',
    date: 'June 11th, 2022'
  },
  {
    index: 2,
    title: 'How to Use Components to Build Complex Web Applications',
    summary: 'This blog post describes the details of how to create re-usable Vue components that can be easily integrated together to make complex web applications.',
    date: 'May 27th, 2022'
  },
  {
    index: 3,
    title: 'Unit Testing a Pinia Data Store',
    summary: 'This blog post describes how to unit test a data store created with Pinia.',
    date: 'April 16th, 2022'
  }
])
</script>

<template>
    <main>
        <div
            v-for="entry in blogEntries"
            v-bind:key="entry.index"
            class="blog-card">
            <h2>{{ entry.title }}</h2>
            <p>{{ entry.summary }}</p>
            <p class="blog-entry-date">{{ entry.date }}</p>
        </div>
    </main>
</template>

<style scoped>
main {
  margin: 1.5em;
  padding: 0 2em;
  color: black;
  background: #CDCDCD;
}

.blog-card {
  padding: 1em 0;
}

h2 {
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 3px solid black;
}

p {
  padding: 10px 0;
  font-size: 1.2em;
}

.blog-entry-date {
  font-size: 0.7em;
  font-style: italic;
}
</style>
