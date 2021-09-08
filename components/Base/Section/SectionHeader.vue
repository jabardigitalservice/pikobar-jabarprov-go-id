<template>
  <header
    :class="{
      'section-header': true,
      'section-header--left': align === 'left',
      'section-header--centered': align === 'center'
    }"
  >
    <p
      v-show="$slots.title || title"
      class="section-header__title"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </p>
    <p
      v-show="$slots.subtitle || subtitle"
      class="section-header__subtitle"
    >
      <slot name="subtitle">
        {{ subtitle }}
      </slot>
    </p>
  </header>
</template>

<script>
export default {
  props: {
    align: {
      validator: (v) => {
        return ['center', 'left'].includes(v)
      },
      default: 'center'
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.section-header {
  padding-bottom: 24px;

  &__title {
    line-height: 1.618;
    @apply m-0 p-0
    text-gray-900 text-xl font-bold;
  }

  &__subtitle {
    line-height: 1.618;
    @apply m-0 p-0
    text-gray-600 text-base font-normal;
  }

  &,
  &--centered {
    @apply text-center;
  }

  &--left {
    @apply text-left;
  }

  @screen md {
    padding-bottom: 40px;

    &--left {
      padding-bottom: 24px;
    }

    &__title {
      font-size: 28px;
    }
  }
}
</style>
