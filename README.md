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
The shorthand version for `v-on` is `@`.
```html
<button @click="displayUsers = !displayUsers">Display Users!</button>
```

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
??? Project name: ??? vue-crud-manual-auto
??? Add TypeScript? ??? No
??? Add JSX Support? ??? No
??? Add Vue Router for Single Page Application development? ??? No
??? Add Pinia for state management? ??? No
??? Add Vitest for Unit Testing? ??? Yes
??? Add an End-to-End Testing Solution? ??? No
??? Add ESLint for code quality? ???  Yes
??? Add Prettier for code formatting? ??? No

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
????????? index.html
????????? src
???   ????????? App.vue
???   ????????? assets
???   ???   ????????? base.css
???   ???   ????????? main.css
???   ????????? components
???   ???   ????????? AppHeader.vue
???   ????????? main.js
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

### Unit Testing 

In the tutorial unit testing is done with `vitest`.

#### File Structure

Tests are stored in the `components` folder within a subdirectory called `__tests__`.
The naming convention for tests is `<component name>.spec.js`.

```
????????? src
???   ????????? App.vue
???   ????????? assets
???   ???   ????????? base.css
???   ???   ????????? main.css
???   ????????? components
???   ???   ????????? AppHeader.vue
???   ???   ?????????__tests__ 
???   ???   ???   ????????? AppHeader.spec.js
..  ..  ..  ????????? ..
```

#### Test Files

The test files include import statements and the actual test code.
The following example in which the `AppHeader.vue` component is tested.
Full test file
```js
import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader.vue'

describe('AppHeader.vue Test', () => {
  it('renders message when component is created', () => {

    const wrapper = shallowMount(AppHeader)
    expect(wrapper.text()).toMatch('Vue Project')

    const items = wrapper.findAll('li')
    expect(items[2].text()).toMatch('Contact')
  })
})
```

First, testing utilities are imported.
They include 
 - `describe` which is used to mark a test suit (i.e. a group of tests),
 - `it` which is used to define a single unit test.
    `it` is an alias for `test. 
 - `expect` which is used to make assertions.

```js
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader.vue'
```

The suit of unit tests set up with `describe`. `describe` takes
a description and the test functions as an argument.
```js
describe('AppHeader.vue Test', () => {
    // individual tests
})
```
`describe` : https://vitest.dev/api/#describe

An individual test is written using `test` or its alies `it`
```JS
it('renders message when component is created', () => {
    // arrange act assert
})

```
`test`:https://vitest.dev/api/#test-api-reference
 
To make assertions on the component we are testing, we will need to run that component.
That is done with two utilities:

`shallowMount` will mock out subcomponents. This helps isolated testing but requires
another step of testing which checks the interaction of child nd parent component.
```js
const wrapper = shallowMount(AppHeader)
```
For that purpose, `mount` can be used which loads all child components.
```js
const wrapper = mount(AppHeader)
```
wrapper object returned by `mount` and `shallowMount`: https://test-utils.vuejs.org/api/#wrapper-methods

Finally, the assertions can be done on the now live app/component:
```js
expect(wrapper.text()).toMatch('Vue Project')
const items = wrapper.findAll('li')
expect(items[2].text()).toMatch('Contact')
```

`expect`: https://vitest.dev/api/expect.html

#### Running The Tests
Tests can be run with:

```sh
npm run test:unit
```
Missing components were suggested to be installed when I ran the command the first time.

A suggested adjustment of the commands within `package.json` is:

```JSON
{
  ...
  "scripts": {
    ...
    "test:unit": "vitest run --environment jsdom",
    "test:coverage": "vitest run --environment jsdom --coverage",
    "test:ui": "vitest --environment jsdom --coverage --ui",
    ...
  },
  ...
}
```
After this part of the tutorial, this is what my output looks like:

```sh
 npm run test:coverage

