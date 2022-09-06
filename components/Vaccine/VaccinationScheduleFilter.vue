<template>
  <div class="schedule-filter">
    <multiselect
      v-model="query.district"
      :options="districts"
      :allow-empty="true"
      track-by="id"
      placeholder="Pilih Kota/Kab."
      :searchable="true"
      label="label"
      class="schedule-filter__filter"
    >
      <template v-slot:noResult>
        Data Tidak Ditemukan.
      </template>
    </multiselect>
    <multiselect
      v-model="query.age"
      :options="ageCategory"
      :allow-empty="true"
      placeholder="Pilih Sasaran/Usia"
      :searchable="true"
      class="schedule-filter__filter"
    >
      <template v-slot:noResult>
        Data Tidak Ditemukan.
      </template>
    </multiselect>
    <vue-rangedate-picker
      v-if="!isMobile"
      :key="rangeDateKey"
      v-model="query.date"
      righttoleft="true"
      class="schedule-filter__filter"
      :captions="rangedate.captions"
      :preset-ranges="rangedate.presetRanges"
      @selected="onDateSelected"
    />
    <multiselect
      v-model="query.typeDosage"
      :options="typeDosage"
      :allow-empty="true"
      track-by="id"
      placeholder="Pilih Dosis Vaksinasi"
      :searchable="true"
      label="label"
      class="schedule-filter__filter"
    >
      <template v-slot:noResult>
        Data Tidak Ditemukan.
      </template>
    </multiselect>
    <multiselect
      v-model="query.typeVaccine"
      :options="typeVaccines"
      :allow-empty="true"
      placeholder="Pilih Jenis Vaksinasi"
      :searchable="true"
      class="schedule-filter__filter"
    >
      <template v-slot:noResult>
        Data Tidak Ditemukan.
      </template>
    </multiselect>
    <div v-if="isMobile" style="padding-bottom: 220px;">
      <div>
        <vue-rangedate-picker
          :key="rangeDateKey"
          v-model="query.date"
          :compact="isCompact"
          class="schedule-filter__date"
          :captions="rangedate.captions"
          :preset-ranges="rangedate.presetRanges"
          @selected="onDateSelected"
        />
      </div>
    </div>
    <br v-if="isMobile">
    <BaseButton
      label="Cari"
      class="schedule-filter__button"
      @click.prevent="onSearch"
    />
    <BaseButton
      label="Reset"
      class="schedule-filter__button"
      outlined
      monochrome
      @click.prevent="onReset"
    />
  </div>
</template>

