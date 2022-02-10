<template>
  <div class="container mx-auto">
    <br>
    <div class="mb-4 md:m-8 md:mb-4">
      <ul class="tabs flex mb-0 list-none flex-wrap flex-row border-b-2 border-secondary">
        <li>
          <a
            class="py-4 px-6 font-bold block focus:outline-none"
            href="javascript:void(0);"
            :class="currentTab === 1 ? 'active' : 'text-gray-500'"
            @click="toggleTabs(1)">
            Keterisian Tempat Tidur (BOR)
          </a>
        </li>
        <li>
          <a
            class="py-4 px-6 font-bold block focus:outline-none"
            href="javascript:void(0);"
            :class="currentTab === 2 ? 'active' : 'text-gray-500'"
            @click="toggleTabs(2)">
            Keterisian Ruang IGD dan VK
          </a>
        </li>
      </ul>
    </div>
    <section :class="currentTab !== 1 ? 'hidden' : null">
      <div class="m-4 mb-4 md:m-8 md:mb-4">
        <div class="flex flex-col lg:flex-row lg:items-stretch">
          <div class="lg md:auto sm:w-auto">
            <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
              Keterisian Tempat Tidur (BOR) Berdasarkan Gejala dan Ruang Perawatan di Rumah Sakit
            </h3>
            <small class="text-xl opacity-75">Update Terakhir: {{ lastupdate }}</small>
          </div>
        </div>
      </div>
      <div class="m-4 mb-8 md:my-4 md:mx-8">
        <div class="disclaimer flex flex-nowrap lg:flex-row items-start rounded p-3 text-sm">
          <FontAwesomeIcon
            class="inline-block mr-2 cursor-pointer mt-1"
            :icon="icons.faInfoCircle"
          />
          <div class="ml-2">
            Sumber data yang digunakan merupakan hasil integrasi dengan RS <i>Online</i> (Kemenkes) yang diperbaharui setiap pukul 11.00 WIB (tidak <i>realtime</i>). Adapun data Total BOR di bawah ini, dikelompokkan sesuai dengan kategori yang telah ditetapkan oleh Dinas Kesehatan Provinsi Jawa Barat, namun dihitung tanpa mengikutsertaan data IGD dan Ruang Bersalin.
          </div>
        </div>
      </div>
      <div class="m-4 md:m-8 mb-8">
        <BorAggregation />
      </div>
      <div class="m-4 md:m-8 mb-8">
        <BorAggregationCategory />
      </div>
      <div class="m-5 md:m-8">
        <TrendBor />
      </div>
      <div class="m-1 md:m-4">
        <div class="flex flex-col sm:flex-row sm:flex-wrap">
          <div class="flex-1 mx-2 my-1">
            <ChartBorZone />
          </div>
          <div class="flex-1 mx-2 my-1">
            <ChartBorCity />
          </div>
        </div>
      </div>
      <div class="m-5 md:m-8">
        <BorHospital />
      </div>
    </section>
    <section :class="currentTab !== 2 ? 'hidden' : null">
      <div class="m-4 mb-4 md:m-8 md:mb-4">
        <div class="flex flex-col lg:flex-row lg:items-stretch">
          <div class="lg md:auto sm:w-auto">
            <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
              Ketersediaan Ruang IGD dan Ruang Bersalin (VK) RS Menangani Covid-19 Jawa Barat
            </h3>
            <small class="text-xl opacity-75">Update Terakhir: {{ lastupdate }}</small>
          </div>
        </div>
      </div>
      <div class="m-4 mb-8 md:my-4 md:mx-8">
        <div class="disclaimer flex flex-nowrap lg:flex-row items-start rounded p-3 text-sm">
          <FontAwesomeIcon
            class="inline-block mr-2 cursor-pointer mt-1"
            :icon="icons.faInfoCircle"
          />
          <div class="ml-2">
            Sumber data yang digunakan merupakan Data RS <i>Online</i> (Kemenkes) yang diperoleh dari fasilitas kesehatan dan dilakukan secara harian (tidak <i>realtime</i>). Adapun data Total BOR di bawah ini, dikelompokkan sesuai dengan kategori yang telah ditetapkan oleh Dinas Kesehatan Provinsi Jawa Barat, namun dihitung tanpa mengikutsertaan data IGD dan Ruang Bersalin.
          </div>
        </div>
      </div>
      <div class="m-1 md:m-4">
        <IgdVkAggregationCategory />
      </div>
      <div class="m-5 md:m-8">
        <IgdVkHospital />
      </div>
    </section>
  </div>
</template>

<script>
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { analytics } from '~/lib/firebase'
export default {
  components: {
    BorAggregation: () => import('~/components/BorAggregation'),
    BorAggregationCategory: () => import('~/components/BorAggregationCategory'),
    IgdVkAggregationCategory: () => import('~/components/IgdVkAggregationCategory'),
    ChartBorZone: () => import('~/components/ChartBorZone'),
    ChartBorCity: () => import('~/components/ChartBorCity'),
    TrendBor: () => import('~/components/TrendBor'),
    BorHospital: () => import('~/components/BorHospital'),
    IgdVkHospital: () => import('~/components/IgdVkHospital')
  },
  data () {
    return {
      currentTab: 1,
      lastupdate: '',
      icons: {
        faInfoCircle
      }
    }
  },
  computed: {
    isolateLastDataMetadata () {
      return this.$store.getters['data-isolasi-lastdata-kemenkes-v2/metadata']
    }
  },
  watch: {
    isolateLastDataMetadata (val) {
      this.lastupdate = moment(val.last_update).locale('id').format('dddd, DD MMMM YYYY') + ' 11.00'
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('dashboard_view')
      }
      Promise.all([
        this.$store.dispatch('data-isolasi-total-kemenkes-v2/getItems'),
        this.$store.dispatch('data-isolasi-harian-kemenkes-v2/getItems'),
        this.$store.dispatch('data-isolasi-lastdata-kemenkes-v2/getItems')
      ]).then(() => {
      })
    })
  },
  methods: {
    toggleTabs (key) {
      this.currentTab = key
    }
  },
  head () {
    const title =
      'Keterisian Tempat Tidur - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
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
<style scoped>
.disclaimer {
  background-color: #e0f2fe;
  border: 1px solid #0166c7;
}
.disclaimer svg {
  color: #0166c7
}
</style>
<style>
@import 'leaflet-geosearch/assets/css/leaflet.css';
@import 'leaflet.markercluster/dist/MarkerCluster.css';
@import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
.bg-green-100 {
  background-color: #5aaa4e;
}
.text-white {
  color: white;
}
.btn {
  border-radius: 0.25rem;
}

.tabs a{
  position: relative;
  transition: .3s ease-in-out;
}

.tabs a:hover{
  color: #069550;
}

.tabs a:before {
  transition: .3s ease-in-out;
}

.tabs a.active {
  color: #069550
}

.tabs a.active:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 4px;
  background: #069550;
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
