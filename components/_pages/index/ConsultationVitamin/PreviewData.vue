<template>
  <div class="form-input container md:px-20 md:py-10">
    <Progress :step.sync="step" />
    <Form :list-form="inputList" />
    <PreviewDataDetail
      v-for="content in contentList"
      :key="content.title"
      :title="content.title"
      :content="content.data"
      class="mb-4"
    />
    <hr class="my-6 -mx-10">
    <Alert
      v-if="showAlert"
      :label="alertMessage"
      :show.sync="showAlert"
      class="mb-3"
    />
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
        <Spinner v-if="isLoading" />
        <span v-else>Selanjutnya</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import confirmationStepInput from './confirmationStep.js'
import { identity, medical, evidence } from './previewData.js'
import PreviewDataDetail from '~/components/_pages/index/ConsultationVitamin/PreviewDataDetail.vue'
import Utils from '~/utils/index.js'
import Form from '~/components/Form'
import Spinner from '~/components/Spinner'
import Alert from '~/components/Alert'
import Progress from '~/components/_pages/index/ConsultationVitamin/ProgressHeader.vue'

export default {
  components: {
    Progress,
    PreviewDataDetail,
    Form,
    Alert,
    Spinner
  },
  props: {
    step: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      inputList: confirmationStepInput,
      contentList: [
        identity,
        medical,
        evidence
      ],
      form: {},
      formImage: {},
      isLoading: false,
      showAlert: false,
      alertMessage: 'Terjadi Kesalahan'
    }
  },
  computed: {
    ...mapState('isoman', [
      'receipt'
    ])
  },
  methods: {
    onBack () {
      this.$store.dispatch('isoman/updateForm', this.form)
      this.$emit('update:step', 3)
      Utils.scrollToTop()
    },
    async onNext () {
      this.isLoading = true
      await this.$store.dispatch('isoman/postForm')
      this.isLoading = false
      if (Object.keys(this.receipt).length !== 0) {
        this.$emit('update:step', 5)
        Utils.scrollToTop()
      } else {
        this.showAlert = true
      }
    }
  }
}
</script>
