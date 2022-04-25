<template>
  <div class="action-card">
    <img
      :src="image"
      class="action-card__image"
      alt="action illustration"
    >
    <div class="action-card__content">
      <div v-if="splitBody">
        <p class="text-gray-800">
          <span v-show="body" :class="colorSplitOne">
            {{ body }}
          </span>
          <span v-show="bodySplit" :class="colorSplitTwo">
            {{ bodySplit }}
          </span>
          <span v-show="bodySplitTwo" :class="colorSplitThree">
            {{ bodySplitTwo }}
          </span>
          <span v-show="bodySplitThree" :class="colorSplitFour">
            {{ bodySplitThree }}
          </span>
        </p>
      </div>
      <div v-else>
        <h3 class="action-card__title">
          {{ title }}
        </h3>
        <p class="text-gray-800">
          {{ body }}
        </p>
      </div>
      <a
        :href="backlink"
        target="_blank"
        class="action-card__btn-link"
        @click.prevent="onClick"
      >
        <span>
          {{ prompt }}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 ml-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import { analytics } from '~/lib/firebase'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    splitBody: {
      type: Boolean,
      default: false
    },
    body: {
      type: String,
      required: true
    },
    bodySplit: {
      type: String,
      default: ''
    },
    bodySplitTwo: {
      type: String,
      default: ''
    },
    bodySplitThree: {
      type: String,
      default: ''
    },
    colorSplitOne: {
      type: String,
      default: ''
    },
    colorSplitTwo: {
      type: String,
      default: ''
    },
    colorSplitThree: {
      type: String,
      default: ''
    },
    colorSplitFour: {
      type: String,
      default: ''
    },
    prompt: {
      type: String,
      required: true
    },
    event: {
      type: String,
      required: true
    },
    backlink: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick () {
      if (this.$listeners.click) {
        return this.$listeners.click()
      }
      if (!this.backlink) {
        return
      }
      if (analytics && this.event) {
        analytics.logEvent(this.event)
      }
      window.open(this.backlink, '_blank')
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes btn-loading {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.action-card {
  @apply p-4
  grid
  gap-8
  rounded-md
  border border-solid border-gray-300
  bg-white;
  grid-template-columns: auto 1fr;
  grid-template-rows: 8rem 1fr;

  @screen lg {
    @apply grid gap-8;
    grid-template-rows: unset;
  }

  &__top {
    @apply flex-none;
  }

  &__image {
    @apply mx-auto col-span-2 w-auto h-32 object-contain object-center;

    @screen lg {
      @apply w-32 h-auto col-end-1;
    }
  }

  &__title {
    @apply font-bold text-xl;
  }

  &__content {
    @apply flex flex-col
    gap-6
    justify-between
    items-start
    col-span-2;

    @screen lg {
      @apply col-start-1;
    }
  }

  &__btn-link {
    @apply bg-brand-green-darker
    text-white text-sm font-bold tracking-wide
    px-4 py-3
    rounded-lg
    gap-3
    flex flex-row
    items-center
    justify-around;

    &:focus {
      @apply outline-none;
    }
  }

  &--loading &,
  &--error & {
    &__btn-link * {
      display: none
    }
  }

  &--loading &__btn-link {
    width: 120px;
    height: 38px;
    animation: btn-loading 1s ease infinite alternate;
    @apply bg-gray-200;
  }

  &--error &__btn-link {
    @apply bg-red-600;

    &::before {
      content: 'Terjadi kesalahan';
      display: inline-block;
    }
  }

  @screen sm {
    &--whitespaced &__title::after {
      content: ' ';
      display: block;
      white-space: pre;
    }
  }

  @screen lg {
    &--whitespaced &__title::after {
      display: none;
    }
  }
}
</style>
