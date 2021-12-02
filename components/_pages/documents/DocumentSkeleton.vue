<template>
  <div class="document-skeleton">
    <BaseSkeleton
      class="w-12 h-10 rounded-md"
    />
    <div class="document-skeleton__content">
      <BaseSkeleton
        class="w-32 h-4 rounded-md"
      />
      <BaseSkeleton
        class="w-1/2 h-4 rounded-md"
      />
    </div>
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
.document-skeleton {
  @apply flex flex-col p-4
  border border-solid rounded-lg gap-3;

  @screen sm {
    @apply flex-row items-center;
  }

  &__content {
    @apply flex flex-col gap-4 w-full;
  }
}
</style>
