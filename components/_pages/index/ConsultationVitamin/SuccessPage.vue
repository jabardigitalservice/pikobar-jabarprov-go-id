<template>
  <div class="form-input container md:px-20 md:py-10">
    <Progress :step.sync="step" :consultation="consultation" />
    <div class="success-page__title">
      {{ title }}
    </div>
    <div class="success-page__frame">
      <div class="flex">
        <img
          :src="img"
          width="269px"
          class="pb-8"
          alt="Consultation"
        >
      </div>
      <div v-for="data in subtitle" :key="data" class="text-center">
        <span class="success-page__content text-xl">
          {{ data }}
        </span>
      </div>
      <div v-if="consultation" class="flex justify-end pt-8">
        <button
          class="button__next sm:mr-0 bg-brand-green hover:bg-brand-green-light"
          @click="onClick"
        >
          Mulai Konsultasi
        </button>
      </div>
    </div>
    <div class="success-page__card">
      <div
        v-for="item in result"
        :key="item"
      >
        <div class="pb-4">
          <div class="success-page__subtitle">
            {{ item.title }}
          </div>
          <div class="success-page__content text-base">
            {{ item.value }}
            <span v-if="item.model === 'requestId'">
              <div class="inline-block">
                <button @click="onCopy">
                  <img src="~/assets/icons/copy-clipboard.svg" width="16px" alt="copy to clipboard">
                </button>
              </div>
              <div class="inline-block justify-end">
                <BaseAlert
                  v-show="clipboard"
                  info
                  class="clipboard"
                  label="copied to clipboard"
                />
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <BaseAlert
      :icon="faInfoCircle"
      info
      class="mt-8 success-page__alert"
      label="Anda juga dapat mengambil screenshoot halaman ini sebagai bukti telah mengajukan permohonan dan untuk melakukan lacak permohonan"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { consultationLink } from '~/components/_pages/index/IsolasiMandiri/backlinks'
import BaseAlert from '~/components/Base/Alert'
import Progress from '~/components/_pages/index/ConsultationVitamin/ProgressHeader.vue'

export default {
  components: {
    Progress,
    BaseAlert
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
      faInfoCircle,
      clipboard: false,
      result: null,
      whatsappBacklink: consultationLink,
      messageInfo: null,
      messageDetail: null
    }
  },
  computed: {
    ...mapState('isoman', [
      'receipt'
    ]),
    img () {
      return this.consultation
        ? require('~/assets/conversation.svg')
        : require('~/assets/checked-list.svg')
    },
    title () {
      return this.consultation
        ? 'Konsultasi' : 'Selesai'
    },
    subtitle () {
      return this.consultation
        ? ['Selesaikan permohonan Anda.', 'Lakukan konsultasi dengan dokter sekarang']
        : ['Permohonan telah diajukan dan sedang dalam', 'proses verifikasi oleh admin Pikobar.']
    }
  },
  created () {
    this.result = [
      {
        title: 'ID Request',
        model: 'requestId',
        value: this.receipt.request_number || ''
      },
      {
        title: 'Atas Nama',
        model: 'name',
        value: this.receipt.name || ''
      }
    ]
  },
  methods: {
    onClick () {
      window.open(this.whatsappBacklink, '_blank', 'noopener,noreferrer')
      return true
    },
    onCopy () {
      navigator.clipboard.writeText(this.receipt.request_number)
      this.clipboard = true
      setTimeout(() => {
        this.clipboard = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.success-page {
  font-family: font-lora;
  &__title {
    @apply mb-6 mt-4;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 45px;
    color: #BDBDBD;
  }
  &__frame {
    height: 330px;
    align-self: stretch;
    margin: 24px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px 0px 40px;
  }
  &__content {
    font-weight: 500;
    line-height: 34px;
    color: #424242;
  }
  &__card {
    @apply flex flex-col p-6 pt-4;
    background: #FAFAFA;
    border-radius: 8px;
  }
  &__subtitle {
    font-weight: normal;
    font-style: normal;
    font-size: 14px;
    color: #757575;
    line-height: 23px;
  }
  &__alert {
    @apply text-brand-black;
    font-size: 14px;
    word-spacing: 1px;
    font-weight: 500;
    font-style: normal;
    line-height: 24px;
  }
}
.clipboard {
  width: 185px;
  padding-top: 0px;
  padding-bottom: 0px;
  animation: fadeIn linear 1s;
  -webkit-animation: fadeIn linear 1s;
  -moz-animation: fadeIn linear 1s;
  -o-animation: fadeIn linear 1s;
  -ms-animation: fadeIn linear 1s;
}

@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-moz-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
</style>
