<template>
  <div class="vaccine-schedule">
    <VaccinationScheduleItem
      v-for="schedule in list"
      :key="schedule.id"
      v-bind="schedule"
      @click="(index) => $emit('click', index)"
    />
  </div>
</template>

<script>
import VaccinationScheduleItem from './VaccinationScheduleItem.vue'
export default {
  components: {
    VaccinationScheduleItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.vaccine-schedule {
  @apply grid grid-cols-1 mt-8 gap-4;

  @screen lg {
    @apply grid-cols-3 gap-8
  }
}
</style>
