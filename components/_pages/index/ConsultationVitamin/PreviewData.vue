<template>
  <div class="form-input container md:px-20 md:py-10">
    <Progress :step.sync="step" :consultation="consultation" />
    <Form :list-form="inputList" :form-data="form" />
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
        @click="onDialog"
      >
        <Spinner v-if="isLoading" />
        <span v-else>{{ buttonText }}</span>
      </button>
    </div>
    <Dialog
      :is-active.sync="showDialog"
      :return-submit.sync="returnSubmit"
      title="Apakah data yang Anda masukkan sudah benar?"
      @update="onUpdate"
    />
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
import Dialog from '~/components/Dialog'
import Progress from '~/components/_pages/index/ConsultationVitamin/ProgressHeader.vue'

export default {
  components: {
    Progress,
    PreviewDataDetail,
    Form,
    Alert,
    Spinner,
    Dialog
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
      inputList: confirmationStepInput,
      contentList: [
        identity,
        medical,
        evidence
      ],
      form: {},
      isLoading: false,
      showAlert: false,
      showDialog: false,
      returnSubmit: false,
      buttonText: 'Submit',
      alertMessage: 'Submit data gagal, silakan coba lagi.'
    }
  },
  computed: {
    ...mapState('isoman', [
      'formRequest',
      'receipt'
    ])
  },
  created () {
    this.form = { ...this.formRequest }
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
        this.buttonText = 'Coba Lagi'
        this.showAlert = true
      }
    },
    onDialog () {
      if (this.returnSubmit) {
        this.onNext()
      } else {
        this.showDialog = true
      }
    },
    onUpdate () {
      this.onNext()
    }
  }
}
</script>