> vue-crud-manual-auto@0.0.0 test:coverage
> vitest run --environment jsdom --coverage


 RUN  v0.25.8 /home/kan/dev/js/vue-crud-manual
      Coverage enabled with c8

 ??? src/components/__tests__/AppFooter.spec.js (1)
 ??? src/components/__tests__/AppContent.spec.js (1)
 ??? src/components/__tests__/AppHeader.spec.js (1)
 ??? src/components/__tests__/App.spec.js (1)

 Test Files  4 passed (4)
      Tests  4 passed (4)
   Start at  13:46:40
   Duration  3.00s (transform 328ms, setup 1ms, collect 820ms, tests 149ms)

 % Coverage report from c8
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |     100 |      100 |     100 |     100 |                   
 src             |     100 |      100 |     100 |     100 |                   
  App.vue        |     100 |      100 |     100 |     100 |                   
 src/components  |     100 |      100 |     100 |     100 |                   
  AppContent.vue |     100 |      100 |     100 |     100 |                   
  AppFooter.vue  |     100 |      100 |     100 |     100 |                   
  AppHeader.vue  |     100 |      100 |     100 |     100 |                   
-----------------|---------|----------|---------|---------|-------------------
```

### Props

Props describe properties which can span across the components' hierarchy.
First, the title property need to marked to be dynamic:

```js 
// AppHeader.vue
<script setup>
const props = defineProps({
    title: {type: String, required: true}
})
</script>

<template>
    <h1>{{ title }}</h1>
</template>
```
#### passing via attribute key-value during usage:

```js
// App.vue
<template>
    <AppHeader title="Vue Project"></AppHeader>
</template>
```

#### passing props dynamically
passing prop values dynamically is recommended by the tutorial.

E.g. a variable named `headerTitle` is defined and initialized using `ref`.
```js
// App.vue
<script>
    ...
    const headerTitle = ref("Vue Project (Dynamic)")
</script>
```
And connected to the property called `title` in the scope of the AppHeader component.

```js
    <AppHeader v-bind:title="headerTitle"></AppHeader>
```

Just like in the static case, there must be a prop definition in the script part of the subcomponent:

```js 
// AppHeader.vue
<script setup>
const props = defineProps({
    title: {type: String, required: true}
})
</script>
```

#### changes to the unit tests
The structure of the unit tests can be kept as is.
However, since the component now expects external data during initialisation,
we will need to provide that additional data during tests by passing argument
to the `shallowMount` function:

```JS
    const wrapper = shallowMount(
        AppHeader,
        {
          propsData: {
            title: 'Vue Project'
          }
        }
    )
```

### slots

slot are a way to inherit HTML like elements. In contrast, props are 
better to pass data across component hierarchies.

In the subordinate component we define the location for a slot like this:

```JS
<template>
    <div>
        <slot name="message"></slot>
    </div>
</template>
```

In the parent component, this slot can be used with another `template` tag:

```js
<template>
    <template v-slot:message>Vue Project from TestDriven.io</template>
</template>
```

The naming can be omitted if there is just one slot.
A short version of `v-slot:message` would be `#:message`.

### components part 3

In this part, a table similar to the one in part 1 was created.
This time however with components and test coverage.

We defined created a new component `ListUsers` and defined the users data
to be passed from the parent via `props`.

As learned earlier the defineProps function is used for that. 
It does not need to be imported.

```js
<script setup>
const props = defineProps({
    users: {type: Array, required: true}
})
<script>
```

The component was than be assembled in the `AppConent` component.
```js
<script>
import { ref } from '@vue/reactivity'
const users = ref([{
    // data
}])
</script>

<template>
    <Listusers v-bind:users="users">
</template>
```

The table was dynamically rendered in the `ListUsers` component using the
`v-for` directive learned in part 1. The unique key to bind HTML elements to
was picked to be the `users.id` property:
```js
        // ...
<tr v-for="user in users" v-bind:key="user.id">
    <td> {{ user.id }}</td>
        // ...
```
### custom events

