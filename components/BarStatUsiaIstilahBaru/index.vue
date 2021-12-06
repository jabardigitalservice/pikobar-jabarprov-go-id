<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <div class="flex flex-wrap">
      <h4 class="p-5 text-xl md:w-1/3">
        <b>Umur dan Jenis Kelamin</b>
      </h4>
      <div class="flex flex-wrap items-stretch pb-2 mb-4 md:w-2/3" style="margin: auto;">
        <button
          class="button-selector ml-4 mt-2"
          style="margin-right: 0px; border-top-left-radius: 0.375rem; border-bottom-left-radius: 0.375rem;"
          :active="stat.isActiveSemua"
          @click="enableSemua"
        >
          Semua Umur
        </button>
        <button
          class="button-selector mt-2"
          style="border-top-right-radius: 0.375rem; border-bottom-right-radius: 0.375rem;"
          :active="stat.isActiveAnak"
          @click="enableAnak"
        >
          Anak
        </button>
        <select
          v-model="optionSelected"
          class="select-option-selector ml-4 mt-2"
          @change="changeGroupUsia($event.target.value)"
        >
          <option
            v-for="list in optionList"
            :key="list"
            :value="list"
          >
            {{ list }}
          </option>
        </select>
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
    <div
      :class="!isLoading?'':'hidden'"
    >
      <hr>
      <div class="m-5 p-2" style="background:#e6e6e6">
        <b>Disclaimer :</b>
        <p>Tidak seluruh data kasus memiliki kelengkapan data Umur sehingga tidak seluruhnya dapat divisualisasikan</p>
      </div>
      <section class="m-5" v-if="stat.isActiveAnak">
        <ButterFlyChart
          :chartData="barChartAnakUmurJenisKelaminData"
          :chartOptions="barChartUmurJenisKelaminOptions"
        />
      </section>
      <section class="m-5" v-if="stat.isActiveSemua">
        <ButterFlyChart
          :chartData="barChartUmurJenisKelaminData"
          :chartOptions="barChartUmurJenisKelaminOptions"
        />
      </section>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import ButterFlyChart from './ButterFlyChart'

