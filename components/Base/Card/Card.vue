<template>
  <div
    :class="{
      'base-card': true,
      'base-card--block': block,
      'base-card--bordered': bordered,
    }"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Boolean
    },
    bordered: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.base-card {
  padding: 1.5rem;
  line-height: 1.618;

  @apply relative z-0
  inline-block
  rounded-lg;

  &::v-deep > * {
    z-index: 1;
    @apply relative;
  }

  &--block {
    @apply block;
  }

  &--bordered {
    @apply border border-solid border-gray-300;
  }
}
</style>