Props were used to propagate data from a parent to a child component.
Custom events enable data to flow the other way around.
The `AddNewUser` component was created to showcase that.

#### The child component code
First, our data variables are defined and marked to be reactive:
```js
const user = ref({
  name: '',
  username: '',
  email: ''
})
```
Note that the properties of the `user` variable (actually constant, but the values of the properties can be muted)
can be read or set with: 

```html
user.value.propertyName,
```
`ref` reference. https://vuejs.org/api/reactivity-core.html#ref

Next the `createUser` event to be emitted was declared:

```js
const emit = defineEmits(['createUser'])
```

Finally, the event and the arguments to it (form/field data) are prepared and emitted:
```js
const addNewUser = () => {
  emit('createUser', {
    name: user.value.name,
    username: user.value.username,
    email: user.value.email
  })
  // Clear the variables used for reading in the new user's info
  user.value.name = ''
  user.value.username = ''
  user.value.email = ''
}
```

The emitting function is connected to the submit button.
In our case, `v-on.click.prevent` was used to block an HTTP Post trigger.

```js
<form>
    //....
    <div class="field">
        <button v-on:click.prevent="addNewUser">Add User</button>
    </div>
    //...
</form>
```

#### the parent component code
The parent component `AppContent` stores the user data.
We want to add a new user to that array of user objects.
First, the new component is imported to the component and instantiated in the template part:

```js
<AddNewUser v-on:createUser="createNewUser"></AddNewUser>
```
An event listener is created for the `createUser` event and connected to the
`createNewUser` callback.

The callback could be defined like this:
```js
const createNewUser = (user) => {
  // Check that all fields are filled in before adding the user
  if ((user.name !== '') && (user.username !== '') && (user.email !== '')) {
    var newUser = {
      id: users.value.length + 1,
      name: user.name,
      username: user.username,
      email: user.email
    }

    // Add the user to the local array of users
    users.value.push(newUser)
  }
}
```

### Unite Testing Part III

The testing repertoire was extended to `setup` and `teardown`
methods.
In `vitest` they are called `beforeEach` and `afterEach`.
```js
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
```

In the case of the tests of `AddNewUser` component the mounting of the component
was moved out of the test in favour of hosting it in setup method.

Interestingly, the `wrapper` is a global variable and the setup and teardown method are
defined in the file itself. 

It was finally executed what was just mentioned before:
A test suit function can have multiple individual unit test functions.

Interestingly the async was taken care of in the latter test functions.
```js
describe('AddNewUser.vue Test', () => {
  it('initializes with correct elements', () => {
    //...
  })

  it('emits an event when a new user with valid data is added', async () => {
    //...
  })

  it('does not emit an event when a new user without data is added', async () => {
    //...
  })
})
```

It was introduced on how a value can be set to an element:

```js
  const nameInput = wrapper.find('#newName')
  await nameInput.setValue('Name1')
    // some action here
    // magic
    // ----
  expect(nameInput.element.value).toBe('')

```

First, elements can be selected with their `#id` using the `find` method.
A new value can be assigned to it using the `setValue` method.
Since, we want the changes to be reflected in the app and JS runs async
we want to await the `setValue` method to be sure, that it is done before we make
actions or assertions based the value.

Finally, during assertions the current value of the element can be read using
the syntax `variableNameOfElement.element.value`.

Interestingly, we can push buttons in our headless app.
It needs to be awaited for the same reason as we awaited the `setValue` method.
```js 
  await wrapper.find('button').trigger('click')
```

Last but not least, we asked for emitted event with: 

