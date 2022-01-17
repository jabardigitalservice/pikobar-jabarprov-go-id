<template>
  <!-- eslint-disable vue/no-v-html -->
  <!-- @todo: delete this unused component -->
  <div>
    <div v-html="iframe" />
    <div
      v-show="isLoading"
      class="vax-table-skeleton"
    >
      <div class="vax-table-skeleton__header" />
      <div class="p-2">
        <div
          v-for="i in 5"
          :key="i"
          class="vax-table-skeleton__inner"
        >
          <div class="p-2">
            <BaseSkeleton class="vax-table-skeleton__title" />
            <BaseSkeleton class="vax-table-skeleton__detail" />
          </div>
          <BaseSkeleton class="vax-table-skeleton__img" />
        </div>
      </div>
      <div class="vax-table-skeleton__footer" />
    </div>
  </div>
</template>

<script>
import BaseSkeleton from '../Base/Skeleton'
export default {
  components: {
    BaseSkeleton
  },
  computed: {
    schedule () {
      return this.$store.state.vaksin.schedule
    },
    iframe () {
      return this.schedule?.value || ''
    },
    isLoading () {
      return !this.schedule
    }
  },
  mounted () {
    this.$store.dispatch('vaksin/getSchedule')
  }
}
</script>

<style lang="scss" scoped>
.vax-table-skeleton {
  &,
  &__inner {
    @apply overflow-hidden
    rounded
    border border-solid border-gray-300;
  }

  &__header {
    @apply h-10 border-b
    bg-white;
  }

  &__footer {
    @apply h-6 border-t;
  }

  &__header,
  &__footer {
    @apply border-solid border-gray-300
    bg-white;
  }

  &__inner {
    @apply relative flex flex-row flex-no-wrap
    justify-between
    w-full h-20 mb-2
    bg-white;
  }

  &__title {
    @apply w-24 h-2 mt-4
    rounded-full;
  }

  &__detail {
    @apply inline-block
    w-48 h-2 mr-4 my-4
    rounded-full;
  }

  &__img {
    @apply w-20 h-20;
  }
}
</style>
