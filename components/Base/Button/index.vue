<template>
  <component
    :is="tag"
    :class="{
      'base-button': true,
      'base-button--gray': monochrome,
      'base-button--outlined': outlined,
      'base-button--outlined--gray': outlined && monochrome,
      'base-button--shadowed': shadowed || outlined
    }"
    :style="{
      'width': width,
      'height': height
    }"
    :disabled="disabled"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span v-show="src" class="base-button__image">
      <slot>
        <img
          :src="image"
          alt="content-card-src"
        >
      </slot>
    </span>
    <span class="base-button__label">
      <slot>
        {{ label }}
      </slot>
    </span>
    <i class="base-button__icon">
      <slot name="icon" />
    </i>
  </component>
</template>

<script>
/**
 * As of now, only supports green color (filled or outlined) and gray (monochrome).
 */
export default {
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    label: {
      type: String,
      required: true
    },
    outlined: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    shadowed: {
      type: Boolean
    },
    monochrome: {
      type: Boolean
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    height: {
      type: [Number, String],
      default: 'auto'
    },
    src: {
      type: String,
      default: ''
    }
  },
  computed: {
    image () {
      return this.src
        ? require(`~/assets/illustrations/${this.src}`)
        : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.base-button {
  @apply inline-flex flex-row flex-no-wrap
  justify-center items-center
  px-6 py-3
  border border-solid border-transparent
  rounded-lg
  bg-brand-green-darker
  text-white font-bold tracking-wide;

  font-family: 'Lato', sans-serif;

  &--gray {
    @apply bg-brand-gray-dark
  }

  &--outlined {
    @apply border-brand-green-darker
    rounded-md
    bg-transparent
    text-brand-green-darker px-4;

    &--gray {
      @apply border-brand-gray-dark text-brand-gray-dark
    }
  }

  &--shadowed {
    @apply shadow-sm;
  }

  &__label {
    color: inherit;
    line-height: 20px;

    @apply flex-none text-sm;
  }

  &__image {
    margin: 0px 11px;
  }

  &__icon {
    line-height: 0;
    @apply flex-none
    inline-flex flex-row flex-no-wrap
    justify-center items-center;
  }

  &:hover {
    @apply opacity-75;
  }

  &:active {
    @apply opacity-100;
  }

  &:focus,
  &:active {
    @apply outline-none;
  }
}
</style>
