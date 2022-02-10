<template>
  <div>
    <div :class="!isLoading ? 'grid grid-rows-4 lg:grid-rows-2 xl:grid-rows-1 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5' : 'hidden'">
      <div class="total-bor rounded-lg p-6 text-white">
        <h4 class="text-center font-bold">
          TOTAL BOR
        </h4>
        <div class="w-full mt-3 text-center">
          <div class="flex items-center justify-center">
            <div class="text-3xl font-bold">
              {{ dataIsolateTotal.total_persentase }}%
            </div>
            <div class="growth ml-2 p-2 flex items-center" :class="borGrowth <= 0 ? 'downtrend' : 'uptrend'">
              <div class="growth-icon rounded-full mt-1">
                <FontAwesomeIcon class="inline-block text-white cursor-pointer text-gray-500" :icon="borGrowth <= 0 ? icons.faAngleDoubleDown : icons.faAngleDoubleUp" />
              </div>
              <div class="ml-1 text-md">
                {{ Math.abs(borGrowth) }}%
              </div>
            </div>
          </div>
          <span class="text-sm">{{ formatThousandSeparator(dataIsolateTotal.total_terisi) }} dari {{ formatThousandSeparator(dataIsolateTotal.total_tersedia) }} Tempat Tidur Terisi</span>
        </div>
      </div>
      <div class="rounded-lg p-6 bg-white border border-solid border-gray-300">
        <h4 class="text-center font-bold">
          TOTAL RS
        </h4>
        <div class="w-full mt-3 text-center">
          <div class="text-3xl font-bold">
            {{ dataIsolateTotal.total_rs }}
          </div>
          <span class="text-sm">Total RS di Jawa Barat</span>
        </div>
      </div>
      <div class="rounded-lg p-6 bg-white border border-solid border-gray-300">
        <h4 class="text-center font-bold">
          RS MELAYANI COVID-19
        </h4>
        <div class="w-full mt-3 text-center">
          <div class="text-3xl font-bold">
            {{ dataIsolateTotal.total_rs_rujukan }}
          </div>
          <span class="text-sm">{{ dataIsolateTotal.total_rs_rujukan_persentase }}% dari Total RS</span>
        </div>
      </div>
      <div class="rounded-lg p-6 bg-white border border-solid border-gray-300">
        <h4 class="text-center font-bold">
          RS TIDAK MELAYANI COVID-19
        </h4>
        <div class="w-full mt-3 text-center">
          <div class="text-3xl font-bold">
            {{ dataIsolateTotal.total_rs_nonrujukan }}
          </div>
          <span class="text-sm">{{ dataIsolateTotal.total_rs_nonrujukan_persentase }}% dari Total RS</span>
        </div>
      </div>
    </div>
    <div :class="{hidden: !isLoading }">
      <CardLoader />
    </div>
  </div>
</template>

<script>
import { faPlayCircle, faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'BorAggregation',
  components: {
    CardLoader: () => import('./CardLoader')
  },
  props: {
    propsDataIsolateTotal: {
      type: Array,
      default: () => [{}]
    }
  },
  data () {
    return {
      dataIsolateTotal: {
        hijau_persentase: 0,
        hijau_terisi: 0,
        hijau_tersedia: 0,
        icu_persentase: 0,
        icu_terisi: 0,
        icu_tersedia: 0,
        igd_persentase: 0,
        igd_terisi: 0,
        igd_tersedia: 0,
        kuning_persentase: 0,
        kuning_terisi: 0,
        kuning_tersedia: 0,
        merah_persentase: 0,
        merah_terisi: 0,
        merah_tersedia: 0,
        ruang_bersalin_persentase: 0,
        ruang_bersalin_terisi: 0,
        ruang_bersalin_tersedia: 0,
        total_persentase: 0,
        total_rs: 0,
        total_rs_nonrujukan: 0,
        total_rs_nonrujukan_persentase: 0,
        total_rs_rujukan: 0,
        total_rs_rujukan_persentase: 0,
        total_terisi: 0,
        total_tersedia: 0
      },
      borGrowth: 0,
      dataIsolateDaily: [],
      icons: {
        faPlayCircle,
        faAngleDoubleUp,
        faAngleDoubleDown
      }
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
      this.dataIsolateTotal = val
    },
    getIsolateDaily (val) {
      this.setGrowthBor(val)
    }
  },
  mounted () {
  },
  methods: {
    setGrowthBor (data) {
      if (data.length > 0) {
        let lastData = {}
        let beforeLastData = {}
        let growth = 0
        const length = data.length

        lastData = data[length - 1]
        beforeLastData = data[length - 2]
        growth = lastData.total_persentase - beforeLastData.total_persentase
        this.borGrowth = growth.toFixed(2)
      }
    },
    formatThousandSeparator (val) {
      let number = val
      if (typeof number !== 'string' || number instanceof !String) {
        number = number.toString()
      }

      return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
  }
}
</script>
<style scoped>
 .total-bor {
   background-color: #f09b78;
 }
 .growth .growth-icon {
   height: 12.5px;
   width: 12.5px;
   color: white;
 }
 .growth {
    background: #f7fafc;
    border-radius: 5px;
 }
 .growth .growth-icon svg {
   font-size: 11px;
   margin-top: 1px;
   margin-bottom: 15px;
 }

  .growth.uptrend {
    color: #e54949;
  }

  .growth.downtrend {
    color: #27ae60;
  }

  .growth.uptrend {
    color: #e54949;
  }

  .growth.uptrend .growth-icon{
    background: #e54949;
  }

  .growth.downtrend .growth-icon{
    background: #27ae60;
  }

  .growth.downtrend .fa-play-circle {
    transform: rotate(90deg);
  }

  .growth.uptrend .fa-play-circle {
    transform: rotate(30deg);
  }
</style>
