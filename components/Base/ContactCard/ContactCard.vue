<template>
  <div class="contact-card">
    <p class="contact-card__title">
      <slot name="title">
        {{ title }}
      </slot>
    </p>
    <p class="contact-card__body">
      <slot name="body">
        {{ body }}
      </slot>
    </p>
    <div class="contact-card__grid">
      <slot />
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
    body: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-card {
  line-height: 1.618;

  @apply overflow-hidden
  block p-6
  rounded-lg
  bg-gray-100
  text-base text-gray-600;

  &__title {
    @apply block
    m-0 mb-2 p-0
    font-bold
    text-gray-900;
  }

  &__body {
    @apply block
    mx-0 mt-2 mb-6 p-0
    font-normal;
  }

  &__grid {
    grid-template-columns: auto minmax(0, 1fr);
    @apply overflow-hidden
    grid gap-4
    mt-6;
  }
}
</style>
