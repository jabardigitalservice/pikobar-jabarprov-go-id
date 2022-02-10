<template>
  <div class="confirmation-detail">
    <span class="confirmation-detail__title">{{ title }}</span>
    <div class="confirmation-detail__card flex flex-col md:grid md:grid-flow-col md:grid-rows-4 lg:grid-rows-3">
      <div
        v-for="item in content"
        :key="item.label"
        :class="{
          'flex flex-col': true,
          'row-span-3': item.isImage,
        }"
      >
        <span class="confirmation-detail__subtitle">{{ item.label }}</span>
        <img
          v-if="item.isImage"
          :src="displayImage(item)"
          class="confirmation-detail__image"
        >
        <span v-else class="confirmation-detail__content">{{ contentValue(item) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatDateDayIndonesia } from '~/lib/date'
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    content: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapState('isoman', [
      'formRequest',
      'cities',
      'districts',
      'subDistricts',
      'testLocations',
      'testTypes'
    ])
  },
  methods: {
    contentValue (item) {
      if (
        (
          item.model === 'city_id' ||
          item.model === 'district_id' ||
          item.model === 'subdistrict_id' ||
          item.model === 'test_location_id' ||
          item.model === 'test_type_id'
        ) && this.formRequest[item.model]
      ) {
        const areas = {
          city_id: this.cities,
          district_id: this.districts,
          subdistrict_id: this.subDistricts,
          test_location_id: this.testLocations,
          test_type_id: this.testTypes
        }
        const array = areas[item.model.toLowerCase()] ?? []
        return this.getDropdownLabel(array, this.formRequest[item.model])
      } else if (item.model === 'is_reported' || item.model === 'is_reported_tracing') {
        return this.formRequest[item.model] === '1' ? 'Sudah' : 'Belum'
      } else if (item.model === 'birth_date') {
        return formatDateDayIndonesia(this.formRequest[item.model])
      } else {
        return this.formRequest[item.model] || '-'
      }
    },
    getDropdownLabel (array, param) {
      if (!array) {
        return null
      }
      const result = array.find(area => area.id === parseInt(param)) || { name: '-' }
      return result.name
    },
    displayImage (item) {
      return this.formRequest[item.model]
        ? URL.createObjectURL(this.formRequest[item.model])
        : null
    }
  }
}
</script>

<style lang="scss" scoped>
.confirmation-detail {
  @apply flex flex-col;

  &__title {
    font-weight: 700;
    font-size: 14px;
    color: #4F4F4F;
  }

  &__subtitle {
    font-weight: 700;
    font-size: 16px;
    color: #219653;
  }

  &__card {
    @apply gap-4 border rounded-md
    border-solid p-5;

    border-color: #E0E0E0;
  }

  &__content {
    font-weight: 400;
    font-size: 14px;
    color: #828282;
  }

  &__image {
    height: 144px;
    width: 231px;
    object-fit: contain;
  }
}
</style>
