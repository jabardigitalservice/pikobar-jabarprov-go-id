<template>
  <div
    :class="{
      'alert': true,
      'alert--info': info
    }"
  >
    <FontAwesomeIcon
      v-if="icon"
      :icon="icon"
      :class="{
        'alert__icon': true,
        'alert__icon--info': info
      }"
    />
    <p class="alert__content">
      {{ label }}
    </p>
  </div>
</template>

<script>
/**
 * As of now, only supports blue color (info).
 */
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    info: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  @apply flex flex-row items-center
  py-4 px-5 rounded-lg border
  border-solid border-brand-gray-dark
  text-brand-black;

  &--info {
    background: #E3F2FD;
    border-color: #1565C0;
  }

  &__icon {
    @apply mr-5;

    &--info {
      color: #1565C0;
    }
  }

  &__content {
    @apply font-roboto
  }
}
</style>
