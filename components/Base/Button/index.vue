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
    <div
      v-if="size === 'big'"
      class="base-button__label"
      :style="styleLabelBig"
    >
      <div class="text-xl mb-3">
        <slot>
          {{ label }}
        </slot>
      </div>
      <div class="font-normal">
        <slot>
          {{ subtitle }}
        </slot>
      </div>
    </div>
    <div v-else>
      <span
        class="base-button__label"
        :style="styleLabel"
      >
        <slot>
          {{ label }}
        </slot>
      </span>
    </div>
    <i class="base-button__icon">
      <slot name="icon" />
    </i>
  </component>
</template>

<script>
import Utils from '~/utils/index.js'
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
    subtitle: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
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
  data () {
    return {
      isMobile: false
    }
  },
  computed: {
    image () {
      return this.src
        ? require(`~/assets/illustrations/${this.src}`)
        : ''
    },
    styleLabel () {
      return [this.src
        ? { width: '170px', textAlign: 'left' }
        : { textAlign: 'center' }]
    },
    styleLabelBig () {
      return [this.isMobile
        ? { width: '190px', textAlign: 'left' }
        : { width: '430px', textAlign: 'left' }
      ]
    }
  },
  mounted () {
    this.isMobile = Utils.checkIsMobile()
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
