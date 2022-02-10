<template>
  <div>
    <div :class="!isLoading ? '' : 'hidden'">
      <div class="my-3 bg-white rounded-lg border border-solid border-gray-300">
        <div class="flex flex-col lg:flex-row border-b-2 p-4">
          <h4 class="font-bold text-lg">
            Tren Keterisian Tempat Tidur (BOR)
          </h4>
          <div class="lg:ml-auto flex flex-col md:flex-row mt-2 md:mt-0">
            <client-only>
              <div class="daterange-wrapper md:mx-1 my-1">
                <vue-rangedate-picker
                  :righttoleft="!isMobile ? 'true': 'false'"
                  :compact="isMobile ? 'true': 'false'"
                  :captions="rangedate.captions"
                  :preset-ranges="rangedate.presetRanges"
                  @selected="onDateSelected"
                />
              </div>
              <div class="optZone md:mx-1 ">
                <multiselect
                  v-model="selectedZone"
                  class="my-1 w-full"
                  :options="optionsZone"
                  track-by="value"
                  :allow-empty="false"
                  label="label"
                  select-label=""
                  deselect-label=""
                  selected-label=""
                  @input="setSelectedZone"
                />
              </div>
              <div class="optCity md:mx-1 ">
                <multiselect
                  v-model="selectedCity"
                  :disabled="selectedZone.value === 'all'"
                  class="my-1 w-full"
                  :allow-empty="false"
                  :options="optionsCity"
                  track-by="value"
                  label="label"
                  select-label=""
                  deselect-label=""
                  selected-label=""
                  @input="setSelectedCity"
                />
              </div>
            </client-only>
          </div>
        </div>
        <div class="p-6">
          <line-chart :chart-data="chartData" :options="chartOptions" :height="340" />
        </div>
      </div>
    </div>
    <div :class="!isLoading ? 'hidden': ''">
      <div class="rounded-lg p-6 bg-white border border-solid border-gray-300">
        <ContentLoader
          :speed="2"
          width="400"
          height="120"
          primary-color="rgba(214, 210, 210, 0.4)"
          secondary-color="rgba(214, 210, 210, 0.7)"
        >
          <rect
            x="0"
            y="0"
            rx="8"
            ry="6"
            width="100%"
            height="120"
          />
        </ContentLoader>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import _forEach from 'lodash/forEach'
import _find from 'lodash/find'
import moment from 'moment'
import LineChart from './LineChart.js'

