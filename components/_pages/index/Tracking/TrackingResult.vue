<template>
  <div class="container mx-auto">
    <div class="flex flex-col m-10 pb-12 lg:mx-56 md:m-8 md:mx-20">
      <h2 class="text-2xl md:text-2xl font-semibold leading-tight text-gray-500 mb-4 mt-4 text-left">
        Detail ID Permohonan
      </h2>
      <div class="flex flex-col gap-2 bg-gray-100 rounded p-5">
        <div v-for="identity in resultIdentity" :key="identity.title" class="m-1">
          <p class="text-base text-gray-600">
            {{ identity.title }}
          </p>
          <p class="text-base font-semibold">
            {{ identity.value }}
          </p>
        </div>
      </div>
      <!-- Status permohonan -->
      <h2 class="text-2xl md:text-2xl font-semibold leading-tight text-gray-500 mb-4 mt-12 text-left">
        Status Permohonan
      </h2>
      <div class="flex items-center p-4 bg-blue-100 rounded-lg border border-blue-600">
        <img class="inline-block" src="/img/icon-info.svg" alt="info">
        <p class="px-3 inline-block">
          {{ detailPackageCurrentPosition[0].statusPermohonan }}
        </p>
      </div>
      <!-- Kurir info -->
      <div v-if="result.status === 'DELIVERY'" class="flex flex-col gap-2 bg-gray-100 rounded p-5 mt-5">
        <div v-for="identity in courierIdentity" :key="identity.title" class="m-1">
          <p class="text-base text-gray-600">
            {{ identity.title }}
          </p>
          <p class="text-base font-semibold">
            {{ identity.value }}
          </p>
        </div>
        <div class="mt-2">
          <button
            class="flex items-center bg-brand-green-darker hover:opacity-75 search-button w-auto"
            @click="onSearch"
          >
            <div class="flex items-center">
              <span class="font-medium">Lacak Pengiriman</span>
              <img class="inline-block ml-2 mt-n1" src="/img/icon-open-tab.svg" alt="open tab">
            </div>
          </button>
        </div>
      </div>
      <!-- Detail progress paket -->
      <div v-for="item in detailPackageCurrentPosition" :key="item.status">
        <div class="flex items-center mt-5">
          <img class="inline-block" src="/img/icon-dot.svg" alt="dot icon">
          <p class="inline-block items-center px-5 text-base font-bold uppercase">
            {{ item.status }}
            <span class="text-base text-brand-green-darker font-normal capitalize mx-3">
              {{ item.date }}
            </span>
          </p>
        </div>
        <div class="flex mt-3">
          <div class="h-auto bg-brand-green-darker w-2 md:w-1 ml-3" />
          <p class="inline-block items-center px-5 text-base max-w-sm">
            {{ item.note }}
          </p>
        </div>
      </div>
      <div v-for="item in detailPackageHistory" :key="item.status">
        <div class="flex items-center mt-5">
          <img class="inline-block" src="/img/icon-dot-gray.svg" alt="dot icon gray">
          <p class="inline-block items-center px-5 text-base font-bold uppercase text-gray-500">
            {{ item.status }}
            <span class="text-base text-gray-500 font-normal capitalize mx-3">
              {{ item.date }}
            </span>
          </p>
        </div>
        <div class="flex mt-3">
          <div class="h-auto bg-gray-400 w-4 md:w-1 ml-3" />
          <p class="inline-block items-center px-5 text-base max-w-sm text-gray-500">
            {{ item.note }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import packageHistory from './data'
export default {
  data () {
    return {
      packageHistory,
      statusPackage: null,
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
      resultIdentity: null,
      courierIdentity: null
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
    },
    detailPackageCurrentPosition () {
      const status = [this.packageHistory[0]]
      // this.statusPackage = status
      return status
    },
    detailPackageHistory () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return [this.packageHistory[1]]
    }
  },
  created () {
    this.trackingResult = this.result
    this.courierIdentity = [
      {
        title: 'Nama Kurir',
        value: this.trackingResult.delivery_info.courier
      },
      {
        title: 'Nomor Resi',
        value: this.trackingResult.delivery_info.airwaybill
      }
    ]
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
  },
  methods: {
    onSearch () {
      window.open(this.trackingResult.delivery_info.track_url)
    }
  }
}
</script>

<style scoped>
.search-button {
  @apply px-4 py-2 rounded-lg text-white
  justify-center items-center
}
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
