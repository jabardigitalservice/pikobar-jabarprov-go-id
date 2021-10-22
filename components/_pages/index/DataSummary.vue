<template>
  <div class="container mx-auto">
    <div>
      <section class="flex flex-row flex-wrap">
        <!-- Terkonfirmasi -->
        <CounterCardLoader
          :is-pending="isLoading"
          class="mb-8 border border-solid digital-signage"
          style="background: linear-gradient(90deg, #2C347C, #424CA6);"
          label="Total Terkonfirmasi"
        >
          <div class="flex flex-row text-white text-center mt-3 font-bold">
            <div class="w-1/2">
              <b class="text-md">Jawa Barat</b>
              <div class="text-3xl">
                {{ formatNumber(data.jawabarat.positif_total) }}
              </div>
              <div><span class="rounded-full bg-white px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer" style="color:#2C347C" :icon="iconPlusMinus(data.jawabarat.positif_total_pertumbuhan)" /></span>{{ data.jawabarat.positif_total_pertumbuhan }}</div>
            </div>
            <div class="w-1/2">
              <b class="text-md">Indonesia</b>
              <div class="text-3xl">
                {{ formatNumber(data.nasional.positif_total) }}
              </div>
              <div><span class="rounded-full bg-white px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer" style="color:#2C347C" :icon="iconPlusMinus(data.nasional.positif_total_pertumbuhan)" /></span>{{ data.nasional.positif_total_pertumbuhan }}</div>
            </div>
          </div>
        </CounterCardLoader>

        <!-- Isolasi -->
        <CounterCardLoader
          :is-pending="isLoading"
          class="mb-8 border border-solid digital-signage bg-white"
          label="Aktif"
        >
          <div class="flex flex-row text-red-500 text-center mt-3 font-bold">
            <div class="w-1/2">
              <b class="text-md text-black">Jawa Barat</b>
              <div class="text-3xl">
                {{ formatNumber(data.jawabarat.positif_aktif) }}
              </div>
              <div><span class="rounded-full bg-red-500 px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(data.jawabarat.positif_aktif_pertumbuhan)" /></span> {{ data.jawabarat.positif_aktif_pertumbuhan }}</div>
            </div>
            <div class="w-1/2">
              <b class="text-md  text-black">Indonesia</b>
              <div class="text-3xl">
                {{ formatNumber(data.nasional.positif_aktif) }}
              </div>
              <div><span class="rounded-full bg-red-500 px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(data.nasional.positif_aktif_pertumbuhan)" /></span> {{ data.nasional.positif_aktif_pertumbuhan }} </div>
            </div>
          </div>
        </CounterCardLoader>

        <!-- Selesai -->
        <CounterCardLoader
          :is-pending="isLoading"
          class="mb-8 border border-solid digital-signage bg-white"
          label="Sembuh"
        >
          <div class="flex flex-row text-green-500 text-center mt-3 font-bold">
            <div class="w-1/2">
              <b class="text-md text-black">Jawa Barat</b>
              <div class="text-3xl">
                {{ formatNumber(data.jawabarat.positif_sembuh) }}
              </div>
              <div><span class="rounded-full bg-green-500 px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(data.jawabarat.positif_sembuh_pertumbuhan)" /></span> {{ data.jawabarat.positif_sembuh_pertumbuhan }}</div>
            </div>
            <div class="w-1/2">
              <b class="text-md  text-black">Indonesia</b>
              <div class="text-3xl">
                {{ formatNumber(data.nasional.positif_sembuh) }}
              </div>
              <div><span class="rounded-full bg-green-500 px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(data.nasional.positif_sembuh_pertumbuhan)" /></span> {{ data.nasional.positif_sembuh_pertumbuhan }}</div>
            </div>
          </div>
        </CounterCardLoader>

        <!-- Meninggal -->
        <CounterCardLoader
          :is-pending="isLoading"
          class="mb-8 border border-solid digital-signage bg-white"
          label="Meninggal"
        >
          <div class="flex flex-row text-red-700 text-center mt-3 font-bold">
            <div class="w-1/2">
              <b class="text-md text-black">Jawa Barat</b>
              <div class="text-3xl">
                {{ formatNumber(data.jawabarat.positif_meninggal) }}
              </div>
              <div><span class="rounded-full bg-red-700 px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(data.jawabarat.positif_meninggal_pertumbuhan)" /></span> {{ data.jawabarat.positif_meninggal_pertumbuhan }}</div>
            </div>
            <div class="w-1/2">
              <b class="text-md  text-black">Indonesia</b>
              <div class="text-3xl">
                {{ formatNumber(data.nasional.positif_meninggal) }}
              </div>
              <div><span class="rounded-full bg-red-700 px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(data.nasional.positif_meninggal_pertumbuhan)" /></span> {{ data.nasional.positif_meninggal_pertumbuhan }}</div>
            </div>
          </div>
        </CounterCardLoader>
      </section>

      <section class="flex flex-col xl:flex-row xl:flex-no-wrap">
        <!-- ODP -->
        <StatisticLoader
          class="w-full xl:w-auto xl:mr-8"
          :is-pending="isLoading"
          label="ODP (Orang Dalam Pemantauan)"
          processed-label="Proses Pemantauan"
          finished-label="Selesai Pemantauan"
          died-label="Meninggal"
          total-label="Total ODP"
          :processed="data.jawabarat.odp_aktif"
          :processed-percentage="_round(data.jawabarat.odp_aktif / data.jawabarat.odp_total * 100, 2)"
          :finished="data.jawabarat.odp_selesai"
          :finished-percentage="_round(data.jawabarat.odp_selesai / data.jawabarat.odp_total * 100, 2)"
          :died="data.jawabarat.odp_meninggal"
          :died-percentage="_round(data.jawabarat.odp_meninggal / data.jawabarat.odp_total * 100, 2)"
          :total="data.jawabarat.odp_total"
        >
          <template #footnote>
            <footer class="p-5">
              <p>
                <b>Keterangan:&nbsp;&nbsp;</b><br>
                <b>ODP</b> adalah singkatan dari <b>Orang Dalam Pemantauan</b>.
                Seseorang dikatakan masuk dalam kategori ODP apabila ia sempat berpergian ke negara lain yang merupakan pusat penyebaran virus corona.
                Anda juga akan masuk sebagai ODP apabila pernah berkontak langsung dengan pasien yang postifi corona.
                Orang yang masuk dalam kelompon ini adalah mereka yang belum menunjukkan gejala sakit.
              </p>
            </footer>
          </template>
        </StatisticLoader>

        <!-- PDP -->
        <StatisticLoader
          class="w-full xl:w-auto"
          :is-pending="isLoading"
          label="PDP (Pasien Dalam Pengawasan)"
          processed-label="Proses Pengawasan"
          finished-label="Selesai Pengawasan"
          died-label="Meninggal"
          total-label="Total PDP"
          :processed="data.jawabarat.pdp_aktif"
          :processed-percentage="_round(data.jawabarat.pdp_aktif / data.jawabarat.pdp_total * 100, 2)"
          :finished="data.jawabarat.pdp_selesai"
          :finished-percentage="_round(data.jawabarat.pdp_selesai / data.jawabarat.pdp_total * 100, 2)"
          :died="data.jawabarat.pdp_meninggal"
          :died-percentage="_round(data.jawabarat.pdp_meninggal / data.jawabarat.pdp_total * 100, 2)"
          :total="data.jawabarat.pdp_total"
        >
          <template #footnote>
            <footer class="p-5">
              <p>
                <b>Keterangan:&nbsp;&nbsp;</b><br>
                <b>PDP</b> adalah singkatan dari <b>Pasien Dalam Pengawasan</b>.
                Artinya, orang yang masuk ke dalam kategori ini sudah dirawat oleh tenaga kesehatan (menjadi pasien) dan menunjukkan gejala sakit seperti demam, batuk, pilek dan sesak napas.
              </p>
            </footer>
          </template>
        </StatisticLoader>
      </section>
    </div>
  </div>
