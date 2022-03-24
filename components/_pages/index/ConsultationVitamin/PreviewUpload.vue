<template>
  <div>
    <div class="title">
      Unggah Foto KTP & Bukti PCR/Antigen
    </div>
    <BaseAlert
      :icon="faInfoCircle"
      info
      class="mt-8 mb-8 alert__content"
      label="Pastikan bukti foto merupakan dokumen resmi dari Laboratorium/Klinik/RS yang mencantumkan keterangan tanggal dan hasil tes."
    />
    <div v-if="formImage.modelKTP === 'ktp_photo'" class="header">
      <div class="step__title">
        Unggah Foto KTP
      </div>
      <div class="md:flex xs:inline-table">
        <div v-if="formImage.typeKTP !== 'application/pdf'" class="md:inline-block md:w-3/12">
          <img
            :src="formImage.imageKTP"
            class="step__image"
            alt="Photo KTP"
          >
        </div>
        <div class="step__link">
          <a :href="formImage.imageKTP" target="_blank" rel="noopener noreferrer">{{ formImage.fileNameKTP }}</a>
          <div class="w-full bg-gray-200 rounded-full mt-4">
            <div class="step__progress">
              100%
            </div>
          </div>
        </div>
        <div class="inline-block w-2/12 pr-5 pt-6 ml-2">
          <button class="step__btn" @click="onCancel">
            <img src="~/assets/icons/Vector.png" alt="cancel">
          </button>
        </div>
      </div>
    </div>
    <div v-if="formImage.modelTestResult === 'test_result_photo'" class="header mt-12">
      <div class="step__title">
        Unggah Bukti PCR/Antigen
      </div>
      <div class="md:flex xs:inline-table">
        <div v-if="formImage.typeTestResult !== 'application/pdf'" class="md:inline-block md:w-3/12">
          <img
            :src="formImage.imageTestResult"
            class="step__image"
            alt="Photo Test Result"
          >
        </div>
        <div class="step__link">
          <a :href="formImage.imageTestResult" target="_blank" rel="noopener noreferrer">{{ formImage.fileNameTestResult }}</a>
          <div class="w-full bg-gray-200 rounded-full mt-4">
            <div class="step__progress p-0.5">
              100%
            </div>
          </div>
        </div>
        <div class="inline-block w-2/12 pr-5 pt-6 ml-2">
          <button class="step__btn" @click="onCancel">
            <img src="~/assets/icons/Vector.png" alt="cancel">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import BaseAlert from '@/components/Base/Alert'

export default {
  components: {
    BaseAlert
  },
  props: {
    formImage: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      faInfoCircle,
      form: {}
    }
  },
  watch: {
    form: {
      handler (val) {
        this.$emit('update', val)
      },
      deep: true
    }
  },
  methods: {
    onCancel () {
      this.form = {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    @apply mb-6 mt-4;
    font-family: font-lora;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 45px;
    color: #BDBDBD;
  }
  .header {
    @apply mx-auto rounded-lg flex flex-col w-full;
  }
  .step {
  font-family: font-lora;
  display: flex;
  align-items: center;
  color: #424242;
    &__title {
      @apply mb-2;
      font-weight: 700;
      color: #4a5568;
      line-height: 2;
      font-size: 0.875rem;
      line-height: 23px;
      color: #424242;
    }
    &__link {
      @apply inline-block w-6/12 pr-5 pt-6;
      text-decoration: underline;
      font-weight: 500;
      font-size: 16px;
      line-height: 26px;
      width: 100%;
      color: #1E88E5;
    }
    &__progress {
      @apply bg-blue-600 text-xs font-medium text-blue-100 text-center leading-none rounded-l-full;
      width: 100%;
    }
    &__image {
      position: static;
      width: 160px;
      height: 80px;
    }
    &__btn {
      position: static;
      align-items: center;
      padding: 4px;
      background: #EEEEEE;
      border-radius: 100px;
    }
  }
  .cancel {
    position: absolute;
    width: 14px;
    height: 14px;
    left: calc(50% - 14px/2 - 2.9px);
    top: calc(50% - 14px/2 + 7px);
    background: #757575;
    transform: rotate(-45deg);
  }
  .alert__content {
    @apply font-roboto text-brand-black;
    font-size: 14px;
    word-spacing: 1px;
    font-weight: 500;
    font-style: normal;
    line-height: 24px;
  }
</style>
