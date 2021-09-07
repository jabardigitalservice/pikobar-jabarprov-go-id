<template>
  <div class="content-card">
    <div class="content-card__grid">
      <div v-if="imagePosition === 'left'" class="flex-1">
        <img class="content-card__image h-5/6" :src="image" alt="content-card-image">
      </div>
      <div class="content-card__info">
        <div class="content-card__content">
          <p v-if="header" class="content-card__header">
            {{ header }}
          </p>
          <p class="content-card__title">
            {{ title }}
          </p>
          <p class="content-card__body text-black-500">
            {{ body }}
          </p>
          <BaseButton
            tag="a"
            target="_blank"
            :label="prompt"
            :href="backLink"
            :outlined="buttonType === 'outline'"
            class="mt-6"
          >
            <template #icon>
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
            </template>
          </BaseButton>
        </div>
      </div>
      <div v-if="imagePosition === 'right'" class="flex-1">
        <img class="content-card__image h-5/6" :src="image" alt="content-card-image">
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/Base/Button'
export default {
  components: {
    BaseButton
  },
  props: {
    header: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: '-'
    },
    imagePosition: {
      type: String,
      default: 'right'
    },
    image: {
      type: String,
      default: '#'
    },
    prompt: {
      type: String,
      default: ''
    },
    backLink: {
      type: String,
      default: '#'
    },
    buttonType: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-card {
    @apply max-w-lg;

    @screen lg {
        @apply max-w-none;
    }

    &__grid {
      @apply grid grid-cols-1;

      @screen sm {
        @apply grid-cols-2;
      }
    }

    &__info {
      @apply flex-1 p-3 flex flex-col justify-between;
    }

    &__content {
      @apply flex flex-col gap-2 justify-between items-start col-span-2;

      @screen lg {
        @apply col-start-1;
      }
    }

    &__image {
      @apply object-cover object-center rounded-lg;
    }

    &__header {
      @apply text-sm text-green-600;
    }

    &__title {
      @apply text-3xl font-semibold;
    }

    &__body {
      @apply mt-3 text-base;
    }

    &__btn-link {
      @apply inline-flex bg-brand-green-darker
      text-white text-sm font-bold tracking-wide
      px-3 py-3
      rounded-lg
      mt-6
      gap-2
      items-center
      justify-around;

      &-outline {
        @apply inline-flex items-center px-3 py-2 border
        border-green-500
        shadow-sm
        mt-6
        gap-2
        text-base
        rounded-md
        text-green-700
      }
    }
  }
</style>