export default {
  name: 'TrendBor',
  components: {
    LineChart,
    ContentLoader
  },
  data () {
    return {
      isMobile: false,
      activeDate: {
        start: new Date('02-20-2020'),
        end: new Date()
      },
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label (context) {
              const label = this._data.datasets[context.datasetIndex].label + ': ' + context.value + '%'
              return label
            }
          }
        },
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'BOR (%)'
            }
          }],
          xAxes: [{
            gridLines: {
              color: 'rgba(0, 0, 0, 0)'
            }
          }]
        }
      },
      dataZone: [],
      rangedate: {
        captions: {
          title: 'Pilih Tanggal',
          ok_button: 'Terapkan'
        },
        presetRanges: {
          all () {
            return {
              label: 'Semua Waktu',
              active: true,
              dateRange: {
                start: new Date('2020-03-01'),
                end: new Date()
              }
            }
          },
          seminggu () {
            const currentDate = new Date()
            const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 8, 0, 0)
            const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59)
            return {
              label: '1 Minggu Terakhir',
              active: false,
              dateRange: {
                start: startDate,
                end: endDate
              }
            }
          },
          sebulan () {
            const currentDate = new Date()
            const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 31, 0, 0)
            const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59)
            return {
              label: '1 Bulan Terakhir',
              active: false,
              dateRange: {
                start: startDate,
                end: endDate
              }
            }
          },
          triwulan () {
            const currentDate = new Date()
            const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 90, 0, 0)
            const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59)
            return {
              label: '3 Bulan Terakhir',
              active: false,
              dateRange: {
                start: startDate,
                end: endDate
              }
            }
          }
        }
      },
      optionsZone: [
        { value: 'all', label: 'Jawa Barat' },
        { value: 'Bodebek', label: 'Bodebek' },
        { value: 'Bandung Raya', label: 'Bandung Raya' },
        { value: 'Purwasuka', label: 'Purwasuka' },
        { value: 'Ciayumajakuning', label: 'Ciayumajakuning' },
        { value: 'Priangan Barat', label: 'Priangan Barat' },
        { value: 'Priangan Timur', label: 'Priangan Timur' }
      ],
      selectedZone: { value: 'all', label: 'Jawa Barat' },
      listCity: [
        { value: 'all', label: 'Zona Jawa Barat' },
        { value: 'Bodebek', label: 'Zona Bodebek' },
        { value: 'Bandung Raya', label: 'Zona Bandung Raya' },
        { value: 'Purwasuka', label: 'Zona Purwasuka' },
        { value: 'Ciayumajakuning', label: 'Zona Ciayumajakuning' },
        { value: 'Priangan Barat', label: 'Zona Priangan Barat' },
        { value: 'Priangan Timur', label: 'Zona Priangan Timur' },
        { value: '3201', label: 'Kab. Bogor' },
        { value: '3202', label: 'Kab. Sukabumi' },
        { value: '3203', label: 'Kab. Cianjur' },
        { value: '3204', label: 'Kab. Bandung' },
        { value: '3205', label: 'Kab. Garut' },
        { value: '3206', label: 'Kab. Tasikmalaya' },
        { value: '3207', label: 'Kab. Ciamis' },
        { value: '3208', label: 'Kab. Kuningan' },
        { value: '3209', label: 'Kab. Cirebon' },
        { value: '3210', label: 'Kab. Majalengka' },
        { value: '3211', label: 'Kab. Sumedang' },
        { value: '3212', label: 'Kab. Indramayu' },
        { value: '3213', label: 'Kab. Subang' },
        { value: '3214', label: 'Kab. Purwakarta' },
        { value: '3215', label: 'Kab. Karawang' },
        { value: '3216', label: 'Kab. Bekasi' },
        { value: '3217', label: 'Kab. Bandung Barat' },
        { value: '3218', label: 'Kab. Pangandaran' },
        { value: '3271', label: 'Kota Bogor' },
        { value: '3272', label: 'Kota Sukabumi' },
        { value: '3273', label: 'Kota Bandung' },
        { value: '3274', label: 'Kota Cirebon' },
        { value: '3275', label: 'Kota Bekasi' },
        { value: '3276', label: 'Kota Depok' },
        { value: '3277', label: 'Kota Cimahi' },
        { value: '3278', label: 'Kota Tasikmalaya' },
        { value: '3279', label: 'Kota Banjar' }
      ],
      optionsCity: [
        { value: 'all', label: 'Zona Jawa Barat' }
      ],
      selectedCity: { value: 'all', label: 'Zona Jawa Barat' },
      groupZone: [
        {
          id: 'Bodebek',
          data: ['Bodebek', '3275', '3276', '3216', '3201', '3271']
        },
        {
          id: 'Bandung Raya',
          data: ['Bandung Raya', '3273', '3277', '3204', '3217', '3211']
        },
        {
          id: 'Purwasuka',
          data: ['Purwasuka', '3214', '3213', '3215']
        },
        {
          id: 'Ciayumajakuning',
          data: ['Ciayumajakuning', '3209', '3274', '3210', '3212', '3208']
        },
        {
          id: 'Priangan Barat',
          data: ['Priangan Barat', '3203', '3272', '3202']
        },
        {
          id: 'Priangan Timur',
          data: ['Priangan Timur', '3205', '3278', '3206', '3207', '3218', '3279']
        }
      ],
      icons: {
      },
      activeCategory: {
        bor: 'total_persentase',
        available: 'total_tersedia',
        filled: 'total_terisi',
        color: '#f19b78',
        colorCenter: '#a36d56'
      }
    }
  },
  computed: {
    isolateDailyData () {
      return this.$store.getters['data-isolasi-harian-kemenkes-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-isolasi-harian-kemenkes-v2/isLoading']
    }
  },
  watch: {
    isolateDailyData (val) {
      this.renderChart()
    }
  },
  mounted () {
    const currentDate = new Date()

    this.activeDate.start = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 90, 0, 0)
    this.activeDate.end = new Date()
  },
  methods: {
    setSelectedZone () {
      const optionsCity = []
      const activeZone = this.selectedZone.value
      const zone = _find(this.groupZone, (o) => { return o.id === activeZone })

      if (activeZone !== 'all') {
        _forEach(this.listCity, (element) => {
          if (zone.data.includes(element.value)) {
            optionsCity.push(element)
          }
        })
        this.optionsCity = optionsCity
        this.selectedCity = optionsCity[0]
        this.getIsolateDaily({
          wilayah: 'zona',
          kode_zona: activeZone
        })
      } else {
        this.optionsCity = [
          { value: 'all', label: 'ZONA JAWA BARAT' }
        ]
        this.selectedCity = { value: 'all', label: 'ZONA JAWA BARAT' }
        this.getIsolateDaily()
      }
    },
    setSelectedCity () {
      const activeCity = this.selectedCity.value
      const isZone = _find(this.groupZone, (o) => { return o.id === activeCity })
      let query = {
        wilayah: 'kota',
        kode_kab: activeCity
      }

      if (isZone !== undefined) {
        query = {
          wilayah: 'zona',
          kode_zona: activeCity
        }
      }

      this.getIsolateDaily(query)
    },
    onDateSelected (daterange) {
      this.activeDate.start = daterange.start
      this.activeDate.end = daterange.end
      this.renderChart()
    },
    renderChart () {
      const data = this.isolateDailyData
      const chartData = {
        labels: [],
        datasets: [
          {
            label: 'Hijau',
            fill: false,
            data: [],
            borderColor: '#87b07d',
            hidden: true
          },
          {
            label: 'Kuning',
            fill: false,
            data: [],
            borderColor: '#e1d278',
            hidden: true
          },
          {
            label: 'Merah',
            fill: false,
            data: [],
            borderColor: '#d96574',
            hidden: true
          },
          {
            label: 'Ruang Intensif',
            fill: false,
            data: [],
            borderColor: '#978bd1',
            hidden: true
          },
          {
            label: 'Bor Total',
            fill: false,
            data: [],
            borderColor: '#f8b092'
          }
        ]
      }

      _forEach(data, (elem) => {
        const dateTime = new Date(elem.tanggal).getTime()
        const startTime = this.activeDate.start.getTime()
        const endTime = this.activeDate.end.getTime()
        if (dateTime >= startTime && dateTime <= endTime) {
          const label = moment(elem.tanggal).locale('id').format('D MMM')
          chartData.labels.push(label)
          chartData.datasets[0].data.push(elem.hijau_persentase)
          chartData.datasets[1].data.push(elem.kuning_persentase)
          chartData.datasets[2].data.push(elem.merah_persentase)
          chartData.datasets[3].data.push(elem.icu_persentase)
          chartData.datasets[4].data.push(elem.total_persentase)
        }
      })
      this.chartData = chartData
    },
    setBackgroundMonth (labels) {
      const length = labels.length
      const listMonth = []
      let activeMonth = '00'
      const stops = []
      let i = -1
      let total = 0

      if (length > 0) {
        _forEach(labels, (element) => {
          const date = element.split('/')
          if (activeMonth === date[1]) {
            listMonth[i].total++
          } else {
            activeMonth = date[1]
            listMonth.push({
              total: 1
            })
            i++
          }
        })

        i = 0
        _forEach(listMonth, (element, index) => {
          let color = '#2D2D2D'
          if (index % 2 === 0) {
            color = '#3C3B3B'
          }
          if (index > 0) {
            stops.push([stops[i - 1][0], color])
            i++
          }

          total += element.total
          stops.push([total / length, color])
          i++
        })

        return stops
      }
    },
    checkIsMobile () {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    },
    getIsolateDaily (params = {}) {
      this.$store.dispatch('data-isolasi-harian-kemenkes-v2/getItems', params)
    }
  }
}
</script>
<style>
  .input-date {
    width: 100% !important;
    height: 39px;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
  }

  @media (min-width: 768px) {
    .input-date {
      width: 250px !important;
      height: 39px;
      border-radius: 4px;
      border: 1px solid #e8e8e8;
    }
  }

  .optZone, .optCity {
    min-width: 120px;
  }

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
