    const app = Vue.createApp({
        data() {
            return {
                navTitle: 'Vue Course',
                footerMessage: 'testdriven.io',
                newUser: '',
                users: [
                    'user1',
                    'user2',
                    'user3',
                    'user4',
                    'user5'
                ],
                usersTextColor: [
                    'black',
                    'black',
                    'black',
                    'black',
                    'black'
                ],
                displayUsers: false,
                displaySearch: false,
                searchName: ''
            };
        },
        computed: {
            searchTextClass() {
                if (this.searchName !== '') {
                    return 'searchTitleBold';
                } else {
                    return 'searchTitleNormal';
                }
            },
          numberOfUsersText() {
              if (this.users.length === 1) {
                  return 'There is 1 user.';
              } else {
                  return 'There are ' + this.users.length + ' users.';
              }
          },
          searchResults() {
              if (this.searchName !== '') {
                  return this.users.filter(el => el.match(this.searchName));
                } else {
                  return '';
              }
            }
        },
        methods: {
            toggleSearch() {
                this.displaySearch = !this.displaySearch;
            },
            changeDisplay() {
                this.displayUsers = !this.displayUsers;
            },
            addNewUser(newUserInput) {
                if (newUserInput !== '') {
                    this.users.push(newUserInput);
                    this.newUser = '';
                    for (let i = 0; i < this.users.length - 1 ; i++) {
                        this.usersTextColor[i] = 'black';
                    }
                    this.usersTextColor.push('darkgreen');
                }
            }
        }
    })
    const mountedApp = app.mount('#vue-app');
