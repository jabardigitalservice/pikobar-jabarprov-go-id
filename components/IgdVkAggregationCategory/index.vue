<template>
  <div>
    <div :class="!isLoading ? 'md:flex md:flex-row flex-wrap mx-1' : 'hidden'">
      <div class="md:flex-1 mx-1 my-1">
        <CardIgdVk :bor="dataIgdVk[0]" />
      </div>
      <div class="md:flex-1 mx-1 my-1">
        <CardIgdVk :bor="dataIgdVk[1]" />
      </div>
    </div>
    <div :class="{hidden: !isLoading }" class="mx-1">
      <div class="md:flex md:flex-row flex-wrap'">
        <div class="md:flex-1 mx-3 my-2">
          <div class=" rounded-lg p-6 bg-white border border-solid border-gray-300">
            <ContentLoader
              :speed="2"
              width="400"
              height="120"
              primary-color="rgba(214, 210, 210,0.4)"
              secondary-color="rgba(214, 210, 210,0.7)"
            >
              <rect
                x="0"
                y="0"
                rx="8"
                ry="6"
                width="50%"
                height="27"
              />
              <rect
                x="0"
                y="50"
                rx="8"
                ry="6"
                width="66%"
                height="27"
              />
              <rect
                x="0"
                y="94"
                rx="8"
                ry="6"
                width="20%"
                height="27"
              />
            </ContentLoader>
          </div>
        </div>
        <div class="md:flex-1 mx-3 my-2">
          <div class=" rounded-lg p-6 shadow-lg bg-white">
            <ContentLoader
              :speed="2"
              width="400"
              height="120"
              primary-color="rgba(214, 210, 210,0.6)"
              secondary-color="rgba(214, 210, 210,1)"
            >
              <rect
                x="0"
                y="0"
                rx="8"
                ry="6"
                width="50%"
                height="27"
              />
              <rect
                x="0"
                y="50"
                rx="8"
                ry="6"
                width="66%"
                height="27"
              />
              <rect
                x="0"
                y="94"
                rx="8"
                ry="6"
                width="20%"
                height="27"
              />
            </ContentLoader>
          </div>
        </div>
        <div class="md:flex-1 mx-3 my-2">
          <div class=" rounded-lg p-6 shadow-lg bg-white">
            <ContentLoader
              :speed="2"
              width="400"
              height="120"
              primary-color="rgba(214, 210, 210,0.6)"
              secondary-color="rgba(214, 210, 210,1)"
            >
              <rect
                x="0"
                y="0"
                rx="8"
                ry="6"
                width="50%"
                height="27"
              />
              <rect
                x="0"
                y="50"
                rx="8"
                ry="6"
                width="66%"
                height="27"
              />
              <rect
                x="0"
                y="94"
                rx="8"
                ry="6"
                width="20%"
                height="27"
              />
            </ContentLoader>
          </div>
        </div>
        <div class="md:flex-1 mx-3 my-2">
          <div class=" rounded-lg p-6 shadow-lg bg-white">
            <ContentLoader
              :speed="2"
              width="400"
              height="120"
              primary-color="rgba(214, 210, 210,0.6)"
              secondary-color="rgba(214, 210, 210,1)"
            >
              <rect
                x="0"
                y="0"
                rx="8"
                ry="6"
                width="50%"
                height="27"
              />
              <rect
                x="0"
                y="50"
                rx="8"
                ry="6"
                width="66%"
                height="27"
              />
              <rect
                x="0"
                y="94"
                rx="8"
                ry="6"
                width="20%"
                height="27"
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
export default {
  name: 'IgdVkAggregationCategory',
  components: {
    CardIgdVk: () => import('./CardIgdVk'),
    ContentLoader
  },
  data () {
    return {
      dataIgdVk: [
        {
          id: 1,
          name: 'IGD',
          bor: 0,
          growth: 0,
          total: 0,
          available: 0,
          filled: 0,
          color: '#76B4F0',
          tooltip: [
            'IGD Covid-19 tidak masuk kedalam kalkulasi Total BOR Jawa Barat'
          ]
        },
        {
          id: 2,
          name: 'Ruang Bersalin (VK)',
          bor: 0,
          growth: 0,
          total: 0,
          available: 0,
          filled: 0,
          color: '#9C2E9F',
          tooltip:
          [
            'Ruang Bersalin Covid-19 tidak masuk kedalam kalkulasi Total BOR Jawa Barat'
          ]
        }
      ],
      dataIsolateDaily: []
    }
  },
  computed: {
    getIsolateTotal () {
      return this.$store.getters['data-isolasi-total-kemenkes-v2/itemsMap']
    },
    getIsolateDaily () {
      return this.$store.getters['data-isolasi-harian-kemenkes-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-isolasi-total-kemenkes-v2/isLoading']
    }
  },
  watch: {
    getIsolateTotal (val) {
      this.setDataIgdVk(val)
    },
    getIsolateDaily (val) {
      this.setGrowthIgdVk(val)
    }
  },
  mounted () {
  },
  methods: {
    setGrowthIgdVk (data) {
      if (data.length > 0) {
        let lastData = {}
        let beforeLastData = {}
        const length = data.length

        lastData = data[length - 1]
        beforeLastData = data[length - 2]

        this.dataIgdVk[0].growth = (beforeLastData.igd_persentase - lastData.igd_persentase).toFixed(2)
        this.dataIgdVk[1].growth = (beforeLastData.ruang_bersalin_persentase - lastData.ruang_bersalin_persentase).toFixed(2)
      }
    },
    setDataIgdVk (data) {
      this.dataIgdVk[0].name = 'IGD'
      this.dataIgdVk[0].bor = data.igd_persentase
      this.dataIgdVk[0].total = data.igd_total
      this.dataIgdVk[0].available = data.igd_tersedia
      this.dataIgdVk[0].filled = data.igd_terisi

      this.dataIgdVk[1].name = 'Ruang Bersalin (VK)'
      this.dataIgdVk[1].bor = data.ruang_bersalin_persentase
      this.dataIgdVk[1].total = data.ruang_bersalin_total
      this.dataIgdVk[1].available = data.ruang_bersalin_tersedia
      this.dataIgdVk[1].filled = data.ruang_bersalin_terisi
    }
  }
}
</script>
