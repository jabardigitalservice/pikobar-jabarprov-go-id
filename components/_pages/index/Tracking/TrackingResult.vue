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

      <h2 class="text-2xl md:text-2xl font-semibold leading-tight text-gray-500 mb-4 mt-12 text-left">
        Status Permohonan
      </h2>
      <div class="flex items-center p-4 bg-blue-100 rounded-lg border border-blue-600">
        <img class="inline-block" src="/img/icon-info.svg" alt="info">
        <p class="px-3 inline-block">
          {{ checkStatusHighlight(result.status) }}
        </p>
      </div>

      <div v-if="result.status === 'DELIVERY' || result.status === 'DELIVERED'" class="flex flex-col gap-2 bg-gray-100 rounded p-5 mt-5">
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
            v-if="trackingResult.delivery_info"
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

      <div v-for="item in currentStatus" :key="item.status">
        <div class="flex items-center mt-5">
          <img class="inline-block" src="/img/icon-dot.svg" alt="dot icon">
          <p class="inline-block items-center px-5 text-base font-bold uppercase">
            {{ checkStatus(item.status) }}
            <span class="text-base text-brand-green-darker font-normal capitalize mx-3">
              {{ item.date ? `(${item.date})` : '-' }}
            </span>
          </p>
        </div>
        <div class="flex mt-3">
          <div class="h-auto bg-brand-green-darker w-2 md:w-1 ml-3" />
          <div>
            <p class="inline-block items-center px-5 text-base max-w-sm">
              {{ item.note || '-' }}
            </p>
          </div>
        </div>
      </div>
      <div v-for="item in histories" :key="item.status">
        <div class="flex items-center mt-5">
          <img class="inline-block" src="/img/icon-dot-gray.svg" alt="dot icon gray">
          <p class="inline-block items-center px-5 text-base font-bold uppercase text-gray-500">
            {{ checkStatus(item.status) }}
            <span class="text-base text-gray-500 font-normal capitalize mx-3">
              {{ item.date ? `(${item.date})` : '-' }}
            </span>
          </p>
        </div>
        <div class="flex mt-3">
          <div class="h-auto bg-gray-400 w-2 md:w-1 ml-3" />
          <div>
            <p class="inline-block items-center px-5 text-base max-w-sm text-gray-500">
              {{ item.note || '-' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      statusPackage: null,
      trackingResult: null,
      resultIdentity: null,
      courierIdentity: null
    }
  },
  computed: {
    ...mapState('tracking', [
      'result',
      'histories',
      'currentStatus'
    ])
  },
  created () {
    this.trackingResult = this.result
    this.courierIdentity = [
      {
        title: 'Nama Kurir',
        value: this.trackingResult.delivery_info ? this.trackingResult.delivery_info.courier : '-'
      },
      {
        title: 'Nomor Resi',
        value: this.trackingResult.delivery_info ? this.trackingResult.delivery_info.airwaybill : '-'
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
    checkStatusHighlight (status) {
      if (status === 'NEW_REQUEST') {
        return 'Permohonan Diajukan'
      } else if (status === 'VERIFY') {
        if (this.currentStatus[0].note === 'Permohonan diterima') {
          return 'Permohonan Diterima'
        } else {
          return 'Permohonan Ditolak'
        }
      } else if (status === 'PACKAGING') {
        return 'Paket Sedang Dikemas'
      } else if (status === 'DELIVERY') {
        if (this.currentStatus[0].note === 'Paket gagal dipickup') {
          return 'Paket Gagal Dipickup'
        } else {
          return 'Paket Sedang dalam Pengiriman'
        }
      } else if (status === 'DELIVERED') {
        return 'Paket Diterima'
      }
    },
    checkStatus (status) {
      switch (status) {
        case 'NEW_REQUEST':
          return 'Permohonan'
        case 'VERIFY':
          return 'Verifikasi'
        case 'PACKAGING':
          return 'Pengemasan'
        case 'DELIVERY':
          return 'Pengiriman'
        case 'DELIVERED':
          return 'Diterima'
        default:
          return ''
      }
    },
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
