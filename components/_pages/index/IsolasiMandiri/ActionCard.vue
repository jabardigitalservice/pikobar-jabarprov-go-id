<template>
  <div class="action-card">
    <img
      class="mx-auto col-span-6 h-32 object-contain object-center lg:h-auto lg:col-span-2"
      style="max-width: 150px; max-height: 150px;"
      width="80%"
      :src="image"
      alt="action illustration"
    >
    <div class="action-card__content">
      <h3 class="font-bold text-xl" v-html="title" />
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
          class="w-6 h-6"
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
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick () {
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
.action-card {
  @apply p-4
  rounded-md
  grid grid-cols-6
  gap-8
  border border-solid border-gray-300
  bg-white;

  &__content {
    @apply flex flex-col
    gap-6
    justify-between
    items-start
    col-span-6;

    @screen lg {
      @apply col-span-4;
    }
  }

  &__btn-link {
    @apply bg-brand-green-darker
    text-white text-sm font-bold tracking-wide
    p-4
    rounded-lg
    gap-3
    w-full
    flex flex-row
    items-center
    justify-between;

    &:focus {
      @apply outline-none;
    }

    @screen lg {
      @apply px-6 py-2
      text-base;
    }
  }
}
</style>
