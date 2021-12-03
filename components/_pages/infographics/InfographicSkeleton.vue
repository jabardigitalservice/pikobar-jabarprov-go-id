<template>
  <div class="infographic-skeleton">
    <BaseSkeleton
      class="w-full h-48 rounded-md"
    />
    <hr class="infographic-skeleton__divider">
    <BaseSkeleton
      class="w-full h-4 rounded-md"
    />
  </div>
</template>

<script>
import BaseSkeleton from '~/components/Base/Skeleton'
export default {
  components: {
    BaseSkeleton
  }
}
</script>

<style lang="scss" scoped>
.infographic-skeleton {
  @apply relative w-full bg-white rounded-lg
  border p-6;

  &__divider {
    @apply my-4 -mx-6;
  }
}
</style>
