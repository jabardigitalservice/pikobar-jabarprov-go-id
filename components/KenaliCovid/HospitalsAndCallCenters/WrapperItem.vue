<template>
  <div class="wrapper-item">
    <p class="wrapper-item__title">
      {{ title }}
    </p>
    <p class="wrapper-item__body">
      {{ body }}
    </p>
    <slot />
    <i class="block flex-1" />
    <ContentCardButton
      class="wrapper-item__btn"
      prompt="Lihat Selengkapnya"
      button-type="outline"
      :back-link="buttonLink"
    />
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
    body: {
      type: String,
      default: ''
    },
    buttonLink: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-item {
  line-height: 1.618;

  @apply w-full p-4
  flex flex-col flex-no-wrap
  rounded-lg
  border border-solid border-gray-300
  bg-white;

  &__title {
    font-size: 16px;

    @apply block m-0 mb-4 p-0
    text-gray-900
    font-bold font-serif;
  }

  &__body {
    @apply block m-0 mb-6 p-0
    text-base
    text-gray-800
    font-normal;
  }

  &__btn {
    @apply mt-6;
  }

  @screen md {
    @apply px-8 py-6;

    &__title {
      font-size: 21px;
    }
  }
}
</style>
