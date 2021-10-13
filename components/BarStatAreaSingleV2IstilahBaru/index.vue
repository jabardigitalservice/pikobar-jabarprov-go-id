<template>
  <div>
    <div class="flex flex-row items-stretch mb-4">
      <button
        class="button-selector mr-2"
        :active="stat.isActiveHarian"
        @click="enableHarian"
      >
        <font-awesome-icon :icon="fontChartBar" />Angka Harian
      </button>
      <button
        class="button-selector"
        :active="stat.isActiveAkumulatif"
        @click="enableAkumulatif"
      >
        <font-awesome-icon :icon="fontChartLine" />Kumulatif
      </button>
    </div>

    <section>
      <div class="bg-white overflow-hidden rounded-lg shadow-md">
        <div class="md:flex">
          <h4 class="p-5 text-xl md:w-1/2">
            <b>{{ judul }}</b>
          </h4>

          <div
            v-if="!isMobile"
            class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2"
            style="margin: auto"
          >
            <select
              v-if="selectedListWilayah !== 'Indonesia'"
              v-model="selectedListGroupWaktu"
              class="select-option-selector my-2 mx-1 ml-auto"
              @change="changeFilterGroupWaktu()"
            >
              <option
                v-for="list in optionListGroupWaktu"
                :key="list.value"
                :value="list.value"
              >
                {{ list.label }}
              </option>
            </select>
            <select
              v-model="selectedListWilayah"
              :class="{ 'ml-auto': selectedListWilayah === 'Indonesia' }"
              class="select-option-selector my-2 mx-1 "
              @change="changeFilterWilayah($event.target.value)"
            >
              <option
                v-for="list in optionListWilayah"
                :key="list"
                :value="list"
              >
                {{ list }}
              </option>
            </select>
            <div v-if="selectedListGroupWaktu === 'harian'" class="card-content pt-2 pb-2 mx-1">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    righttoleft="true"
                    :captions="rangedate.captions"
                    :preset-ranges="rangedate.presetRanges"
                    @selected="onDateSelected"
                  />
                </client-only>
              </div>
            </div>
          </div>
          <div
            v-if="isMobile"
            class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2"
            style="margin: auto; padding-bottom: 300px"
          >
            <select
              v-if="selectedListWilayah !== 'Indonesia'"
              v-model="selectedListGroupWaktu"
              class="select-option-selector my-2 mx-1 ml-auto"
              @change="changeFilterGroupWaktu($event)"
            >
              <option
                v-for="list in optionListGroupWaktu"
                :key="list.value"
                :value="list.value"
              >
                {{ list.label }}
              </option>
            </select>
            <select
              v-model="selectedListWilayah"
              class="select-option-selector"
              style="margin: auto"
              @change="changeFilterWilayah($event.target.value)"
            >
              <option
                v-for="list in optionListWilayah"
                :key="list"
                :value="list"
              >
                {{ list }}
              </option>
            </select>
            <div
              v-if="isMobile"
              class="card-content pt-2 pb-2"
              style="margin: auto"
            >
              <div v-if="selectedListGroupWaktu === 'harian'" class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    compact="true"
                    :captions="rangedate.captions"
                    :preset-ranges="rangedate.presetRanges"
                    @selected="onDateSelected"
                  />
                </client-only>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <GChart
          v-if="stat.isActiveHarian"
          type="ComboChart"
          class="mb-4"
          :data="ChartHarianData"
          :options="ChartHarianOptions"
        />
        <GChart
          v-if="stat.isActiveAkumulatif"
          type="ComboChart"
          class="mb-4"
          :data="ChartKumulatifData"
          :options="ChartKumulatifOptions"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'BarStatAreaSingleV2IstilahBaru',
  components: {
    GChart,
    FontAwesomeIcon
    // DateRangePicker
  },
  data () {
    return {
      stat: {
        isActiveHarian: true,
        isActiveAkumulatif: false
      },
      fontChartBar: faChartBar,
      fontChartLine: faChartLine,
      jsonDataKasusHarianProvinsi: [],
      jsonDataKasusHarianKota: [],
      jsonDataNasionalHarianKumulatif: [],
      jsonDataProvinsiHarian: [],
      jsonDataProvinsiKumulatif: [],
      jsonDataKasus: {
        provinsi: {
          satuan: {
            harian: [],
            mingguan: [],
            dwimingguan: []
          },
          kumulatif: {
            harian: [],
            mingguan: [],
            dwimingguan: []
          }
        },
        kota: [
          {
            kode: '3204',
            nama: 'Kab. Bandung',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3217',
            nama: 'Kab. Bandung Barat',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3216',
            nama: 'Kab. Bekasi',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3201',
            nama: 'Kab. Bogor',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3207',
            nama: 'Kab. Ciamis',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3203',
            nama: 'Kab. Cianjur',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3209',
            nama: 'Kab. Cirebon',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3205',
            nama: 'Kab. Garut',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3212',
            nama: 'Kab. Indramayu',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3215',
            nama: 'Kab. Karawang',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3208',
            nama: 'Kab. Kuningan',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3210',
            nama: 'Kab. Majalengka',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3218',
            nama: 'Kab. Pangandaran',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3214',
            nama: 'Kab. Purwarkarta',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3213',
            nama: 'Kab. Subang',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3202',
            nama: 'Kab. Sukabumi',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3211',
            nama: 'Kab. Sumedang',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3206',
            nama: 'Kab. Tasikmalaya',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3273',
            nama: 'Kota Bandung',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3279',
            nama: 'Kota Banjar',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3275',
            nama: 'Kota Bekasi',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3271',
            nama: 'Kota Bogor',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3277',
            nama: 'Kota Cimahi',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3274',
            nama: 'Kota Cirebon',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3276',
            nama: 'Kota Depok',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3272',
            nama: 'Kota Sukabumi',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          },
          {
            kode: '3278',
            nama: 'Kota Tasikmalaya',
            satuan: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            },
            kumulatif: {
              harian: [],
              mingguan: [],
              dwimingguan: []
            }
          }
        ]
      },
      jsonDataKasusMingguanKumulatif: [],
      jsonDataKota: [
        {
          kode: '3204',
          nama: 'Kab. Bandung',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3217',
          nama: 'Kab. Bandung Barat',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3216',
          nama: 'Kab. Bekasi',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3201',
          nama: 'Kab. Bogor',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3207',
          nama: 'Kab. Ciamis',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3203',
          nama: 'Kab. Cianjur',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3209',
          nama: 'Kab. Cirebon',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3205',
          nama: 'Kab. Garut',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3212',
          nama: 'Kab. Indramayu',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3215',
          nama: 'Kab. Karawang',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3208',
          nama: 'Kab. Kuningan',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3210',
          nama: 'Kab. Majalengka',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3218',
          nama: 'Kab. Pangandaran',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3214',
          nama: 'Kab. Purwarkarta',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3213',
          nama: 'Kab. Subang',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3202',
          nama: 'Kab. Sukabumi',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3211',
          nama: 'Kab. Sumedang',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3206',
          nama: 'Kab. Tasikmalaya',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3273',
          nama: 'Kota Bandung',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3279',
          nama: 'Kota Banjar',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3275',
          nama: 'Kota Bekasi',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3271',
          nama: 'Kota Bogor',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3277',
          nama: 'Kota Cimahi',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3274',
          nama: 'Kota Cirebon',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3276',
          nama: 'Kota Depok',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3272',
          nama: 'Kota Sukabumi',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3278',
          nama: 'Kota Tasikmalaya',
          dataHarian: [],
          dataAkumulatif: []
        }
      ],
      ChartHarianData: [
        [
          'Tanggal',
          'Harian',
          { type: 'string', role: 'tooltip', p: { html: true } },
          { type: 'number', role: 'annotation' },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, 0, '']
      ],
      ChartKumulatifData: [
        [
          'Tanggal',
          'Aktif',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Total Terkonfirmasi',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '', 0, '']
      ],
      ChartHarianOptions: {
        height: 500,
        orientation: 'horizontal',
        colors: ['#5AB55B', '#EC5D5D', '#9C0000'],
        legend: {
          position: 'bottom'
        },
        annotations: {
          alwaysOutside: 'true',
          textStyle: {
            fontSize: 10,
            color: 'black'
          }
        },
        hAxis: {
          slantedText: true,
          slantedTextAngle: 180
        },
        isStacked: true,
        seriesType: 'bars',
        series: { 1: { type: 'line' } },
        chartArea: {
          width: '85%',
          bottom: 100
        },
        tooltip: { isHtml: true }
      },
      ChartKumulatifOptions: {
        height: 500,
        orientation: 'horizontal',
        colors: ['#CEB546', '#03B167', '#9c0000', '#3D4486'],
        legend: {
          position: 'bottom'
        },
        // isStacked: true,
        // seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: 180
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '85%',
          bottom: 100
        },
        series: {
          0: { lineWidth: 3 },
          1: { lineWidth: 3 },
          2: { lineWidth: 3 },
          3: { lineWidth: 3 }
        },
        tooltip: { isHtml: true }
      },
      optionListWilayah: [
        'Indonesia',
        'Jawa Barat',
        'Kab. Bandung',
        'Kab. Bandung Barat',
        'Kab. Bekasi',
        'Kab. Bogor',
        'Kab. Ciamis',
        'Kab. Cianjur',
        'Kab. Cirebon',
        'Kab. Garut',
        'Kab. Indramayu',
        'Kab. Karawang',
        'Kab. Kuningan',
        'Kab. Majalengka',
        'Kab. Pangandaran',
        'Kab. Purwakarta',
        'Kab. Subang',
        'Kab. Sukabumi',
        'Kab. Sumedang',
        'Kab. Tasikmalaya',
        'Kota Bandung',
        'Kota Banjar',
        'Kota Bekasi',
        'Kota Bogor',
        'Kota Cimahi',
        'Kota Cirebon',
        'Kota Depok',
        'Kota Sukabumi',
        'Kota Tasikmalaya'
      ],
      optionListWaktu: [
        '1 Minggu Terakhir',
        '1 Bulan Terakhir',
        'Seluruh Waktu'
        // 'Pilih Rentan Waktu'
      ],
      selectedListWilayah: 'Jawa Barat',
      selectedListWaktu: 'Seluruh Waktu',
      judul: 'Chart Harian Terkonfirmasi Jawa Barat',
      selectedDate: {
        start: '',
        end: ''
      },
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
              active: false,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          },
          triwulan () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 90, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '3 Bulan Terakhir',
              active: false,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          }
        }
      },
      isMobile: false,
      optionListGroupWaktu: [
        {
          label: 'Harian',
          value: 'harian'
        },
        {
          label: 'Mingguan',
          value: 'mingguan'
        },
        {
          label: 'Dwi Mingguan',
          value: 'dwimingguan'
        }
      ],
      selectedListGroupWaktu: 'harian',
      selectedListGroupWaktuLabel: 'Harian',
      legendAverageChart: 'Rata-rata 7 Hari'

    }
  },
  computed: {
    dataKasusHarianProvinsi () {
      return this.$store.getters['data-kasus-harian-v2/itemsMap']
    },
    dataKasusHarianKota () {
      return this.$store.getters['data-kasus-harian-kota-v2/itemsMap']
    },
    dataNasionalHarian () {
      return this.$store.getters['data-nasional-harian/itemsMap']
    },
    dataKasusMingguanKota () {
      return this.$store.getters['data-kasus-mingguan-kota-v2/itemsMap']
    },
    dataKasusDwiMingguanKota () {
      return this.$store.getters['data-kasus-dwimingguan-kota-v2/itemsMap']
    },
    dataKasusMingguanProvinsi () {
      return this.$store.getters['data-kasus-mingguan-provinsi-v2/itemsMap']
    },
    dataKasusDwiMingguanProvinsi () {
      return this.$store.getters['data-kasus-dwimingguan-provinsi-v2/itemsMap']
    }
  },
  watch: {
    dataKasusHarianProvinsi (val) {
      const data = {
        harian: [],
        kumulatif: []
      }
      this.jsonDataKasusHarianProvinsi = val
      this.jsonDataKasusHarianProvinsi.forEach((element) => {
        const temp1 = { tanggal: element.tanggal }
        const temp2 = { ...temp1, ...element.harian }
        const temp3 = { ...temp1, ...element.kumulatif }

        data.harian.push(temp2)
        data.kumulatif.push(temp3)

        this.jsonDataKasus.provinsi.satuan.harian = data.harian
        this.jsonDataKasus.provinsi.kumulatif.harian = data.kumulatif
      })

      this.changeData()
    },
    dataKasusHarianKota (val) {
      for (let j = 0; j < this.jsonDataKasus.kota.length; j++) {
        for (let i = 0; i < val.length; i++) {
          if (val[i].kode_kab === this.jsonDataKasus.kota[j].kode) {
            val[i].series.forEach((element) => {
              const temp1 = { tanggal: element.tanggal }
              const temp2 = { ...temp1, ...element.harian }
              const temp3 = { ...temp1, ...element.kumulatif }

              this.jsonDataKasus.kota[j].satuan.harian.push(temp2)
              this.jsonDataKasus.kota[j].kumulatif.harian.push(temp3)
            })
          }
        }
      }

      this.changeData()
    },
    dataNasionalHarian (val) {
      // this.jsonDataNasionalHarianKumulatif = this.propsDataNasionalHarianKumulatif
      for (let i = 0; i < val.length; i++) {
        const temp1 = val[i]
        let jmlHarian = 0
        let ratarataHarian = 0
        // let jmlKumulatif = 0
        // let ratarataKumulatif = 0
        if (i === 0) {
          jmlHarian = val[i].jumlah_positif.value
          ratarataHarian = jmlHarian / 1
          // jmlKumulatif = val[i].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 1
        } else if (i === 1) {
          jmlHarian = val[i].jumlah_positif.value + val[i - 1].jumlah_positif.value
          ratarataHarian = jmlHarian / 2
          // jmlKumulatif = val[i].jumlahKasusKumulatif + val[i - 1].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 2
        } else if (i === 2) {
          jmlHarian = val[i].jumlah_positif.value + val[i - 1].jumlah_positif.value + val[i - 2].jumlah_positif.value
          ratarataHarian = jmlHarian / 3
          // jmlKumulatif = val[i].jumlahKasusKumulatif + val[i - 1].jumlahKasusKumulatif + val[i - 2].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 3
        } else if (i === 3) {
          jmlHarian = val[i].jumlah_positif.value + val[i - 1].jumlah_positif.value + val[i - 2].jumlah_positif.value +
            val[i - 3].jumlah_positif.value
          ratarataHarian = jmlHarian / 4
          // jmlKumulatif = val[i].jumlahKasusKumulatif + val[i - 1].jumlahKasusKumulatif + val[i - 2].jumlahKasusKumulatif +
          //   val[i - 3].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 4
        } else if (i === 4) {
          jmlHarian = val[i].jumlah_positif.value + val[i - 1].jumlah_positif.value + val[i - 2].jumlah_positif.value +
            val[i - 3].jumlah_positif.value + val[i - 4].jumlah_positif.value
          ratarataHarian = jmlHarian / 5
          // jmlKumulatif = val[i].jumlahKasusKumulatif + val[i - 1].jumlahKasusKumulatif + val[i - 2].jumlahKasusKumulatif +
          //   val[i - 3].jumlahKasusKumulatif + val[i - 4].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 5
        } else if (i === 5) {
          jmlHarian = val[i].jumlah_positif.value + val[i - 1].jumlah_positif.value + val[i - 2].jumlah_positif.value +
            val[i - 3].jumlah_positif.value + val[i - 4].jumlah_positif.value + val[i - 5].jumlah_positif.value
          ratarataHarian = jmlHarian / 6
          // jmlKumulatif = val[i].jumlahKasusKumulatif + val[i - 1].jumlahKasusKumulatif + val[i - 2].jumlahKasusKumulatif +
          //   val[i - 3].jumlahKasusKumulatif + val[i - 4].jumlahKasusKumulatif + val[i - 5].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 6
        } else if (i >= 6) {
          jmlHarian = val[i].jumlah_positif.value + val[i - 1].jumlah_positif.value + val[i - 2].jumlah_positif.value +
            val[i - 3].jumlah_positif.value + val[i - 4].jumlah_positif.value + val[i - 5].jumlah_positif.value +
            val[i - 6].jumlah_positif.value
          ratarataHarian = jmlHarian / 7
          // jmlKumulatif = val[i].jumlahKasusKumulatif + val[i - 1].jumlahKasusKumulatif + val[i - 2].jumlahKasusKumulatif +
          //   val[i - 3].jumlahKasusKumulatif + val[i - 4].jumlahKasusKumulatif + val[i - 5].jumlahKasusKumulatif +
          //   val[i - 6].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 7
        } else {
          jmlHarian = 0
          ratarataHarian = 0
          // jmlKumulatif = 0
          // ratarataKumulatif = 0
        }
        const temp2 = { jumlah_positif_ratarata: { value: parseInt(ratarataHarian.toFixed(2)) } }
        const temp3 = { ...temp1, ...temp2 }
        this.jsonDataNasionalHarianKumulatif.push(temp3)
      }
    },
    dataKasusMingguanProvinsi (val) {
      const data = {
        mingguan: [],
        kumulatif: []
      }
      val.forEach((element) => {
        const temp1 = {
          tanggal: element.minggu,
          tanggal_awal: element.tanggal_awal,
          tanggal_akhir: element.tanggal_akhir
        }
        const temp2 = { ...temp1, ...element.mingguan }
        const temp3 = { ...temp1, ...element.kumulatif }
        data.mingguan.push(temp2)
        data.kumulatif.push(temp3)
      })

      this.jsonDataKasus.provinsi.satuan.mingguan = data.mingguan
      this.jsonDataKasus.provinsi.kumulatif.mingguan = data.kumulatif

      this.changeData()
    },
    dataKasusDwiMingguanProvinsi (val) {
      const data = {
        dwimingguan: [],
        kumulatif: []
      }
      val.forEach((element) => {
        const temp1 = {
          tanggal: element.dwiminggu,
          tanggal_awal: element.tanggal_awal,
          tanggal_akhir: element.tanggal_akhir
        }
        const temp2 = { ...temp1, ...element.dwimingguan }
        const temp3 = { ...temp1, ...element.kumulatif }
        data.dwimingguan.push(temp2)
        data.kumulatif.push(temp3)
      })

      this.jsonDataKasus.provinsi.satuan.dwimingguan = data.dwimingguan
      this.jsonDataKasus.provinsi.kumulatif.dwimingguan = data.kumulatif

      this.changeData()
    },
    dataKasusMingguanKota (val) {
      for (let j = 0; j < this.jsonDataKasus.kota.length; j++) {
        for (let i = 0; i < val.length; i++) {
          if (val[i].kode_kab === this.jsonDataKasus.kota[j].kode) {
            val[i].series.forEach((element) => {
              const temp1 = {
                tanggal: element.minggu,
                tanggal_awal: element.tanggal_awal,
                tanggal_akhir: element.tanggal_akhir
              }
              const temp2 = { ...temp1, ...element.mingguan }
              const temp3 = { ...temp1, ...element.kumulatif }

              this.jsonDataKasus.kota[j].satuan.mingguan.push(temp2)
              this.jsonDataKasus.kota[j].kumulatif.mingguan.push(temp3)
            })
          }
        }
      }

      this.changeData()
    },
    dataKasusDwiMingguanKota (val) {
      for (let j = 0; j < this.jsonDataKasus.kota.length; j++) {
        for (let i = 0; i < val.length; i++) {
          if (val[i].kode_kab === this.jsonDataKasus.kota[j].kode) {
            val[i].series.forEach((element) => {
              const temp1 = {
                tanggal: element.dwiminggu,
                tanggal_awal: element.tanggal_awal,
                tanggal_akhir: element.tanggal_akhir
              }
              const temp2 = { ...temp1, ...element.dwimingguan }
              const temp3 = { ...temp1, ...element.kumulatif }

              this.jsonDataKasus.kota[j].satuan.dwimingguan.push(temp2)
              this.jsonDataKasus.kota[j].kumulatif.dwimingguan.push(temp3)
            })
          }
        }
      }

      this.changeData()
    }
  },
  mounted () {
    const n = new Date()

    this.selectedDate.start = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 90, 0, 0)
    this.selectedDate.end = new Date()
    this.checkIsMobile()
  },
  methods: {
    ifNullReturnZero (str) {
      if (str === null) {
        return 0
      } else if (str === '') {
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
    formatThousand (number) {
      return parseInt(number).toLocaleString('id-ID')
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
    formatDateNoYear (date) {
      const d = new Date(date)
      const options = {
        day: 'numeric',
        month: 'short'
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
    compareValues (key, order = 'asc') {
      return function innerSort (a, b) {
        // eslint-disable-next-line no-prototype-builtins
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0
        }

        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key]
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key]

        let comparison = 0
        if (varA > varB) {
          comparison = 1
        } else if (varA < varB) {
          comparison = -1
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        )
      }
    },
    enableHarian () {
      this.stat.isActiveHarian = true
      this.stat.isActiveAkumulatif = false
      this.changeData()
    },
    enableAkumulatif () {
      this.stat.isActiveHarian = false
      this.stat.isActiveAkumulatif = true
      this.changeData()
    },
    changeFilterWilayah (stat) {
      if (stat === 'Indonesia') {
        this.selectedListGroupWaktu = 'harian'
      }
      this.selectedListWilayah = stat
      this.changeData()
    },
    changeFilterGroupWaktu () {
      if (this.selectedListGroupWaktu !== 'harian') {
        this.selectedDate.start = new Date('2020-03-01')
        this.selectedDate.end = new Date()
      }
      for (let i = 0; i < this.optionListGroupWaktu.length; i++) {
        if (this.optionListGroupWaktu[i].value === this.selectedListGroupWaktu) {
          this.selectedListGroupWaktuLabel = this.optionListGroupWaktu[i].label
        }
      }
      this.changeData()
    },
    changeData () {
      if (this.selectedListGroupWaktu !== 'harian') {
        const hAxisOptions = {
          slantedText: true,
          textStyle: {
            fontSize: 12
          }
        }
        this.ChartHarianOptions.hAxis = hAxisOptions
        this.ChartKumulatifOptions.hAxis = hAxisOptions
        this.legendAverageChart = 'Rata-rata Per Bulan'
      } else {
        const hAxisOptions = {
          slantedText: true,
          slantedTextAngle: -90
        }
        this.ChartHarianOptions.hAxis = hAxisOptions
        this.ChartKumulatifOptions.hAxis = hAxisOptions
        this.legendAverageChart = 'Rata-rata 7 Hari'
      }

      this.ChartHarianData = [
        [
          'Tanggal',
          'Harian',
          { type: 'string', role: 'tooltip', p: { html: true } },
          { type: 'number', role: 'annotation' },
          this.legendAverageChart,
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, 0, '']
      ]
      this.ChartKumulatifData = [
        [
          'Tanggal',
          'Aktif',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Total Terkonfirmasi',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '', 0, '']
      ]
      if (this.stat.isActiveHarian === true) {
        this.judul = 'Chart ' + this.selectedListGroupWaktuLabel + ' Terkonfirmasi ' + this.selectedListWilayah
        if (this.selectedListWilayah === 'Jawa Barat') {
          this.fetchDataProvinsiSatuan()
        } else if (this.selectedListWilayah === 'Indonesia') {
          this.fetchDataNasionalHarian()
        } else {
          this.fetchDataKabupatenHarian()
        }
      } else if (this.stat.isActiveAkumulatif === true) {
        this.judul = 'Chart Kumulatif Terkonfirmasi ' + this.selectedListWilayah
        if (this.selectedListWilayah === 'Jawa Barat') {
          this.fetchDataProvinsiKumulatif()
        } else if (this.selectedListWilayah === 'Indonesia') {
          this.fetchDataNasionalKumulatif()
        } else {
          this.fetchDataKabupatenKumulatif()
        }
      }
    },
    fetchDataNasionalHarian () {
      this.ChartHarianOptions.hAxis = {
        slantedText: true,
        slantedTextAngle: -90
      }
      const self = this
      let startNum = 0
      let endNum = 0

      // filter date
      this.jsonDataNasionalHarianKumulatif.forEach((element, index) => {
        if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.selectedDate.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataNasionalHarianKumulatif.length - 1
      }

      // get data
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataNasionalHarianKumulatif[i].key_as_string)
        const showAnnotation = i % (Math.floor((endNum - startNum) / 13))

        // by Harian
        let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
        tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
        tooltipHarian += '<tr><td>Terkonfirmasi </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataNasionalHarianKumulatif[i].jumlah_positif.value) + '</b></td></tr>'
        tooltipHarian += '<tr><td>Rata-rata 7 Hari</td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataNasionalHarianKumulatif[i].jumlah_positif_ratarata.value) + '</b></td></tr>'
        tooltipHarian += '</table>'
        self.ChartHarianData.push([
          self.formatDateNoYear(date),
          self.jsonDataNasionalHarianKumulatif[i].jumlah_positif.value, tooltipHarian,
          !showAnnotation ? self.jsonDataNasionalHarianKumulatif[i].jumlah_positif.value : null,
          self.jsonDataNasionalHarianKumulatif[i].jumlah_positif_ratarata.value, tooltipHarian
        ])
      }
      if (self.jsonDataNasionalHarianKumulatif.length > 0) {
        self.ChartHarianData.splice(1, 1)
      }
    },
    fetchDataNasionalKumulatif () {
      const self = this
      let startNum = 0
      let endNum = 0

      // filter date
      this.jsonDataNasionalHarianKumulatif.forEach((element, index) => {
        if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.selectedDate.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataNasionalHarianKumulatif.length - 1
      }

      // get data
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataNasionalHarianKumulatif[i].key_as_string)
        // by Akumulatif
        let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
        tooltipKumulatif += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
        tooltipKumulatif += '<tr><td>Total Terkonfirmasi </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataNasionalHarianKumulatif[i].jumlah_positif_kum.value) + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Isolasi/ Dalam Perawatan </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataNasionalHarianKumulatif[i].jumlah_dirawat_kum.value) + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Selesai Isolasi/ Sembuh </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataNasionalHarianKumulatif[i].jumlah_sembuh_kum.value) + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Meninggal </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataNasionalHarianKumulatif[i].jumlah_meninggal_kum.value) + '</b></td></tr>'
        tooltipKumulatif += '</table>'
        self.ChartKumulatifData.push([
          self.formatDateNoYear(date),
          self.jsonDataNasionalHarianKumulatif[i].jumlah_dirawat_kum.value, tooltipKumulatif,
          self.jsonDataNasionalHarianKumulatif[i].jumlah_sembuh_kum.value, tooltipKumulatif,
          self.jsonDataNasionalHarianKumulatif[i].jumlah_meninggal_kum.value, tooltipKumulatif,
          self.jsonDataNasionalHarianKumulatif[i].jumlah_positif_kum.value, tooltipKumulatif
        ])
      }
      if (self.jsonDataNasionalHarianKumulatif.length > 0) {
        self.ChartKumulatifData.splice(1, 1)
      }
    },
    fetchDataProvinsiSatuan () {
      const self = this
      const data = this.jsonDataKasus.provinsi.satuan[this.selectedListGroupWaktu]
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      if (this.selectedListGroupWaktu === 'harian') {
        // filter date
        data.forEach((element, index) => {
          if (element.tanggal === this.formatDateYMD(this.selectedDate.start)) {
            startNum = index
          }
          if (element.tanggal === this.formatDateYMD(this.selectedDate.end)) {
            endNum = index
          }
        })
      }

      if (endNum === 0) {
        endNum = data.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(data[i].tanggal)
        const showAnnotation = i % (Math.floor((endNum - startNum) / 13))

        if (stop === false) {
          let tooltipDate = self.formatDate(date)
          let xAxisLabel = self.formatDateNoYear(date)
          if (this.selectedListGroupWaktu !== 'harian') {
            const dateNextWeek = new Date(data[i].tanggal_akhir)
            tooltipDate = self.formatDate(date) + ' - ' + self.formatDate(dateNextWeek)
            xAxisLabel = self.formatDateNoYear(date) + ' - ' + self.formatDateNoYear(dateNextWeek)
          }

          this.generateChartSatuan(data[i], tooltipDate, xAxisLabel, showAnnotation)
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }

      if (data.length > 0) {
        self.ChartHarianData.splice(1, 1)
      }
    },
    fetchDataProvinsiKumulatif () {
      const self = this
      const data = this.jsonDataKasus.provinsi.kumulatif[this.selectedListGroupWaktu]
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      if (this.selectedListGroupWaktu === 'harian') {
        // filter date
        data.forEach((element, index) => {
          if (element.tanggal === this.formatDateYMD(this.selectedDate.start)) {
            startNum = index
          }
          if (element.tanggal === this.formatDateYMD(this.selectedDate.end)) {
            endNum = index
          }
        })
      }

      if (endNum === 0) {
        endNum = data.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(data[i].tanggal)
        if (stop === false) {
          let tooltipDate = self.formatDate(date)
          let xAxisLabel = self.formatDateNoYear(date)
          if (this.selectedListGroupWaktu !== 'harian') {
            const dateNextWeek = new Date(data[i].tanggal_akhir)
            tooltipDate = self.formatDate(date) + ' - ' + self.formatDate(dateNextWeek)
            xAxisLabel = self.formatDateNoYear(date) + ' - ' + self.formatDateNoYear(dateNextWeek)
          }

          this.generateChartKumulatif(data[i], tooltipDate, xAxisLabel)
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      if (data.length > 0) {
        self.ChartKumulatifData.splice(1, 1)
      }
    },
    fetchDataKabupatenHarian () {
      const self = this
      const groupWaktu = this.selectedListGroupWaktu
      const firstData = self.jsonDataKasus.kota[0].satuan[groupWaktu]
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0
      let indexKota = 0

      // filter date
      firstData.forEach((element, index) => {
        if (groupWaktu === 'harian') {
        // filter date
          firstData.forEach((element, index) => {
            if (element.tanggal === this.formatDateYMD(this.selectedDate.start)) {
              startNum = index
            }
            if (element.tanggal === this.formatDateYMD(this.selectedDate.end)) {
              endNum = index
            }
          })
        }
        // find kota
        this.jsonDataKota.forEach((element, index) => {
          if (element.nama === this.selectedListWilayah) {
            indexKota = index
          }
        })
      })
      if (endNum === 0) {
        endNum = self.jsonDataKasus.kota[indexKota].satuan[groupWaktu].length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const data = self.jsonDataKasus.kota[indexKota].satuan[groupWaktu]
        const date = new Date(data[i].tanggal)
        const showAnnotation = i % (Math.floor((endNum - startNum) / 13))

        if (stop === false) {
          let tooltipDate = self.formatDate(date)
          let xAxisLabel = self.formatDateNoYear(date)
          if (groupWaktu !== 'harian') {
            const dateNextWeek = new Date(data[i].tanggal_akhir)
            tooltipDate = self.formatDate(date) + ' - ' + self.formatDate(dateNextWeek)
            xAxisLabel = self.formatDateNoYear(date) + ' - ' + self.formatDateNoYear(dateNextWeek)
          }
          this.generateChartSatuan(data[i], tooltipDate, xAxisLabel, showAnnotation)
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      if (firstData.length > 0) {
        self.ChartHarianData.splice(1, 1)
      }
    },
    fetchDataKabupatenKumulatif () {
      const self = this
      const groupWaktu = this.selectedListGroupWaktu
      const firstData = self.jsonDataKasus.kota[0].satuan[groupWaktu]
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0
      let indexKota = 0

      // filter date
      firstData.forEach((element, index) => {
        if (groupWaktu === 'harian') {
          if (element.tanggal === this.formatDateYMD(this.selectedDate.start)) {
            startNum = index
          }
          if (element.tanggal === this.formatDateYMD(this.selectedDate.end)) {
            endNum = index
          }
        }

        // find kota
        this.jsonDataKota.forEach((element, index) => {
          if (element.nama === this.selectedListWilayah) {
            indexKota = index
          }
        })
      })
      if (endNum === 0) {
        endNum = firstData.length - 1
      }

      // find kota
      this.jsonDataKasus.kota.forEach((element, index) => {
        if (element.nama === this.selectedListWilayah) {
          indexKota = index
        }
      })
      // get data
      let stop = false
      for (let i = startNum; i < endNum; i++) {
        const data = self.jsonDataKasus.kota[indexKota].kumulatif[groupWaktu]
        const date = new Date(data[i].tanggal)

        if (stop === false) {
          let tooltipDate = self.formatDate(date)
          let xAxisLabel = self.formatDateNoYear(date)
          if (groupWaktu !== 'harian') {
            const dateNextWeek = new Date(data[i].tanggal_akhir)
            tooltipDate = self.formatDate(date) + ' - ' + self.formatDate(dateNextWeek)
            xAxisLabel = self.formatDateNoYear(date) + ' - ' + self.formatDateNoYear(dateNextWeek)
          }
          this.generateChartKumulatif(data[i], tooltipDate, xAxisLabel)
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      if (self.jsonDataKasus.kota[indexKota].kumulatif[groupWaktu].length > 0) {
        self.ChartKumulatifData.splice(1, 1)
      }
    },
    onDateSelected (daterange) {
      this.selectedDate = daterange
      this.changeData()
    },
    checkIsMobile () {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    },
    generateChartSatuan (data, tooltipDate, xAxisLabel, showAnnotation) {
      const self = this
      let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
      tooltipHarian += '<tr><td style="font-size: larger;">' + tooltipDate + '</td><td></td></tr>'
      tooltipHarian += '<tr><td>Terkonfirmasi </td><td style="text-align:right;"><b style="margin-left: 10px;">: ' + self.formatThousand(data.confirmation_total) + '</b></td></tr>'
      tooltipHarian += '<tr><td>' + this.legendAverageChart + ' </td><td style="text-align:right;"><b style="margin-left: 10px;">: ' + self.formatThousand(data.confirmation_ratarata) + '</b></td></tr>'
      tooltipHarian += '</table>'
      self.ChartHarianData.push([
        xAxisLabel,
        data.confirmation_total, tooltipHarian,
        !showAnnotation ? data.confirmation_total : null,
        data.confirmation_ratarata, tooltipHarian
      ])
    },
    generateChartKumulatif (data, tooltipDate, xAxisLabel) {
      const self = this
      let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
      tooltipKumulatif += '<tr><td style="font-size: larger;">' + tooltipDate + '</td><td></td></tr>'
      tooltipKumulatif += '<tr><td>Total Terkonfirmasi </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(data.confirmation_total) + '</b></td></tr>'
      tooltipKumulatif += '<tr><td>Isolasi/ Dalam Perawatan </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(data.confirmation_diisolasi) + '</b></td></tr>'
      tooltipKumulatif += '<tr><td>Selesai Isolasi/ Sembuh </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(data.confirmation_selesai) + '</b></td></tr>'
      tooltipKumulatif += '<tr><td>Meninggal </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(data.confirmation_meninggal) + '</b></td></tr>'
      tooltipKumulatif += '</table>'
      self.ChartKumulatifData.push([
        xAxisLabel,
        data.confirmation_diisolasi, tooltipKumulatif,
        data.confirmation_selesai, tooltipKumulatif,
        data.confirmation_meninggal, tooltipKumulatif,
        data.confirmation_total, tooltipKumulatif
      ])
    }
  }
}

</script>

<style lang="scss" scoped>
.select-option-selector {
  display: block;
  border: 1px solid #ccc;
  padding: 6.4px;
  font-size: 14px;
  // width: 230px;
  cursor: pointer;
}

.div-only-mobile {
  display: none !important;
}
.div-no-mobile {
  display: flex !important;
}
@media screen and (max-width: 549px) {
  .div-no-mobile {
    display: none !important;
  }

  .div-only-mobile {
    display: flex !important;
  }
}
.btnActive {
  color: #ffffff;
  background-color: #2dac55;
}
.btnNonActive {
  color: #2dac55;
  background-color: #ffffff;
}
</style>

<style lang="scss" scoped>
.button-selector {
  @apply px-6 py-2 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-white bg-brand-green;
  }
}
</style>
