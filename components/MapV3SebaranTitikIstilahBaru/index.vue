<template>
  <div>
    <div
      class="w-full p-5"
      style="min-height: 300px;"
      :class="isLoading?'':'hidden'"
    >
      <ContentLoader
        class="w-full hidden lg:block"
        :speed="3"
        :width="400"
        :height="350"
        primary-color="#eee"
        secondary-color="#fff"
      >
        <rect
          :key="1"
          x="0"
          :y="4"
          width="100%"
          height="300"
          rx="3"
          ry="3"
        />
        <rect
          :key="2"
          x="0"
          :y="310"
          width="100%"
          height="30"
          rx="3"
          ry="3"
        />
      </ContentLoader>
    </div>
    <div class="container-map" :class="isLoading?'hidden':''">
      <div id="map-wrap-titik">
        <button
          class="btn-fullscreen btn btn-light mb-2"
          style="background-color: white"
          @click="toggleFullscreen"
        >
          <font-awesome-icon v-if="fullscreen" :icon="faCompress" />
          <font-awesome-icon v-if="!fullscreen" :icon="faExpand" />
        </button>
      </div>
      <div class="filter-layer">
        <div class="text-right">
          <button
            class="btn btn-light"
            style="background-color: white"
            @click="toggleBackToHome()"
          >
            <font-awesome-icon :icon="faHome" />
            <i class="fas fa-home cc-primary" style="color: black !important;" />
          </button><br>
          <button
            class="btn btn-light mt-2"
            style="background-color: white"
            @click="showFilter()"
          >
            <font-awesome-icon :icon="faFilter" />
            <i class="fas fa-filter cc-primary" style="color: black !important;" />
          </button>
        </div>
        <div
          v-if="isShowFilter"
          class="filter-data"
        >
          <li
            :class="filter.gabungan_aktif?'filter-active':''"
            @click="setFilter('gabungan_aktif')"
          >
            <div
              class="legend-color cluster-gabungan-aktif"
              style="margin-right: 0.5em;"
            />Gabungan Kasus Aktif
          </li>
          <li
            :class="filter.confirmation_total?'filter-active':''"
            @click="setFilter('confirmation_total')"
          >
            <div
              class="legend-color cluster-confirmation-total"
              style="margin-right: 0.5em;"
            />Terkonfirmasi Positif
          </li>
          <li
            :class="filter.confirmation_diisolasi?'filter-active':''"
            @click="setFilter('confirmation_diisolasi')"
          >
            <div
              class="legend-color cluster-confirmation-diisolasi"
              style="margin-right: 0.5em;"
            />Positif - Isolasi/ Dalam Perawatan
          </li>
          <li
            :class="filter.confirmation_selesai?'filter-active':''"
            @click="setFilter('confirmation_selesai')"
          >
            <div
              class="legend-color cluster-confirmation-selesai"
              style="margin-right: 0.5em;"
            />Positif - Selesai Isolasi/ Sembuh
          </li>
          <li
            :class="filter.confirmation_meninggal?'filter-active':''"
            @click="setFilter('confirmation_meninggal')"
          >
            <div
              class="legend-color cluster-confirmation-meninggal"
              style="margin-right: 0.5em;"
            />Positif - Meninggal
          </li>
          <li
            :class="filter.suspect_diisolasi?'filter-active':''"
            @click="setFilter('suspect_diisolasi')"
          >
            <div
              class="legend-color cluster-suspect-diisolasi"
              style="margin-right: 0.5em;"
            />Suspek - Isolasi/ Dalam Perawatan
          </li>
          <!-- <li
            :class="filter.suspect_meninggal?'filter-active':''"
            @click="setFilter('suspect_meninggal')"
          >
            <div
              class="legend-color cluster-suspect-meninggal"
              style="margin-right: 0.5em;"
            />Suspek - Meninggal
          </li> -->
          <li
            :class="filter.closecontact_dikarantina?'filter-active':''"
            @click="setFilter('closecontact_dikarantina')"
          >
            <div
              class="legend-color cluster-closecontact-dikarantina"
              style="margin-right: 0.5em;"
            />Kontak Erat - Masih Dikarantina
          </li>
          <li
            :class="filter.probable_diisolasi?'filter-active':''"
            @click="setFilter('probable_diisolasi')"
          >
            <div
              class="legend-color cluster-probable-diisolasi"
              style="margin-right: 0.5em;"
            />Probable - Isolasi/ Dalam Perawatan
          </li>
          <li
            :class="filter.probable_meninggal?'filter-active':''"
            @click="setFilter('probable_meninggal')"
          >
            <div
              class="legend-color cluster-probable-meninggal"
              style="margin-right: 0.5em;"
            />Probable - Meninggal
          </li>
        </div>
      </div>
      <div class="info-legend p-3">
        <b>Keterangan: </b>
        <div class="flex mb-1">
          <div class="w-1/2 h-auto">
            <div
              class="legend-color cluster-gabungan-aktif"
              style="margin-right: 0.5em;"
            />Gabungan Kasus <br>
            <div
              class="legend-color cluster-confirmation-total"
              style="margin-right: 0.5em;"
            />Terkonfirmasi Positif <br>
            <div
              class="legend-color cluster-confirmation-diisolasi"
              style="margin-right: 0.5em;"
            />Positif - Isolasi/ Dalam Perawatan <br>
            <div
              class="legend-color cluster-confirmation-selesai"
              style="margin-right: 0.5em;"
            />Positif - Selesai Isolasi/ Sembuh <br>
            <div
              class="legend-color cluster-confirmation-meninggal"
              style="margin-right: 0.5em;"
            />Positif - Meninggal <br>
          </div>
          <div class="w-1/2 h-auto">
            <div
              class="legend-color cluster-suspect-diisolasi"
              style="margin-right: 0.5em;"
            />Suspek - Isolasi/ Dalam Perawatan <br>
            <!-- <div
              class="legend-color cluster-suspect-meninggal"
              style="margin-right: 0.5em;"
            />Suspek - Meninggal <br> -->
            <div
              class="legend-color cluster-closecontact-dikarantina"
              style="margin-right: 0.5em;"
            />Kontak Erat - Masih Dikarantina <br>
            <div
              class="legend-color cluster-probable-diisolasi"
              style="margin-right: 0.5em;"
            />Probable - Isolasi/ Dalam Perawatan <br>
            <div
              class="legend-color cluster-probable-meninggal"
              style="margin-right: 0.5em;"
            />Probable - Meninggal <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { faFilter, faHome, faLayerGroup, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import jsonKota from '@/assets/kotaV2.json'
import jsonKecamatan from '@/assets/kecamatanV2.json'
import jsonKelurahan from '@/assets/kelurahanV2.json'
export default {
  name: 'MapV3SebaranTitikIstilahBaru',
  components: {
    ContentLoader
  },
  props: {
    activeRegionId: {
      type: String,
      default: ''
    },
    activeRegionCategory: {
      type: String,
      default: 'kota'
    },
    activeCaseCategory: {
      type: String,
      default: 'confirmation_diisolasi'
    }
  },
  data () {
    return {
      // map config
      fullscreen: false,
      map: '',
      zoom: 9,
      dataLayer: [],

      // data
      activeFilter: this.activeDataCategory,
      isShowFilter: false,
      filter: {
        gabungan_aktif: false,
        confirmation_total: false,
        confirmation_diisolasi: true,
        confirmation_meninggal: false,
        confirmation_selesai: false,
        suspect_diisolasi: false,
        // suspect_meninggal: false,
        closecontact_dikarantina: false,
        probable_diisolasi: false,
        probable_meninggal: false
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
      activeParentCode: '',
      activeDataCategory: 'confirmation_diisolasi'
    }
  },
  computed: {
    dataSebaranPolygon () {
      return this.$store.getters['data-sebaran-polygon-v2/itemMap']
    },
    dataSebaranMarker () {
      return this.$store.getters['data-sebaran-marker-cluster-v2/itemMap']
    },
    isLoading () {
      return this.$store.getters['data-sebaran-marker-cluster-v2/isLoading']
    }
  },
  watch: {
    activeRegionId (newVal, oldVal) {
      this.removeLayer()
      this.getDataSebaranMarkerCluster()
    },
    dataSebaranPolygon (val) {
      this.createPolygonRegion()
    },
    dataSebaranMarker (val) {
      this.createMarker()
    }
  },
  mounted () {
    this.initMap()
    this.getDataSebaranPolygon()
    this.getDataSebaranMarkerCluster()
  },
  created () {
  },
  methods: {
    initMap () {
      // initial map
      this.map = this.$L.map('map-wrap-titik', {
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
          position: 'topleft'
        })
        .addTo(this.map)

      // add search control
      const searchProvider = new OpenStreetMapProvider()
      new GeoSearchControl({
        provider: searchProvider,
        position: 'topleft',
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
    changeRegionMap (e) {
      const featureProperties = e.target.feature.properties
      let keyParentRegion = ''

      if (featureProperties.bps_kecamatan_kode !== undefined) {
        this.activeRegion = 'kelurahan'
        keyParentRegion = 'bps_kecamatan_kode'
        this.activeParentRegionName = this.capitalizeFirstLetter(featureProperties.bps_kecamatan_nama)
      } else if (featureProperties.bps_kabupaten_kode !== undefined) {
        this.activeRegion = 'kecamatan'
        keyParentRegion = 'bps_kabupaten_kode'
        this.activeParentRegionName = this.capitalizeFirstLetter(featureProperties.bps_kabupaten_nama)
      } else {
        this.activeParentRegionName = 'Jawa Barat'
      }
      this.activeParentCode = featureProperties[keyParentRegion]

      // move map
      this.map.fitBounds(e.target.getBounds())
      this.map.flyTo(e.target.getCenter())

      // create polygon region
      this.createPolygonRegion()

      this.getDataSebaranPolygon()
      this.getDataSebaranMarkerCluster()

      // update props region
      this.$emit('update:activeRegionId', this.activeParentCode)
      this.$emit('update:activeRegionCategory', this.activeRegion)
      this.$emit('update:activeParentRegionName', this.activeParentRegionName)
    },
    createPolygonRegion () {
      let jsonRegion = {
        type: 'FeatureCollection',
        features: []
      }
      let geojson = []
      let keyParentRegion = ''
      // eslint-disable-next-line no-unused-vars
      let keyRegion = 'bps_kabupaten_kode'
      // eslint-disable-next-line no-unused-vars
      let keyApiRegion = 'kode_kab'
      let nameRegion = 'kemendagri_kabupaten_nama'

      if (this.activeRegion === 'kelurahan') {
        keyParentRegion = 'bps_kecamatan_kode'
        keyRegion = 'bps_desa_kode'
        keyApiRegion = 'kode_kel'
        geojson = jsonKelurahan
        nameRegion = 'kemendagri_desa_nama'
      } else if (this.activeRegion === 'kecamatan') {
        keyParentRegion = 'bps_kabupaten_kode'
        keyRegion = 'bps_kecamatan_kode'
        keyApiRegion = 'kode_kec'
        geojson = jsonKecamatan
        nameRegion = 'kemendagri_kecamatan_nama'
      } else {
        keyRegion = 'bps_kabupaten_kode'
        keyApiRegion = 'kode_kab'
        geojson = jsonKota
      }

      if (this.activeRegion !== 'kota') {
        for (let i = 0; i < geojson.features.length; i++) {
          if (geojson.features[i].properties[keyParentRegion] === this.activeParentCode) {
            jsonRegion.features.push(geojson.features[i])
          }
        }
      } else {
        jsonRegion = geojson
      }

      const self = this
      this.$L.geoJSON(jsonRegion, {
        onEachFeature: (feature, layer, element) => {
          let styleBatasWilayah = {
            fillOpacity: Number,
            fillColor: String,
            weight: Number,
            opacity: Number,
            color: String
          }

          styleBatasWilayah = {
            fillOpacity: 0,
            fillColor: '#FFFFFF',
            weight: 0.7,
            opacity: 0.7,
            color: 'grey'
          }

          // add layer to map
          layer.setStyle(styleBatasWilayah)
          const polygon = layer.addTo(self.map)
          self.dataLayer.push(polygon)

          // event clicked layer
          layer.on({
            dblclick: self.onLayerClicked
          })

          // add tooltip
          const popup = feature.properties[nameRegion]
          layer.bindTooltip(popup)
        }
      })
    },
    createMarker () {
      const apiRegion = {
        kota: {
          key: 'nama_kab',
          name: 'Kota/Kabupaten'
        },
        kecamatan: {
          key: 'nama_kec',
          name: 'Kecamatan'
        },
        kelurahan: {
          key: 'nama_kel',
          name: 'Kelurahan/Desa'
        }
      }

      const dataSebaranMarker = this.dataSebaranMarker
      const category = this.findCategory(this.activeDataCategory)
      if (dataSebaranMarker !== undefined) {
        dataSebaranMarker.forEach((element) => {
          const keyApiRegion = apiRegion[this.activeRegion].key
          const nameApiRegion = apiRegion[this.activeRegion].name
          const total = element.count
          const region = element[keyApiRegion]
          const latitude = element.latitude
          const longitude = element.longitude

          if (latitude !== null) {
            const marker = this.$L.marker([latitude, longitude], {
              icon: new this.$L.DivIcon({
                className: 'cluster ' + category.className + ' digits-2',
                html: total
              })
            }).addTo(this.map)
              .bindPopup('<b>Status:</b> ' + category.name +
              '<br> <b>Jumlah:</b> ' + total +
              '<br> <b>' + nameApiRegion + ':</b> ' + region)
            this.dataLayer.push(marker)
          }
        })
      }
    },
    createLegend () {
      let detailLabel = ''
      const dataSebaranPolygon = this.dataSebaranPolygon

      if (dataSebaranPolygon.range !== undefined) {
        // create legend
        const labels = ['<b>Jumlah Kasus: </b>', '<br>', '<ul style="display: flex; margin-top: 10px;">']

        let region = ''
        switch (this.activeRegion) {
          case 'kecamatan': {
            region = 'Kecamatan'
            break
          }
          case 'kelurahan': {
            region = 'Kelurahan/Desa'
            break
          }
          default: {
            region = 'Kota/Kabupaten'
          }
        }
        dataSebaranPolygon.range.forEach((element, index) => {
          detailLabel = '<li style="margin-right: 20px;"><i class="legend-data-box" style="background:' + element.color + '; ' +
              'opacity: 1;"></i>' +
              element.from + ' - ' + element.to
          detailLabel += ' <br> <span style="font-size: 0.6rem">' + element.total_cluster + ' ' + region + '</span></li>'
          labels.push(
            detailLabel
          )
        })
        labels.push('</ul>')
        this.infolegend = labels.join('')
      }
    },
    onLayerClicked (e) {
      this.changeRegionMap(e)
      this.removeLayer()
    },
    onFullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
      if (fullscreen) {
        document.getElementById('map-wrap-titik').style.height = '85%'
      } else {
        document.getElementById('map-wrap-titik').style.height = '500px'
      }
    },
    toggleFullscreen () {
      this.$fullscreen.toggle(this.$el.querySelector('.container-map'), {
        wrap: false,
        callback: this.onFullscreenChange
      })
    },
    toggleBackToHome () {
      this.activeRegion = 'kota'
      this.activeParentCode = ''
      this.map.flyTo([-6.932694, 107.627449], 8)

      this.getDataSebaranPolygon()
      this.getDataSebaranMarkerCluster()

      this.removeLayer()
      this.createPolygonRegion()

      // update props region
      this.$emit('update:activeRegionId', this.activeParentCode)
      this.$emit('update:activeRegionCategory', this.activeRegion)
      this.$emit('update:activeParentRegionName', 'Jawa Barat')
    },

    showFilter () {
      this.isShowFilter = !this.isShowFilter
    },
    setFilter (category) {
      for (const cat of Object.keys(this.filter)) {
        this.filter[cat] = false
      }
      this.filter[category] = !this.filter[category]
      this.activeDataCategory = category
      this.removeLayer()
      this.getDataSebaranPolygon()
      this.getDataSebaranMarkerCluster()
      this.createPolygonRegion()
      this.$emit('update:activeCaseCategory', category)
    },
    findCategory (category) {
      let classMarker = ''
      switch (category) {
        case 'gabungan_aktif': {
          classMarker = {
            name: 'Gabungan Kasus',
            className: 'cluster-gabungan-aktif'
          }
          break
        }
        case 'confirmation_total': {
          classMarker = {
            name: 'Terkonfirmasi Positif',
            className: 'cluster-confirmation-total'
          }
          break
        }
        case 'confirmation_diisolasi': {
          classMarker = {
            name: 'Positif - Isolasi/ Dalam Perawatan',
            className: 'cluster-confirmation-diisolasi'
          }
          break
        }
        case 'confirmation_meninggal': {
          classMarker = {
            name: 'Positif - Meninggal',
            className: 'cluster-confirmation-meninggal'
          }
          break
        }
        case 'confirmation_selesai': {
          classMarker = {
            name: 'Positif - Selesai Isolasi/ Sembuh',
            className: 'cluster-confirmation-selesai'
          }
          break
        }
        case 'suspect_diisolasi': {
          classMarker = {
            name: 'Suspek - Isolasi/ Dalam Perawatan',
            className: 'cluster-suspect-diisolasi'
          }
          break
        }
        // case 'suspect_meninggal': {
        //   classMarker = {
        //     name: 'Suspek - Meninggal',
        //     className: 'cluster-suspect-meninggal'
        //   }
        //   break
        // }
        case 'closecontact_dikarantina': {
          classMarker = {
            name: 'Kontak Erat - Masih Dikarantina',
            className: 'cluster-closecontact-dikarantina'
          }
          break
        }
        case 'probable_diisolasi': {
          classMarker = {
            name: 'Probable - Isolasi/ Dalam Perawatan',
            className: 'cluster-probable-diisolasi'
          }
          break
        }
        case 'probable_meninggal': {
          classMarker = {
            name: 'Probable - Meninggal',
            className: 'cluster-probable-meninggal'
          }
          break
        }
        default: {
          classMarker = {
            name: 'Positif - Isolasi/ Dalam Perawatan',
            className: 'cluster-confirmation-diisolasi'
          }
        }
      }

      return classMarker
    },
    capitalizeFirstLetter (string) {
      const res = string.split(' ')
      const newStr = []
      for (let i = 0; i < res.length; i++) {
        const lowerStr = res[i].toLowerCase()
        newStr.push(lowerStr.charAt(0).toUpperCase() + lowerStr.slice(1))
      }

      // console.log(newStr)
      return newStr.join(' ')
    },

    // get data
    getDataSebaranPolygon () {
      let parentKeyCode = ''
      let query = 'wilayah=' + this.activeRegionCategory

      if (this.activeCaseCategory) {
        query += '&category=' + this.activeCaseCategory
      }

      switch (this.activeRegionCategory) {
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

      query += `&${parentKeyCode}=${this.activeRegionId}`

      this.$store.dispatch('data-sebaran-polygon-v2/getItem', query)
    },
    getDataSebaranMarkerCluster () {
      let parentKeyCode = ''
      let query = 'wilayah=' + this.activeRegionCategory

      if (this.activeCaseCategory) {
        query += '&category=' + this.activeCaseCategory
      }

      switch (this.activeRegionCategory) {
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

      query += `&${parentKeyCode}=${this.activeRegionId}`

      this.$store.dispatch('data-sebaran-marker-cluster-v2/getItem', query)
    }
  }
}
</script>

<style scoped>
  #map-wrap-titik {
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
    right: 10px;
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

  .title-map {
    position: absolute;
    top: 0;
    color: #ffffff;
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

</style>

<style>
  .legend-data-box {
    width: 13px;
    height: 13px;
    float: left;
    margin-right: 8px;
    border: #000 1px solid;
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
  .cluster-gabungan-aktif {
    /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
    border: 2px solid rgb(194,83,2, 0.9);
    background: rgb(194,83,2, 0.9);
  }
  .cluster-confirmation-total {
    /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
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

  .cluster-closecontact-dikarantina {
    /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
    border: 2px solid rgb(255,156,67, 0.9);
    background: rgb(255,156,67, 0.9);
  }

  .cluster-suspect-diisolasi {
    /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
    border: 2px solid rgb(242, 201, 76, 0.9);
    background: rgb(242, 201, 76, 0.9);
  }

  .cluster-suspect-discarded {
    /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
    border: 2px solid rgb(242, 201, 76, 0.9);
    background: rgba(196, 195, 195, 0.9);
  }

  .cluster-suspect-meninggal {
    /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
    border: 2px solid rgb(165,18,18, 0.9);
    background: rgb(165,18,18, 0.9);
  }

  .cluster-probable-diisolasi {
    /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
    border: 2px solid rgb(210,188,87, 76, 0.9);
    background: rgb(210,188,87, 0.9);
  }

  .cluster-probable-discarded {
    /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
    border: 2px solid rgb(39, 174, 96, 0.9);
    background: rgb(39, 174, 96, 0.9);
  }

  .cluster-probable-meninggal {
    /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
    border: 2px solid rgb(165,18,18, 0.9);
    background: rgb(165,18,18, 0.9);
  }
  .digits-0 {
    height: 17px !important;
    width: 17px !important;
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
    height: 34px !important;
    width: 34px !important;
    line-height: 35px;
    margin-top: -17px;
    margin-left: -17px;
  }

  .digits-3 {
    font-size: 18px;
    height: 48px !important;
    width: 47px !important;
    line-height: 47px;
    /* border-width: 3px; */
    margin-top: -24px;
    margin-left: -24px;
  }

  .digits-4 {
    font-size: 18px;
    height: 58px !important;
    width: 58px !important;
    line-height: 57px;
    /* border-width: 4px; */
    margin-top: -29px;
    margin-left: -29px;
  }
</style>
