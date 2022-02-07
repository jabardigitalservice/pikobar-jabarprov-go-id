<template>
  <div>
    <div :class="!isLoading ? 'mx-2 my-3 bg-white rounded-lg border border-solid border-gray-300' : 'hidden'">
      <div class="flex flex-col md:flex-row items-center border-b-2 p-4">
        <h4 class="font-bold text-lg mb-2">
          Ketersediaan Tempat Tidur RS Menangani Covid-19 di Jawa Barat
        </h4>
        <div class="md:ml-auto flex flex-col w-full md:w-56">
          <client-only>
            <multiselect
              v-model="selectedZone"
              class="optZone mt-2 sm:mt-0"
              :options="optionsZone"
              :allow-empty="false"
              track-by="value"
              label="label"
              select-label=""
              deselect-label=""
              selected-label=""
              @input="setSelectedZone"
            />
            <multiselect
              v-model="selectedCategory"
              class="optCategory mt-2 whitespace-no-wrap"
              :options="optionsCategory"
              :allow-empty="false"
              track-by="value"
              label="label"
              select-label=""
              deselect-label=""
              selected-label=""
              @input="setSelectedCategory"
            />
          </client-only>
        </div>
      </div>
      <div class="chartWrapper relative p-4">
        <div class="overflow-y-auto relative" style="height: 335px">
          <bar-chart :chart-data="chartData" :options="chartOptions" :styles="{height: heightChart + 'px', position: 'relative'}" />
        </div>
        <canvas
          id="myChartAxis"
          class="ml-4"
          height="335"
        />
      </div>
    </div>
    <div :class="!isLoading ? 'hidden': ''">
      <div class="md:flex md:flex-row flex-wrap'">
        <div class="md:flex-1 my-1">
          <div class=" rounded-lg p-6 border border-solid border-gray-300 bg-white">
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
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import _forEach from 'lodash/forEach'
import _filter from 'lodash/filter'
import _orderBy from 'lodash/orderBy'
import BarChart from './BarChart.js'

