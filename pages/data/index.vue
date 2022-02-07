<template>
  <div class="container mx-auto">
    <br>
    <header class="m-4 mb-8 md:m-8">
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
        Dashboard Statistik Kasus Covid-19 Provinsi Jawa Barat
      </h3>
      <small class="text-xl opacity-75">*Update Terakhir: {{ lastUpdatedAt }}</small>
    </header>
    <section class="m-4 mb-8 md:m-5">
      <DataSummaryIstilahBaru />
    </section>
    <section class="m-4 md:m-8">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="w-full mb-6 lg:mb-0 bg-white rounded-lg mb-8 border border-solid border-gray-300">
          <div>
            <h3 class="p-5 text-lg md:text">
              <b>Peta Kasus Covid-19 di Jawa Barat</b>
            </h3>
            <hr>
          </div>
          <div class="p-6">
            <MapV4SebaranPolygonIstilahBaru />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2">
          <a
            href="/distribution-case"
          >
            <div class="banner bg-no-repeat bg-right-bottom m-4 mb-8 md:m-8 h-48 bg-orange-600 rounded-lg relative" style="height: 320px;background-color: #FEC52E;">
              <div class="float-left py-6 px-10">
                <div class="w-text xl:text-2xl font-bold">
                  Ketahui informasi lebih lengkap mengenai <br>
                  Sebaran Kasus COVID-19 di Provinsi Jawa Barat

                </div>
                <button class="bg-white py-2 px-4 rounded font-semibold mt-5 hover:shadow">
                  Lihat Selengkapnya <FontAwesomeIcon :icon="faAngleRight" class="ml-2 w-text xl:text-xl align-middle" />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div class="md:w-1/2">
          <a
            href="/distribution-healthcare"
          >
            <div class="banner-healthcare bg-no-repeat bg-right-bottom m-4 mb-8 md:m-8 h-48 rounded-lg relative" style="height: 320px;background-color: #69b85d;">
              <div class="float-left py-6 px-10">
                <div class="w-text xl:text-2xl font-bold">
                  Keterisian Tempat Tidur (BOR) Berdasarkan Gejala dan Ruang Perawatan di Rumah Sakit <br><br>
                </div>
                <button class="bg-white py-2 px-4 rounded font-semibold mt-5 hover:shadow">
                  Lihat Selengkapnya <FontAwesomeIcon :icon="faAngleRight" class="ml-2 w-text xl:text-xl align-middle" />
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="m-4 mb-8 md:m-8">
      <BarStatAreaSingleV2IstilahBaru />
    </section>

    <section class="m-4 mb-8 md:m-8">
      <div class="chart-container w-full">
        <BarStatJenisKelaminIstilahBaru />
        <BarStatUsiaIstilahBaru />
      </div>
    </section>

    <section class="m-4 mb-8 md:m-8">
      <div class="grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="text-white h-full">
          <DataRDT />
        </div>
        <div class="text-white h-full">
          <DataPCRIstilahBaru />
        </div>
      </div>
    </section>

    <section class="m-4 md:m-8 flex">
      <a class="link-hover bg-white rounded-lg overflow-hidden shadow-md w-1/2 mr-2" href="/table-case" target="_blank">
        <div class="flex" style="padding: 40px;">
          <div class="w-5/6 text-xl">
            <b>Akses Data Kasus COVID-19 - <br>di sini</b>
          </div>
          <div class="w-1/6">
            <FontAwesomeIcon :icon="faArrowRight" size="2x" style="margin-top: 10px;" />
          </div>
        </div>
      </a>
      <a class="link-hover bg-white rounded-lg overflow-hidden shadow-md w-1/2 ml-2" href="https://covid19-public.digitalservice.id/api/v1/">
        <div class="flex" style="padding: 40px;">
          <div class="w-5/6 text-xl">
            <b>Dapatkan akses API Publik - <br>Data Pikobar di sini</b>
          </div>
          <div class="w-1/6">
            <FontAwesomeIcon :icon="faArrowRight" size="2x" style="margin-top: 10px;" />
          </div>
        </div>
      </a>
    </section>
    <section class="m-4 md:m-8 flex flex-col xl:flex-row rounded-lg overflow-hidden bg-blue-100 border border-solid border-blue-700">
      <div class="w-full m-1 p-5">
        <div class="flex items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block mr-1">
            <path d="M10 2.00098C8.41775 2.00098 6.87103 2.47017 5.55544 3.34922C4.23985 4.22827 3.21447 5.4777 2.60897 6.93951C2.00347 8.40132 1.84504 10.0098 2.15372 11.5617C2.4624 13.1135 3.22433 14.539 4.34315 15.6578C5.46197 16.7766 6.88743 17.5386 8.43928 17.8473C9.99113 18.1559 11.5997 17.9975 13.0615 17.392C14.5233 16.7865 15.7727 15.7611 16.6518 14.4455C17.5308 13.1299 18 11.5832 18 10.001C18 8.9504 17.7931 7.91011 17.391 6.93951C16.989 5.9689 16.3997 5.08699 15.6569 4.34412C14.914 3.60125 14.0321 3.01198 13.0615 2.60994C12.0909 2.2079 11.0506 2.00098 10 2.00098ZM10.8 13.201C10.8 13.4131 10.7157 13.6166 10.5657 13.7667C10.4157 13.9167 10.2122 14.001 10 14.001C9.78783 14.001 9.58435 13.9167 9.43432 13.7667C9.28429 13.6166 9.2 13.4131 9.2 13.201V9.20097C9.2 8.9888 9.28429 8.78532 9.43432 8.63529C9.58435 8.48526 9.78783 8.40097 10 8.40097C10.2122 8.40097 10.4157 8.48526 10.5657 8.63529C10.7157 8.78532 10.8 8.9888 10.8 9.20097V13.201ZM10 7.60098C9.84178 7.60098 9.6871 7.55406 9.55555 7.46615C9.42399 7.37825 9.32145 7.2533 9.2609 7.10712C9.20035 6.96094 9.18451 6.80009 9.21537 6.6449C9.24624 6.48972 9.32243 6.34717 9.43432 6.23529C9.5462 6.12341 9.68874 6.04722 9.84393 6.01635C9.99911 5.98548 10.16 6.00132 10.3061 6.06187C10.4523 6.12242 10.5773 6.22496 10.6652 6.35652C10.7531 6.48808 10.8 6.64275 10.8 6.80098C10.8 7.01315 10.7157 7.21663 10.5657 7.36666C10.4157 7.51669 10.2122 7.60098 10 7.60098Z" fill="#1565C0"/>
          </svg>
          <span>Sumber Data Konfirmasi (Total, Dalam Perawatan, Sembuh, Meninggal): <b>Laporan Harian Kemenkes.</b></span>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.link-hover:hover {
  box-shadow: 0 0 20px #6dd174;
  color: #6dd174;
}
.link-hover-warning:hover {
  box-shadow: 0 0 10px #fed1b1;
  text-decoration: underline;
  cursor: pointer;
}

