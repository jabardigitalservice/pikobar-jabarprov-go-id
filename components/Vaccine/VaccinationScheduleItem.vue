<template>
  <div class="schedule-item">
    <span class="schedule-item__header">
      {{ header }}
    </span>
    <span class="schedule-item__title">
      {{ title }}
    </span>
    <span class="schedule-item__address">
      {{ cutString(address) }}
    </span>
    <div class="flex flex-row gap-2 mb-6">
      <img :src="iconClock">
      <div class="schedule-item__date">
        {{ date }}
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
    <span class="schedule-item__show-more">
      Lihat Selengkapnya
    </span>
  </div>
</template>

<script>
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
    date: {
      type: String,
      default: ''
    },
    ageCategory: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      iconClock
    }
  },
  methods: {
    cutString (string) {
      if (string.length > 80) {
        return string.substring(0, 80) + '...'
      }
      return string
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-item {
  @apply flex flex-col bg-brand-gray
  items-start p-4 rounded-lg;

  &__header {
    @apply font-lato text-sm text-white
    bg-brand-green-darker rounded-full
    px-3 py-1 mb-6;
  }

  &__title {
    @apply font-roboto font-medium mb-1;

    font-size: 21px;
  }

  &__address {
    @apply font-roboto text-brand-gray-dark mb-6;
  }

  &__date {
    @apply flex-none font-roboto
    font-medium text-brand-black;
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
