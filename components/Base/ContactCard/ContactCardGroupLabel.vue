<template>
  <span
    class="contact-card-group-label"
  >
    {{ label }}
  </span>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-card-group-label {
  @apply inline-flex
  justify-between align-middle;

  &::after {
    content: ' :';
    @apply inline-block ml-4;
  }

  @screen lg {
    @apply text-base;
  }
}
</style>
