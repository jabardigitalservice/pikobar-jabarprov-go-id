<template>
  <div class="action-card">
    <img
      class="action-card__image"
      width="80%"
      :src="image"
      alt="illutrasi chatbot"
    >
    <div class="action-card__body">
      <h3 class="action-card__title">
        {{ title }}
      </h3>
      <a
        :href="backlink"
        target="_blank"
        class="action-card__btn"
        @click.prevent="onButtonClick"
      >
        <span>
          {{ prompt }}
        </span>
        <slot name="button-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="action-card__btn-icon"
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
        </slot>
      </a>
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
    image: {
      type: String,
      default: '#'
    },
    prompt: {
      type: String,
      default: ''
    },
    backlink: {
      type: String,
      default: '#'
    }
  },
  methods: {
    onButtonClick () {
      const { backlink } = this
      if (typeof backlink !== 'string' || !backlink) {
        return
      }
      if (backlink.startsWith('http')) {
        return window.open(backlink, '_blank', 'noopener,noreferrer')
      }
      return this.$router.push(backlink)
    }
  }
}
</script>

<style lang="scss" scoped>
.action-card {
  @apply p-4
  flex flex-col flex-no-wrap
  rounded-md
  bg-gray-100;

  &__image {
    width: auto;
    height: 128px;

    @apply mx-auto mb-4
    object-center object-contain;
  }

  &__body {
    @apply flex-1
    flex flex-col flex-no-wrap;
  }

  &__title {
    @apply flex-1 mb-4
    font-medium text-base text-left;
  }

  &__btn {
    padding: 12px 16px;
    line-height: 1.618;
    font-size: 14px;

    @apply flex-none
    flex flex-row gap-3
    justify-center items-center
    rounded-lg
    text-white text-center
    bg-brand-green-darker;

    &:active,
    &:focus {
      @apply outline-none;
    }
  }

  &__btn-icon {
    @apply w-6 h-6;
  }

  @screen lg {
    @apply flex-row flex-no-wrap
    items-center;

    &__image {
      width: auto;
      max-width: unset;
      max-height: 180px;
      @apply mx-6 my-4
      flex-none;
    }

    &__body {
      align-self: stretch;

      @apply flex-initial
      my-6 items-start;
    }

    &__btn {
      font-size: 16px;
      @apply text-left;
    }
  }
}
</style>
