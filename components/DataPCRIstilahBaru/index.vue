<template>
  <div class="pcr-main p-5 rounded-lg h-full relative">
    <div :class="isLoading ? 'block' : 'hidden'">
      <ContentLoader
        :speed="2"
        width="400"
        height="150"
        primary-color="rgba(214, 210, 210,0.6)"
        secondary-color="rgba(214, 210, 210,1)"
        style="max-width: 400px;"
      >
        <rect
          x="0"
          y="0"
          rx="8"
          ry="6"
          width="50%"
          height="16"
        />
        <rect
          x="0"
          y="30"
          rx="8"
          ry="6"
          width="66%"
          height="16"
        />
        <rect
          x="0"
          y="64"
          rx="8"
          ry="6"
          width="20%"
          height="16"
        />
        <rect
          x="0"
          y="90"
          rx="8"
          ry="6"
          width="50%"
          height="16"
        />
        <rect
          x="0"
          y="120"
          rx="8"
          ry="6"
          width="66%"
          height="16"
        />
      </ContentLoader>
    </div>
    <div :class="!isLoading ? 'block' : 'hidden'">
      <b class="text-lg mb-4 inline-block">Pengujian PCR (Spesimen)</b>
      <div class="w-full h-auto text-sm mr-10 mt-5 row flex-row lg:flex xl:flex">
        <div class="w-full pl-2 h-auto text-left">
          <div class="text-4xl font-extrabold">
            {{ formatNumber(data.pcr.total) }}
          </div>
          <div class="text-sm">
            Total Spesimen
          </div>
        </div>
      </div>
      <div class="w-full h-auto text-sm mr-10 mt-5 row flex flex-col sm:flex-row">
        <div class="w-full sm:w-1/2 md:w-1/3 mb-3 sm:mb-0 pl-2 h-auto text-left">
          <div class="mb-1">
            <span class="text-2xl font-extrabold">{{ formatNumber(data.pcr.positif) }}</span>
            <span class="text-sm">({{ formatNumberPercent(data.pcr_persentase_by_total.positif) }}%)</span>
          </div>
          <div class="text-sm">
            Positif
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-1/3 mb-3 sm:mb-0 pl-2 h-auto text-left">
          <div class="mb-1">
            <span class="text-2xl font-extrabold">{{ formatNumber(data.pcr.negatif) }}</span>
            <span class="text-sm">({{ formatNumberPercent(data.pcr_persentase_by_total.negatif) }}%)</span>
          </div>
          <div class="text-sm">
            Negatif
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-1/3 pl-2 h-auto text-left">
          <div class="mb-1">
            <span class="text-2xl font-extrabold">{{ formatNumber(data.pcr.invalid) }}</span>
            <span class="text-sm">({{ formatNumberPercent(data.pcr_persentase_by_total.invalid) }}%)</span>
          </div>
          <div class="text-sm">
            Inkonklusif
          </div>
        </div>
      </div>
      <div class="w-full text-sm mr-10 mt-5 row flex flex-col sm:flex-row">
        <div class="w-full pl-2 text-left text-sm">
          Disclaimer :<br>
          <span>Jumlah pengujian PCR yang ditampilkan bersumber dari data Kementerian Kesehatan National All Record (NAR). Angka yang ditampilkan tidak menunjukkan jumlah pengujian spesimen di Jawa Barat secara real time.</span>
        </div>
      </div>
      <div class="mt-5 text-sm absolute bottom-0 left-0 pl-5 pb-5">
        <span>
          Update Terakhir: {{ data.pcr.tanggal }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { formatDateDayIndonesia } from '~/lib/date'
import { formatNumber, formatNumberPercent } from '~/lib/number'

export default {
  name: 'DataPCR',
  components: {
    ContentLoader
  },
  data () {
    return {
      jsonDataKasusTotal: {},
      metadata: {},
      date_update: '',
      data: {
        pcr: {
          total: 0,
          positif: 0,
          negatif: 0,
          invalid: 0,
          tanggal: ''
        },
        pcr_individu: {
          total: 0,
          positif: 0,
          negatif: 0,
          invalid: 0,
          tanggal: ''
        },
        pcr_persentase_by_total: {
          positif: 0,
          negatif: 0,
          invalid: 0
        },
        pcr_individu_persentase_by_total: {
          positif: 0,
          negatif: 0,
          invalid: 0
        }
      },
      showMore: true
    }
  },
  computed: {
    dataKasusTotal () {
      return this.$store.getters['data-kasus-total-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-kasus-total-v2/isLoading']
    }
  },
  watch: {
    dataKasusTotal (val) {
      this.jsonDataKasusTotal = val[0]
      this.data.pcr.total = this.jsonDataKasusTotal.pcr_total
      this.data.pcr.positif = this.jsonDataKasusTotal.pcr_positif
      this.data.pcr.negatif = this.jsonDataKasusTotal.pcr_negatif
      this.data.pcr.invalid = this.jsonDataKasusTotal.pcr_invalid
      this.data.pcr.tanggal = formatDateDayIndonesia(this.jsonDataKasusTotal.pcr_date)
      this.data.pcr_individu.total = this.jsonDataKasusTotal.pcr_individu_total
      this.data.pcr_individu.positif = this.jsonDataKasusTotal.pcr_individu_positif
      this.data.pcr_individu.negatif = this.jsonDataKasusTotal.pcr_individu_negatif
      this.data.pcr_individu.invalid = this.jsonDataKasusTotal.pcr_individu_invalid
      this.data.pcr_individu.tanggal = formatDateDayIndonesia(this.jsonDataKasusTotal.pcr_individu_date)
      this.data.pcr_persentase_by_total.positif = this.data.pcr.positif / this.data.pcr.total * 100
      this.data.pcr_persentase_by_total.negatif = this.data.pcr.negatif / this.data.pcr.total * 100
      this.data.pcr_persentase_by_total.invalid = this.data.pcr.invalid / this.data.pcr.total * 100
      this.data.pcr_individu_persentase_by_total.positif = this.data.pcr_individu.positif / this.data.pcr_individu.total * 100
      this.data.pcr_individu_persentase_by_total.negatif = this.data.pcr_individu.negatif / this.data.pcr_individu.total * 100
      this.data.pcr_individu_persentase_by_total.invalid = this.data.pcr_individu.invalid / this.data.pcr_individu.total * 100
    }
  },
  mounted () {
  },
  methods: {
    clickShowMore () {
      this.showMore = !this.showMore
    },
    formatNumber,
    formatNumberPercent,
    formatDate (date) {
      const d = new Date(date)
      const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }
      return d.toLocaleString('id-ID', options)
    }
  }
}

</script>

<style scoped>

  .text-blue-white {
    color: #D0E5F3;
  }
  .pcr-main {
    background-color: #41A5DE;
    padding-bottom: 80px;
  }
  /* Tooltip container */
  .tooltip {
    position: absolute;
    display: inline-block;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: white;
    color:#000;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
     width: 120px;
    top: 100%;
    left: 50%;
    margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14)
  }

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    bottom: 100%;  /* At the top of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
