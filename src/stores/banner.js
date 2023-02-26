import { defineStore } from 'pinia'


export const useBannerStore = defineStore("banner", {
    state: () => ({
        bannerMessage: '',
        bannerType: 'Info'
    }),
    getters: {
        getBannerMessage: (state) => { return state.bannerMessage },
        getBannerType: (state) => { return state.bannerType }
    },
    actions: {
          setBannerData(message, type) {
              this.bannerMessage = message
              this.bannerType = type
          }
    }
})