<script>
import { format as formatDate } from 'date-fns'
import _uniqBy from 'lodash/uniqBy'
import ageCategory from './ageCategory'
import typeVaccines from './typeVaccines'
import BaseButton from '@/components/Base/Button'
export default {
  components: {
    BaseButton
  },
  data () {
    return {
      isCompact: 'true',
      rangeDateKey: false,
      ageCategory,
      districts: [],
      typeVaccines,
      typeDosage: [],
      query: {
        district: null, // {A2. Kota/Kabupaten}
        age: null, // {D1. Target Usia},
        typeVaccine: null, // {Jenis Vaksin}
        date: null,
        startDate: null, // {C2. Start Date (Pelaksanaan)}
        endDate: null, // {C3. End Date (Pelaksanaan)},
        typeDosage: null // {A4. Jenis Kegiatan}
      },
      isMobile: false,
      rangedate: {
        captions: {
          title: 'Pilih Tanggal Vaksinasi',
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
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate())
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 8, 0, 0)
            return {
              label: '1 Minggu ke depan',
              active: false,
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
  destroyed () {
    window.removeEventListener('resize', this.getResolution)
  },
  created () {
    this.getResolution()
  },
  async mounted () {
    window.addEventListener('resize', this.getResolution)
    await this.getDistrictList()
    await this.getTypeDosage()
  },
  methods: {
    getResolution () {
      if (window.screen.width >= 1024) {
        this.isMobile = false
      } else {
        this.isMobile = true
      }
    },
    _uniqBy,
    formatDate,
    /**
     * Fetch type vaccine options from API
     * and map it to multiselect needs
     * @returns {Array}
     */
    async getTypeDosage () {
      const typeDosageQuery = {
        setState: false,
        params: {
          'fields[]': 'A4. Jenis Kegiatan',
          'sort[0][field]': 'A4. Jenis Kegiatan',
          'sort[0][direction]': 'asc'
        }
      }
      let typeDosageOptions = await this.$store.dispatch('vaksin/getSchedule', typeDosageQuery)
      if (Array.isArray(typeDosageOptions)) {
        typeDosageOptions = this._uniqBy(typeDosageOptions, 'fields["A4. Jenis Kegiatan"]')
        this.typeDosage = typeDosageOptions.map((options) => {
          return {
            ...options,
            label: options.fields['A4. Jenis Kegiatan']
          }
        })
      } else {
        return []
      }
    },
    /**
     * Fetch district options from API
     * and map it to multiselect needs
     * @returns {Array}
     */
    async getDistrictList () {
      const districtQuery = {
        setState: false,
        params: {
          'fields[]': 'A2. Kota/Kabupaten',
          'sort[0][field]': 'A2. Kota/Kabupaten',
          'sort[0][direction]': 'asc'
        }
      }
      let districtOptions = await this.$store.dispatch('vaksin/getSchedule', districtQuery)
      if (Array.isArray(districtOptions)) {
        districtOptions = this._uniqBy(districtOptions, 'fields["A2. Kota/Kabupaten"]')
        this.districts = districtOptions.map((options) => {
          return {
            ...options,
            label: options.fields['A2. Kota/Kabupaten']
          }
        })
        this.districts.unshift({ label: 'Semua wilayah' })
      } else {
        return []
      }
    },
    /**
     * create formula for airtable API filter data
     * based on this filter component value
     * @event search
     * @property {Array} params mapped array of query for airtable API needs
     */
    onSearch () {
      const params = []

      const district = this.query.district ? `{A2. Kota/Kabupaten}="${this.query.district.label}"` : ''
      if (this.query.district && this.query.district.label !== 'Semua wilayah') {
        params.push(district)
      }

      const typeDosage = this.query.typeDosage ? `{A4. Jenis Kegiatan}="${this.query.typeDosage.label}"` : ''
      if (this.query.typeDosage) { params.push(typeDosage) }

      const typeVaccine = this.query.typeVaccine ? `SEARCH("${this.query.typeVaccine}", ARRAYJOIN({Jenis Vaksin}))` : ''
      if (this.query.typeVaccine) { params.push(typeVaccine) }

      const age = this.query.age ? `SEARCH("${this.query.age}", ARRAYJOIN({D1. Target Usia}))` : ''
      if (this.query.age && this.query.age !== 'Semua usia') { params.push(age) }

      const date = this.query.startDate
        ? `OR(
            AND(
              {C2. Start Date (Pelaksanaan)}>DATETIME_FORMAT("${this.query.startDate}", "YYYY-MM-DD"),
              {C2. Start Date (Pelaksanaan)}<DATETIME_FORMAT("${this.query.endDate}", "YYYY-MM-DD")),
            AND(
              {C3. End Date (Pelaksanaan)}>DATETIME_FORMAT("${this.query.startDate}", "YYYY-MM-DD"),
              {C3. End Date (Pelaksanaan)}<DATETIME_FORMAT("${this.query.endDate}", "YYYY-MM-DD"))
            )`
        : ''
      if (this.query.startDate) { params.push(date) }

      this.$emit('search', params)
    },
    /**
     * reset the query value
     * @event search
     * @property {Array}
     */
    onReset () {
      Object.assign(this.$data.query, this.$options.data().query)
      this.rangeDateKey = !this.rangeDateKey
      this.$emit('search', [])
    },
    /**
     * set date value into query
     */
    onDateSelected (daterange) {
      this.query.startDate = formatDate(daterange.start, 'yyyy-MM-dd')
      this.query.endDate = formatDate(daterange.end, 'yyyy-MM-dd')
      this.onSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-filter {
  @apply grid grid-cols-2 gap-4;

  @screen lg {
    @apply grid-cols-6;
  }

  &__filter {
    @apply col-span-2 cursor-pointer
  }

  &__date::v-deep {
    @apply col-span-2 rounded-lg
    cursor-pointer w-full h-full
    justify-between items-center;
  }

  &__button {
    @apply col-span-1
  }
}
</style>

<!-- override class css for library vue-rangedate-picker -->
<style lang="scss">
@media only screen and (max-width: 768px) {
  .input-date {
    width: 209% !important;
    height: 43px;
    padding: 10px !important;
    border: 1px solid #e8e8e8 !important;
    border-radius: 5px;
  }
  .calendar {
    --display: none !important;
    height: 230px !important;
  }
  .calendar-mobile {
    width: 300px !important;
  }
  .calendar-wrap {
    width: 100% !important;
  }
  .calendar-range-mobile {
    height: 50%;
  }
}
@media only screen and (min-width: 768px) {
  .input-date {
    width: 205% !important;
  }
}
@media only screen and (min-width: 1024px) {
  .calendar {
    box-shadow: 0px 0px 0px 10000rem rgba(0,0,0,0.60) !important;
    border-radius: 5px;
  }
  .input-date {
    width: 100% !important;
    height: 43px;
    padding: 10px !important;
    border: 1px solid #e8e8e8 !important;
    border-radius: 5px;
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
