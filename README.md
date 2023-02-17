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

The v- for directive is the way to create for-loops in Vue.
This can e.g. be used to populate an unordered list with a dynamic amount of list elements.

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

### v-on and v-show directive

#### event listener
`v-on` is a directive which will attach listener to the element to which the directive is added as an attribute.

```html
<button v-on:click="displayUsers = !displayUsers">Display Users!</button>
```
This assumes that a `displayUsers` data-property exists. 
Notice that we can 
- change the value of the property and
- that we have access to the value of properties and
- apply logic to it.

Notice that the event here is a `click` on the element.
#### conditional visibility

`v-show` can be used to change the visibility of elements.
The following examples visibility is now conditional of the truth value of the  `displayUsers` data property
```html
<ul v-show="displayUsers">
</ul>
```
### v-if and v-else

The `v-if` directive has a similar effect as the  `v-show` directive.
The difference is that `v-show ` regulates the `display: none` style attribute
whereas the `v-if` creates / destroys the sub-elements.

`v-show` should be used for simple objects which are expected
to be toggled often.

`v-if` should be used for elements which are more complex, are rarely toggled bc
the state of the sub-elements will be more clear. 
```html
<main>
    <button v-on:click="displayUsers = !displayUsers">Display Users!</button>
    <h1>List of Users:</h1>
    <ul v-if="displayUsers">
        <li v-for="(user, index) in users" v-bind:key="user">{{ index }}: {{ user }}</li>
    </ul>
</main>
```

The tutorial advises to use the `v-else` directive after places where a `v-if` directive is used.
Both need to be on the same element hierarchy.
```html
<!-- valid -->
<div>
    <ul v-if="condition"></ul>
    <ul v-else></ul>
</div>
<!-- invalid bc if and else clause are on different levels -->
<div>
    <ul v-if="condition"></ul>
    <div>
        <ul v-else></ul>
    </div>
</div>

```

### methods 1
it is advised to leave logic in the JS instead of the html. 
As an example the toggling of the variable `displayUsers` data property is currently done
within the HTML:
```html
<button v-on:click="displayUsers = !displayUsers">Display Users!</button>
```

Instead, we can write a reusable method and link it up in the HTML instead.
```js
const = app = Vue.createApp({
    data () {
        return {
            property: 'value'
        } 
    }
});

```

### methods 2

The concept of data binding connects data in a Vue app with the attributes of an HTML element.
For example, we can access values of a form or field and process the data with methods.

```html
<div class="add-user-input">
    <input type="text" v-model="newUser" placeholder="Enter new user..."></input>
    <input type="submit" value="Add User" v-on:click="addNewUser(newUser)"></input>
</div>
...
<script>
    const app = Vue.createApp({
        data() {
            return {
                //...
                newUser: '',
                users: [
                ]
            }
        },
        methods: {
            //...
            addNewUser(newUserInput) {
                if (newUserInput !== '') {
                    this.users.push(newUserInput)
                    this.newUser = ''
                }
            }
        }
</script>
```
`v-model` creates a two-way data binding. If the user changes the value in the input field, the value in the data property
of the Vue instance will change. Likewise, the displayed string in the input field will change if the value of the data
property is changed.

`v-on:click` of the submit input field is used to capture the "send" event and process it with the method `addNewUser`.
The current value of `newUser` is used as an argument.

### computed properties 1

The `computed` property of the Vue application holds methods which 
can return values based on logic. They are comparable to a property on a Django model.
The advantage of a computed property is that we can take values of many data points into account.

```html

{{ renderingOfComputedValue }}
<script>
    const = Vue.createApp({
        data() {
            // ...
        },
        methods: {},
        computed: {
            renderingOfComputedValue () {
                return this.someValue + this.otherValue
            }
        }
            })
</script>
```

### computed properties 2

A search feature can be introduced as a more complex example for computed properties.
For that it is needed to collect the user input for the search term:

```html
<div class="search-user-input">
    <label for="searchInput">Search for:</label>
    <input type="text" v-model="searchName" id="searchInput"></input>
</div>
```

The input field has a data binding with the `searchName` data property.
Somehow, we would like to go through the list of users and filter out usernames
which match our criteria.

A method can be preferred if there is a distinct event triggering a calculation.
In the case of search it now common to get the results as we type.
Therefore, a computed property makes more sense.

```JS
const app = Vue.createApp({
    // ...
    computed: {
        // ...
        searchResults() {
            if (this.searchName !== '') {
                return this.users.filter(el => el.match(this.searchName));
            } else {
                return '';
            }
        }
    }
    // ...
});
```
The `filter` method of the array expects a function from us.
This is done on the go using an arrow style function.
Each element of the array will be evaluated against that function.
In our case, the `match` string method is used.

