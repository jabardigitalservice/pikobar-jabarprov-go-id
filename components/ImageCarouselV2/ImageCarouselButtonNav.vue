<template>
  <button
    class="image-carousel-btn-nav"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <FontAwesomeIcon
      class="image-carousel-btn-nav__icon"
      :icon="iconToUse"
    />
  </button>
</template>

<script>
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    type: {
      validator: (v) => {
        return ['left', 'right'].includes(v)
      },
      default: 'left'
    }
  },
  computed: {
    iconToUse () {
      const icons = {
        left: faArrowLeft,
        right: faArrowRight
      }

      return icons[this.type]
    }
  }
}
</script>

<style lang="scss" scoped>
.image-carousel-btn-nav {
  @apply inline-flex justify-center items-center
  w-12 h-12
  rounded-full
  border border-solid border-gray-400;

  &__icon {
    @apply text-gray-800;
  }

  &:disabled {
    @apply cursor-not-allowed
    bg-gray-200 text-gray-500
    opacity-50;
  }

  &:focus,
  &:active {
    outline: none;
  }
}
</style>