```js
const emittedEvent = wrapper.emitted('createUser')
```
We can also call it without a specific event name.
Below is the output of 
```js
      console.log(wrapper.emitted())
```
placed in test called `emits an event when a new user with valid data is added`:
```sh
...
stdout | src/components/__tests__/AddNewUser.spec.js > AddNewUser.vue Test > emits an event when a new user with valid data is added
{
  input: [ [ [Event] ], [ [Event] ], [ [Event] ] ],
  change: [ [ [Event] ], [ [Event] ], [ [Event] ] ],
  createUser: [ [ [Object] ] ],
  click: [ [ [MouseEvent] ] ]
}
...
```
A reminder to have namespaced event names to avoid collisions with builtin or our own events.

### Lifecycle Methods

A vue component or application has many stages from between the time
the code arrives at the browser and the time the page is visibly rendered.

Reference https://vuejs.org/guide/essentials/lifecycle.html.

On each step we can place hooks which can selectivly execute code while
our component passes through its lifecycle:

 - setup
 - beforeCreate
 - created
 - beforeMount
 - mounted
 - beforeUpdate
 - updated
 - beforeUnmount
 - unmounted

#### setup

This code is run first. in the composition API which was used in the 
single file component approach since part 2 this was called with the
script tag itself:
```
<script setup>
</script>
```
Using the options API the setup method could be plugged in with.
```html
<script>
const app = Vue.createApp({
  setup() {
      console.log("setup was called")
  }
// ..
</script>
```

#### onBeforeCreate

... is called 
 - after setup, 
 - before data and props are called

#### onCreated
 ... is called after 
 - reactive data,
 - computed properties,
 - methods and
 - watchers are available

#### onBeforeMount

... runs before the Vue instance is mounted into the Vue app or DOM element,
meaning that the code is not yet rendered to DOM elements itself.

#### onMounted

... is run after the component or Vue app has been mounted, implying that
all templates and logic within it was rendered to DOM  elements and the style
has been applied to the elements.

#### onBeforeUpdate

... is run when reactive data which the component depends on changes. An update
for the respective component is queued.

#### onUpdated

... is run after the change in reactive data has been reflected in the components
appearance.


#### onBeforeUnmount

... is called when an unmount event is queued but not executed yet.
Everything is still functionally intact at this point in time.

#### onUnmounted

... is called after 
 - all child components have been unmounted
 - computed properties are stopped
 - watchers are unplugged

Could be used for clean up.

The code is placed into the `part-3-lifecycle-hooks` branch.

### Loading Data via HTTP GET

The code in this chapter was developed beginning with the tests. True TDD.

#### Install Axios and its MockAdapter
axios is JS library to do HTTP requests.
The `requests` package of JS so to speak.
```sh
npm install axios --save
```
The `--save` flag adds the package to `package.json` as the prod dependency.

During the unit tests however we do not want to hit the real API.
For this purpose `axios-mock-adapter` is installed to the development requirements.
It has a similar purpose like mock and MagicMock for Python but is more targeted to
the axios library.
```sh
npm install axios-mock-adapter --save-dev
```
Axios Docs: https://axios-http.com/docs/intro
Axios Mock Adapter Docs: https://github.com/ctimmerm/axios-mock-adapter#readme

#### Test Cases


##### Multiple Suits per File and Multiple Tests per Suit 
It was shown that you can have several test suits in one file (i.e. `describe` sections)
just as well as multiple individual unit tests (i.e. `test()` or short `it`)

##### The Mocking Library
The mocking library is instantiated on the file level using:
```js
let mock = new MockAdapter(axios)
```
As such it is available for all test suits and unit test functions.

In contrast to an earlier test file the `beforeEach` and `afterEach` were defined within the `describe` section.
As the setup for each testsuite is going to be different, and we want to use multiple testsuits
within the same file it makes sense to narrow down the scope of the setup and teardown methods.
Importantly regarding the mock we want to reset it:
```js
  afterEach(() => {
    mock.reset();
    /...
  })
```
So it's cheaper to hit reset instead of getting a fresh new instance?

##### Catching the Lifecylce Method
The target location for the HTTP request is going to be the `onMounted` hook.
It's done after the first render to improve UX. To be ready for the hook being called
1) the mock needs to be configured 
2) before the component is mounted using e.g. `shallowMount`


