<template>
  <div class="flex flex-row flex-wrap md:flex-no-wrap items-stretch rounded-none sm:rounded overflow-hidden">
    <input
      v-model="mValue"
      class="min-w-0 inline-block w-full flex-none sm:flex-1 bg-gray-200 p-4"
      placeholder="Cari kabupaten atau kota..."
      @keyup.enter="onSearchEnter"
    >
    <div class="flex-1 w-full mt-2 sm:mt-0 sm:flex-none sm:w-auto flex justify-end items-stretch">
      <button
        class="mr-2 sm:mr-0 px-4 py-2 bg-brand-blue hover:bg-brand-blue-lighter text-white flex justify-center items-center"
        @click="onSearchEnter"
      >
        <FontAwesomeIcon :icon="icon.faSearch" class="mr-2" />
        <span>
          Cari
        </span>
      </button>
      <button
        class="px-4 py-2 bg-gray-300 hover:bg-gray-200 text-gray-800 flex justify-center items-center"
        @click="onSearchReset"
      >
        <FontAwesomeIcon :icon="icon.faTimes" class="mr-2" />
        <span>
          Reset
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
export default {
  model: {
    prop: 'value',
    event: 'search'
  },
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      mValue: '',
      icon: {
        faSearch,
        faTimes
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        this.mValue = v
      }
    }
  },
  methods: {
    onSearchEnter () {
      this.$emit('search', this.mValue)
    },
    onSearchReset () {
      this.$emit('search', '')
    }
  }
}
</script>
