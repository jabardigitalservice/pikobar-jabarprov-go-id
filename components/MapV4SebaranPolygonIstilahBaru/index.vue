<template>
  <div>
    <div
      class="w-full p-5"
      :class="isLoading?'':'hidden'"
    >
      <ContentLoader
        class="w-full block"
        :speed="3"
        :width="400"
        :height="200"
        primary-color="#eee"
        secondary-color="#fff"
      >
        <rect
          :key="1"
          x="0"
          :y="4"
          width="100%"
          height="200"
          rx="3"
          ry="3"
        />
      </ContentLoader>
    </div>
    <div class="container-map" :class="isLoading?'hidden':''">
      <div id="map-wrap-polygon">
        <button
          class="btn-custom btn-fullscreen btn btn-light mb-2"
          style="background-color: white"
          @click="toggleFullscreen"
        >
          <font-awesome-icon v-if="fullscreen" :icon="faCompress" />
          <font-awesome-icon v-if="!fullscreen" :icon="faExpand" />
        </button>
      </div>
      <div :class="activeTitle.className" class="title-map mt-2 ml-2 p-2 rounded">
        Peta Sebaran {{ activeTitle.name }}
      </div>
      <div class="filter-layer">
        <div class="text-right">
          <button
            class="btn-custom btn btn-light"
            style="background-color: white"
            @click="toggleBackToHome()"
          >
            <font-awesome-icon :icon="faHome" />
            <i class="fas fa-home cc-primary" style="color: black !important;" />
          </button><br>
          <button
            class="btn-custom btn btn-light mt-2"
            style="background-color: white"
            @click="showFilter()"
          >
            <font-awesome-icon :icon="faFilter" />
            <i class="fas fa-filter cc-primary" style="color: black !important;" />
          </button><br>
          <button
            class="btn btn-light mt-2"
            style="background-color: white"
            @click="showLayer()"
          >
            <font-awesome-icon :icon="faLayerGroup" />
            <i class="fas fa-filter cc-primary" style="color: black !important;" />
          </button>
        </div>
        <div
          v-if="isShowLayer"
          class="filter-data"
        >
          <li
            :class="layer.kota?'filter-active':''"
            @click="setLayer('kota')"
          >
            Kota/Kabupaten
          </li>
          <li
            :class="layer.kecamatan?'filter-active':''"
            @click="setLayer('kecamatan')"
          >
            Kecamatan
          </li>
          <li
            :class="layer.kelurahan?'filter-active':''"
            @click="setLayer('kelurahan')"
          >
            Kelurahan/Desa
          </li>
        </div>
        <div
          v-if="isShowFilter"
          class="filter-data"
        >
          <li
            :class="filter.confirmation_total?'filter-active':''"
            @click="setFilter('confirmation_total')"
          >
            <div
              class="legend-color cluster-confirmation-total"
              style="margin-right: 0.5em;"
            />Terkonfirmasi
          </li>
          <li
            :class="filter.confirmation_diisolasi?'filter-active':''"
            @click="setFilter('confirmation_diisolasi')"
          >
            <div
              class="legend-color cluster-confirmation-diisolasi"
              style="margin-right: 0.5em;"
            />Isolasi/ Dalam Perawatan
          </li>
          <li
            :class="filter.confirmation_selesai?'filter-active':''"
            @click="setFilter('confirmation_selesai')"
          >
            <div
              class="legend-color cluster-confirmation-selesai"
              style="margin-right: 0.5em;"
            />Selesai Isolasi/ Sembuh
          </li>
          <li
            :class="filter.confirmation_meninggal?'filter-active':''"
            @click="setFilter('confirmation_meninggal')"
          >
            <div
              class="legend-color cluster-confirmation-meninggal"
              style="margin-right: 0.5em;"
            />Meninggal
          </li>
        </div>
      </div>
      <div class="legend-data info-legend p-3">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="mb-1" v-html="infolegend" />
      </div>

      <div class="m-1 mb-0 p-5 rounded-lg bg-blue-100 border border-solid border-blue-700">
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
        <ul style="margin-left: 45px; list-style-type: initial;">
          <li>
            Peta di atas merupakan Peta Sebaran Kasus Covid-19 di Jawa Barat dan bukan merupakan Peta Level Kewaspadaan Covid-19 Jawa Barat.
          </li>
          <li>
            Tidak seluruh data kasus memiliki kelengkapan alamat Kota/Kab, Kecamatan dan Kelurahan/Desa (butuh proses verifikasi) sehingga tidak seluruhnya dapat divisualisasikan.
          </li>
          <li>
            Data kasus diatas diupdate setiap hari, dan silahkan cek kembali secara reguler untuk mendapatkan informasi terbaru.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { faFilter, faHome, faLayerGroup, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
// eslint-disable-next-line no-unused-vars
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import jsonKota from '@/assets/kotaV2.json'
import jsonKecamatan from '@/assets/kecamatanV2.json'
import jsonKelurahan from '@/assets/kelurahanV2.json'
export default {
  name: 'MapV4SebaranPolygonIstilahBaru',
  components: {
    ContentLoader
  },
  data () {
    return {
      // map config
      fullscreen: false,
      map: '',
      zoom: 9,
      dataLayer: [],

      // data
      activeLayer: this.activeRegion,
      activeFilter: this.activeDataCategory,
      activeTitle: {
        name: 'Isolasi/ Dalam Perawatan',
        className: 'cluster-confirmation-diisolasi'
      },
      isShowFilter: false,
      isShowLayer: false,
      filter: {
        confirmation_total: false,
        confirmation_diisolasi: true,
        confirmation_meninggal: false,
        confirmation_selesai: false
      },
      layer: {
        kota: true,
        kecamatan: false,
        kelurahan: false
      },
      stat: {
        isActivePolygon: true,
        isActiveCluster: false,
        isActiveFaskes: false,
        isActiveTimeslider: false
      },
      range: [],
      infolegend: '',

      // json
      jsonKota,
      jsonKecamatan,
      jsonKelurahan,

      // fontawesome
      faFilter,
      faHome,
      faLayerGroup,
      faExpand,
      faCompress,

      // data
      distributionPolygonData: [],
      activeRegion: 'kota',
      activeDataCategory: 'confirmation_diisolasi'
    }
  },
  computed: {
    dataSebaranPolygon () {
      return this.$store.getters['data-sebaran-polygon-v2/itemMap']
    },
    isLoading () {
      return this.$store.getters['data-sebaran-polygon-v2/isLoading']
    }
  },
  watch: {
    dataSebaranPolygon (val) {
      this.createPolygonRegion()
      this.createLegend()
    }
  },
  mounted () {
    this.initMap()
    this.getDataSebaranPolygon(this.activeRegion, this.activeDataCategory)
  },
  created () {
  },
  methods: {
    initMap () {
      // initial map
      this.map = this.$L.map('map-wrap-polygon', {
        zoomControl: false,
        fullscreenControl: false
      }).setView([-6.932694, 107.627449], 8)

      // set basemap
      this.$L.tileLayer(
        'https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
          tileSize: 512,
          zoomOffset: -1
        }
      ).addTo(this.map)

      // add zoom control with your options
      this.$L.control
        .zoom({
          position: 'bottomleft'
        })
        .addTo(this.map)

      // add search control
      // eslint-disable-next-line no-unused-vars
      const searchProvider = new OpenStreetMapProvider()
      new GeoSearchControl({
        provider: searchProvider,
        position: 'bottomleft',
        showMarker: true,
        autoClose: true,
        marker: {
          icon: new this.$L.Icon.Default(),
          draggable: false
        },
        maxMarkers: 1
      }).addTo(this.map)
    },
    removeLayer () {
      this.dataLayer.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.dataLayer = []
    },
    createPolygonRegion () {
      let jsonRegion = {
        type: 'FeatureCollection',
        features: []
      }
      let geojson = []
      let keyRegion = 'bps_kabupaten_kode'
      let keyApiRegion = 'kode_kab'

      if (this.activeRegion === 'kota') {
        keyRegion = 'bps_kabupaten_kode'
        keyApiRegion = 'kode_kab'
        geojson = jsonKota
      } else if (this.activeRegion === 'kecamatan') {
        keyRegion = 'bps_kecamatan_kode'
        keyApiRegion = 'kode_kec'
        geojson = jsonKecamatan
      } else if (this.activeRegion === 'kelurahan') {
        keyRegion = 'bps_desa_kode'
        keyApiRegion = 'kode_kel'
        geojson = jsonKelurahan
      }

      jsonRegion = geojson

      const self = this
      this.$L.geoJSON(jsonRegion, {
        onEachFeature: (feature, layer, element) => {
          const dataSebaranPolygon = this.dataSebaranPolygon
          let jumlahKasus = 0
          let styleBatasWilayah = {
            fillOpacity: Number,
            fillColor: String,
            weight: Number,
            opacity: Number,
            color: String
          }

          for (let i = 0; i < dataSebaranPolygon.wilayah.length; i++) {
            let color = 'rgba(59, 38, 58, 0)'
            if (feature.properties[keyRegion] === dataSebaranPolygon.wilayah[i][keyApiRegion]) {
              color = dataSebaranPolygon.wilayah[i].color
              jumlahKasus = dataSebaranPolygon.wilayah[i].value
              styleBatasWilayah = {
                fillOpacity: 1,
                fillColor: color,
                weight: 0.7,
                opacity: 0.7,
                color: '#000000'
              }
              break
            }
          }

          // add layer to map
          layer.setStyle(styleBatasWilayah)
          const polygon = layer.addTo(self.map)
          self.dataLayer.push(polygon)

          // add tooltip
          let popup = ''
          if (this.activeRegion === 'kota') {
            popup += this.capitalizeFirstLetter(feature.properties.kemendagri_kabupaten_nama)
          } else if (this.activeRegion === 'kecamatan') {
            popup += this.capitalizeFirstLetter(feature.properties.kemendagri_kabupaten_nama)
            popup += '<br>Kecamatan ' + feature.properties.kemendagri_kecamatan_nama
          } else if (this.activeRegion === 'kelurahan') {
            popup += this.capitalizeFirstLetter(feature.properties.kemendagri_kabupaten_nama)
            popup += '<br>Kecamatan ' + feature.properties.kemendagri_kecamatan_nama
            popup += '<br>Kel/Desa ' + feature.properties.kemendagri_desa_nama
          }

          popup += '<br>Jumlah Kasus : ' + jumlahKasus
          layer.bindTooltip(popup)
        }
      })
    },
    createLegend () {
      let detailLabel = ''
      const dataSebaranPolygon = this.dataSebaranPolygon

      if (dataSebaranPolygon.range !== undefined) {
        // create legend
        const labels = ['<b>Jumlah Kasus: </b>', '<br>', '<ul style="display: flex; margin-top: 10px;overflow-x:auto">']

        let region = ''
        switch (this.activeRegion) {
          case 'kota': {
            region = 'Kota/Kabupaten'
            break
          }
          case 'kecamatan': {
            region = 'Kecamatan'
            break
          }
          case 'kelurahan': {
            region = 'Kelurahan/Desa'
            break
          }
        }
        dataSebaranPolygon.range.forEach((element, index) => {
          detailLabel = '<li style="margin-right: 20px;"><i class="legend-data-box" style="border: #000 1px solid; background:' + element.color + '; ' +
              'opacity: 1;"></i>' +
              element.from + ' - ' + element.to
          detailLabel += ' (' + element.total_cluster + ' ' + region + ')</li>'
          labels.push(
            detailLabel
          )
        })
        labels.push('</ul>')
        this.infolegend = labels.join('')
      }
    },
    onFullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
      if (fullscreen) {
        document.getElementById('map-wrap-polygon').style.height = '85%'
      } else {
        document.getElementById('map-wrap-polygon').style.height = '500px'
      }
    },
    toggleFullscreen () {
      this.$fullscreen.toggle(this.$el.querySelector('.container-map'), {
        wrap: false,
        callback: this.onFullscreenChange
      })
    },
    toggleSearch () {
    },
    toggleBackToHome () {
      this.activeRegion = 'kota'
      this.activeLayer = 'kota'
      this.map.flyTo([-6.932694, 107.627449], 8)

      this.setLayer('kota')
      this.getDataSebaranPolygon(this.activeRegion, this.activeDataCategory)
      this.removeLayer()
      this.createPolygonRegion()
    },
    showFilter () {
      this.isShowFilter = !this.isShowFilter
    },
    showLayer () {
      this.isShowLayer = !this.isShowLayer
    },
    setFilter (category) {
      this.setTitle(category)
      for (const cat of Object.keys(this.filter)) {
        this.filter[cat] = false
      }
      this.filter[category] = !this.filter[category]
      this.activeDataCategory = category
      this.activeFilter = category
      this.removeLayer()
      this.getDataSebaranPolygon(this.activeRegion, this.activeDataCategory)
      this.createPolygonRegion()
    },
    setLayer (category) {
      for (const cat of Object.keys(this.layer)) {
        this.layer[cat] = false
      }
      this.layer[category] = !this.layer[category]
      this.activeLayer = category
      this.activeRegion = category
      this.removeLayer()
      this.getDataSebaranPolygon(this.activeRegion, this.activeDataCategory)
      this.createPolygonRegion()
    },
    setTitle (category) {
      switch (category) {
        case 'confirmation_total': {
          this.activeTitle = {
            name: 'Terkonfirmasi',
            className: 'cluster-confirmation-total'
          }
          break
        }
        case 'confirmation_diisolasi': {
          this.activeTitle = {
            name: 'Isolasi/ Dalam Perawatan',
            className: 'cluster-confirmation-diisolasi'
          }
          break
        }
        case 'confirmation_selesai': {
          this.activeTitle = {
            name: 'Selesai Isolasi/ Sembuh',
            className: 'cluster-confirmation-selesai'
          }
          break
        }
        case 'confirmation_meninggal': {
          this.activeTitle = {
            name: 'Meninggal',
            className: 'cluster-confirmation-meninggal'
          }
          break
        }
      }
    },
    capitalizeFirstLetter (string) {
      const res = string.split(' ')
      const newStr = []
      for (let i = 0; i < res.length; i++) {
        const lowerStr = res[i].toLowerCase()
        newStr.push(lowerStr.charAt(0).toUpperCase() + lowerStr.slice(1))
      }

      return newStr.join(' ')
    },

    // get data
    getDataSebaranPolygon (region, category) {
      let query = 'wilayah=' + region

      if (category) {
        query += '&category=' + category
      }

      this.$store.dispatch('data-sebaran-polygon-v2/getItem', query)
    }
  }
}
</script>