export default {
  name: 'BarStatUsiaIstilahBaru',
  components: {
    ContentLoader,
    ButterFlyChart
  },
  props: {
    propsDataRekapitulasiJabar: {
      type: Object,
      default: () => ({
        kode_prov: '',
        nama_prov: '',
        confirmation_total: {
          anak: {
            laki_laki: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            },
            perempuan: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            }
          },
          semua: {
            laki_laki: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            },
            perempuan: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            }
          }
        },
        confirmation_diisolasi: {
          anak: {
            laki_laki: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            },
            perempuan: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            }
          },
          semua: {
            laki_laki: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            },
            perempuan: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            }
          }
        },
        confirmation_meninggal: {
          anak: {
            laki_laki: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            },
            perempuan: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            }
          },
          semua: {
            laki_laki: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            },
            perempuan: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            }
          }
        },
        confirmation_selesai: {
          anak: {
            laki_laki: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            },
            perempuan: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            }
          },
          semua: {
            laki_laki: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            },
            perempuan: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            }
          }
        }
      })
    }
  },
  data () {
    return {
      stat: {
        isActiveAnak: false,
        isActiveSemua: true
      },
      optionList: [
        'Terkonfirmasi',
        'Isolasi/ Dalam Perawatan',
        'Selesai Isolasi/ Sembuh',
        'Meninggal'
      ],
      optionSelected: 'Terkonfirmasi',
      jsonDataKasusUmur: {
        confirmation_total: {
          anak: {
            perempuan: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            },
            laki_laki: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            }
          },
          semua: {
            perempuan: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            },
            laki_laki: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            }
          }
        },
        confirmation_diisolasi: {
          anak: {
            perempuan: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            },
            laki_laki: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            }
          },
          semua: {
            perempuan: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            },
            laki_laki: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            }
          }
        },
        confirmation_meninggal: {
          anak: {
            perempuan: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            },
            laki_laki: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            }
          },
          semua: {
            perempuan: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            },
            laki_laki: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            }
          }
        },
        confirmation_selesai: {
          anak: {
            perempuan: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            },
            laki_laki: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            }
          },
          semua: {
            perempuan: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            },
            laki_laki: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            }
          }
        }
      },
      barChartUmurJenisKelaminOptions: {
        category: 'Terkonfirmasi'
      },
      barChartUmurJenisKelaminData: {
        perempuan: {
          atas_80: 0,
          '70_79': 0,
          '60_69': 0,
          '50_59': 0,
          '40_49': 0,
          '30_39': 0,
          '20_29': 0,
          '6_19': 0,
          bawah_5: 0
        },
        laki_laki: {
          atas_80: 0,
          '70_79': 0,
          '60_69': 0,
          '50_59': 0,
          '40_49': 0,
          '30_39': 0,
          '20_29': 0,
          '6_19': 0,
          bawah_5: 0
        }
      },
      barChartAnakUmurJenisKelaminData: {
        perempuan: {
          '6_18': 0,
          '5_6': 0,
          '1_5': 0,
          bawah_1: 0
        },
        laki_laki: {
          '6_18': 0,
          '5_6': 0,
          '1_5': 0,
          bawah_1: 0
        }
      }
    }
  },
  computed: {
    dataKasusUmur () {
      return this.$store.getters['data-kasus-umur-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-kasus-umur-v2/isLoading']
    }
  },
  watch: {
    dataKasusUmur (val) {
      this.jsonDataKasusUmur = val
      this.changeGroupUsia('Terkonfirmasi')
    }
  },
  mounted () {
    this.getDataKasusUmur()
  },
  methods: {
    ifNullReturnZero (str) {
      if (str === null) {
        return 0
      } else {
        return str
      }
    },
    ifNegatifReturnZero (number) {
      if (number < 0) {
        return 0
      } else {
        return number
      }
    },
    formatDate (date) {
      const d = new Date(date)
      const year = d.getFullYear()
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      return [day, month, year].join('-')
    },
    enableAnak () {
      this.stat.isActiveAnak = true
      this.stat.isActiveSemua = false
    },
    enableSemua () {
      this.stat.isActiveAnak = false
      this.stat.isActiveSemua = true
    },
    resetBarChartUmurJenisKelaminData () {
      this.barChartUmurJenisKelaminData = {
        perempuan: {
          atas_80: 0,
          '70_79': 0,
          '60_69': 0,
          '50_59': 0,
          '40_49': 0,
          '30_39': 0,
          '20_29': 0,
          '6_19': 0,
          bawah_5: 0
        },
        laki_laki: {
          atas_80: 0,
          '70_79': 0,
          '60_69': 0,
          '50_59': 0,
          '40_49': 0,
          '30_39': 0,
          '20_29': 0,
          '6_19': 0,
          bawah_5: 0
        }
      }
    },
    resetBarChartAnakUmurJenisKelaminData () {
      this.barChartAnakUmurJenisKelaminData = {
        perempuan: {
          '6_18': 0,
          '5_6': 0,
          '1_5': 0,
          bawah_1: 0
        },
        laki_laki: {
          '6_18': 0,
          '5_6': 0,
          '1_5': 0,
          bawah_1: 0
        }
      }
    },
    changeGroupUsia (stat) {
      let filter = 'positif_aktif'
      this.resetBarChartUmurJenisKelaminData()
      this.resetBarChartAnakUmurJenisKelaminData()
      this.barChartUmurJenisKelaminOptions.category = stat

      if (stat === 'Terkonfirmasi') {
        filter = 'confirmation_total'
      } else if (stat === 'Isolasi/ Dalam Perawatan') {
        filter = 'confirmation_diisolasi'
      } else if (stat === 'Selesai Isolasi/ Sembuh') {
        filter = 'confirmation_selesai'
      } else if (stat === 'Meninggal') {
        filter = 'confirmation_meninggal'
      }

      if (this.jsonDataKasusUmur[filter] !== undefined) {
        // Semua Umur
        Object.keys(this.barChartUmurJenisKelaminData).forEach((gender) => {
          Object.keys(this.barChartUmurJenisKelaminData[gender]).forEach((age) => {
            this.barChartUmurJenisKelaminData[gender][age] = this.jsonDataKasusUmur[filter].semua[gender][age]
          })
        })

        // Umur Anak
        Object.keys(this.barChartAnakUmurJenisKelaminData).forEach((gender) => {
          Object.keys(this.barChartAnakUmurJenisKelaminData[gender]).forEach((age) => {
            this.barChartAnakUmurJenisKelaminData[gender][age] = this.jsonDataKasusUmur[filter].anak[gender][age]
          })
        })
      }
    },
    // get data
    getDataKasusUmur () {
      this.$store.dispatch('data-kasus-umur-v2/getItems')
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

.select-option-selector {
  border-radius: 0.2rem;
  border-width: 1px;
  border-style: solid;
  border-color: #555;
  color: #555;
  background-color: #fff;
  height: 30px;
  padding: 0px;
  margin-right: 20px;
}

.button-selector{
  padding-top: 0rem;
  padding-bottom: 0rem;
  height: 30px;
  margin-right: 10px;
  border-radius: 0px;
}
</style>
