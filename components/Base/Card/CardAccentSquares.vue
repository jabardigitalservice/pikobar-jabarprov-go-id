<template>
  <Card
    :class="{
      'base-card': 'true',
      'base-card--dark': dark
    }"
    v-bind="$props"
    v-on="$listeners"
  >
    <SquaresAccent
      class="base-card__accent"
      :color="accentColor"
    />
    <slot />
  </Card>
</template>

<script>
import SquaresAccent from '../Decoration/Squares'
import Card from './Card.vue'

export default {
  name: 'CardWithSquaresAccent',
  components: {
    Card,
    SquaresAccent
  },
  extends: Card,
  props: {
    accentColor: {
      type: String,
      default: 'currentColor'
    },
    dark: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.base-card {
  $--padding: 1.5rem;
  min-width: calc(88px + #{$--padding});
  min-height: calc(88px + #{$--padding});

  @apply bg-white;

  &__accent {
    z-index: 0;
    top: 0.5rem;
    right: 0.5rem;
    opacity: 0.1;

    @apply absolute
    inline-block;
  }

  &--dark & {
    &__accent {
      color: white;
    }
  }
}
</style>
