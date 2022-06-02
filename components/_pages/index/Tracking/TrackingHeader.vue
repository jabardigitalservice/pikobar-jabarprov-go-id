<template>
  <div class="container mx-auto">
    <div class="flex lg:flex-col m-10 lg:mx-56 md:m-8 md:p-8">
      <div class="flex flex-col gap-2">
        <h2 class="text-4xl font-bold leading-tight text-center md:text-left">
          Lacak Permohonan
        </h2>
        <p class="mb-6 mt-2 text-base opacity-75 leading-tight text-center md:text-left">
          Cari tahu status permohonan obat/vitamin di sini.
        </p>
        <h2 class="text-2xl md:text-2xl font-semibold leading-tight text-gray-500 mb-2 mt-4 text-left">
          Isi ID Request/NIK di bawah
        </h2>
        <p class="text-base opacity-75 leading-tight">
          ID Request/NIK
        </p>
        <div class="relative rounded-md shadow-sm">
          <div class="icon-search">
            <span class="text-gray-500 sm:text-sm">
              <FontAwesomeIcon :icon="icons.faSearch" />
            </span>
          </div>
          <input
            id="search"
            v-model="searchTracking"
            type="text"
            name="search"
            class="block pl-8 py-2 sm:text-sm border rounded-md w-full"
            :class="{
              'border-red-500': !isValid
            }"
            placeholder="Tulis ID Request/NIK"
            @keyup.enter="onSearch"
          >
        </div>
        <span
          class="text-xs text-red-500 -mt-2"
          :class="{
            'hidden': isValid
          }"
        >
          This field is required
        </span>
        <vue-recaptcha
          ref="recaptcha"
          :sitekey="recaptchaKey"
          :load-recaptcha-script="true"
          size="invisible"
          @verify="verifyCaptcha"
          @expired="onRecaptchaExpired"
          @error="onRecaptchaError"
        />
        <button
          class="sm:mr-0 bg-brand-green-darker hover:opacity-75 lg:w-full search-button"
          @click="onSearch"
        >
          <Spinner v-if="isLoading" />
          <span v-else>Cari</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import VueRecaptcha from 'vue-recaptcha'
import Spinner from '~/components/Spinner'
export default {
  components: {
    VueRecaptcha,
    Spinner
  },
  props: {
    isSearched: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faSearch
      },
      recaptchaKey: process.env.ISOMAN_RECAPTCHA_KEY,
      isSearch: this.isSearched,
      searchTracking: '',
      captchaResponse: null,
      isLoading: false,
      isValid: true
    }
  },
  watch: {
    searchTracking (val) {
      this.isValid = val !== ''
    }
  },
  methods: {
    async verifyCaptcha (response) {
      this.captchaResponse = response
      this.$refs.recaptcha.reset()
      const params = {
        request_number: this.searchTracking,
        'g-recaptcha-response': this.captchaResponse
      }
      await this.$store.dispatch('tracking/getTracking', params)
      this.isLoading = false
      this.$emit('update:isSearch', this.isSearch)
    },
    onRecaptchaError () {
      console.log('recaptcha error')
    },
    onRecaptchaExpired () {
      console.log('recaptcha expired')
    },
    onSearch () {
      if (this.searchTracking) {
        this.isSearch = true
        this.isLoading = true
        this.isValid = true
        this.$refs.recaptcha.execute()
      } else {
        this.isValid = false
      }
    }
  }
}
</script>

<style scoped>
.search-button {
  @apply px-4 py-2 rounded-lg text-white
  justify-center items-center
}
.icon-search {
  @apply absolute inset-y-0 left-0 pl-3
  flex items-center pointer-events-none
}
</style>
