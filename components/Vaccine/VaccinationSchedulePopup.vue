<template>
  <div :class="['schedule-popup', isActive && 'is-active']" @click.self="onCloseOrCancel">
    <VaccinatonScheduleDetail
    :schedule="schedule"
    class="schedule-popup__content"
    @close="onCloseOrCancel"
  />
  </div>
</template>

<script>
import VaccinatonScheduleDetail from './VaccinationScheduleDetail.vue'
export default {
  components: {
    VaccinatonScheduleDetail
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    schedule: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onCloseOrCancel () {
      this.$emit('update:isActive', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.schedule-popup {
  @apply hidden pointer-events-none
  fixed inset-0 z-50
  justify-center items-center;

  &.is-active {
    @apply pointer-events-auto
    flex;

    background-color: rgba(0,0,0,0.25);
    backdrop-filter: blur(4px);
  }

  &__content {
    @apply overflow-auto;

    max-height: 75vh;
    max-width: 600px;
  }
}
</style>
