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
  }
}
</script>

<style lang="scss" scoped>
.tablayout-item {
  @apply cursor-pointer
  inline-flex flex-row flex-nowrap
  justify-center items-center;

  &__label {
    line-height: 1.618;
    @apply py-2 px-4
    text-gray-500 font-medium
    whitespace-nowrap;
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
}
</style>
