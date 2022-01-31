<template>
  <div class="pcr-main p-5 rounded-lg shadow-md h-full">
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
      <b class="text-lg">Tes PCR (Spesimen)</b>
      <div class="flex flex-col text-white text-center mt-5">
        <div class="w-full color-title">
          <div class="text-3xl">
            {{ formatNumber(data.pcr.total) }}
          </div>
          <span class="text-md text-blue-white">Total Spesimen</span>
        </div>
        <div class="w-full flex mt-5">
          <div class="w-1/3">
            <div>
              <span class="text-2xl">
                {{ formatNumber(data.pcr.positif) }}
              </span>
              <span class="text-sm">
                ({{ formatNumberPercent(data.pcr_persentase_by_total.positif) }}%)
              </span>
            </div>
            <span class="text-sm text-blue-white">Positif</span>
          </div>
          <div class="w-1/3">
            <div>
              <span class="text-2xl">
                {{ formatNumber(data.pcr.negatif) }}
              </span>
              <span class="text-sm">
                ({{ formatNumberPercent(data.pcr_persentase_by_total.negatif) }}%)
              </span>
            </div>
            <span class="text-sm text-blue-white">Negatif</span>
          </div>
          <div class="w-1/3">
            <div>
              <span class="text-2xl">
                {{ formatNumber(data.pcr.invalid) }}
              </span>
              <span class="text-sm">
                ({{ formatNumberPercent(data.pcr_persentase_by_total.invalid) }}%)
              </span>
            </div>
            <span class="text-sm text-blue-white">Inkonklusif</span>
          </div>
        </div>
        <div class="text-sm text-blue-white text-left mt-5">
          Disclaimer :<br>
          <span>Jumlah tes PCR yang ditampilkan bersumber dari database Labkes Jabar dan Allrecord TC-19. Angka belum sepenuhnya merefleksikan jumlah spesimen di Jawa Barat secara real-time.</span>
          <br>
          <br>
          <span>Update Terakhir: {{ data.pcr.tanggal }}</span>
        </div>
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
