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
    <div class="flex">
      <slot name="icon">
        {{ icon }}
      </slot>
      <h2
        v-show="!loading && ($slots.title || title)"
        :class="{
          'section-header__title': true,
          'section-header__title--sm': titleSize === 'sm',
          'section-header__title--md': titleSize === 'md',
          'section-header__title--lg': titleSize === 'lg',
          'section-header__title--xl': titleSize === 'xl',
        }"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </h2>
    </div>
    <p
      v-show="!loading && ($slots.subtitle || subtitle)"
      :class="{
        'section-header__subtitle': true,
        'section-header__subtitle--grey': subtitleColor === 'grey',
        'section-header__subtitle--black': subtitleColor === 'black',
      }"
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
    titleSize: {
      validator: (v) => {
        return ['sm', 'md', 'lg', 'xl'].includes(v)
      },
      default: 'xl'
    },
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    subtitleColor: {
      validator: (v) => {
        return ['grey', 'black'].includes(v)
      },
      default: 'grey'
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
    @apply pt-2 mb-2
    text-brand-black font-bold;

    &--sm {
      @apply text-sm;
    }

    &--md {
      @apply text-base;
    }

    &--lg {
      @apply text-lg;
    }

    &--xl {
      font-size: 1.75rem;
    }
  }

  &__subtitle {
    line-height: 1.618;
    @apply m-0 p-0 text-base font-normal;

    font-family: 'Roboto', sans-serif;

    &--grey {
      color: #757575;
    }
    &--black {
      @apply text-gray-800;
    }
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
  }
}
</style>