###### Configuring the Mock

The response on a `get` method of the axios library can be defined per URL
with a specific status code integer, data object and header object
```js
beforeEach( () => {
    mock.onGet(url).reply(statusCode, data, header)
})
```

Just as well we can raise a timeout error:

```js
    //...
    mock.onGet(url).timeout();
    //...
```
The same pattern works for mocking other HTTP methods.
Responses to the HTTP POST method would be mocked with `mock.onPost(...)`

We can return any status code. As such we could test our code to handle 1s, 2s, 3s, 4s, 5s, or rogue ones.
```js
    //...
    mock.onGet(url).reply(418);
    //...
```

#### The Application Code

The HTTP request logic is packed into the `onMounted` lifecycle hook.
The syntax of the axios library is: 

```js
axios.get(url)
    .then((response) => {})
    .catch((error) => {})
    .finally()
```
Interestingly the `async` keyword was necessary to make the code work.

### The Banner Component

This will recap many topics previously touched.

#### Props
The data on which the banner is based is the result of the HTTP request to the remote API.
Since the call to the API takes place in `AppContent`, it makes sense to define the data there.

Since it's going to be used in a child component the way to go is `props`
In the parent component the constants are marked reactive using `ref`.
```js
const messageToDisplay = ref('')
const messageType = ref('info')
```
In the child component the props are defined using `defineProps`:
Implicitly, they are marked as not required.
```js
const props = defineProps({
    bannerMessage: String,
    bannerType: String
})
```

#### Emits
Emits are a way to send data or a signal from the child to the parent component.
In our case, the Banner component will host a button to clear the message with click.
Signal will be emitted to the parent component which can take care of mounting it.

The emit is declared in the child component.
```js
const emit = defineEmits(['clearBanner'])
```

It is then hooked to the HTML element via the  callback which will formally emit the signal:
```js
<script setup>
    //...
const clearBannerMessage = () =>  {
    emit('clearBanner')
}
</setup>
<template>
    ...
<span v-on:click="clearBannerMessage">Clear</span>
</template>
```

A listener is placed during the usage of the `Banner` component in the parent:

```js
<Banner v-on:clearBanner="clearMessage"></Banner>
```

If the `clearBanner` event is emitted from the `Banner` component, the `clearMessage` callback
will be triggered:
```js
const clearMessage = () => {
  messageToDisplay.value = ''
  messageType.value = 'Info'
}
```
The development was shortcut by one variable: the e.g. `showBanner` variable of boolean type.
This was done by connecting the `bannerMessage` called property in the `Banner` component
with the `div` element containing most of the banner.
```html
<div v-show="bannerMessage">
    <!-- -->
</div>
```
> An emtpy string in JavaScript evaluates to `false`
> 
#### Computed Property
The background color of the Banner was designed to match the status of the
HTTP request result. This means that it at least switches it value once from default
to success or error.

A way to handle such a situation is a computed property. As the reactive data
which is used in the method changes, the computed property is recomputed and so are
elements depending on its value:

```js
import { computed } from  'vue'

const bannerBackgroundColor = computed(() => {
  if (props.bannerType === 'Error') {
    return 'red'
  } else if (props.bannerType === 'Success') {
    return 'green'
  } else {
    return 'blue'
  }
})
```
This computed property is connected to the banner via `v-bind:style` directive set in the
containing `div` element
```js
<div v-bind:style="{ 'background-color': bannerBackgroundColor }">
</div>
```

#### Communicating the HTTP request Result via Side Effect

The AppContent module contains the API query. It is extended by setting the 
appropriate banner message and type via side effects:

```JS
onMounted(async () => {

axios.get(url)
   .then((response) => {
       //...
       messageType.value = 'Success'
       messageToDisplay.value = '...' 
       //...
   })
   .catch((error) => {
       //...
       messageType.value = 'Error'
       messageToDisplay.value = '...'
       //...
   })
})
```

