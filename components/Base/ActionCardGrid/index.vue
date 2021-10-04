<template>
  <div class="grids">
    <ActionCard
      v-for="(action, i) in cards"
      :key="i"
      v-bind="action"
    />
  </div>
</template>

<script>
import ActionCard from '~/components/Base/ActionCard'
export default {
  components: {
    ActionCard
  },
  props: {
    /**
     * Array of ActionCard's props
     */
    cards: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.grids {
  @apply grid grid-cols-1 gap-5;

  @screen md {
    @apply grid-cols-2
    items-stretch;
  }

  @screen lg {
    @apply gap-8;
  }
}
</style>
