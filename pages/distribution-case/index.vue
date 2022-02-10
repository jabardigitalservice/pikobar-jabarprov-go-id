<template>
  <div class="container mx-auto">
    <br>
    <header class="m-4 mb-8 md:m-8">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="lg:w-2/3 md:auto sm:w-auto">
          <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
            Sebaran Kasus Covid-19 di Jawa Barat
          </h3>
        </div>
        <div class="lg:w-1/3 md:auto sm:w-auto">
          <client-only>
            <div class="flex">
              <div class="w-full mr-2">
                <multiselect
                  v-model="selectedKota"
                  :options="optionsKota"
                  track-by="value"
                  label="label"
                  :allow-empty="false"
                  select-label=""
                  deselect-label=""
                  selected-label=""
                  @input="setSelectedKota"
                />
              </div>
              <div class="w-full">
                <multiselect
                  v-model="selectedKecamatan"
                  :options="optionsKecamatan"
                  track-by="value"
                  label="label"
                  :allow-empty="false"
                  select-label=""
                  deselect-label=""
                  selected-label=""
                  :disabled="selectedKota.value === '32' ? true : false"
                  @input="setSelectedKecamatan"
                />
              </div>
            </div>
          </client-only>
        </div>
      </div>
    </header>
    <section class="m-4 md:m-8">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="w-full mb-6 lg:w-3/5 lg:mr-6 lg:mb-0 bg-white rounded-lg mb-8 border border-solid border-gray-300">
          <div>
            <h3 class="p-5 text-lg md:text">
              <b>Peta Kasus Covid-19 di Jawa Barat</b>
            </h3>
            <hr>
          </div>
          <div class="p-6">
            <div class="flex flex-col lg:flex-row lg:items-stretch mb-3">
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeMap === 'polygon'"
                @click="enableMap('polygon')"
              >
                <img v-if="activeMap === 'polygon'" src="/img/icon-sebaran-active.svg" style="margin-top: 2px; margin-right:5px; margin:auto;">
                <img v-if="activeMap !== 'polygon'" src="/img/icon-sebaran-inactive.svg" style="margin-top: 2px; margin-right:5px; margin:auto;">
                Sebaran Polygon
              </button>
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeMap === 'titik'"
                @click="enableMap('titik')"
              >
                <img v-if="activeMap === 'titik'" src="/img/icon-sebaran-active.svg" style="margin-top: 2px; margin-right:5px; margin:auto;">
                <img v-if="activeMap !== 'titik'" src="/img/icon-sebaran-inactive.svg" style="margin-top: 2px; margin-right:5px; margin:auto;">
                Sebaran Titik
              </button>
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeMap === 'timeslider'"
                @click="enableMap('timeslider')"
              >
                <img v-if="activeMap === 'timeslider'" src="/img/icon-data-positif-active.svg" style="margin-top: 2px; margin-right:5px; margin:auto;">
                <img v-if="activeMap !== 'timeslider'" src="/img/icon-data-positif-inactive.svg" style="margin-top: 2px; margin-right:5px; margin:auto;">
                Timeslider - Data Terkonfirmasi
              </button>
            </div>
            <MapV3SebaranPolygonIstilahBaru v-if="activeMap === 'polygon'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" :active-case-category.sync="activeCaseCategory" />
            <MapV3SebaranTitikIstilahBaru v-if="activeMap === 'titik'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" :active-case-category.sync="activeCaseCategory" />
            <MapV3SebaranTimeSliderIstilahBaru v-if="activeMap === 'timeslider'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" :active-case-category.sync="activeCaseCategory" />
          </div>
        </div>
        <div class="w-full mb-6 lg:w-2/5 lg:mb-0 bg-white rounded-lg mb-8 border border-solid border-gray-300">
          <RasioConfirmedCaseIstilahBaru :active-region-id="activeRegionId" :active-region-category="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" :active-case-category.sync="activeCaseCategory" />
        </div>
      </div>
    </section>
    <section class="m-4 md:m-8">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="w-full mb-6 lg:mb-0 bg-white rounded-lg mb-8 border border-solid border-gray-300">
          <div>
            <h3 class="p-5 text-lg md:text">
              <b>Tabel Kasus Covid-19 di Jawa Barat</b>
            </h3>
            <hr>
          </div>
          <div class="p-6">
            <div class="mb-2">
              Data yang ditampilkan berdasarkan: <b>{{ parentLabel[activeRegionCategory].label }} di {{ activeParentRegionName }}</b> <br>
            </div>
            <div class="flex flex-col lg:flex-row lg:items-stretch">
              <button
                class="button-selector mr-1 mt-1 mb-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeTable === 'confirmed'"
                @click="enableTable('confirmed')"
              >
                Terkonfirmasi
              </button>
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeTable === 'suspect'"
                @click="enableTable('suspect')"
              >
                Suspek
              </button>
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeTable === 'closecontact'"
                @click="enableTable('closecontact')"
              >
                Kontak Erat
              </button>
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeTable === 'probable'"
                @click="enableTable('probable')"
              >
                Probable
              </button>
            </div>
          </div>
          <ConfirmedCaseListIstilahBaru v-if="activeTable === 'confirmed'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" />
          <SuspectCaseListIstilahBaru v-if="activeTable === 'suspect'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" />
          <CloseContactCaseListIstilahBaru v-if="activeTable === 'closecontact'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" />
          <ProbableCaseListIstilahBaru v-if="activeTable === 'probable'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" />
        </div>
      </div>
    </section>
    <section class="m-4 md:m-8 flex flex-col xl:flex-row rounded-lg overflow-hidden bg-blue-100 border border-solid border-blue-700">
      <div class="w-full xl:w-1/2 m-1 p-5">
        <div class="flex items-center mb-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block mr-1">
            <path d="M10 2.00098C8.41775 2.00098 6.87103 2.47017 5.55544 3.34922C4.23985 4.22827 3.21447 5.4777 2.60897 6.93951C2.00347 8.40132 1.84504 10.0098 2.15372 11.5617C2.4624 13.1135 3.22433 14.539 4.34315 15.6578C5.46197 16.7766 6.88743 17.5386 8.43928 17.8473C9.99113 18.1559 11.5997 17.9975 13.0615 17.392C14.5233 16.7865 15.7727 15.7611 16.6518 14.4455C17.5308 13.1299 18 11.5832 18 10.001C18 8.9504 17.7931 7.91011 17.391 6.93951C16.989 5.9689 16.3997 5.08699 15.6569 4.34412C14.914 3.60125 14.0321 3.01198 13.0615 2.60994C12.0909 2.2079 11.0506 2.00098 10 2.00098ZM10.8 13.201C10.8 13.4131 10.7157 13.6166 10.5657 13.7667C10.4157 13.9167 10.2122 14.001 10 14.001C9.78783 14.001 9.58435 13.9167 9.43432 13.7667C9.28429 13.6166 9.2 13.4131 9.2 13.201V9.20097C9.2 8.9888 9.28429 8.78532 9.43432 8.63529C9.58435 8.48526 9.78783 8.40097 10 8.40097C10.2122 8.40097 10.4157 8.48526 10.5657 8.63529C10.7157 8.78532 10.8 8.9888 10.8 9.20097V13.201ZM10 7.60098C9.84178 7.60098 9.6871 7.55406 9.55555 7.46615C9.42399 7.37825 9.32145 7.2533 9.2609 7.10712C9.20035 6.96094 9.18451 6.80009 9.21537 6.6449C9.24624 6.48972 9.32243 6.34717 9.43432 6.23529C9.5462 6.12341 9.68874 6.04722 9.84393 6.01635C9.99911 5.98548 10.16 6.00132 10.3061 6.06187C10.4523 6.12242 10.5773 6.22496 10.6652 6.35652C10.7531 6.48808 10.8 6.64275 10.8 6.80098C10.8 7.01315 10.7157 7.21663 10.5657 7.36666C10.4157 7.51669 10.2122 7.60098 10 7.60098Z" fill="#1565C0"/>
          </svg>
          <b>Disclaimer :</b>
        </div>
        <p>
          Data Suspek, Probable dan Kontak Erat diterima Pikobar berdasarkan laporan harian Dinas Kesehatan Kab/Kota per 5 Agustus 2020,
          sehingga terlihat penumpukan kasus pada Chart Harian dan Kumulatif untuk Suspek, Probable, dan Kontak Erat pada tanggal tersebut.
        </p>
      </div>
      <div class="w-full xl:w-1/2 m-1 p-5">
        <div class="flex items-center mb-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block mr-1">
            <path d="M10 2.00098C8.41775 2.00098 6.87103 2.47017 5.55544 3.34922C4.23985 4.22827 3.21447 5.4777 2.60897 6.93951C2.00347 8.40132 1.84504 10.0098 2.15372 11.5617C2.4624 13.1135 3.22433 14.539 4.34315 15.6578C5.46197 16.7766 6.88743 17.5386 8.43928 17.8473C9.99113 18.1559 11.5997 17.9975 13.0615 17.392C14.5233 16.7865 15.7727 15.7611 16.6518 14.4455C17.5308 13.1299 18 11.5832 18 10.001C18 8.9504 17.7931 7.91011 17.391 6.93951C16.989 5.9689 16.3997 5.08699 15.6569 4.34412C14.914 3.60125 14.0321 3.01198 13.0615 2.60994C12.0909 2.2079 11.0506 2.00098 10 2.00098ZM10.8 13.201C10.8 13.4131 10.7157 13.6166 10.5657 13.7667C10.4157 13.9167 10.2122 14.001 10 14.001C9.78783 14.001 9.58435 13.9167 9.43432 13.7667C9.28429 13.6166 9.2 13.4131 9.2 13.201V9.20097C9.2 8.9888 9.28429 8.78532 9.43432 8.63529C9.58435 8.48526 9.78783 8.40097 10 8.40097C10.2122 8.40097 10.4157 8.48526 10.5657 8.63529C10.7157 8.78532 10.8 8.9888 10.8 9.20097V13.201ZM10 7.60098C9.84178 7.60098 9.6871 7.55406 9.55555 7.46615C9.42399 7.37825 9.32145 7.2533 9.2609 7.10712C9.20035 6.96094 9.18451 6.80009 9.21537 6.6449C9.24624 6.48972 9.32243 6.34717 9.43432 6.23529C9.5462 6.12341 9.68874 6.04722 9.84393 6.01635C9.99911 5.98548 10.16 6.00132 10.3061 6.06187C10.4523 6.12242 10.5773 6.22496 10.6652 6.35652C10.7531 6.48808 10.8 6.64275 10.8 6.80098C10.8 7.01315 10.7157 7.21663 10.5657 7.36666C10.4157 7.51669 10.2122 7.60098 10 7.60098Z" fill="#1565C0"/>
          </svg>
          <b>Sumber Data :</b>
        </div>
        <ul style="list-style: inherit; margin-left: 45px;">
          <li>Konfirmasi (Total, Dalam Perawatan, Sembuh, Meninggal): Laporan Harian Kemenkes</li>
          <li>Suspek (Total, Dalam Perawatan, Discarded): Laporan Harian Dinkes Kab/Kota di Jawa Barat</li>
          <li>Kontak Erat (Total, Karantina, Discarded): Laporan Harian Dinkes Kab/Kota di Jawa Barat</li>
          <li>Probable (Total, Dalam Perawatan, Sembuh, Meninggal): Laporan Harian Dinkes Kab/Kota di Jawa Barat</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