</template>

<script>
import _round from 'lodash/round'
import { faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import CounterCardLoader from './CounterCardLoader'
import StatisticLoader from './StatisticLoader'
import { formatNumber, formatNumberPlusMinus, formatNumberOnlyPlus } from '~/lib/number'

export default {
  components: {
    CounterCardLoader,
    StatisticLoader
  },
  data () {
    return {
      data: {
        nasional: {
          positif_total: 0,
          positif_total_pertumbuhan: 0,
          positif_aktif: 0,
          positif_aktif_pertumbuhan: 0,
          positif_sembuh: 0,
          positif_sembuh_pertumbuhan: 0,
          positif_meninggal: 0,
          positif_meninggal_pertumbuhan: 0,
          last_update: '2020-08-02'
        },
        jawabarat: {
          kode_prov: 32,
          nama_prov: 'Provinsi Jawa Barat',
          odp_aktif: 0,
          odp_aktif_pertumbuhan: 0,
          odp_meninggal: 0,
          odp_meninggal_pertumbuhan: 0,
          odp_selesai: 0,
          odp_selesai_pertumbuhan: 0,
          odp_total: 0,
          odp_total_pertumbuhan: 0,
          pcr_invalid: 0,
          pcr_negatif: 0,
          pcr_positif: 0,
          pcr_total: 0,
          pdp_aktif: 0,
          pdp_aktif_pertumbuhan: 0,
          pdp_meninggal: 0,
          pdp_meninggal_pertumbuhan: 0,
          pdp_selesai: 0,
          pdp_selesai_pertumbuhan: 0,
          pdp_total: 0,
          pdp_total_pertumbuhan: 0,
          positif_aktif: 0,
          positif_aktif_pertumbuhan: 0,
          positif_meninggal: 0,
          positif_meninggal_pertumbuhan: 0,
          positif_sembuh: 0,
          positif_sembuh_pertumbuhan: 0,
          positif_total: 0,
          positif_total_pertumbuhan: 0,
          rdt_invalid: 0,
          rdt_negatif: 0,
          rdt_positif: 0,
          rdt_total: 0,
          last_update: '2020-08-02'
        },
        meta: {
          last_update: '2020-08-03T07:00:08.000000Z'
        }
      },
      jsonDataKasusTotal: {},
      jsonDataRekapitulasiJabarKumulatifProv: [],
      jsonDataNasionalHarianKumulatif: [],
      pertumbuhan: {
        nasionalPositif: 0,
        nasionalSembuh: 0,
        nasionalMeninggal: 0
      },
      icons: {
        faAngleDoubleUp,
        faAngleDoubleDown
      }
    }
  },
  computed: {
    covidCases () {
      return this.$store.getters['covid-cases/itemsMap']
    },
    isLoading () {
      return this.$store.getters['covid-cases/isLoading']
    }
  },
  watch: {
    covidCases (val) {
      this.data = val
    }
  },
  mounted () {
    this.getCovidCases()
  },
  methods: {
    _round,
    formatNumber,
    formatNumberPlusMinus,
    formatNumberOnlyPlus,
    iconPlusMinus (val) {
      if (val > 0) {
        return this.icons.faAngleDoubleUp
      } else {
        return this.icons.faAngleDoubleDown
      }
    },

    // GET
    getCovidCases () {
      this.$store.dispatch('covid-cases/getItems')
    }
  }
}
</script>
<style lang="scss" scoped>
.px-custom-1 {
  padding-left:0.325rem;
  padding-right:0.325rem
}
.text-white {
  color: white;
}
.tag-purple-100 {
  background-color: #2C347C;
}
.tag-purple-camouflage {
  background-color: #E0E6F6;
  color: #E0E6F6;
}
.tag-red-100 {
  background-color: #EF6464;
}
.tag-red-camouflage {
  background-color: #FCDFE0;
  color: #FCDFE0;
}
.tag-green-100 {
  background-color: #3BB46E;
}
.tag-green-camouflage {
  background-color: #D3EEE3;
  color: #D3EEE3;
}
.tag-orange-100 {
  background-color: #EFA965;
}
.tag-orange-camouflage {
  background-color: #FBEADF;
  color: #FBEADF;
}
.btnActive {
  color: #ffffff;
  background-color: #2DAC55;
}
.btnNonActive {
  color: #2DAC55;
  background-color: #FFFFFF;
}
.div-only-mobile {
    display: none !important;
}
.div-no-mobile {
    display: flex !important;
}
@media screen and (max-width: 549px) {

  .div-no-mobile {
      display:none !important;
  }

  .div-only-mobile {
      display: flex !important;
  }

}
</style>
<style>
@media screen and (min-width: 1080px) {
  .digital-signage {
    width: 24% !important;
    margin: 0.5%;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 1080px) {
  .digital-signage {
    width: 48% !important;
    margin: 1%;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 576px) {
  .digital-signage {
    width: 100% !important;
    margin-bottom: 20px;
  }
}
</style>
