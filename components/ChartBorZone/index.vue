<template>
  <div>
    <div :class="!isLoading ? 'mx-2 my-3 bg-white rounded-lg border border-solid border-gray-300' : 'hidden'">
      <div class="flex flex-col md:flex-row border-b-2 px-4 pt-8 pb-10">
        <h4 class="font-bold text-lg mb-2 md:mb-0">
          Ketersediaan Tempat Tidur berdasarkan Zonasi
        </h4>
        <div class="md:ml-auto flex flex-col w-full md:w-56">
          <client-only>
            <multiselect
              v-model="selectedCategory"
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
        <div class="relative" style="height: 330px">
          <bar-chart :chart-data="chartData" :options="chartOptions" :styles="{height: heightChart + 'px', position: 'relative'}" />
        </div>
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
  name: 'ChartBorZone',
  components: {
    ContentLoader,
    BarChart
  },
  data () {
    return {
      dataBor: [],
      heightChart: 300,
      optionsCategory: [
        { value: 'bor', label: 'Total BOR' },
        { value: 'green', label: 'Hijau' },
        { value: 'yellow', label: 'Kuning' },
        { value: 'red', label: 'Merah' },
        { value: 'icu', label: 'Ruang Intensif' }
      ],
      selectedCategory: { value: 'bor', label: 'Total BOR' },
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
    setDataBor () {
      const zona = [
        '32',
        'Bodebek',
        'Bandung Raya',
        'Ciayumajakuning',
        'Purwasuka',
        'Priangan Barat',
        'Priangan Timur'
      ]
      let dataBor = _filter(this.isolateLastData, (o) => {
        if (zona.includes(o.kode_wilayah)) {
          return o
        }
      })
      dataBor = _orderBy(
        dataBor,
        this.activeCategory.bor,
        ['desc']
      )
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
      const data = []
      const bgColors = []

      _forEach(this.dataBor, (res) => {
        const bgColor = (res.kode_wilayah === '32') ? this.activeCategory.colorCenter : this.activeCategory.color

        chartData.labels.push(res.nama_wilayah)
        data.push(res[this.activeCategory.bor])
        bgColors.push(bgColor)
      })
      chartData.datasets[0].label = this.selectedCategory.label
      chartData.datasets[0].data = data
      chartData.datasets[0].backgroundColor = bgColors
      chartData.datasets[0].hoverBackgroundColor = this.activeCategory.colorCenter

      this.heightChart = (data.length <= 7) ? 330 : data.length * 14 + 300
      this.chartData = chartData
    }
  }
}
</script>
<style scoped>
.chartWrapper > canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