#### Refactoring Ideas

TODO
The strings for the banner message, color and type could be defined in module
and exported within an object.
That would reduce the possibility for typos since it DRYs up the strings. I'm
especially thingking about the test methods.

Defining those strings in a module would also reduce maintenance burden and enable
better visibility of the usage in the IDE.

#### Testing Error Cases

`flushPromises` was used to await the effects of the error handling promis.
The documentation on that says:

> Why not just await button.trigger() ?
>As explained above, there is a difference between the time it takes for Vue to 
> update its components, and the time it takes for a Promise, like the 
> one from axios to resolve.

> A nice rule to follow is to always await on mutations like trigger or setProps.
> If your code relies on something async, like calling axios, add an await to the 
> flushPromises call as well.

Source: https://test-utils.vuejs.org/api/#flushpromises

### Creating a POST request

The `createNewUser` method in `AppContent` was extended to include a POST call
using Axios. Afterwards, the `users` prop was adjusted to the API call.

In reality, we would never include the ID upon creation but would leave that for the backend and
adjust our JS data accordingly.

The API responds with the exact data which was sent to it. That's why we got out of the woods in this tutorial.
We used our previously created banner to additionally display the status of the API call. 

The tests were mostly similar to the previous two chapters. In this chapter, the post call for th API 
was additionally configured.


### Delete Data via HTTP
A button was added to each row of the html table.
The buttons were hooked up to trigger the `deleteUserCallback` callback.
```js
<button v-on:click="deleteUserCallback(user)">Delete</button>
```

Of course, that event needed to be declared fist in the setup part:
```js
// ListUsers.vue
const emit = defineEmits(['deleteUser'])
```

The `deleteUserCallback` then emitted the signal to the parent component
```js
const deleteUserCallback = (user) => {
  emit('deleteUser', user)
}
```

The signal was listened to on the parent component and triggered the callback with
the same name as the event:

```js
// AppContent.vue
<ListUsers v-on:deleteUser="deleteUser"}
```

The `deleteUser` callback then did the API call using the axios library.
In this case, all data of the user was sent to endpoint.
However, in reality the endpoint, request data and response data would
depend on the used API.

In this chapter I utilized the template string of JS to compose the banner message.
The URL could have been rendered in a similar way:

```js
axios.delete(`https://something.com/endpoint/${user.id}`)
//...
```
As part of the success method, the `users` array needed to be adjusted to 
reflect the deletion of the user.

First we needed to identify the index of the specific user in our current array:
```js
const indexOfUserToDelete = users.value.indexOf(userObject)
```
Then, we needed to remove the user from the array:
```js
users.value.splice(indexOfUserToDelete, 1)
```
A JS basic which was used in this part:
```JS
> const list = [{id: 0}, {id: 1}, {id: 2}]
> const removedElement = list.splice(1, 1)
> list
 [{id: 0},  {id: 2}]
