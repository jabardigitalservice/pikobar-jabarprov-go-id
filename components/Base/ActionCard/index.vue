<template>
  <div class="action-card">
    <img
      class="action-card__image"
      alt="illutrasi chatbot"
      :src="image"
    >
    <div class="action-card__body">
      <h3 class="action-card__title">
        {{ title }}
      </h3>
      <ContentCardButton
        :prompt="prompt"
        :back-link="backlink"
      />
    </div>
  </div>
</template>

<script>
import ContentCardButton from '~/components/Base/ContentCard/ContentCardButton'
export default {
  components: {
    ContentCardButton
  },
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
  }
}
</script>

<style lang="scss" scoped>
.action-card {
  @apply p-4 flex flex-col flex-no-wrap
  rounded-md
  bg-gray-100;

  &__image {
    width: auto;
    height: 128px;

    @apply mx-auto pl-4
    object-center object-contain;
  }

  &__body {
    @apply flex-1 pr-4
    flex flex-col flex-no-wrap;
  }

  &__title {
    @apply flex-1 my-6 mb-4
    font-medium text-base text-left;
  }

  @screen lg {
    @apply px-0 grid grid-cols-3 gap-8
    items-center;

    &__image {
      flex: 0 0 calc(100% * (1 / 3));
      width: auto;
      max-width: unset;
      max-height: 180px;

      @apply col-span-1;
    }

    &__body {
      flex: 0 0 calc(100% * (2 / 3));
      align-self: stretch;

      @apply col-span-2 flex-1 items-start;
    }

    &__title {
      @apply my-0;
    }
  }
}
</style>
