<template>
  <div class="my-6">
    <BaseSkeleton
      :dark="dark"
      class="w-3/4 h-2 mb-12 rounded-full"
    />
    <BaseSkeleton
      :dark="dark"
      class="w-1/3 h-2 mb-4 rounded-full"
    />
    <BaseSkeleton
      :dark="dark"
      class="w-2/5 h-2 mb-8 rounded-full"
    />
    <BaseSkeleton
      :dark="dark"
      class="w-1/3 h-2 mb-4 rounded-full"
    />
    <BaseSkeleton
      :dark="dark"
      class="w-2/5 h-2 rounded-full"
    />
  </div>
</template>

<script>
import BaseSkeleton from '~/components/BaseSkeleton'
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