> removedElement
{id: 1}
```

TODO
Instead, I think I would prefer to do a GET request instead and just reload a clean
version of the data.

The tests showed the extension on the mock to cover a successful and failing `DELETE` request.
Some refactoring was done.

TODO
I would go a step further and write a test utils module.


### Updating Data via HTTP PUT

This was by far the most complex component of the course yet.

#### Description
We want to be able to edit a user entry in the table.
1) We want an edit button next to delete button. (It's not a good idea since to place edit right next to delete without space from UX perspective)
2) When the edit button is click we want a modal to open.
3) The modal should have fields to edit `name`, `username` and `email`.
4) These fields should be initialized with the data of the user whose edit button was clicked.
   (i.e. user data in the same row as clicked edit button)
5) The modal should have a submit and a cancel button.
6) If the user clicks anywhere else outside the modal, it's interpreted as cancel.
7) The cancel button should discard all changes.
8) The submit button should 
   a) send a query to the backend to update the data
   b) show the result of the update request to the backend  
   c) update the state of the user in the app accordingly


#### Other Lessons
 - `Array.findIndex(callable -> bool)` to get the index of the first object matching a filter function 
 - `Object.keys({a: 0, b: 1})` to get the names of the properties of an object
 - One attribute="value" per line style of coding to make code changes easier to figure out
 - Inspect the outgoing request data in e.g. POST and PUT queries to match expectations. 
 - `expect(editButtons[1].isVisible()).toBe(true)` syntax to be 
 - `expect(wrapper.vm.showEditModal).not.toBeTruthy()` syntax to check that sth evaluates to `false`
 - [expect](https://vitest.dev/api/expect.html#expect) has very rich methods and compares to the django unit tests (with other names) 
 - events where reraised in an intermediate component (e.g. updateUser)
 - `v-if` was used to clear the state of the modal
 - `v-on:click.stop=""` was used to block the registration of click events on the modal
 - dynamic assignment of HTML ID Tag (`v-bind:id="`deleteButton-${user.id}`"`)

## Part 4 - Pinia and Vue Router and Deployment

### Pinia I

`Pinia` is a `state management` tool, which describes the centralized
management of globally (i.e. used application wide) used data.

 - `Store`: describes the storage location of our data
 - `State`: describes the global data in our store(s)
 - `Getters`: describes methods for read access to data within a store
 - `Actions`: describes methods for write access to data within a store

#### Installing

```sh
npm install pinia
```
And its testing tool
```sh
npm install @pinia/testing --save-dev
```

#### Usage within Vue

It's used as a `plugin` in our application
```js
// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

####  Setting Up a Store

We created a new dir in the `src` dir called `store`
and created a new JS module.

In this case the banner.js name was chosen. 
```js
import { defineStore } from 'pinia'

export const useBannerStore = defineStore("banner", {
    state: () => ({}),
    getters: {},
    actions: {}
})
```
### Pinia II

This chapter showed how the props `bannerMessage` and `bannerType`
were refactored to be stored and managed using Pinia.

#### TDD of the Data Store

The data is stored in properties of the store object.
Two properties with the same name as the props were created in the `state` property
of the bannerStore Pinia object and initialized.

```js
//...
    state: () => ({
        bannerMessage: '',
        bannerType: 'Info'
    })
//...
```

Similarly, the getters and actions objects were populated with methods.
In the case of the `getters` property, the methods return the value of 
the property in the `state` object. The `state` object is injected as an
argument to every method in the `getters` object.

```js
getters: {
  getBannerMessage: (state) => { return state.bannerMessage }
  //...
}
```
The `actions` object methods are a bit different.
They take the new data as arguments.
After some modification/verification or other steps the existing data can
be overwritten using the `this` keyword.
```js 
// ..
actions: {
  setBannerData(message, type) {
    this.bannerMessage = message
    this.bannerType = type
  }
// ..
}
```

#### Refactoring the Tests and Application Code

Since the props are not supposed to be used anymore their inspection
hast to be refactored towards checking the value of the properties in the 
respective store.

