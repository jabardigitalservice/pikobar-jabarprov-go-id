<template>
  <div class="search">
    <FontAwesomeIcon
      :icon="icon.faSearch"
      class="search__icon"
    />
    <input
      v-model="mValue"
      type="search"
      name="serch"
      placeholder="Search"
      class="search__input"
      @keyup.enter="onSearchEnter"
    >
    <button
      type="button"
      class="search__button"
      @click="onSearchEnter"
    >
      Cari
    </button>
  </div>
</template>
<script>
import { faSearch } from '@fortawesome/free-solid-svg-icons'
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
      icon: {
        faSearch
      }
    }
  },
  computed: {
    mValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('search', value)
        return value
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
<style lang="scss" scoped>
.search {
  @apply relative text-gray-600 border rounded-md;
  &__icon {
    @apply absolute left-0 top-0 mt-3 ml-4;
  }
  &__input {
    width: 85%;
    @apply bg-white ml-4 h-10 px-5 pr-10 rounded-full text-base;
    &:focus {
      @apply outline-none;
    }
    @screen md {
      width: 95%;
    }
  }
  &__button {
    @apply absolute right-0 top-0 mb-1 justify-around mb-1 px-6 py-2 text-white rounded-md bg-brand-green;
    @screen md {
      @apply mr-1;
    }

    &:hover {
      @apply bg-brand-green-lighter;
    }
  }
}
</style>
