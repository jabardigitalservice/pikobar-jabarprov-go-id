<template>
  <div class="action-card">
    <img
      class="mx-auto col-span-2 h-32 object-contain object-center lg:h-auto lg:col-end-1"
      style="max-width: 150px; max-height: 150px;"
      width="80%"
      :src="image"
      alt="action illustration"
    >
    <div class="action-card__content">
      <p class="text-gray-800">
        {{ body }}
      </p>
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
      required: true
    },
    body: {
      type: String,
      required: true
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
  rounded-md
  grid grid-cols-2
  gap-8
  border border-solid border-gray-300
  bg-white;

  &__top {
    @apply flex-none;
  }

  &__image {
    @apply mx-auto mb-4 h-32 object-contain object-center;
  }

  &__title {
    @apply font-bold text-xl;
  }

  &__content {
    margin-top: 1.5em;
    @apply flex-1 flex flex-col
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
    mt-4 px-4 py-3
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
