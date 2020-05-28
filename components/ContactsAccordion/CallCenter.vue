<template>
  <Accordion id="callCenterList">
    <template #header>
      <h2 class="text-2xl font-bold leading-tight">
        Hubungi Call Center
      </h2>
    </template>
    <template #content>
      <CallCenter :show-search-bar="false" :search-string="accordionProps$.searchString" />
    </template>
  </Accordion>
</template>

<script>
import mixin from './mixin'
import CallCenter from '~/components/CallCenter'
export default {
  components: {
    Accordion: () => import('./Accordion'),
    CallCenter
  },
  mixins: [mixin]
}
</script>

<style>

</style>