That required some changes to the test setup.
1) the pinia mocking library and the store was imported
2) the `mount` and `shallowMount` calls were advanced by
  - adding the fake pinia as plugin
  - assigning a ["spy" function](https://vitest.dev/api/vi.html#vi-fn) on it which works like magic mock in python
  - defining an initial state for the values of the stored properties if needed
  - and providing above as a factory, such that the initial state could be set
    within the test

```js
//describe(...
  const factory = (
    initialBannerMessage = '',
    initialBannerType = 'Info'
  ) => {
    const wrapper = shallowMount(Banner, {
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
              initialState: {
                banner: {
                  bannerMessage: initialBannerMessage,
                  bannerType: initialBannerType
                }
              }
            })
          ]
        }
      }
    )
    const bannerStore  = useBannerStore()
    return { wrapper, bannerStore }
  }
```
createSpy docs: https://pinia.vuejs.org/cookbook/testing.html#specifying-the-createspy-function

Assertions like these, which used the props
```js
    expect(wrapper.vm.messageToDisplay).toMatch('SUCCESS! Loaded user data!')
    expect(wrapper.vm.messageType).toMatch('Success')
```
were refactored to be based on the `bannerStore`
```js
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(1)
    expect(bannerStore.setBannerData).toHaveBeenLastCalledWith('', 'Info')
```

2 New cool assertions thanks to the usage of the spy function:
 - toHaveBeenCalledTimes(integer) https://vitest.dev/api/expect.html#tohavebeencalledtimes
 - toHaveBeenLastCalledWith(arg, ...) https://vitest.dev/api/expect.html#tohavebeencalledwith

#### Anything else
I found that I sent the delete signal with smaller version of the user object.
In the actual delete method `users.indexOf(user)` was used to get the index.
However, `indexOf` expect an exact match, not a partial, at least for objects.

As a result I always got the index -1, which of course is wrong and indicates an error.
Funny enough it still worked to delete one user, but not the one a human user would have wanted to.

I fixed it by sending the complete `user` object as part of the call to `emit`.

### Vue Router

The router is an object to construct multiple routes for the application.
Rest principle. The way to implent this in vue is with `vue-router` which
is used as a plugin like pinia.

#### Router and Routes Definitions

The code for the routing is put in a separate folder.
```
.
????????? index.html
????????? src
???   ????????? App.vue
???   ????????? components
???   ????????? router
        ????????? index.js
```

The needed pieces of code are `createRouter` to create a ... router and
an object to configure how the URL should work.

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
```

`createWebHistory` will create URL in the structure of `example.com/filename`.
However, they describe that web server config could have a difficulty with that.

The config nginx config described in the docs for that is:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
Source: https://router.vuejs.org/guide/essentials/history-mode.html#nginx


Interestingly, we also learned how to use environment variables here:
```js
import.meta.env.BASE_URL
```

Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta

To be reachable, the module needs to `export` the variable.
In that case we can import the router variable using `import { router } from '@/router/index'`.
Thx to the `export default` we will not need to name the var and use ` import Alias from '@/router/index''`.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import


The Individual routes are described with an object of three properties:
path, name and component.
```js
// routes
    {
      path: '/blog',
      name: 'blog',
      // route level code-splitting
      // this generates a separate chunk (Blog.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BlogView.vue')
    }
```
The component can be described with `import("path/to/the/module")` or
the component can be imported and used in the definition


#### Plugging the Router into the Application

The router is plugged in like pinia into the Vue application.
Unlike pinia however, we plug in the configured var of our router module
instead of the library.
```js
import router from './router'
//
app.use(router)
```

#### Usage in the View

Usually, in an SPA, the main/center component is switched out.
In our case the `AppContent` component is switched out with a URL aware placeholder component
called `RouterView`

```js

<script setup>
import { RouterView } from 'vue-router'
<script>

<template>
   <AppContent>
   <RouterView></RouterView>
// ...
</template>
```

### Indicating the current Location

Lastly, the current location can be highlighted on the HTML itself.
But for that, we need to use the `RouterLink` element of the `vue-router`

```js
 <li><RouterLink to="/">Home</RouterLink></li>
```

This link component injects `class="router-link-active` and `router-link-exact-active` classes
into the `a` HTML tag which is currently active.


#### Testing 
Like pinia, the router is passed into the `mount` function
```js
const wrapper = mount(App, {
      global: {
          plugins: [
              router,
              createTestingPinia({
                  createSpy: vi.fn
              })
          ]
      }
});
```

If we want to test the site with specific route we will need to use:
```js
await router.push('/')
```
in case we want to hit the landing page. That makes it necessary to 
use the `async` keyword on the test callback declaration. 

If we want to test sth which depends on the current route
we will need to use `mount` instead of `shallowMount` (see tests for `AppHeader`)
