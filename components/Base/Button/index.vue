<template>
  <component
    :is="tag"
    :class="{
      'base-button': true,
      'base-button--outlined': outlined,
      'base-button--shadowed': shadowed || outlined
    }"
    :disabled="disabled"
    v-bind="$attrs"
    v-on="$listeners"
  >
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
 * As of now, only supports green color (filled or outlined).
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

  &--outlined {
    @apply border-brand-green-darker
    rounded-md
    bg-transparent
    text-brand-green-darker px-4;
  }

  &--shadowed {
    @apply shadow-sm;
  }

  &__label {
    color: inherit;
    font-size: 14px;
    line-height: 20px;

    @apply flex-none;
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
