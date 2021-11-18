<template>
  <div>
    <nav class="flex flex-row items-center">
      <button
        class="button-selector mr-2"
        :active="stat.isActiveHarian"
        @click="enableHarian"
      >
        <font-awesome-icon :icon="fontChartBar" />
        <span>
          Angka Harian
        </span>
      </button>
      <button
        class="button-selector"
        :active="stat.isActiveAkumulatif"
        @click="enableAkumulatif"
      >
        <font-awesome-icon :icon="fontChartLine" />
        <span>
          Kumulatif
        </span>
      </button>
    </nav>

    <section
      v-if="stat.isActiveHarian"
      class="chart-container w-full mt-4 overflow-hidden pb-3"
      style="overflow-x: auto; width:100%;"
      :style="isMobile ? '': 'display:flex;'"
    >
      <div class="bg-white rounded-lg shadow-md">
        <div class="flex-wrap md:flex">
          <h4 class="p-5 text-xl">
            <b>Angka Harian Kontak Erat</b><br>
          </h4>
          <div v-if="!isMobile" class="card-content pt-2 pb-2" style="margin: auto; margin-right: 0px; padding-right: 20px;">
            <div class="daterange-wrapper">
              <client-only>
                <vue-rangedate-picker
                  righttoleft="false"
                  :captions="rangedateCloseContact.captions"
                  :preset-ranges="rangedateCloseContact.presetRanges"
                  @selected="onDateSelectedCloseContact"
                />
              </client-only>
            </div>
          </div>
          <div v-if="isMobile" class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2" style="margin: auto; padding-bottom: 300px;">
            <div class="card-content pt-2 pb-2" style="margin: auto;">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    compact="true"
                    :captions="rangedateCloseContact.captions"
                    :preset-ranges="rangedateCloseContact.presetRanges"
                    @selected="onDateSelectedCloseContact"
                  />
                </client-only>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full p-5"
          :class="isLoading?'':'hidden'"
        >
          <ContentLoader
            class="w-full hidden lg:block"
            :speed="3"
            :width="400"
            :height="340"
            primary-color="#eee"
            secondary-color="#fff"
          >
            <rect
              :key="1"
              x="0"
              :y="4"
              width="100%"
              height="280"
              rx="3"
              ry="3"
            />
          </ContentLoader>
        </div>
        <div :class="!isLoading?'':'hidden'">
          <hr>
          <GChart
            class="p-5"
            type="ComboChart"
            :data="barChartHarianCloseContactData"
            :options="barChartHarianCloseContactOptions"
            :class="!isLoading?'':'hidden'"
          />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-md">
        <div class="flex-wrap md:flex">
          <h4 class="p-5 text-xl">
            <b>Angka Harian Suspek</b><br>
          </h4>
          <div v-if="!isMobile" class="card-content pt-2 pb-2" style="margin: auto; margin-right: 0px; padding-right: 20px;">
            <div class="daterange-wrapper">
              <client-only>
                <vue-rangedate-picker
                  righttoleft="true"
                  :captions="rangedateSuspect.captions"
                  :preset-ranges="rangedateSuspect.presetRanges"
                  @selected="onDateSelectedSuspect"
                />
              </client-only>
            </div>
          </div>
          <div v-if="isMobile" class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2" style="margin: auto; padding-bottom: 300px;">
            <div class="card-content pt-2 pb-2" style="margin: auto;">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    compact="true"
                    :captions="rangedateSuspect.captions"
                    :preset-ranges="rangedateSuspect.presetRanges"
                    @selected="onDateSelectedSuspect"
                  />
                </client-only>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full p-5"
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
              height="320"
              rx="3"
              ry="3"
            />
          </ContentLoader>
        </div>
        <div :class="!isLoading?'':'hidden'">
          <hr>
          <GChart
            class="p-5"
            type="ComboChart"
            :data="barChartHarianSuspectData"
            :options="barChartHarianSuspectOptions"
          />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-md">
        <div class="flex-wrap md:flex">
          <h4 class="p-5 text-xl">
            <b>Angka Harian Probable</b><br>
          </h4>
          <div v-if="!isMobile" class="card-content pt-2 pb-2" style="margin: auto; margin-right: 0px; padding-right: 20px;">
            <div class="daterange-wrapper">
              <client-only>
                <vue-rangedate-picker
                  righttoleft="true"
                  :captions="rangedateProbable.captions"
                  :preset-ranges="rangedateProbable.presetRanges"
                  @selected="onDateSelectedProbable"
                />
              </client-only>
            </div>
          </div>
          <div v-if="isMobile" class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2" style="margin: auto; padding-bottom: 300px;">
            <div class="card-content pt-2 pb-2" style="margin: auto;">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    compact="true"
                    :captions="rangedateProbable.captions"
                    :preset-ranges="rangedateProbable.presetRanges"
                    @selected="onDateSelectedProbable"
                  />
                </client-only>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full p-5"
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
          </ContentLoader>
        </div>
        <div :class="!isLoading?'':'hidden'">
          <hr>
          <GChart
            class="p-5"
            type="ComboChart"
            :data="barChartHarianProbableData"
            :options="barChartHarianProbableOptions"
          />
        </div>
      </div>
    </section>

    <section
      v-if="stat.isActiveAkumulatif"
      class="chart-container w-full mt-4 overflow-hidden pb-3"
      style="overflow-x: auto; width:100%;"
      :style="isMobile ? '': 'display:flex;'"
    >
      <div class="bg-white rounded-lg shadow-md">
        <div class="flex-wrap md:flex">
          <h4 class="p-5 text-xl">
            <b>Kumulatif Kontak Erat</b><br>
          </h4>
          <div v-if="!isMobile" class="card-content pt-2 pb-2" style="margin: auto; margin-right: 0px; padding-right: 10px;">
            <div class="daterange-wrapper">
              <client-only>
                <vue-rangedate-picker
                  righttoleft="false"
                  :captions="rangedateCloseContact.captions"
                  :preset-ranges="rangedateCloseContact.presetRanges"
                  @selected="onDateSelectedCloseContact"
                />
              </client-only>
            </div>
          </div>
          <div v-if="isMobile" class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2" style="margin: auto; padding-bottom: 300px;">
            <div class="card-content pt-2 pb-2" style="margin: auto;">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    compact="true"
                    :captions="rangedateCloseContact.captions"
                    :preset-ranges="rangedateCloseContact.presetRanges"
                    @selected="onDateSelectedCloseContact"
                  />
                </client-only>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <GChart
          class="p-5"
          type="LineChart"
          :data="barChartAkumulatifCloseContactData"
          :options="barChartAkumulatifCloseContactOptions"
        />
      </div>
      <div class="bg-white rounded-lg shadow-md">
        <div class="flex-wrap md:flex">
          <h4 class="p-5 text-xl">
            <b>Kumulatif Suspek</b><br>
          </h4>
          <div v-if="!isMobile" class="card-content pt-2 pb-2" style="margin: auto; margin-right: 0px; padding-right: 10px;">
            <div class="daterange-wrapper">
              <client-only>
                <vue-rangedate-picker
                  righttoleft="true"
                  :captions="rangedateSuspect.captions"
                  :preset-ranges="rangedateSuspect.presetRanges"
                  @selected="onDateSelectedSuspect"
                />
              </client-only>
            </div>
          </div>
          <div v-if="isMobile" class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2" style="margin: auto; padding-bottom: 300px;">
            <div class="card-content pt-2 pb-2" style="margin: auto;">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    compact="true"
                    :captions="rangedateSuspect.captions"
                    :preset-ranges="rangedateSuspect.presetRanges"
                    @selected="onDateSelectedSuspect"
                  />
                </client-only>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <GChart
          class="p-5"
          type="LineChart"
          :data="barChartAkumulatifSuspectData"
          :options="barChartAkumulatifSuspectOptions"
        />
      </div>
      <div class="bg-white rounded-lg shadow-md">
        <div class="flex-wrap md:flex">
          <h4 class="p-5 text-xl">
            <b>Kumulatif Probable</b><br>
          </h4>
          <div v-if="!isMobile" class="card-content pt-2 pb-2" style="margin: auto; margin-right: 0px; padding-right: 10px;">
            <div class="daterange-wrapper">
              <client-only>
                <vue-rangedate-picker
                  righttoleft="true"
                  :captions="rangedateProbable.captions"
                  :preset-ranges="rangedateProbable.presetRanges"
                  @selected="onDateSelectedProbable"
                />
              </client-only>
            </div>
          </div>
          <div v-if="isMobile" class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2" style="margin: auto; padding-bottom: 300px;">
            <div class="card-content pt-2 pb-2" style="margin: auto;">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    compact="true"
                    :captions="rangedateProbable.captions"
                    :preset-ranges="rangedateProbable.presetRanges"
                    @selected="onDateSelectedProbable"
                  />
                </client-only>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <GChart
          class="p-5"
          type="LineChart"
          :data="barChartAkumulatifProbableData"
          :options="barChartAkumulatifProbableOptions"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { GChart } from 'vue-google-charts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'BarStatHarianAkumulatifV2IstilahBaru',
  components: {
    ContentLoader,
    GChart,
    FontAwesomeIcon
  },
  data () {
    return {
      stat: {
        isActiveHarian: true,
        isActiveAkumulatif: false
      },
      isMobile: false,
      fontChartBar: faChartBar,
      fontChartLine: faChartLine,
      jsonDataKasusHarian: [],
      jsonDataProvinsiHarian: [],
      jsonDataProvinsiKumulatif: [],
      barChartHarianCloseContactData: [
        [
          'Tanggal',
          'Masih Dikarantina',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Discarded',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ],
      barChartHarianCloseContactOptions: {
        height: 350,
        width: 490,
        orientation: 'horizontal',
        colors: ['#BE8228', '#828282', '#EB5757'],
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        seriesType: 'bars',
        series: { 2: { type: 'line' } },
        hAxis: {
          slantedText: true,
          slantedTextAngle: 45
        },
        chartArea: {
          width: '100%',
          bottom: 100
        },
        tooltip: { isHtml: true }
      },
      barChartHarianSuspectData: [
        [
          'Tanggal',
          'Isolasi/Dalam Perawatan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Discarded',
          { type: 'string', role: 'tooltip', p: { html: true } },
          // 'Meninggal',
          // { type: 'string', role: 'tooltip', p: { html: true } },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
        // ['0', 0, '', 0, '', 0, '', 0, '']
      ],
      barChartHarianSuspectOptions: {
        height: 350,
        width: 490,
        orientation: 'horizontal',
        colors: ['#BEAB8D', '#828282', '#EB5757'],
        // colors: ['#CEB546', '#828282', '#9C0000', '#EB5757'],
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        seriesType: 'bars',
        series: { 2: { type: 'line' } },
        hAxis: {
          slantedText: true,
          slantedTextAngle: 45
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '100%',
          bottom: 100
        },
        tooltip: { isHtml: true }
      },
      barChartHarianProbableData: [
        [
          'Tanggal',
          'Isolasi/Dalam Perawatan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Selesai Isolasi/Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '', 0, '']
      ],
      barChartHarianProbableOptions: {
        height: 350,
        width: 490,
        orientation: 'horizontal',
        colors: ['#D7C368', '#27AE60', '#A20E0E', '#EB5757'],
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        seriesType: 'bars',
        series: { 3: { type: 'line' } },
        hAxis: {
          slantedText: true,
          slantedTextAngle: 45
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '100%',
          bottom: 100
        },
        tooltip: { isHtml: true }
      },
      barChartAkumulatifCloseContactData: [
        [
          'Tanggal',
          'Masih Dikarantina',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Discarded',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Total Kontak Erat',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ],
      barChartAkumulatifCloseContactOptions: {
        height: 350,
        width: 510,
        orientation: 'horizontal',
        colors: ['#BE8228', '#828282', '#A93D00'],
        legend: {
          position: 'bottom',
          alignment: 'center',
          maxLines: 4
        },
        // curveType: 'function',
        hAxis: {
          slantedText: true,
          slantedTextAngle: 45
        },
        chartArea: {
          width: '100%',
          bottom: 100
        },
        tooltip: { isHtml: true }
      },
      barChartAkumulatifSuspectData: [
        [
          'Tanggal',
          'Isolasi/Dalam Perawatan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Discarded',
          { type: 'string', role: 'tooltip', p: { html: true } },
          // 'Meninggal',
          // { type: 'string', role: 'tooltip', p: { html: true } },
          'Total Suspek',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
        // ['0', 0, '', 0, '', 0, '', 0, '']
      ],
      barChartAkumulatifSuspectOptions: {
        height: 350,
        width: 510,
        orientation: 'horizontal',
        colors: ['#BEAB8D', '#828282', '#EDAD08'],
        // colors: ['#CEB546', '#828282', '#9C0000', '#786203'],
        legend: {
          position: 'bottom',
          alignment: 'center',
          maxLines: 5
        },
        // curveType: 'function',
        hAxis: {
          slantedText: true,
          slantedTextAngle: 45
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '100%',
          bottom: 100
        },
        tooltip: { isHtml: true }
      },
      barChartAkumulatifProbableData: [
        [
          'Tanggal',
          'Isolasi/Dalam Perawatan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Selesai Isolasi/Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Total Suspek',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '', 0, '']
      ],
      barChartAkumulatifProbableOptions: {
        height: 350,
        width: 510,
        orientation: 'horizontal',
        colors: ['#D7C368', '#27AE60', '#A20E0E', '#B0640B'],
        legend: {
          position: 'bottom',
          alignment: 'center',
          maxLines: 5
        },
        // curveType: 'function',
        hAxis: {
          slantedText: true,
          slantedTextAngle: 45
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '100%',
          bottom: 100
        },
        tooltip: { isHtml: true }
      },
      selectedDateCloseContact: {
        start: new Date().setDate(new Date().getDate() - 30),
        end: new Date()
      },
      selectedDateSuspect: {
        start: new Date().setDate(new Date().getDate() - 30),
        end: new Date()
      },
      selectedDateProbable: {
        start: new Date().setDate(new Date().getDate() - 30),
        end: new Date()
      },
      rangedateCloseContact: {
        captions: {
          title: 'Pilih Tanggal',
          ok_button: 'Terapkan'
        },
        presetRanges: {
          all () {
            return {
              label: 'Semua Waktu',
              active: false,
              dateRange: {
                start: new Date('2020-08-13'),
                end: new Date()
              }
            }
          },
          seminggu () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 8, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '1 Minggu Terakhir',
              active: false,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          },
          sebulan () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 31, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '1 Bulan Terakhir',
              active: true,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          }
        }
      },
      rangedateSuspect: {
        captions: {
          title: 'Pilih Tanggal',
          ok_button: 'Terapkan'
        },
        presetRanges: {
          all () {
            return {
              label: 'Semua Waktu',
              active: false,
              dateRange: {
                start: new Date('2020-08-13'),
                end: new Date()
              }
            }
          },
          seminggu () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 8, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '1 Minggu Terakhir',
              active: false,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          },
          sebulan () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 31, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '1 Bulan Terakhir',
              active: true,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          }
        }
      },
      rangedateProbable: {
        captions: {
          title: 'Pilih Tanggal',
          ok_button: 'Terapkan'
        },
        presetRanges: {
          all () {
            return {
              label: 'Semua Waktu',
              active: false,
              dateRange: {
                start: new Date('2020-08-13'),
                end: new Date()
              }
            }
          },
          seminggu () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 8, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '1 Minggu Terakhir',
              active: false,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          },
          sebulan () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 31, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '1 Bulan Terakhir',
              active: true,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          }
        }
      }
    }
  },
  computed: {
    dataKasusHarian () {
      return this.$store.getters['data-kasus-harian-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-kasus-harian-v2/isLoading']
    }
  },
  watch: {
    dataKasusHarian (val) {
      this.jsonDataKasusHarian = val
      this.jsonDataKasusHarian.forEach((element) => {
        const temp1 = { tanggal: element.tanggal }
        const temp2 = { ...temp1, ...element.harian }
        const temp3 = { ...temp1, ...element.kumulatif }
        this.jsonDataProvinsiHarian.push(temp2)
        this.jsonDataProvinsiKumulatif.push(temp3)
      })
      this.fetchDataCloseContactProvinsiHarian()
      this.fetchDataSuspectProvinsiHarian()
      this.fetchDataProbableProvinsiHarian()
    }
  },
  mounted () {
    this.checkIsMobile()
  },
  methods: {
    ifNullReturnZero (str) {
      if (str === null) {
        return 0
      } else {
        return str
      }
    },
    ifNegativeReturnZero (str) {
      if (str <= 0) {
        return 0
      } else {
        return str
      }
    },
    formatDate (date) {
      const d = new Date(date)
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
      return d.toLocaleString('id-ID', options)
    },
    formatDateYMD (date) {
      const d = new Date(date)
      let currDate = d.getDate()
      let currMonth = d.getMonth() + 1
      const currYear = d.getFullYear()
      if (currMonth < 10) {
        currMonth = '0' + currMonth
      }
      if (currDate < 10) {
        currDate = '0' + currDate
      }
      return currYear + '-' + currMonth + '-' + currDate
    },
    formatDateNoYear (date) {
      const d = new Date(date)
      const options = {
        day: 'numeric',
        month: 'short'
      }
      return d.toLocaleString('id-ID', options)
    },
    formatThousand (number) {
      return parseInt(number).toLocaleString('id-ID')
    },
    enableHarian () {
      this.stat.isActiveHarian = true
      this.stat.isActiveAkumulatif = false
      this.fetchDataCloseContactProvinsiHarian()
      this.fetchDataSuspectProvinsiHarian()
      this.fetchDataProbableProvinsiHarian()
    },
    enableAkumulatif () {
      this.stat.isActiveHarian = false
      this.stat.isActiveAkumulatif = true
      this.fetchDataCloseContactProvinsiKumulatif()
      this.fetchDataSuspectProvinsiKumulatif()
      this.fetchDataProbableProvinsiKumulatif()
    },
    fetchDataCloseContactProvinsiHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // clear
      this.barChartHarianCloseContactData = [
        [
          'Tanggal',
          'Masih Dikarantina',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Discarded',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ]

      // filter date
      this.jsonDataProvinsiHarian.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDateCloseContact.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDateCloseContact.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataProvinsiHarian.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataProvinsiHarian[i].tanggal)
        if (stop === false) {
          let tooltipCloseContact = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipCloseContact += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipCloseContact += '<tr><td>Masih Dikarantina </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.ifNegativeReturnZero(self.jsonDataProvinsiHarian[i].closecontact_dikarantina)) + '</b></td></tr>'
          tooltipCloseContact += '<tr><td>Discarded </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiHarian[i].closecontact_discarded) + '</b></td></tr>'
          tooltipCloseContact += '<tr><td>Total Kontak Erat</td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiHarian[i].closecontact_total) + '</b></td></tr>'
          tooltipCloseContact += '<tr><td>Rata-rata 7 Hari</td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiHarian[i].closecontact_ratarata) + '</b></td></tr>'
          tooltipCloseContact += '</table>'
          self.barChartHarianCloseContactData.push([
            self.formatDateNoYear(date),
            self.ifNegativeReturnZero(self.jsonDataProvinsiHarian[i].closecontact_dikarantina), tooltipCloseContact,
            self.jsonDataProvinsiHarian[i].closecontact_discarded, tooltipCloseContact,
            self.jsonDataProvinsiHarian[i].closecontact_ratarata, tooltipCloseContact
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.barChartHarianCloseContactData.splice(1, 1)
    },
    fetchDataSuspectProvinsiHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // clear
      this.barChartHarianSuspectData = [
        [
          'Tanggal',
          'Isolasi/Dalam Perawatan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Discarded',
          { type: 'string', role: 'tooltip', p: { html: true } },
          // 'Meninggal',
          // { type: 'string', role: 'tooltip', p: { html: true } },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
        // ['0', 0, '', 0, '', 0, '', 0, '']
      ]

      // filter date
      this.jsonDataProvinsiHarian.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDateSuspect.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDateSuspect.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataProvinsiHarian.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataProvinsiHarian[i].tanggal)
        if (stop === false) {
          let tooltipSuspect = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipSuspect += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipSuspect += '<tr><td>Isolasi/Dalam Perawatan </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.ifNegativeReturnZero(self.jsonDataProvinsiHarian[i].suspect_diisolasi)) + '</b></td></tr>'
          tooltipSuspect += '<tr><td>Discarded </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiHarian[i].suspect_discarded) + '</b></td></tr>'
          // tooltipSuspect += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiHarian[i].suspect_meninggal) + '</b></td></tr>'
          tooltipSuspect += '<tr><td>Total Suspek</td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiHarian[i].suspect_total) + '</b></td></tr>'
          tooltipSuspect += '<tr><td>Rata-rata 7 Hari</td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiHarian[i].suspect_ratarata) + '</b></td></tr>'
          tooltipSuspect += '</table>'
          self.barChartHarianSuspectData.push([
            self.formatDateNoYear(date),
            self.ifNegativeReturnZero(self.jsonDataProvinsiHarian[i].suspect_diisolasi), tooltipSuspect,
            self.jsonDataProvinsiHarian[i].suspect_discarded, tooltipSuspect,
            // self.jsonDataProvinsiHarian[i].suspect_meninggal, tooltipSuspect,
            self.jsonDataProvinsiHarian[i].suspect_ratarata, tooltipSuspect
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.barChartHarianSuspectData.splice(1, 1)
    },
    fetchDataProbableProvinsiHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // clear
      this.barChartHarianProbableData = [
        [
          'Tanggal',
          'Isolasi/Dalam Perawatan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Selesai Isolasi/Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '', 0, '']
      ]

      // filter date
      this.jsonDataProvinsiHarian.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDateProbable.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDateProbable.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataProvinsiHarian.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataProvinsiHarian[i].tanggal)
        if (stop === false) {
          let tooltipProbable = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipProbable += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipProbable += '<tr><td>Isolasi/Dalam Perawatan </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.ifNegativeReturnZero(self.jsonDataProvinsiHarian[i].probable_diisolasi)) + '</b></td></tr>'
          tooltipProbable += '<tr><td>Selesai Isolasi/Sembuh </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiHarian[i].probable_discarded) + '</b></td></tr>'
          tooltipProbable += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiHarian[i].probable_meninggal) + '</b></td></tr>'
          tooltipProbable += '<tr><td>Total Suspek</td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiHarian[i].probable_total) + '</b></td></tr>'
          tooltipProbable += '<tr><td>Rata-rata 7 Hari</td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiHarian[i].probable_ratarata) + '</b></td></tr>'
          tooltipProbable += '</table>'
          self.barChartHarianProbableData.push([
            self.formatDateNoYear(date),
            self.ifNegativeReturnZero(self.jsonDataProvinsiHarian[i].probable_diisolasi), tooltipProbable,
            self.jsonDataProvinsiHarian[i].probable_discarded, tooltipProbable,
            self.jsonDataProvinsiHarian[i].probable_meninggal, tooltipProbable,
            self.jsonDataProvinsiHarian[i].probable_ratarata, tooltipProbable
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.barChartHarianProbableData.splice(1, 1)
    },
    fetchDataCloseContactProvinsiKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // clear
      this.barChartAkumulatifCloseContactData = [
        [
          'Tanggal',
          'Masih Dikarantina',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Discarded',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Total Kontak Erat',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ]

      // filter date
      this.jsonDataProvinsiKumulatif.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDateCloseContact.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDateCloseContact.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataProvinsiKumulatif.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataProvinsiKumulatif[i].tanggal)
        if (stop === false) {
          let tooltipCloseContact = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipCloseContact += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipCloseContact += '<tr><td>Masih Dikarantina </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].closecontact_dikarantina) + '</b></td></tr>'
          tooltipCloseContact += '<tr><td>Discarded </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].closecontact_discarded) + '</b></td></tr>'
          tooltipCloseContact += '<tr><td style="font-size: larger;">Total Kontak Erat</td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].closecontact_total) + '</b></td></tr>'
          tooltipCloseContact += '</table>'
          self.barChartAkumulatifCloseContactData.push([
            self.formatDateNoYear(date),
            self.jsonDataProvinsiKumulatif[i].closecontact_dikarantina, tooltipCloseContact,
            self.jsonDataProvinsiKumulatif[i].closecontact_discarded, tooltipCloseContact,
            self.jsonDataProvinsiKumulatif[i].closecontact_total, tooltipCloseContact
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.barChartAkumulatifCloseContactData.splice(1, 1)
    },
    fetchDataSuspectProvinsiKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // clear
      this.barChartAkumulatifSuspectData = [
        [
          'Tanggal',
          'Isolasi/Dalam Perawatan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Discarded',
          { type: 'string', role: 'tooltip', p: { html: true } },
          // 'Meninggal',
          // { type: 'string', role: 'tooltip', p: { html: true } },
          'Total Suspek',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
        // ['0', 0, '', 0, '', 0, '', 0, '']
      ]

      // filter date
      this.jsonDataProvinsiKumulatif.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDateSuspect.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDateSuspect.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataProvinsiKumulatif.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataProvinsiKumulatif[i].tanggal)
        if (stop === false) {
          let tooltipSuspect = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipSuspect += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipSuspect += '<tr><td>Isolasi/Dalam Perawatan </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].suspect_diisolasi) + '</b></td></tr>'
          tooltipSuspect += '<tr><td>Discarded </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].suspect_discarded) + '</b></td></tr>'
          // tooltipSuspect += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].suspect_meninggal) + '</b></td></tr>'
          tooltipSuspect += '<tr><td style="font-size: larger;">Total Suspek</td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].suspect_total) + '</b></td></tr>'
          tooltipSuspect += '</table>'
          self.barChartAkumulatifSuspectData.push([
            self.formatDateNoYear(date),
            self.jsonDataProvinsiKumulatif[i].suspect_diisolasi, tooltipSuspect,
            self.jsonDataProvinsiKumulatif[i].suspect_discarded, tooltipSuspect,
            // self.jsonDataProvinsiKumulatif[i].suspect_meninggal, tooltipSuspect,
            self.jsonDataProvinsiKumulatif[i].suspect_total, tooltipSuspect
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.barChartAkumulatifSuspectData.splice(1, 1)
    },
    fetchDataProbableProvinsiKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // clear
      this.barChartAkumulatifProbableData = [
        [
          'Tanggal',
          'Isolasi/Dalam Perawatan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Selesai Isolasi/Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Total Suspek',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
        // ['0', 0, '', 0, '', 0, '', 0, '']
      ]

      // filter date
      this.jsonDataProvinsiKumulatif.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDateProbable.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDateProbable.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataProvinsiKumulatif.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataProvinsiKumulatif[i].tanggal)
        if (stop === false) {
          let tooltipProbable = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipProbable += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipProbable += '<tr><td>Isolasi/Dalam Perawatan </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].probable_diisolasi) + '</b></td></tr>'
          tooltipProbable += '<tr><td>Selesai Isolasi/Sembuh </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].probable_discarded) + '</b></td></tr>'
          tooltipProbable += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].probable_meninggal) + '</b></td></tr>'
          tooltipProbable += '<tr><td style="font-size: larger;">Total Suspek</td><td><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].probable_total) + '</b></td></tr>'
          tooltipProbable += '</table>'
          self.barChartAkumulatifProbableData.push([
            self.formatDateNoYear(date),
            self.jsonDataProvinsiKumulatif[i].probable_diisolasi, tooltipProbable,
            self.jsonDataProvinsiKumulatif[i].probable_discarded, tooltipProbable,
            self.jsonDataProvinsiKumulatif[i].probable_meninggal, tooltipProbable,
            self.jsonDataProvinsiKumulatif[i].probable_total, tooltipProbable
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.barChartAkumulatifProbableData.splice(1, 1)
    },
    onDateSelectedCloseContact (daterange) {
      this.selectedDateCloseContact = daterange
      if (this.stat.isActiveHarian === true) {
        this.fetchDataCloseContactProvinsiHarian()
      } else if (this.stat.isActiveAkumulatif === true) {
        this.fetchDataCloseContactProvinsiKumulatif()
      }
    },
    onDateSelectedSuspect (daterange) {
      this.selectedDateSuspect = daterange
      if (this.stat.isActiveHarian === true) {
        this.fetchDataSuspectProvinsiHarian()
      } else if (this.stat.isActiveAkumulatif === true) {
        this.fetchDataSuspectProvinsiKumulatif()
      }
    },
    onDateSelectedProbable (daterange) {
      this.selectedDateProbable = daterange
      if (this.stat.isActiveHarian === true) {
        this.fetchDataProbableProvinsiHarian()
      } else if (this.stat.isActiveAkumulatif === true) {
        this.fetchDataProbableProvinsiKumulatif()
      }
    },
    checkIsMobile () {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.isMobile = true
        this.barChartHarianCloseContactOptions.width = 0
        this.barChartHarianSuspectOptions.width = 0
        this.barChartHarianProbableOptions.width = 0
        this.barChartAkumulatifCloseContactOptions.width = 0
        this.barChartAkumulatifSuspectOptions.width = 0
        this.barChartAkumulatifProbableOptions.width = 0
      } else {
        this.isMobile = false
        this.barChartHarianCloseContactOptions.width = 0
        this.barChartHarianSuspectOptions.width = 0
        this.barChartHarianProbableOptions.width = 0
        this.barChartAkumulatifCloseContactOptions.width = 0
        this.barChartAkumulatifSuspectOptions.width = 0
        this.barChartAkumulatifProbableOptions.width = 0
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.button-selector {
  @apply px-6 py-2 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-white bg-brand-green;
  }
}

.chart-container {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1rem;
  row-gap: 1rem;

  @screen md {
    grid-template-columns: 1fr 1fr;
  }
}

.google-visualization-tooltip-item {
  white-space: nowrap;
  width: 300px !important;
}
</style>
