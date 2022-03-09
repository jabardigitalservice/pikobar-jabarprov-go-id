<template>
  <div class="form-input container md:px-20 md:py-10">
    <Progress :step.sync="step" />
    <div class="success-page__title">
      Konsultasi
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
      <span class="success-page__content text-xl">
        Selesaikan permohonan Anda.
      </span>
      <span class="success-page__content text-xl">
        Lakukan konsultasi dengan dokter sekarang
      </span>
      <div class="flex justify-end pt-8">
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
      return require('~/assets/conversation.svg')
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
    line-height: 45px;
  }
}
</style>
