<template>
  <Accordion id="taskForceList">
    <template #header>
      <h2 class="text-2xl font-bold leading-tight">
        Website Gugus Tugas Kota/Kabupaten Jawa Barat
      </h2>
    </template>
    <template #content>
      <TaskForce :show-search-bar="false" :search-string="accordionProps$.searchString" />
    </template>
  </Accordion>
</template>

<script>
import mixin from './mixin'
import TaskForce from '~/components/TaskForce'
export default {
  components: {
    Accordion: () => import('./Accordion'),
    TaskForce
  },
  mixins: [mixin]
}
</script>

<style>

</style>
