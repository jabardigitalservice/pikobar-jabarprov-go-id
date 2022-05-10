<template>
  <div class="news-carousel-item">
    <img
      class="news-carousel-item__img"
      :src="thumbnail"
      :alt="url"
      @click="goToUrl"
    >
    <div class="news-carousel-item__body">
      <span class="news-carousel-item__source">
        {{ source }}
      </span>
      <a
        class="news-carousel-item__title"
        @click="goToUrl"
      >
        <strong>
          {{ title }}
        </strong>
      </a>
    </div>
    <time
      :date="date"
      class="news-carousel-item__date"
    >
      {{ formattedDate }}
    </time>
  </div>
</template>

<script>
import { formatDateIndonesiaShort } from '~/lib/date'
export default {
  name: 'NewsCarouselItem',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: null
    },
    thumbnail: {
      type: String,
      default: null
    },
    date: {
      type: [String, Date],
      default: null
    },
    source: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    backlink: {
      type: String,
      default: null
    }
  },
  computed: {
    formattedDate () {
      return this.date
        ? formatDateIndonesiaShort(this.date)
        : ''
    }
  },
  methods: {
    goToUrl () {
      const { url, source, backlink } = this
      if (typeof url !== 'string' || !url.length) {
        return
      }
      if (url.startsWith('http')) {
        return window.open(url, '_blank')
      } else if (source === 'Anti Hoax') {
        return window.open(backlink, '_blank')
      } else {
        return this.$router.push(url)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.news-carousel-item {
  line-height: 1.618;

  @apply overflow-hidden h-full
  flex flex-col flex-no-wrap
  justify-start items-stretch
  rounded-lg
  border border-solid border-gray-200
  bg-white;

  &__img {
    height: 150px;
    justify-self: stretch;

    @apply cursor-pointer
    flex-none w-auto
    object-cover object-center;

    &:hover {
      @apply opacity-75;
    }
  }

  &__body {
    @apply flex-1 m-4 mb-2;
  }

  &__source {
    font-size: 10px;
    font-family: 'Roboto', sans-serif;

    @apply inline-block
    mb-5 px-2 py-1
    rounded-full
    bg-blue-500
    text-white font-medium;
  }

  &__title {
    @apply cursor-pointer
    block
    text-sm font-medium text-brand-black;

    font-family: 'Roboto', sans-serif;

    &:hover {
      @apply underline;
    }
  }

  &__date {
    font-size: 11px;
    font-family: 'Lato', sans-serif;
    color: #757575;

    @apply block
    m-4 mt-0 font-bold;
  }
}
</style>
