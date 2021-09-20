
<template>
  <div class="content-info-card">
    <SectionHeader
      v-for="(val, index) in data"
      :key="index"
      v-bind="val"
    >
      <template #icon>
        <img v-if="val.icon" class="pr-2 mb-4" :src="val.icon" alt="icon-content-info-card">
      </template>
    </SectionHeader>
  </div>
</template>
<script>
export default {
  components: {
    SectionHeader: () => import('../Section/SectionHeader')
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.content-info-card {
  gap: 32px;
  @apply grid grid-cols-1 mt-8;

   @screen lg {
      @apply grid-cols-2
   }
}
</style>
