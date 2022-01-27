<template>
  <div class="schedule-item">
    <div class="flex flex-col items-start">
      <span class="schedule-item__header">
        {{ header }}
      </span>
      <span class="schedule-item__title">
        {{ title }}
      </span>
      <span class="schedule-item__address">
        {{ cutString(address) }}
      </span>
      <div class="flex flex-row gap-2 mb-6 w-full">
        <img width="16px" height="16px" :src="iconClock">
        <div class="schedule-item__date">
          {{ this.displayDate(beginDate) }} - {{ this.displayDate(endDate) }}
        </div>
      </div>
      <div class="flex flex-row flex-wrap gap-2">
        <span
          v-for="age in ageCategory"
          :key="age"
          class="schedule-item__age"
        >
          {{ age }}
        </span>
      </div>
    </div>
    <span class="schedule-item__show-more" @click="onClick">
      Lihat Selengkapnya
    </span>
  </div>
</template>

<script>
import { formatDateIndonesiaShort } from '~/lib/date'
import iconClock from '~/assets/icons/clock-outline.svg'
export default {
  props: {
    header: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    beginDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    },
    ageCategory: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      iconClock
    }
  },
  methods: {
    formatDateIndonesiaShort,
    cutString (string) {
      if (string.length > 80) {
        return string.substring(0, 80) + '...'
      }
      return string
    },
    onClick () {
      this.$emit('click', this.index)
    },
    displayDate (date) {
      return date ? this.formatDateIndonesiaShort(date) : '...'
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-item {
  @apply flex flex-col bg-brand-gray
  justify-between p-4 rounded-lg;

  &__header {
    @apply font-lato text-sm text-white
    bg-brand-green-darker rounded-full
    px-3 py-1 mb-6;
  }

  &__title {
    @apply font-roboto font-medium
    mb-1 text-brand-black;

    font-size: 21px;
  }

  &__address {
    @apply font-roboto text-brand-gray-dark mb-6;
  }

  &__date {
    @apply font-roboto
    font-medium text-brand-black flex-wrap;
  }

  &__age {
    @apply font-lato text-white text-sm
    font-bold px-3 py-1 rounded-full;

    background: #1E88E5;
  }

  &__show-more {
    @apply font-lato font-bold mt-6
    text-brand-gray-dark underline
    cursor-pointer
  }
}
</style>
