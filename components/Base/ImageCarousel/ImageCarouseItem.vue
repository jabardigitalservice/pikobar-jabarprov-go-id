<template>
  <div
    class="image-carousel-item"
    :title="title"
    v-on="$listeners"
  >
    <img
      class="image-carousel-item__img"
      :src="src"
      :alt="alt"
    >
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.image-carousel-item {
  @apply cursor-pointer
  rounded-lg overflow-hidden
  opacity-100
  transition-opacity duration-150 ease-linear;

  &__img {
    @apply pointer-events-none
    h-auto w-full
    object-cover object-center;
  }

  &:hover {
    @apply opacity-75;
  }
}
</style>
