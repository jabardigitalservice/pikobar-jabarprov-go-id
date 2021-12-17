<template>
  <button
    :class="{
      'tablayout-item': true,
      'tablayout-item--active': mActive
    }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span class="tablayout-item__label">
      {{ label }}
    </span>
    <span
      v-show="showCount"
      :class="mActive
        ? 'tablayout-item__count--active'
        : 'tablayout-item__count'"
    >
      {{ countDisplay }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    count: {
      type: [String, Number],
      default: null
    },
    showCount: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mActive: false
    }
  },
  watch: {
    active: {
      immediate: true,
      handler (v) {
        this.mActive = typeof v === 'boolean'
          ? v
          : !!v
      }
    }
  },
  computed: {
    countDisplay () {
      return this.count > 99 ? '99+' : this.count
    }
  }
}
</script>

<style lang="scss" scoped>
.tablayout-item {
  @apply cursor-pointer
  inline-flex flex-row flex-no-wrap
  justify-center items-center;

  &__label {
    line-height: 1.618;
    @apply py-2 px-4
    text-gray-500 font-medium
    whitespace-no-wrap;
  }

  &--active & {
    &__label {
      @apply text-green-700 font-bold;
    }
  }

  &:hover {
    @apply bg-gray-200;
  }

  &:focus,
  &:active {
    outline: none;
  }

  &__count {
  @apply text-xs rounded-lg p-1
  bg-gray-500 text-white;

  &--active {
    @apply text-xs rounded-lg
    border-brand-green text-white
    bg-brand-green p-1;
  }
}
}
</style>
