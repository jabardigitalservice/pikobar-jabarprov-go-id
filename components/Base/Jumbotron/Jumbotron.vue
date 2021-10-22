<template>
  <div class="jumbotron">
    <img
      src="~/assets/icons/bubble-accent.svg"
      class="jumbotron__bubble jumbotron__bubble--top"
    >
    <img
      src="~/assets/icons/bubble-accent.svg"
      class="jumbotron__bubble jumbotron__bubble--bottom"
    >
    <div class="jumbotron__header">
      <slot name="header">
        {{ title }}
      </slot>
    </div>
    <div class="jumbotron__body">
      <slot>
        {{ body }}
      </slot>
    </div>
    <div class="jumbotron__footer">
      <slot name="footer" />
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
    buttonLink: {
      type: String,
      default: ''
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

    &--top {
      top: $--bubble-gap;
      left: $--bubble-gap;
    }
    &--bottom {
      right: $--bubble-gap;
      bottom: $--bubble-gap;
    }
  }

  &__header,
  &__body,
  &__footer {
    z-index: 1;
    @apply relative;
  }

  &__header {
    @apply inline-block mb-4
    text-xl font-serif font-bold;
  }

  &__body {
    @apply inline-block
    text-base text-gray-700 text-center
    font-normal;
  }

  &__footer {
    @apply inline-block;

    &:empty {
      @apply hidden;
    }
  }

  @screen sm {
    min-height: ($--bubble-height + $--bubble-gap) * 2;
    @apply p-10;

    &__bubble {
      @apply inline-block;
    }

    &__header {
      font-size: 28px;
    }

    &__footer {
      @apply mt-10;
    }
  }
}
</style>