Finally, after 1) collecting the search term and 2) applying a filtering logic
we can 3) render the results:
```html
<ul>
    <li v-for="user in searchResults" v-bind:key="user">{{ user }}</li>
</ul>
```
Note that we use the computed property in a for loop.
The code woks although our searchResults returns two different types.
In the case of at least one search result, it returns an array of stings.
In the case of no result, it will return just an empty string


### style binding

HTML elements can be styled dynamically using Vue.
One way would be to modify the style inline by using setting a value to the `style` attribute.
Another way would be to predefine classes in our CSS file and switch the target tags class to our need.

#### inline style binding
```html
<li v-for="(user, index) in users" v-bind:style="{color: randomColor}" v-bind:key="user">{{ user }}</li>
```
Which would ask for a computed property `randomColor`, which returns valid css color values.

#### class based style binding

We bind the target elements class attribute to Vue using `v-bind:class` and set it to a 
computed method named `someFancyComputedValue`
```html
<div v-bind:class="someFancyComputedValue">Lorem Ipsum</div>

```
Our JS code would than look like:
```JS
// ...
computed: {
    // ...
    someFancyComputedValue() {
        if (this.condition) {
            return 'regularDivStyle';
        } else {
            return 'warningDivStyle';
        }
    }
    // ...
}
```
Of course that assumes that these selectors are defined in our CSS files:
```CSS
div regularDivStyle {
    color: black;
}
div warningDivStyle {
    color: orange;   
}
```

## Part 2

The second part is going to be about components, Vue build tools and testing.
As a preparation for the build tools, we are going to separate our JS code
from our HTML file into a file called `app.vue`.

### Components Part 1

Components are parts of an application. The syntax for defining a component is:

```JS
const app = Vue.createApp({});
app.component(
    'app-specific-name-for-component',
    {
        'template': '<div>Minimalist static template</div>'
    }
)
```

The `component` factory method takes two arguments.
The first argument is the component name. In this case it's `'app-specific-name-for-component'`.
The defined component can now be used in the area where our Vue app is mounted:
```HTML
<div id="vue-app">
    <app-specific-name-for-component></app-specific-name-for-component>
</div>
```
Notice the that it's advised to  use `app` as an additional namespace
to avoid collisions with builtin HTML tags (e.g. in the case of `header`).


## Vue build tools

The setup is going to be change to work with node and npm.
For that I followed the instructions from https://github.com/nodesource/distributions.

While the tutorial works with:
```sh
$ node -v
v16.16.0
$ npm -v
8.13.2
```
I have:
```sh
$ node -v
v18.14.1
$ npm -v
9.3.1
```
What could possibly go wrong?

The journey is continued with 
```sh
npm init vue@latest
```
Today I got `create-vue@3.5.0` vs `create-vue@3.3.0` described in the tut.

Summary of init options:
✔ Project name: … vue-crud-manual-auto
✔ Add TypeScript? … No
✔ Add JSX Support? … No
✔ Add Vue Router for Single Page Application development? … No
✔ Add Pinia for state management? … No
✔ Add Vitest for Unit Testing? … Yes
✔ Add an End-to-End Testing Solution? › No
✔ Add ESLint for code quality? …  Yes
✔ Add Prettier for code formatting? … No

After the right config for the folder was set in place we run:
```sh
npm install
```

The developement server in this version can be started with:
```sh
npm run dev
```

### Components Part 2

#### Project structure
The structure of a node supported app is:
```
.
├── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── base.css
│   │   └── main.css
│   ├── components
│   │   └── AppHeader.vue
│   └── main.js
```
The most basic Structure here is the component `AppHeader.vue`.
The components are going to be imported into `App.vue` and assembled to an app.
The assembled app is going to be imported into `main.js` where the mounting will take place.
`main.js` is going to be required from `index.html`.

#### Component Structure
The basic structure of a component file is:
```vue
<script setup>
</script>

<template>
</template>

<style scoped>
</style>
```

In this case the CSS defined here will only be applied to elements in that specific
file. The `scoped` keyword is responsible for that.

#### layering of CSS Files
The most basic CSS (e.g. resetting or normalize) is paced inside `base.css`.
`base.css` is imported into `main.css` with:

```css
@import "./base.css";
```
Finally, `base.css` is imported into `main.js` with:

```JS
import './assets/main.css'
```
