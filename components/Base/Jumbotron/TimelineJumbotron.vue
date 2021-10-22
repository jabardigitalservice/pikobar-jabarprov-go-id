<template>
  <div class="jumbotron">
    <img
      v-if="position !== 'left'"
      src="~/assets/icons/bubble-accent-backwards.svg"
      class="jumbotron__bubble jumbotron__bubble--top-right"
    >
    <img
      v-else
      src="~/assets/icons/bubble-accent.svg"
      class="jumbotron__bubble jumbotron__bubble--top-left"
    >
    <div class="jumbotron__body">
      <slot>
        {{ body }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style lang="scss" scoped>
$--bubble-width: 40px;
$--bubble-height: 44px;
$--bubble-gap: 16px;

.jumbotron {
  line-height: 1.618;

  @apply relative
  flex flex-col flex-no-wrap
  p-4
  justify-start items-center
  rounded-lg
  bg-gray-100;

  &__bubble {
    width: $--bubble-width;
    height: $--bubble-height;

    @apply pointer-events-none
    absolute z-0 hidden;

    &--top-left {
      top: $--bubble-gap * 2;
      left: $--bubble-gap;
    }
    &--top-right {
      right: $--bubble-gap;
      top: $--bubble-gap * 2;
    }
  }

  &__body {
    z-index: 1;
    @apply mx-6 relative inline-block text-lg font-medium text-gray-700;
  }

  @screen sm {
    @apply p-10;

    &__bubble {
      @apply inline-block;
    }
  }
}
</style>
