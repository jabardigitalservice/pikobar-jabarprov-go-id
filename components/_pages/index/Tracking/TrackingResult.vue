<template>
  <div class="container mx-auto">
    <div class="md:m-8 md:p-8 result-card">
      <h2 class="text-2xl font-bold leading-tight mb-6">
        Hasil Pelacakan Status Permohonan Anda
      </h2>
      <div class="flex flex-col rounded-lg border-gray-400 border-solid border-2 p-4">
        <div class="flex flex-col gap-2 mb-2 md:p-8">
          <div v-for="identity in resultIdentity" :key="identity.title" class="flex flex-row">
            <span class="text-sm md:text-base w-6/12 sm:w-3/12">{{ identity.title }}</span>
            <span class="text-sm md:text-base w-6/12 sm:w-9/12">{{ identity.value }}</span>
          </div>
        </div>
        <div v-if="activeTabId">
          <TabLayout
            :tabs="listTabs"
            :active-tab-id="activeTabId"
            fixed
          />
          <div class="flex flex-col">
            <span class="self-center sm:self-start my-2">Status Permohonan Anda</span>
            <span class="text-xl font-bold self-center">{{ requestStatus }}</span>
            <span
              v-if="displayReason"
              class="mt-2 self-center sm:self-start"
            >
              Alasan: {{ trackingResult.verify_info.reason }}
            </span>
            <div
              v-if="activeTabId === 'distribution' || activeTabId === 'received'"
              class="flex flex-col self-center lg:w-3/12 mt-6"
            >
              <div class="flex flex-row">
                <span class="text-sm md:text-base w-6/12 sm:w-6/12">Nomor Resi :</span>
                <span class="text-sm md:text-base w-6/12 sm:w-6/12">{{ trackingResult.delivery_info.airwaybill }}</span>
              </div>
              <div class="flex flex-row">
                <span class="text-sm md:text-base w-6/12 sm:w-6/12">Nomor Kurir :</span>
                <span class="text-sm md:text-base w-6/12 sm:w-6/12">{{ trackingResult.delivery_info.courier }}</span>
              </div>
              <a
                :href="trackingResult.delivery_info.track_url"
                target="_blank"
                class="md:self-center hover:bg-green-200 trace-button"
              >
                Cek status pengiriman
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
    TabLayout: () => import('../../../TabLayout')
  },
  data () {
    return {
      listTabs: [
        {
          id: 'request',
          title: '1. Permohonan'
        },
        {
          id: 'verification',
          title: '2. Verifikasi'
        },
        {
          id: 'packing',
          title: '3. Packing'
        },
        {
          id: 'distribution',
          title: '4. Distribusi'
        },
        {
          id: 'received',
          title: '5. Diterima'
        }
      ],
      trackingResult: null,
      resultIdentity: null
    }
  },
  computed: {
    ...mapState('tracking', [
      'result'
    ]),
    requestStatus () {
      switch (this.activeTabId) {
        case 'verification':
          return this.verificationLabel
        case 'packing':
          return 'PAKET ANDA SEDANG DI PACKING'
        case 'distribution':
          return this.trackingResult.delivery_info.status === 'RETURNED'
            ? 'PENGIRIMAN PAKET GAGAL DILAKUKAN'
            : 'PAKET ANDA SEDANG DI DISTRIBUSIKAN'
        case 'received':
          return 'SUDAH DITERIMA'
        default:
          return ''
      }
    },
    activeTabId () {
      if (this.trackingResult && this.trackingResult.status) {
        switch (this.trackingResult.status) {
          case 'NEW':
            return 'request'
          case 'VERIFY':
            return 'verification'
          case 'PACKAGING':
            return 'packing'
          case 'DELIVERY':
            return 'distribution'
          case 'DELIVERED':
            return 'received'
          default:
            return ''
        }
      } else {
        return ''
      }
    },
    verificationLabel () {
      if (this.trackingResult.verify_info) {
        return this.trackingResult.verify_info.approved ? 'LOLOS VERIFIKASI' : 'TIDAK MEMENUHI VERIFIKASI'
      } else {
        return 'SEDANG DALAM TAHAPAN VERIFIKASI'
      }
    },
    displayReason () {
      return this.activeTabId === 'verification' &&
        this.trackingResult.verify_info &&
        !this.trackingResult.verify_info.approved
    }
  },
  created () {
    this.trackingResult = this.result
    this.resultIdentity = [
      {
        title: 'ID Permohonan',
        value: this.trackingResult.request_number || ''
      },
      {
        title: 'NIK',
        value: this.trackingResult.nik || ''
      },
      {
        title: 'Nama Pemohon',
        value: this.trackingResult.name || ''
      },
      {
        title: 'Nama Paket',
        value: this.trackingResult.package_name || ''
      },
      {
        title: 'Alamat Domisili',
        value: this.trackingResult.address || ''
      }
    ]
  }
}
</script>

<style scoped>
.result-card {
  @apply flex flex-col p-5 m-4
  rounded-lg bg-white shadow-md
  content-center
}
.trace-button {
  @apply text-center px-4 py-1
  mt-4 rounded-lg text-brand-green-darker
  border-2 border-solid border-brand-green
}
</style>
