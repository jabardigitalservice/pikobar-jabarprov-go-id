<template>
  <div class="bg-white overflow-hidden rounded-lg border border-solid border-gray-300">
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
      <div class="m-5 mb-0 p-5 rounded-lg bg-blue-100 border border-solid border-blue-700">
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
        <p>Tidak seluruh data kasus memiliki kelengkapan data Umur sehingga tidak seluruhnya dapat divisualisasikan.</p>
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
