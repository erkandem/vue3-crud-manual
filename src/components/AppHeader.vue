<script setup>
defineProps({
      title: {type: String, required: true}
    })
</script>

<template>
    <header>
        <div class="title">
            <h1>{{ title }}</h1>
        </div>
        <nav>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
  margin: auto;
  padding: 20px;
  background-color: #88BBD6;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

header .title {
  font-size: 1.0em;
  margin: auto;
}

nav {
  margin: auto;
}

nav ul {
  list-style: none;
}

nav li {
  display: inline-block;
  padding-left: 1em;
  font-size: 1.5em;
}

@media screen and (max-width: 700px) {
  header {
    flex-direction: column;
  }
  header .title {
    padding-bottom: 0.5em;
  }
}
</style>