// import { faChevronUp, faChevronDown, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
// import { analytics } from '~/lib/firebase'
export default {
  components: {
    MapV3SebaranPolygonIstilahBaru: () => import('~/components/MapV3SebaranPolygonIstilahBaru'),
    MapV3SebaranTitikIstilahBaru: () => import('~/components/MapV3SebaranTitikIstilahBaru'),
    MapV3SebaranTimeSliderIstilahBaru: () => import('~/components/MapV3SebaranTimeSliderIstilahBaru'),
    RasioConfirmedCaseIstilahBaru: () => import('~/components/RasioConfirmedCaseIstilahBaru'),
    ConfirmedCaseListIstilahBaru: () => import('~/components/ConfirmedCaseListIstilahBaru'),
    SuspectCaseListIstilahBaru: () => import('~/components/SuspectCaseListIstilahBaru'),
    CloseContactCaseListIstilahBaru: () => import('~/components/CloseContactCaseListIstilahBaru'),
    ProbableCaseListIstilahBaru: () => import('~/components/ProbableCaseListIstilahBaru')
  },
  data () {
    return {
      activeRegionId: '32',
      activeRegionCategory: 'kota',
      activeParentRegionName: 'Jawa Barat',
      activeMap: 'polygon',
      activeTable: 'confirmed',
      activeCaseCategory: 'confirmation_diisolasi',

      // data
      parentLabel: {
        kota: {
          label: 'Kota/Kabupaten'
        },
        kecamatan: {
          label: 'Kecamatan'
        },
        kelurahan: {
          label: 'Kelurahan/Desa'
        }
      },

      optionsKota: [
        { value: '32', label: 'JAWA BARAT' },
        { value: '3201', label: 'KAB. BOGOR' },
        { value: '3202', label: 'KAB. SUKABUMI' },
        { value: '3203', label: 'KAB. CIANJUR' },
        { value: '3204', label: 'KAB. BANDUNG' },
        { value: '3205', label: 'KAB. GARUT' },
        { value: '3206', label: 'KAB. TASIKMALAYA' },
        { value: '3207', label: 'KAB. CIAMIS' },
        { value: '3208', label: 'KAB. KUNINGAN' },
        { value: '3209', label: 'KAB. CIREBON' },
        { value: '3210', label: 'KAB. MAJALENGKA' },
        { value: '3211', label: 'KAB. SUMEDANG' },
        { value: '3212', label: 'KAB. INDRAMAYU' },
        { value: '3213', label: 'KAB. SUBANG' },
        { value: '3214', label: 'KAB. PURWAKARTA' },
        { value: '3215', label: 'KAB. KARAWANG' },
        { value: '3216', label: 'KAB. BEKASI' },
        { value: '3217', label: 'KAB. BANDUNG BARAT' },
        { value: '3218', label: 'KAB. PANGANDARAN' },
        { value: '3271', label: 'KOTA BOGOR' },
        { value: '3272', label: 'KOTA SUKABUMI' },
        { value: '3273', label: 'KOTA BANDUNG' },
        { value: '3274', label: 'KOTA CIREBON' },
        { value: '3275', label: 'KOTA BEKASI' },
        { value: '3276', label: 'KOTA DEPOK' },
        { value: '3277', label: 'KOTA CIMAHI' },
        { value: '3278', label: 'KOTA TASIKMALAYA' },
        { value: '3279', label: 'KOTA BANJAR' }
      ],
      selectedKota: { value: '32', label: 'JAWA BARAT' },

      optionsKecamatan: [{ label: 'Pilih Kecamatan', value: '' }],
      selectedKecamatan: { label: 'Pilih Kecamatan', value: '' }
    }
  },
  computed: {
    dataKecamatan () {
      return this.$store.getters['data-kecamatan/itemsMap']
    }
  },
  watch: {
    activeRegionId (newVal, oldVal) {
      if (this.activeRegionCategory === 'kelurahan') {
        this.selectedKecamatan = this.optionsKecamatan.find(x => x.value === parseInt(newVal))
      } else if (this.activeRegionCategory === 'kecamatan') {
        this.selectedKota = this.optionsKota.find(x => x.value === newVal)
        this.selectedKecamatan = { label: 'Pilih Kecamatan', value: '' }
        this.getDataKecamatan(newVal)
      } else {
        this.selectedKota = { value: '32', label: 'JAWA BARAT' }
        this.selectedKecamatan = { label: 'Pilih Kecamatan', value: '' }
      }
    },
    dataKecamatan (val) {
      const optionsKecamatan = [{
        label: 'Pilih Kecamatan',
        value: ''
      }]
      val.forEach((element) => {
        optionsKecamatan.push({
          label: element.bps_kecamatan_nama,
          value: element.bps_kecamatan_kode
        })
      })

      this.optionsKecamatan = optionsKecamatan
    }
  },
  mounted () {
    this.$nextTick(() => {
      Promise.all([
        this.$store.dispatch('data-kasus-total-v2/getItems')
      ]).then(() => {
      })
    })

    this.getDataKecamatan()
  },
  methods: {
    enableMap (type) {
      this.activeMap = type
      this.activeCaseCategory = 'confirmation_diisolasi'
    },
    enableTable (type) {
      this.activeTable = type
    },
    setSelectedKota () {
      const val = this.selectedKota.value
      this.activeParentRegionName = this.selectedKota.label
      if (val === '32') {
        this.getDataSebaranPolygon('kota', this.activeCaseCategory)
        this.activeRegionId = val
        this.activeRegionCategory = 'kota'
      } else {
        this.selectedKecamatan = ''
        this.getDataKecamatan(val)

        this.getDataSebaranPolygon('kecamatan', this.activeCaseCategory, val)

        this.activeRegionId = val
        this.activeRegionCategory = 'kecamatan'
      }

      this.$emit('update:activeRegionId', this.activeRegionId)
      this.$emit('update:activeRegionCategory', this.activeRegionCategory)
    },
    setSelectedKecamatan () {
      const val = this.selectedKecamatan.value
      const kodeKec = val.toString()
      this.activeParentRegionName = this.selectedKecamatan.label
      if (val === '') {
        this.getDataKecamatan(this.selectedKota.value)
        this.getDataSebaranPolygon('kecamatan', this.activeCaseCategory, this.selectedKota.value)
        this.activeRegionId = this.selectedKota.value
        this.activeRegionCategory = 'kecamatan'
      } else {
        this.getDataSebaranPolygon('kelurahan', this.activeCaseCategory, kodeKec)
        this.activeRegionId = kodeKec
        this.activeRegionCategory = 'kelurahan'
      }
    },

    // GET
    getDataKecamatan (kodeKab = '') {
      let where = {
        bps_provinsi_kode: '32'
      }

      if (kodeKab) {
        where = {
          bps_kabupaten_kode: kodeKab
        }
      }

      const params = {
        where,
        exclude: 'polygon_json'
      }
      this.$store.dispatch('data-kecamatan/getItems', params)
    },
    getDataSebaranPolygon (region, category, regionCode = '') {
      let parentKeyCode = ''
      let query = 'wilayah=' + region

      if (category) {
        query += '&category=' + category
      }

      switch (region) {
        case 'kecamatan' : {
          parentKeyCode = 'kode_kab'
          break
        }
        case 'kelurahan' : {
          parentKeyCode = 'kode_kec'
          break
        }
        default : parentKeyCode = ''
      }

      query += `&${parentKeyCode}=${regionCode}`

      this.$store.dispatch('data-sebaran-polygon-v2/getItem', query)
    }
  },
  head () {
    const title = 'Sebaran Kasus - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$vs-dropdown-z-index: -1 !default;
.button-selector {
  @apply px-6 py-2 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-white bg-brand-green;
  }
}

  .style-chooser .vs__dropdown-menu {
    z-index: -10000 !important;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
