<template>
  <component
    :is="tag"
    :class="{
      'section': true,
      'section--no-gutters': noGutters,
      'section--centered': centered
    }"
  >
    <div
      :class="{
        'section__content': true,
        'container': !fluid,
      }"
    >
      <slot name="header">
        <SectionHeader
          v-show="title || subtitle"
          :title="title"
          :subtitle="subtitle"
          :align="alignHeader"
          :loading="loading"
        />
      </slot>
      <slot />
    </div>
  </component>
</template>

<script>
export default {
  components: {
    SectionHeader: () => import('./SectionHeader')
  },
  props: {
    tag: {
      type: String,
      default: 'section'
    },
    fluid: {
      type: Boolean
    },
    centered: {
      type: Boolean,
      default: true
    },
    noGutters: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },

    /* START: SectionHeader props */
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    alignHeader: {
      type: String,
      default: 'center'
    }
    /* END: SectionHeader props */
  }
}
</script>

<style lang="scss" scoped>
.section {

  &__content {
    @apply px-4;
  }

  &--no-gutters &__content {
    @apply px-0;
  }

  &--centered &__content {
    @apply mx-auto;
  }

  @screen md {
    &:not(&--no-gutters) &__content {
      @apply px-6;
    }
  }
}
</style>
