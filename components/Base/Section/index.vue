<template>
  <component
    :is="tag"
    :class="{
      'section': true,
      'section--no-gutters': noGutters,
      'section--centered': centered
    }"
  >
    <div
      :class="{
        'section__content': true,
        'container': !fluid,
      }"
    >
      <slot />
    </div>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'section'
    },
    fluid: {
      type: Boolean
    },
    centered: {
      type: Boolean,
      default: true
    },
    noGutters: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.section {

  &__content {
    @apply px-4;
  }

  &--no-gutters &__content {
    @apply px-0;
  }

  &--centered &__content {
    @apply mx-auto;
  }

  @screen md {
    &:not(&--no-gutters) &__content {
      @apply px-6;
    }
  }
}
</style>