export default {
  name: 'ChartBorCity',
  components: {
    ContentLoader,
    BarChart
  },
  data () {
    return {
      dataBor: [],
      heightChart: 350,
      optionsCategory: [
        { value: 'bor', label: 'Total BOR' },
        { value: 'green', label: 'Hijau' },
        { value: 'yellow', label: 'Kuning' },
        { value: 'red', label: 'Merah' },
        { value: 'icu', label: 'Ruang Intensif' }
      ],
      selectedCategory: { value: 'bor', label: 'Total BOR' },
      optionsZone: [
        { value: 'all', label: 'Seluruh Kota/Kab' },
        { value: 'bodebek', label: 'Bodebek' },
        { value: 'bandungraya', label: 'Bandung Raya' },
        { value: 'purwasuka', label: 'Purwasuka' },
        { value: 'ciayumajakuning', label: 'Ciayumajakuning' },
        { value: 'prianganbarat', label: 'Priangan Barat' },
        { value: 'priangantimur', label: 'Priangan Timur' }
      ],
      selectedZone: { value: 'all', label: 'Seluruh Kota/Kab' },
      icons: {
      },
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                min: 0
              },
              display: true,
              gridLines: {
                color: '#bfbfbf'
              },
              scaleLabel: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                display: false,
                color: '#bfbfbf'
              },
              scaleLabel: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          enabled: true,
          displayColors: false,
          callbacks: {
            label: (tooltipItems, data) => {
              const tooltipLabel = this.tooltipSet(tooltipItems.index)
              return tooltipLabel
            }
          }
        }
      },
      activeCategory: {
        bor: 'total_persentase',
        available: 'total_tersedia',
        filled: 'total_terisi',
        color: '#f19b78',
        colorCenter: '#a36d56'
      },
      groupZone: {
        bodebek: ['3275', '3276', '3216', '3201', '3271'],
        bandungraya: ['3273', '3277', '3204', '3217', '3211'],
        purwasuka: ['3214', '3213', '3215'],
        ciayumajakuning: ['3209', '3274', '3210', '3212', '3208'],
        prianganbarat: ['3203', '3272', '3202'],
        priangantimur: ['3205', '3278', '3206', '3207', '3218', '3279']
      }
    }
  },
  computed: {
    isolateLastData () {
      return this.$store.getters['data-isolasi-lastdata-kemenkes-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-isolasi-lastdata-kemenkes-v2/isLoading']
    }
  },
  watch: {
    isolateLastData () {
      this.setDataBor()
    }
  },
  mounted () {
  },
  methods: {
    setSelectedCategory () {
      const val = this.selectedCategory.value
      const category = { bor: 'total', green: 'hijau', yellow: 'kuning', red: 'merah', icu: 'icu', igd: 'igd', birth: 'ruang_bersalin' }
      const colors = {
        bor: {
          default: '#f19b78',
          center: '#a36d56'
        },
        green: {
          default: '#70cd94',
          center: '#069550'
        },
        yellow: {
          default: '#ffe79e',
          center: '#f2c94c'
        },
        red: {
          default: '#fb8b83',
          center: '#e04f45'
        },
        icu: {
          default: '#938bd2',
          center: '#595482'
        },
        igd: {
          default: '#64b5f6',
          center: '#1976d2'
        },
        birth: {
          default: '#ff21f6',
          center: '#aa1aa4'
        }
      }
      this.activeCategory = {
        bor: category[val] + '_persentase',
        available: category[val] + '_tersedia',
        filled: category[val] + '_terisi',
        color: colors[val].default,
        colorCenter: colors[val].center
      }

      this.setDataBor()
    },
    setSelectedZone () {
      this.setDataBor()
    },
    setDataBor () {
      const data = this.isolateLastData
      const activeZone = this.selectedZone.value
      const zona = [
        'Bodebek',
        'Bandung Raya',
        'Ciayumajakuning',
        'Purwasuka',
        'Priangan Barat',
        'Priangan Timur'
      ]

      let dataBor = _filter(data, (o) => {
        if (!zona.includes(o.kode_wilayah)) {
          if (activeZone !== 'all') {
            const groupZone = this.groupZone[activeZone]
            if (groupZone.includes(o.kode_wilayah)) {
              return o
            }
          } else {
            return o
          }
        }
      })

      dataBor = _orderBy(
        dataBor,
        this.activeCategory.bor,
        ['desc']
      )
      this.dataBor = dataBor

      this.dataBor = dataBor
      this.renderChart()
    },
    tooltipSet (index) {
      const tooltip = []
      const available = this.dataBor[index][this.activeCategory.available]
      const filled = this.dataBor[index][this.activeCategory.filled]
      const bor = this.dataBor[index][this.activeCategory.bor]

      tooltip.push('Total TT Tersedia: ' + available)
      tooltip.push('Total TT Terisi: ' + filled)
      tooltip.push('BOR: ' + bor + '%')

      return tooltip
    },
    renderChart () {
      const data = []
      const bgColors = []
      const chartData = {
        labels: [],
        datasets: [
          {
            label: 'Hijau',
            data: [],
            borderColor: '#87b07d',
            backgroundColor: '#87b07d'
          }
        ]
      }

      _forEach(this.dataBor, (res) => {
        const bgColor = (res.kode_wilayah === '32') ? this.activeCategory.colorCenter : this.activeCategory.color

        if (res[this.activeCategory.bor] > 0) {
          chartData.labels.push(res.nama_wilayah)
          data.push(res[this.activeCategory.bor])
          bgColors.push(bgColor)
        }
      })

      chartData.datasets[0].label = this.selectedCategory.label
      chartData.datasets[0].data = data
      chartData.datasets[0].backgroundColor = bgColors
      chartData.datasets[0].hoverBackgroundColor = this.activeCategory.colorCenter

      this.heightChart = (data.length <= 7) ? 350 : data.length * 14 + 300
      this.chartData = chartData
    }
  }
}
</script>
<style scoped>
  .optZone {
    min-width: 200px;
    font-size: 14px;
  }
  .optCategory {
    font-size: 14px;
  }

  .chartWrapper > canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
