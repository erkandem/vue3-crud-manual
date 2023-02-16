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

