<template>
  <section>
    <div
      :class="{
        'px-4 md:px-6': !noGutters,
        'container': !fluid,
        'mx-auto': centered
      }"
    >
      <slot />
    </div>
  </section>
</template>

<script>
export default {
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
    }
  }
}
</script>
