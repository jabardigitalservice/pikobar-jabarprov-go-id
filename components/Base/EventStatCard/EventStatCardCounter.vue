<template>
  <div
    :class="{
      'evt-stat-counter': true,
      'evt-stat-counter--dark': dark,
      'evt-stat-counter--xsmall': size === 'xsmall',
      'evt-stat-counter--small': size === 'small',
      'evt-stat-counter--large': size === 'large'
    }"
    :style="{ color }"
  >
    <p class="evt-stat-counter__name">
      {{ name }}
    </p>
    <strong class="evt-stat-counter__count">
      {{ formattedCount }}
    </strong>
  </div>
</template>

<script>
import { formatNumber } from '~/lib/number'
export default {
  props: {
    dark: {
      type: Boolean
    },
    name: {
      type: String,
      default: ''
    },
    count: {
      type: [String, Number],
      default: undefined
    },
    size: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#212121'
    }
  },
  computed: {
    formattedCount () {
      return formatNumber(this.count)
    }
  }
}
</script>

<style lang="scss" scoped>
.evt-stat-counter {
  &__name {
    @apply
    text-base whitespace-no-wrap;

    font-family: 'Roboto', sans-serif;
    color: #757575;
  }
  &__count {
    color: inherit;
    font-family: 'Roboto', sans-serif;
    @apply text-base font-medium;
  }

  &--dark & {
    &__name,
    &__count {
      @apply text-white;
    }
  }

  &--xsmall &,
  &--small & {
    &__count {
      @apply text-xl;
    }
  }

  &--large & {
    &__count {
      @apply text-2xl;
    }
  }

  @screen md {
    &--small & {
      &__count {
        @apply text-3xl;
      }
    }

    &--large & {
      &__count {
        @apply text-4xl;
      }
    }
  }

}
</style>
