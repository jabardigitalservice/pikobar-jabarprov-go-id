<template>
  <i
    aria-hidden="true"
    :class="{
      'base-skeleton': true,
      'base-skeleton--dark': dark
    }"
  />
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes base-skeleton-shimmer {
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.base-skeleton {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.75);

  @apply relative
  overflow-hidden
  block
  opacity-100;

  &::before {
    content: '';
    background: linear-gradient(
      to right,
      transparent 30%,
      currentColor 40%,
      currentColor 50%,
      transparent 70%)
      no-repeat;
    background-size: 325% 100%;
    animation: base-skeleton-shimmer infinite 1.5s linear;

    @apply absolute
    block inset-0;
  }

  &--dark {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.1);
  }
}
</style>
