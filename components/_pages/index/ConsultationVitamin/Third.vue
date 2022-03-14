<template>
  <div class="form-input container md:px-20 md:py-10">
    <Progress :step.sync="step" :consultation="consultation" />
    <PreviewUpload v-if="formImage.modelKTP && formImage.modelTestResult" :form-image="formImage" @update="updateFormImage" />
    <Form
      v-else
      ref="thirdStep"
      :form-data="form"
      :list-form="inputList"
      @update="updateForm"
      @preview="updatePreview"
    />
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
import PreviewUpload from '~/components/_pages/index/ConsultationVitamin/PreviewUpload.vue'

export default {
  components: {
    Progress,
    PreviewUpload,
    Form
  },
  props: {
    step: {
      type: Number,
      default: null
    },
    consultation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputList: thirdStepInput,
      form: {},
      formImage: {}
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
    updatePreview (model, val) {
      if (model === 'ktp_photo') {
        this.form.ktp_photo = val
        this.formImage = {
          ...this.formImage,
          modelKTP: model,
          typeKTP: val.type,
          fileNameKTP: val.name,
          imageKTP: URL.createObjectURL(val)
        }
      } else if (model === 'test_result_photo') {
        this.form.test_result_photo = val
        this.formImage = {
          ...this.formImage,
          modelTestResult: model,
          typeTestResult: val.type,
          fileNameTestResult: val.name,
          imageTestResult: URL.createObjectURL(val)
        }
      }
    },
    updateFormImage () {
      this.formImage = {}
    },
    updateForm (val) {
      this.form = { ...this.form, ...val }
    },
    onBack () {
      this.$store.dispatch('isoman/updateForm', this.form)
      this.$emit('update:step', 2)
      Utils.scrollToTop()
    },
    async onNext () {
      if (!this.formImage.modelKTP || !this.formImage.modelTestResult) {
        const valid = await this.$refs.thirdStep.$refs.formValidate.validate()
        if (!valid) {
          Utils.scrollToTop()
          return
        }
      }
      this.$store.dispatch('isoman/updateForm', this.form)
      this.$emit('update:step', 4)
      Utils.scrollToTop()
    }
  }
}
</script>
