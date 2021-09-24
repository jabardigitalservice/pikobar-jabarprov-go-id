<template>
  <CardAccentSquares
    bordered
    :accent-color="color"
    :dark="dark"
    :class="{
      'evt-stat': true,
      'evt-stat--dark': dark
    }"
  >
    <template v-if="loading">
      <EventStatCardSkeleton
        :dark="dark"
      />
    </template>
    <template v-else>
      <p class="evt-stat__title">
        {{ title }}
      </p>
      <div class="evt-stat__body">
        <slot />
      </div>
      <div class="evt-stat__grid">
        <slot name="grid" />
      </div>
    </template>
  </CardAccentSquares>
</template>

<script>
import { CardAccentSquares } from '../Card'
import EventStatCardSkeleton from './EventStatCardSkeleton'

export default {
  components: {
    CardAccentSquares,
    EventStatCardSkeleton
  },
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: '#212121'
    },
    dark: {
      type: Boolean
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.evt-stat {
  $--padding: 1.5rem;
  min-width: calc(88px + #{$--padding});
  min-height: calc(88px + #{$--padding});

  @apply bg-white;

  &__decor {
    z-index: 0;
    top: 0.5rem;
    right: 0.5rem;
    opacity: 0.1;

    @apply absolute
    inline-block;
  }

  &__title {
    opacity: 0.8;

    @apply mb-6
    text-gray-600
    font-serif font-bold;
  }

  &__body {
    &::v-deep > * {
      @apply mb-4;
    }
  }

  &__grid {
    display: flex;
    flex-flow: row wrap;

    &::v-deep > * {
      margin-right: 2rem;
    }
  }

  &--dark & {
    &__decor {
      color: white;
    }
    &__title {
      opacity: 0.8;

      @apply text-white;
    }
  }

  @screen md {
    &__title {
      @apply mb-8;
    }

    &__body {
      &::v-deep > * {
        @apply mb-6;
      }
    }
  }
}
</style>
