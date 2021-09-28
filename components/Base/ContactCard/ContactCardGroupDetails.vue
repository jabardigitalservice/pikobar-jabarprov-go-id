<template>
  <p class="contact-card-group-details">
    <slot />
  </p>
</template>

<style lang="scss" scoped>
.contact-card-group-details {
  @apply overflow-hidden
  flex flex-row flex-wrap
  gap-4 text-sm;
}
</style>