.div-banner-distribution-case:hover .banner-distribution-case-hover {
  display: block;
}

.div-banner-distribution-case:hover .banner-distribution-case {
  display: none;
}
</style>
<script>
/* eslint-disable */
import axios from 'axios'
import { mapState } from 'vuex'
import DataSummaryIstilahBaru from '~/components/_pages/index/DataSummaryIstilahBaru'
import { faFirstAid, faBug, faMap, faCalendarMinus, faArrowRight, faChevronRight, faInfo, faInfoCircle, faCircle, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { formatDateShort } from '~/lib/date'
import { analytics } from '~/lib/firebase'

export default {
  components: {
    DataSummaryIstilahBaru,
    DataRDT: () => import('~/components/DataRDT'),
    DataPCRIstilahBaru: () => import('~/components/DataPCRIstilahBaru'),
    MapV4SebaranPolygonIstilahBaru: () => import('~/components/MapV4SebaranPolygonIstilahBaru'),
    BarStatAreaSingleV2IstilahBaru: () => import('~/components/BarStatAreaSingleV2IstilahBaru'),
    BarStatHarianAkumulatifV2IstilahBaru: () => import('~/components/BarStatHarianAkumulatifV2IstilahBaru'),
    BarStatJenisKelaminIstilahBaru: () => import('~/components/BarStatJenisKelaminIstilahBaru'),
    BarStatUsiaIstilahBaru: () => import('~/components/BarStatUsiaIstilahBaru')
  },
  data () {
    return {
      stat: {
        isActiveHeatmap: true,
        isActiveFaskes: false,
      },
      activeTabId: 'map-kel',
      faFirstAid,
      faBug,
      faMap,
      faCalendarMinus,
      faArrowRight,
      faChevronRight,
      faInfo,
      faCircle,
      faAngleRight
    }
  },
  computed: {
    ...mapState({
      cases: state => state.statistics.cases
    }),
    ...mapState('data-kasus-total-v2', {
      /**
       * @public
       */
      lastUpdatedAt: (state) => {
        // eslint-disable-next-line camelcase
        const date = state.metadata?.last_update
        return date
          ? formatDateShort(new Date(date)) + ' 17:00'
          : '-'
      }
    })
  },
  mounted () {
    this.$nextTick(() => {
      Promise.all([
        this.$store.dispatch('data-kasus-total-v2/getItems'),
        this.$store.dispatch('data-nasional-harian/getItems'),
        this.$store.dispatch('data-kasus-harian-v2/getItems'),
        this.$store.dispatch('data-kasus-harian-kota-v2/getItems'),
        this.$store.dispatch('data-kasus-mingguan-kota-v2/getItems'),
        this.$store.dispatch('data-kasus-mingguan-provinsi-v2/getItems'),
        this.$store.dispatch('data-kasus-dwimingguan-kota-v2/getItems'),
        this.$store.dispatch('data-kasus-dwimingguan-provinsi-v2/getItems'),
        this.$store.dispatch('statistics/getCases'),
      ]).then(() => {
      })

      if (process.browser) {
        analytics.logEvent('dashboard_view')
      }
    })
  },
  methods: {
    formatDateShort,
    enableHeatmap () {
      this.stat.isActiveHeatmap = true
      this.stat.isActiveFaskes = false
    },
    enableFaskes () {
      this.stat.isActiveHeatmap = false
      this.stat.isActiveFaskes = true
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1rem;
  row-gap: 1rem;

  @screen lg {
    grid-template-columns: 2fr 4fr;
  }
}

.button-selector {
  @apply px-6 py-2 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-white bg-brand-green;
  }
}

.banner {
  background-image: url('~assets/banner-sebaran-ilustrasi.png');
}

.banner-healthcare {
  background-image: url('~assets/banner-healthcare.png');
}
</style>

<style>
@import "leaflet-geosearch/assets/css/leaflet.css";
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";
.bg-green-100 {
  background-color: #5aaa4e;
}
.text-white {
  color: white;
}
.btn {
  border-radius: 0.25rem;
}

.container-map {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #ffffff;
}

.filter-layer {
  position: absolute;
  top: 0px;
  right: 10px;
  padding-right: 1em;
  padding-top: 1em;
}

.filter-layer .btn {
  font-size: 0.8em;
  padding: 2px 6px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
}

.filter-data {
  background: #fff;
  margin-top: 0.5em;
  padding: 0.6em;
  border-radius: 0.6em;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
}

.filter-layer li {
  list-style: none;
  opacity: 0.4;
  padding-bottom: 0.2em;
}

.filter-layer li:hover {
  cursor: pointer;
}

.filter-active {
  opacity: 1 !important;
}

.filter-data {
  background: #fff;
  color: black;
  margin-top: 0.5em;
  padding: 0.6em;
  border-radius: 0.6em;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
}

.legend-color {
  width: 1em;
  height: 1em;
  float: left;
  border-radius: 10px;
  margin-top: 4px;
}

.cluster {
  border-radius: 50%;
  text-align: center;
  color: white;
  font-weight: 700;
  font-family: monospace;
  height: 10px;
  width: 10px;
}

.cluster-odp-proses {
  /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
  border: 2px solid rgb(45, 156, 219, 0.9);
  background: rgb(45, 156, 219, 0.9);
}

.cluster-odp-selesai {
  /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
  border: 2px solid rgb(45, 156, 219, 0.9);
  background: rgba(196, 195, 195, 0.9);
}

.cluster-odp-meninggal {
  /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
  border: 2px solid rgb(45, 156, 219, 0.9);
  background: rgb(165, 18, 18, 0.9);
}

.cluster-pdp-proses {
  /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
  border: 2px solid rgb(242, 201, 76, 0.9);
  background: rgb(242, 201, 76, 0.9);
}

.cluster-pdp-selesai {
  /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
  border: 2px solid rgb(242, 201, 76, 0.9);
  background: rgba(196, 195, 195, 0.9);
}

.cluster-pdp-meninggal {
  /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
  border: 2px solid rgb(242, 201, 76, 0.9);
  background: rgb(165, 18, 18, 0.9);
}

.cluster-positif-proses {
  /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
  border: 2px solid rgb(235, 87, 87, 0.9);
  background: rgb(235, 87, 87, 0.9);
}

.cluster-positif-sembuh {
  /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
  border: 2px solid rgb(235, 87, 87, 0.9);
  background: rgb(39, 174, 96, 0.9);
}

.cluster-positif-meninggal {
  /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
  border: 2px solid rgb(235, 87, 87, 0.9);
  background: rgb(165, 18, 18, 0.9);
}

.digits-0 {
  height: 17px;
  width: 17px;
  margin-top: -14px;
  margin-left: -14px;
}

.digits-1 {
  font-size: 14px;
  height: 28px;
  width: 28px;
  line-height: 28px;
  margin-top: -14px;
  margin-left: -14px;
}

.digits-2 {
  font-size: 16px;
  height: 34px;
  width: 34px;
  line-height: 35px;
  margin-top: -17px;
  margin-left: -17px;
}

.digits-3 {
  font-size: 18px;
  height: 48px;
  width: 47px;
  line-height: 47px;
  /* border-width: 3px; */
  margin-top: -24px;
  margin-left: -24px;
}

.digits-4 {
  font-size: 18px;
  height: 58px;
  width: 58px;
  line-height: 57px;
  /* border-width: 4px; */
  margin-top: -29px;
  margin-left: -29px;
}

.legend-layer {
  /* position: absolute; */
  /* bottom: 10px; */
  /* left: 30px; */
  /* padding-right: 1em; */
  /* padding-top: 1em; */
}

.legend-data {
  background: rgb(255, 255, 2555);
  margin-top: 0.5em;
  padding: 0.6em;
  /* border-radius: 0.6em; */
  /* box-shadow: 0 1px 5px rgba(0,0,0,0.65); */
  line-height: 18px;
  color: #252525;
}

.legend-data ul {
  list-style: none;
  margin-bottom: 0px;
}

.legend-data li {
  padding: 3px;
}

.legend-data i {
  width: 13px;
  height: 13px;
  float: left;
  margin-right: 8px;
  border: white 1px solid;
}

.leaflet-div-icon {
  border: none !important;
  border-radius: 20px;
}

.backdrop {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: black;
  opacity: 0.5;
  border-radius: 1em;
}

.text-disclaimer {
  top: 15%;
  width: 100%;
  position: absolute;
  text-align: center;
  color: #fff;
}

.leaflet-top .leaflet-control-geosearch.bar,
.leaflet-bottom .leaflet-control-geosearch.bar {
  display: none;
}

.leaflet-control-geosearch.bar {
  position: relative;
  display: block;
  height: auto;
  width: 400px;
  margin: 10px auto 0;
  cursor: auto;
  z-index: 1000;
}

.leaflet-control-geosearch.bar form {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.leaflet-control-geosearch.bar form input {
  min-width: 100%;
  width: 100%;
}

.leaflet-control-geosearch.bar .results.active:after {
  opacity: 0.2;
}

.leaflet-right .leaflet-control-geosearch form {
  right: 28px;
  left: initial;
  border-radius: 4px 0 0 4px;
  border-left: inherit;
  border-right: none;
}

.leaflet-control-geosearch a.reset {
  color: black;
  position: absolute;
  line-height: 30px;
  padding: 0 8px;
  right: 0;
  top: 0;
  cursor: pointer;
  border: none;
}

.leaflet-control-geosearch a.reset:hover {
  background: #f5f5f5;
}

.title-map {
  position: absolute;
  top: 0;
  color: #ffffff;
}
</style>
