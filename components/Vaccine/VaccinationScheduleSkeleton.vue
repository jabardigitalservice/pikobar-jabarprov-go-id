<template>
  <div class="schedule-skeleton">
    <BaseSkeleton
      class="w-full h-12 rounded-md col-span-full"
    />
    <BaseSkeleton
      v-for="i in 3"
      :key="i"
      class="w-full h-64 rounded-md"
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
.schedule-skeleton {
  @apply grid grid-cols-1 mt-8 gap-4;

  @screen lg {
    @apply grid-cols-3 gap-8
  }
}
</style>
