<template>
  <div>
    <WelcomePage v-if="showStep === 0" :step.sync="showStep" consultation />
    <FirstStep v-if="showStep === 1" :step.sync="showStep" />
    <SecondStep v-if="showStep === 2" :step.sync="showStep" />
    <ConfirmationStep v-if="showStep === 3" :step.sync="showStep" />
    <SuccessPage v-if="showStep === 4" :step.sync="showStep" consultation />
  </div>
</template>

<script>
import WelcomePage from '~/components/_pages/index/VitaminRequest/WelcomePage.vue'
import FirstStep from '~/components/_pages/index/ConsultationVitamin/First.vue'
import SecondStep from '~/components/_pages/index/ConsultationVitamin/Second.vue'
import ConfirmationStep from '~/components/_pages/index/VitaminRequest/ConfirmationStep.vue'
import SuccessPage from '~/components/_pages/index/VitaminRequest/SuccessPage.vue'
export default {
  components: {
    WelcomePage,
    FirstStep,
    SecondStep,
    ConfirmationStep,
    SuccessPage
  },
  data () {
    return {
      showStep: 0
    }
  }
}
</script>
