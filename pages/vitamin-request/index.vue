<template>
  <div>
    <WelcomePage v-if="showStep === 0" :step.sync="showStep" />
    <FirstStep v-if="showStep === 1" :step.sync="showStep" />
  </div>
</template>

<script>
import WelcomePage from '~/components/_pages/index/VitaminRequest/WelcomePage.vue'
import FirstStep from '~/components/_pages/index/VitaminRequest/FirstStep.vue'
export default {
  components: {
    WelcomePage,
    FirstStep
  },
  data () {
    return {
      showStep: 0
    }
  }
}
</script>
