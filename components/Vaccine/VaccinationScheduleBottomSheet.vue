<template>
  <div>
    <VueBottomSheet
      ref="bottomSheet"
      is-full-screen
      max-height="75%"
      @closed="$emit('update:isActive', false)"
    >
      <VaccinatonScheduleDetail
        v-if="isActive"
        :schedule="schedule"
        @close="$refs.bottomSheet.close()"
      />
    </VueBottomSheet>
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
  watch: {
    isActive (val) {
      val ? this.$refs.bottomSheet.open() : this.$refs.bottomSheet.close()
    }
  }
}
</script>