<style scoped>
  #map-wrap-polygon {
    height: 500px;
    z-index:0;
    position: relative;
  }

  .container-map {
    width:100%;
    height:100%;
    position: relative;
    background-color: #ffffff;
  }
  .filter-active {
    opacity: 1 !important;
  }
  .filter-layer {
    position: absolute;
    top: 0px;
    right: 0px;
    padding-right: 1em;
      padding-top: 1em;
  }

  .filter-layer .btn {
      font-size: 0.8em;
      padding: 2px 6px;
      box-shadow: 0 1px 5px rgba(0,0,0,0.65);
  }

  .filter-data {
      background: #fff;
      margin-top: 0.5em;
      padding: 0.6em;
      border-radius: 0.6em;
      box-shadow: 0 1px 5px rgba(0,0,0,0.65);
  }

  .filter-layer li {
      list-style: none;
      opacity: 0.4;
      padding-bottom: 0.2em;
  }

  .filter-layer li:hover {
      cursor: pointer;
  }

  .btn-fullscreen {
    position: absolute;
    bottom: 0px;
    right: 10px;
    font-size: 1.3em;
    padding: 2px 6px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
    z-index: 401;
  }

  .btn-search {
    position: absolute;
    bottom: 40px;
    right: 10px;
    font-size: 1.3em;
    padding: 2px 6px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
    z-index: 401;
  }
  .btn-custom {
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 0.3rem;
  }

  .cluster-confirmation-total {
    /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
    border: 2px solid rgb(44,52,124, 0.9);
    background: rgb(44,52,124, 0.9);
  }

  .cluster-confirmation-diisolasi {
    /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
    border: 2px solid rgb(206, 181, 28, 0.9);
    background: rgb(206, 181, 70, 0.9);
  }

  .cluster-confirmation-selesai {
    /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
    border: 2px solid rgb(39, 174, 96, 0.9);
    background: rgb(39, 174, 96, 0.9);
  }

  .cluster-confirmation-meninggal {
    /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
    border: 2px solid rgb(165,18,18, 0.9);
    background: rgb(165,18,18, 0.9);
  }

  .title-map {
    position: absolute;
    top: 0;
    color: #ffffff;
  }

  .legend-color {
      width: 1em;
      height: 1em;
      float: left;
      border-radius: 10px;
      margin-top: 4px;
  }
  .legend-data {
    background: rgb(255,255,2555);
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

  .hint-map {
    background-color: #eaeab8;
  }

</style>

<style>
  .legend-data-box {
    width: 13px;
    height: 13px;
    float: left;
    margin-right: 8px;
    border: #000 1px solid;
  }

  /*  ========== GEOSEARCH CONTROL ===============*/
  /* global styling */
.leaflet-control-geosearch *,
.leaflet-control-geosearch *:before,
.leaflet-control-geosearch *:after {
  box-sizing: border-box;
}

/* leaflet button styling */
.leaflet-control-geosearch .leaflet-bar-part {
  border-radius: 4px;
  border-bottom: none;
}

.leaflet-control-geosearch a.leaflet-bar-part:before,
.leaflet-control-geosearch a.leaflet-bar-part:after {
  position: absolute;
  display: block;
  content: '';
}

/* magnifying glass */
.leaflet-control-geosearch a.leaflet-bar-part:before {
  top: 19px;
  left: 16px;
  width: 8px;
  border-top: 2px solid #555;
  transform: rotateZ(45deg);
}

.leaflet-control-geosearch a.leaflet-bar-part:after {
  top: 6px;
  left: 6px;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  border: 2px solid #555;
}

/* resets for pending and error icons */
.leaflet-control-geosearch.error a.leaflet-bar-part:before,
.leaflet-control-geosearch.pending a.leaflet-bar-part:before {
  display: none;
}

.leaflet-control-geosearch.pending a.leaflet-bar-part:after,
.leaflet-control-geosearch.error a.leaflet-bar-part:after {
  left: 50%;
  top: 50%;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border-radius: 50%;
}

/* pending icon */
.leaflet-control-geosearch.pending a.leaflet-bar-part:after {
  content: '';
  border: 2px solid #555;
  border-top: 2px solid #f3f3f3;
  animation: spin 1s linear infinite;
}

/* error icon */
.leaflet-control-geosearch.error a.leaflet-bar-part:after {
  content: '!';
  line-height: initial;
  font-weight: 600;
  font-size: 18px;
  border: none;
}

/* search form styling */
.leaflet-control-geosearch form {
  display: none;
  position: absolute;
  top: -2px;
  left: 28px;
  border-radius: 0 4px 4px 0;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-left: none;
  background-color: #fff;
  background-clip: padding-box;
  z-index: -1;
  height: auto;
  margin: 0;
  padding: 0 8px;
}

.leaflet-control-geosearch.active form {
  display: block;
}

.leaflet-control-geosearch form input {
  min-width: 200px;
  width: 100%;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  font-size: 12px;
  height: 30px;
  border-radius: 0 4px 4px 0;
  text-indent: 8px;
}

.leaflet-control-geosearch .results {
  background: #fff;
}

.leaflet-control-geosearch .results > * {
  line-height: 24px;
  padding: 0 8px;
  border: 1px solid transparent;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.leaflet-control-geosearch .results.active {
  padding: 8px 0;
  border-top: 1px solid #c6c6c6;
  height: 60px;
  overflow: auto;
}

.leaflet-control-geosearch .results > .active,
.leaflet-control-geosearch .results > :hover {
  background-color: #f8f8f8;
  border-color: #c6c6c6;
  cursor: pointer;
}

/* add missing border to form */
.leaflet-control-geosearch .results.active:after {
  content: '';
  display: block;
  width: 0;
  border-left: 2px solid rgba(0, 0, 0, .2);
  position: absolute;
  left: -2px;
  bottom: -2px;
  top: 30px;
}

/* animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  opacity: .2;
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

</style>
