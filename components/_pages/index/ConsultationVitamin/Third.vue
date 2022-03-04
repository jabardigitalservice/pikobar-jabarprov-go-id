<template>
  <div class="form-input container md:px-20 md:py-10">
    <Progress :step.sync="step" />
    <Form ref="thirdStep" :list-form="inputList" />
    <hr class="my-6 -mx-10">
    <div class="flex justify-end gap-2">
      <button
        class="button__cancel sm:mr-0 hover:bg-gray-100 w-full"
        @click="onBack"
      >
        Kembali
      </button>
      <button
        class="button__next sm:mr-0 bg-brand-green hover:bg-brand-green-light w-full"
        @click="onNext"
      >
        Selanjutnya
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import thirdStepInput from './thirdStep.js'
import Utils from '~/utils/index.js'
import Form from '~/components/Form'
import Progress from '~/components/_pages/index/ConsultationVitamin/ProgressHeader.vue'

export default {
  components: {
    Progress,
    Form
  },
  props: {
    step: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      inputList: thirdStepInput,
      form: {}
    }
  },
  computed: {
    ...mapState('isoman', [
      'formRequest'
    ])
  },
  created () {
    this.form = { ...this.formRequest }
  },
  methods: {
    onBack () {
      this.$store.dispatch('isoman/updateForm', this.form)
      this.$emit('update:step', 2)
      Utils.scrollToTop()
    },
    async onNext () {
      const valid = await this.$refs.thirdStep.$refs.formValidate.validate()
      if (!valid) {
        Utils.scrollToTop()
        return
      }
      this.$store.dispatch('isoman/updateForm', this.form)
      this.$emit('update:step', 4)
      Utils.scrollToTop()
    }
  }
}
</script>
