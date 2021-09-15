<template>
  <div
    :class="{
      'content-card': true,
      'content-card--image-left': imagePosition === 'left',
      'content-card--image-right': imagePosition === 'right'
    }"
  >
    <div class="content-card__grid">
      <div class="content-card__image-container">
        <img class="content-card__image" :src="image" alt="content-card-image">
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
          <slot name="button" v-bind="$props">
            <ContentCardButton
              v-bind="{ prompt, backLink, buttonType }"
              class="content-card__btn mt-6"
            />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentCardButton from './ContentCardButton'
export default {
  components: {
    ContentCardButton
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

  &__grid {
    gap: 32px;
    @apply flex flex-col flex-no-wrap
    justify-start
    items-center;

    @screen md {
      @apply grid grid-cols-2 grid-rows-1;
    }
  }

  &__info {
    grid-row: 1 / span 1;
    @apply flex-1 flex flex-col justify-between;
  }

  &__content {
    @apply flex flex-col gap-2 justify-between items-start col-span-2;

    @screen lg {
      @apply col-start-1;
    }
  }

  &__image-container {
    grid-row: 1 / span 1;
    @apply self-stretch;
  }

  &__image {
    @apply block w-full h-auto
    object-cover object-center rounded-lg;
  }

  &__header {
    @apply text-sm text-green-600
    font-bold;
  }

  &__title {
    @apply text-3xl font-semibold;
  }

  &__body {
    @apply mt-3 text-base;
  }

  &__btn {
    @apply w-full;
  }

  @screen md {
    &__btn {
      @apply w-auto;
    }

    &--image-left & {
      &__image-container {
        grid-column-start: 1;
      }
      &__info {
        grid-column-start: 2;
      }
    }

    &--image-right & {
      &__image-container {
        grid-column-start: 2;
      }
      &__info {
        grid-column-start: 1;
      }
    }
  }
}
</style>
