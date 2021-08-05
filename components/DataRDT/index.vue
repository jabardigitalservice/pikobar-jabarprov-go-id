<template>
  <div class="flex-row lg:flex xl:flex">
    <div class="w-full lg:w-6/12 text-white overflow-hidden mr-5 mt-5">
      <div class="rdt-antigen p-5 rounded-lg shadow-md">
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
              y="60"
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
          <b class="text-lg">Rapid Diagnostic Test (RDT) Antigen</b>
          <div class="w-full h-auto text-sm mr-10 mt-2">
            Rapid Test Antigen merupakan tes diagnostik cepat untuk mengidentifikasi orang yang terinfeksi virus Covid-19 dengan mendeteksi adanya materi genetik atau protein spesifik dari virus Covid-19 dalam tubuh seseorang.
          </div>
          <div class="w-full h-auto text-sm mr-10 mt-5 row flex-row lg:flex xl:flex">
            <div class="w-full pl-2 h-auto text-left">
              <div class="text-4xl font-extrabold">
                {{ Number(data.antigen.total).toLocaleString('id-ID') }}
              </div>
              <div class="text-sm">
                Jumlah RDT
                <div class="tooltip pl-1">
                  &#9432;
                  <span class="tooltiptext text-xs">Jumlah Rapid Diagnostic Test (RDT) Antigen yang telah dilakukan</span>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full h-auto text-sm mr-10 mt-5 row flex flex-col sm:flex-row">
            <div class="w-full sm:w-1/2 md:w-1/3 mb-3 sm:mb-0 pl-2 h-auto text-left">
              <div class="mb-1">
                <span class="text-2xl font-extrabold">{{ Number(data.antigen.positif).toLocaleString('id-ID') }}</span>
                <span class="text-sm">({{ Number(data.antigen_persentase_by_total.positif.toFixed(2)).toLocaleString('id-ID') }}%)</span>
              </div>
              <div class="text-sm">
                Positif
              </div>
            </div>
            <div class="w-full sm:w-1/2 md:w-1/3 pl-2 h-auto text-left">
              <div class="mb-1">
                <span class="text-2xl font-extrabold">{{ Number(data.antigen.negatif).toLocaleString('id-ID') }}</span>
                <span class="text-sm">({{ Number(data.antigen_persentase_by_total.negatif.toFixed(2)).toLocaleString('id-ID') }}%)</span>
              </div>
              <div class="text-sm">
                Negatif
              </div>
            </div>
          </div>
          <div class="mt-5 text-sm">
            <span>
              Update Terakhir: {{ data.antigen.tanggal }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-6/12 bg-white overflow-hidden rounded-lg shadow-md flex flex-row justify-center items-center mt-5 p-5">
      <div class="w-full h-auto justify-center items-center my-5 row flex-row lg:flex xl:flex">
        <div class="w-full md:w-full lg:w-1/2 text-center py-5 px-5">
          <img src="/img/illustrasi-rdt.svg" width="300px" class="mx-auto" alt="Ilustrasi RDT">
        </div>
        <div class="w-full md:w-full lg:w-1/2 text-center lg:text-left py-5 px-5">
          <div class="text-xl font-bold">
            Jika Anda ingin mengikuti Tes Masif Covid-19, daftarkan diri Anda di sini
          </div>
          <br>
          <a
            class="cursor-pointer py-2 px-4 text-center rounded-md bg-brand-green inline-block hover:bg-brand-green-light text-white"
            style="align-items: flex-end;"
            href="https://pikobar.jabarprov.go.id/temp/disclaimer/rdt/?uid=_userUID">
            Daftar Tes Masif
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { formatDateDayIndonesia } from '~/lib/date'

export default {
  name: 'DataRDT',
  components: {
    ContentLoader
  },
  data () {
    return {
      jsonDataKasusTotal: {},
      metadata: {},
      date_update: '',
      data: {
        antigen: {
          total: 0,
          positif: 0,
          negatif: 0,
          tanggal: ''
        },
        antigen_persentase_by_total: {
          positif: 0,
          negatif: 0
        },
        rdt: {
          total: 0,
          positif: 0,
          negatif: 0,
          invalid: 0,
          belum_diketahui: 0,
          tanggal: ''
        },
        rdt_persentase_by_total: {
          positif: 0,
          negatif: 0,
          invalid: 0,
          belum_diketahui: 0
        }
      }
    }
  },
  computed: {
    dataKasusTotal () {
      return this.$store.getters['data-kasus-total-v2/itemsMap']
    },
    dataKasusTotalMetadata () {
      return this.$store.getters['data-kasus-total-v2/metadataMap']
    },
    isLoading () {
      return this.$store.getters['data-kasus-total-v2/isLoading']
    }
  },
  watch: {
    dataKasusTotal (val) {
      this.jsonDataKasusTotal = val[0]
      this.data.rdt.tanggal = formatDateDayIndonesia(this.jsonDataKasusTotal.rdt_tanggal)
      this.data.rdt.total = this.jsonDataKasusTotal.rdt_total
      this.data.rdt.positif = this.jsonDataKasusTotal.rdt_positif
      this.data.rdt.negatif = this.jsonDataKasusTotal.rdt_negatif
      this.data.rdt.invalid = this.jsonDataKasusTotal.rdt_invalid
      this.data.rdt_persentase_by_total.positif = this.data.rdt.positif / this.data.rdt.total * 100
      this.data.rdt_persentase_by_total.negatif = this.data.rdt.negatif / this.data.rdt.total * 100
      this.data.rdt_persentase_by_total.invalid = this.data.rdt.invalid / this.data.rdt.total * 100
      this.data.antigen.tanggal = formatDateDayIndonesia(this.jsonDataKasusTotal.antigen_tanggal)
      this.data.antigen.total = this.jsonDataKasusTotal.antigen_total
      this.data.antigen.positif = this.jsonDataKasusTotal.antigen_positif
      this.data.antigen.negatif = this.jsonDataKasusTotal.antigen_negatif
      this.data.antigen_persentase_by_total.positif = this.data.antigen.positif / this.data.antigen.total * 100
      this.data.antigen_persentase_by_total.negatif = this.data.antigen.negatif / this.data.antigen.total * 100
    },
    dataKasusTotalMetadata (val) {
      this.metadata = val
      this.date_update = formatDateDayIndonesia(this.metadata.last_update)
    }
  },
  mounted () {
  },
  methods: {
  }
}

</script>

<style scoped>
  .rdt-antigen {
    background-color: #e2a000;
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
