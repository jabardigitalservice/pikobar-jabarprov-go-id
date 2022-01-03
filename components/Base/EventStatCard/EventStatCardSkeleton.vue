<template>
  <div class="my-6">
    <div class="w-1/2">
      <BaseSkeleton
        :dark="dark"
        class="w-3/4 h-3 mb-12 rounded-full"
      />
      <BaseSkeleton
        :dark="dark"
        class="w-1/3 h-3 mb-4 rounded-full"
      />
      <BaseSkeleton
        :dark="dark"
        class="w-full h-3 mb-8 rounded-full"
      />
      <BaseSkeleton
        :dark="dark"
        class="w-1/3 h-3 mb-4 rounded-full"
      />
      <BaseSkeleton
        :dark="dark"
        class="w-4/5 h-3 rounded-full"
      />
    </div>
  </div>
</template>

<script>
import BaseSkeleton from '~/components/Base/Skeleton'
export default {
  components: {
    BaseSkeleton
  },
  props: {
    dark: {
      type: Boolean
    }
  }
}
</script>
