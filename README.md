# TDD Vue.js crud course 

This Readme contains summaries of the chapters


## Part 1

### getting started
In this section of part 1, we will learn how to:
 - hook the Vue.js library into our page
 - initialize and plug a Vue application into our page and
 - demonstrate the rendering of values

#### getting Vue.js
The Vue.js script can be loaded from CDN

```html
<script src="https://unpk.com/vue@3"></script>
```

An instance of the app must be created.

#### Creating an app and mounting it
```html
<script type="text/javascript">
    const = app = Vue.createApp({})
</script>
```

The instance of the app can then be mounted to an `entrypoint`.
The entrypoint is defined with an `id`-attribute for an html container tag such as a div-tag

```html
...
<body>
    <div id="app-entrypoint">
    </div>
</body>
...
```

If the entrypoint is defined, it can be passed on the instantiated app.
This done using the `mount` method of the instance which expects the id-tag of the entrypoint as an argument

```html
...
<script type="text/javascript">
    const = app = Vue.createApp({})
    const mountedApp = app.mount('#app-entrypoint')
</script>
...
```

#### Rendering of data into page

By defining a method called `data` it is possible to use the contents of the returned object to render into the page

```JS
const app = Vue.createApp(
    {
        data () {
            return {
                property1: 'value',
                property2: 'otherValue'
            }
        }
    }
)
```

Rendering the values is done by placing the property name at the desired rendering place within double curley braces.
Of course, the rendering location must be within or within a child tag of the tag which is our entrypoint.s

```html
<div id="#app-entrypoint">
    <div>{{ property1 }}
...
```

#### dev tools
Plugins for major browsers are available.
They might help during debugging

https://devtools.vuejs.org/

### v-for Directive

The v- for directive is the way to create for loops.
This can e.g. be used to populate an unordered list with a dynamic amount of list elements

```JS
<ul>
    <li v-for="user in users" v-bind:key="user">{{ user }}</li>
</ul>
```
It assumes that, we have a `users` property in the `data` property/object of the Vue app and
that it is an iterable (e.g. list of strings).

We can additionally unpack the index


```JS
<ul>
    <li v-for="(user, index) in users" v-bind:key="user">{{ index }}: {{ user }}</li>
</ul>
```
