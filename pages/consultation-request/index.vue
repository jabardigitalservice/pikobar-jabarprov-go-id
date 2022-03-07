<template>
  <div>
    <FirstStep v-if="showStep === 1" :step.sync="showStep" />
    <SecondStep v-if="showStep === 2" :step.sync="showStep" />
    <ThirdStep v-if="showStep === 3" :step.sync="showStep" />
    <PreviewData v-if="showStep === 4" :step.sync="showStep" />
    <SuccessPage v-if="showStep === 5" :step.sync="showStep" consultation />
  </div>
</template>

<script>
import FirstStep from '~/components/_pages/index/ConsultationVitamin/First.vue'
import SecondStep from '~/components/_pages/index/ConsultationVitamin/Second.vue'
import ThirdStep from '~/components/_pages/index/ConsultationVitamin/Third.vue'
import PreviewData from '~/components/_pages/index/ConsultationVitamin/PreviewData.vue'
import SuccessPage from '~/components/_pages/index/VitaminRequest/SuccessPage.vue'
export default {
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    PreviewData,
    SuccessPage
  },
  data () {
    return {
      showStep: 1
    }
  }
}
</script>
