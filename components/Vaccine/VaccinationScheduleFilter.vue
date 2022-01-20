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
      placeholder="Pilih Kategori Usia"
      :searchable="true"
      class="schedule-filter__filter"
    >
      <template v-slot:noResult>
        Data Tidak Ditemukan.
      </template>
    </multiselect>
    <!-- @todo : create datepicker filter input
    <input
      type="date"
      class="schedule-filter__date"
      placeholder="Pilih Tanggal Vaksinasi"
    > -->
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
import _uniqBy from 'lodash/uniqBy'
import ageCategory from './ageCategory'
import BaseButton from '@/components/Base/Button'
export default {
  components: {
    BaseButton
  },
  data () {
    return {
      query: {
        district: null, // {A2. Kota/Kabupaten}
        age: null, // {D1. Target Usia}
        date: null
      },
      districts: [],
      ageCategory
    }
  },
  async mounted () {
    await this.getDistrictList()
  },
  methods: {
    _uniqBy,
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

      const age = this.query.age ? `SEARCH("${this.query.age}",ARRAYJOIN({D1. Target Usia}))` : ''
      if (this.query.age) { params.push(age) }

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
        age: null,
        date: null
      }
      this.$emit('search', [])
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

  &__date {
    @apply col-span-2 rounded-lg px-4
    cursor-pointer;

    border: 1px solid #e8e8e8;
    color: #adadad;
  }

  &__button {
    @apply col-span-1
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
