<template>
  <header
    :class="{
      'section-header': true,
      'section-header--left': align === 'left',
      'section-header--centered': align === 'center'
    }"
  >
    <BaseSkeleton v-show="loading" class="section-header__title-skeleton" />
    <BaseSkeleton v-show="loading" class="section-header__subtitle-skeleton" />
    <p
      v-show="!loading && ($slots.title || title)"
      class="section-header__title"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </p>
    <p
      v-show="!loading && ($slots.subtitle || subtitle)"
      class="section-header__subtitle"
    >
      <slot name="subtitle">
        {{ subtitle }}
      </slot>
    </p>
  </header>
</template>

<script>
import BaseSkeleton from '~/components/Base/Skeleton'
export default {
  components: {
    BaseSkeleton
  },
  props: {
    loading: {
      type: Boolean
    },
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
  @apply flex flex-col flex-no-wrap;

  &__title {
    line-height: 1.618;
    @apply m-0 p-0
    text-gray-900 text-xl font-bold;
  }

  &__subtitle {
    line-height: 1.618;
    @apply max-w-3xl m-0 p-0 text-gray-600 text-base font-normal;
  }

  &__title-skeleton {
    @apply w-1/3 h-6 mb-8
    rounded-full;
  }
  &__subtitle-skeleton {
    @apply w-2/3 h-6
    rounded-full;
  }

  &,
  &--centered {
    @apply items-center;
  }

  &--left {
    @apply items-start;
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
