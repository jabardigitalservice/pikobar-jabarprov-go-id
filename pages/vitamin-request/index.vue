<template>
  <div>
    <WelcomePage v-if="showStep === 0" :step.sync="showStep" />
    <FirstStep v-if="showStep === 1" :step.sync="showStep" />
    <SecondStep v-if="showStep === 2" :step.sync="showStep" />
    <ConfirmationStep v-if="showStep === 3" :step.sync="showStep" />
  </div>
</template>

<script>
import WelcomePage from '~/components/_pages/index/VitaminRequest/WelcomePage.vue'
import FirstStep from '~/components/_pages/index/VitaminRequest/FirstStep.vue'
import SecondStep from '~/components/_pages/index/VitaminRequest/SecondStep.vue'
import ConfirmationStep from '~/components/_pages/index/VitaminRequest/ConfirmationStep.vue'
export default {
  components: {
    WelcomePage,
    FirstStep,
    SecondStep,
    ConfirmationStep
  },
  data () {
    return {
      showStep: 0
    }
  }
}
</script>
