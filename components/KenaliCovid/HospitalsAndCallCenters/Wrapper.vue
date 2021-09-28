<template>
  <div class="wrapper">
    <CallCenters />
    <Hospitals />
  </div>
</template>

<script>
import Hospitals from './Hospitals'
import CallCenters from './CallCenters'

export default {
  components: {
    Hospitals,
    CallCenters
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  gap: 16px;
  @apply grid grid-cols-1 grid-rows-1;

  @screen lg {
    gap: 32px;
    @apply grid-cols-2 items-stretch;
  }
}
</style>
