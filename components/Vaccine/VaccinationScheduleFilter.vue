<template>
  <div class="schedule-filter">
    <multiselect
      v-model="query.district"
      :options="districts"
      :allow-empty="true"
      track-by="id"
      placeholder="Pilih Kabupaten/Kota"
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
      placeholder="Pilih Range Usia"
      :searchable="true"
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
      track-by="id"
      placeholder="Pilih Jenis Vaksinasi"
      :searchable="true"
      label="label"
      class="schedule-filter__filter"
    >
      <template v-slot:noResult>
        Data Tidak Ditemukan.
      </template>
    </multiselect>
    <!-- @todo: fix datepicker css -->
    <!-- <DatePicker
      v-model="query.date"
      range
      placeholder="Pilih Tanggal Vaksinasi"
      class="schedule-filter__date"
      @input="onDateSelected"
    /> -->
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
// import DatePicker from 'vue2-datepicker'
// import 'vue2-datepicker/index.css'
import _uniqBy from 'lodash/uniqBy'
import ageCategory from './ageCategory'
import BaseButton from '@/components/Base/Button'
export default {
  components: {
    BaseButton
    // DatePicker
  },
  data () {
    return {
      ageCategory,
      districts: [],
      typeVaccines: [],
      query: {
        district: null, // {A2. Kota/Kabupaten}
        age: null, // {D1. Target Usia},
        typeVaccine: null, // {A4. Jenis Kegiatan}
        date: null,
        startDate: null, // {C2. Start Date (Pelaksanaan)}
        endDate: null // {C3. End Date (Pelaksanaan)}
      }
    }
  },
  async mounted () {
    await this.getDistrictList()
    await this.getTypeVaccine()
  },
  methods: {
    _uniqBy,
    formatDate,
    /**
     * Fetch type vaccine options from API
     * and map it to multiselect needs
     * @returns {Array}
     */
    async getTypeVaccine () {
      const typeVaccineQuery = {
        setState: false,
        params: {
          'fields[]': 'A4. Jenis Kegiatan',
          'sort[0][field]': 'A4. Jenis Kegiatan',
          'sort[0][direction]': 'asc'
        }
      }
      let typeVaccineOptions = await this.$store.dispatch('vaksin/getSchedule', typeVaccineQuery)
      if (Array.isArray(typeVaccineOptions)) {
        typeVaccineOptions = this._uniqBy(typeVaccineOptions, 'fields["A4. Jenis Kegiatan"]')
        this.typeVaccines = typeVaccineOptions.map((options) => {
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
      if (this.query.district) { params.push(district) }

      const typeVaccine = this.query.typeVaccine ? `{A4. Jenis Kegiatan}="${this.query.typeVaccine.label}"` : ''
      if (this.query.typeVaccine) { params.push(typeVaccine) }

      const age = this.query.age ? `SEARCH("${this.query.age}", ARRAYJOIN({D1. Target Usia}))` : ''
      if (this.query.age) { params.push(age) }

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
      this.query = {
        district: null,
        typeVaccine: null,
        age: null,
        date: null
      }
      this.$emit('search', [])
    },
    /**
     * set date value into query
     */
    onDateSelected () {
      this.query.startDate = formatDate(this.query.date[0], 'yyyy-MM-dd')
      this.query.endDate = formatDate(this.query.date[1], 'yyyy-MM-dd')
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-filter {
  @apply grid grid-cols-2 gap-4;

  @screen lg {
    @apply grid-cols-8
  }

  &__filter {
    @apply col-span-2 cursor-pointer
  }

  &__date::v-deep {
    @apply flex col-span-2 rounded-lg px-4
    cursor-pointer w-full h-full
    justify-between items-center;

    border: 1px solid #e8e8e8;
    color: #adadad;

    .mx-input-wrapper {
      @apply w-full
    }

    .mx-input {
      @apply border-none shadow-none p-0
      font-lato text-sm text-brand-gray-dark
    }
  }

  &__button {
    @apply col-span-1
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
