<template>
  <div class="preview-data">
    <div class="preview-data__card flex flex-col">
      <span class="preview-data__title">{{ title }}</span>
      <div
        v-for="item in content"
        :key="item.label"
        :class="{
          'flex flex-col': true,
          'row-span-3': item.isImage,
        }"
      >
        <span class="preview-data__subtitle">{{ item.label }}</span>
        <div v-if="item.isImage" class="flex">
          <div class="md:inline-block md:w-3/12">
            <img
              :src="displayImage(item)"
              class="preview-data__image"
              alt="evidence"
            >
          </div>
          <div class="preview-data__link">
            <a :href="displayImage(item)" target="_blank" rel="noopener noreferrer">{{ item.label }}</a>
          </div>
        </div>
        <span v-else class="preview-data__content">{{ contentValue(item) }}</span>
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
      'testLocations',
      'testTypes'
    ])
  },
  methods: {
    contentValue (item) {
      if (
        (
          item.model === 'test_location_id' ||
          item.model === 'test_type_id'
        ) && this.formRequest[item.model]
      ) {
        const areas = {
          test_location_id: this.testLocations,
          test_type_id: this.testTypes
        }
        const array = areas[item.model.toLowerCase()] ?? []
        return this.getDropdownLabel(array, this.formRequest[item.model])
      } else if (item.model === 'is_reported' || item.model === 'is_reported_tracing') {
        return this.formRequest[item.model] === '1' ? 'Sudah' : 'Belum'
      } else if (item.model === 'birth_date' || item.model === 'date_confirmation' || item.model === 'date_check') {
        return formatDateDayIndonesia(this.formRequest[item.model])
      } else {
        return this.formRequest[item.model] || '-'
      }
    },
    getDropdownLabel (array, param) {
      if (!array) {
        return null
      }
      const result = array.find(area => area.id.toString() === param) || { name: '-' }
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
.preview-data {
  @apply flex flex-col;
  font-family: font-roboto;
  background: #FAFAFA;
  border-radius: 8px;
  &__title {
    font-weight: 500;
    font-size: 21px;
    line-height: 34px;
    color: #BDBDBD;
  }

  &__subtitle {
    font-weight: normal;
    font-style: normal;
    font-size: 14px;
    color: #757575;
    line-height: 23px;
  }

  &__card {
    @apply gap-4 border rounded-md
    border-solid p-5;

    border-color: #E0E0E0;
  }

  &__content {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #424242;
    line-height: 26px;
  }

  &__image {
    position: static;
    width: 160px;
    height: 80px;
    object-fit: contain;
  }

  &__link {
    @apply inline-block w-6/12 pr-5 pt-6;
    text-decoration: underline;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    width: 100%;
    color: #1E88E5;
  }
}
</style>
