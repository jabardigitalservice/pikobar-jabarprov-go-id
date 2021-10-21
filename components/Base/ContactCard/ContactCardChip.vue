<template>
  <a
    :href="href"
    :disabled="disabled || !href"
    :class="{
      'contact-card-chip': true,
      'contact-card-chip--phone': icon === 'phone',
      'contact-card-chip--web': icon === 'web'
    }"
    @click.prevent="onClick"
  >
    <i class="contact-card-chip__icon">
      <component
        :is="iconComponent"
      />
    </i>
    <span class="contact-card-chip__label">
      <slot>
        {{ label }}
      </slot>
    </span>
  </a>
</template>

<script>
import IconGlobe from './globe'
import IconPhone from './phone'

export default {
  props: {
    /**
     * NOTES:
     * Currently supports only phone and web icon.
     */
    icon: {
      type: String,
      validator: (v) => {
        return ['phone', 'web'].includes(v)
      },
      default: undefined
    },
    label: {
      type: String,
      default: '-'
    },
    href: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean
    }
  },
  data () {
    return {
      urlRegexes: Object.freeze([/^https?:\/\//, /^tel:\/\//])
    }
  },
  computed: {
    iconComponent () {
      const types = {
        phone: IconPhone,
        web: IconGlobe
      }
      return types[this.icon]
    },
    hasValidURL () {
      const { href } = this
      if (typeof href !== 'string' || !href.length) {
        return false
      }
      return this.urlRegexes.some(regex => regex.test(href))
    }
  },
  methods: {
    onClick () {
      if (this.hasValidURL) {
        window.open(this.href, '_blank', 'noopener,noreferrer')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-card-chip {
  line-height: 1.618;
  font-size: inherit;

  @apply cursor-pointer
  overflow-hidden
  inline-flex flex-row flex-nowrap
  justify-center items-center
  py-1 px-4
  bg-gray-200 rounded-full
  text-gray-900;

  &__label {
    font-size: 14px;
    color: white;

    @apply truncate inline-block
    font-bold;
  }

  &__icon {
    color: white;
    margin-right: 10px;

    @apply flex-none
    inline-block w-4 h-4 p-0;

    svg {
      @apply w-full h-full;
    }
  }

  &--phone {
    background-color: #069550;
  }

  &--web {
    background-color: #1E88E5;
  }

  &:not(:disabled):not([disabled]) {
    &:hover {
      @apply opacity-75;
    }

    &:active {
      @apply opacity-100;
    }
  }

  &:disabled,
  &[disabled] {
    @apply cursor-not-allowed;
  }
}
</style>
