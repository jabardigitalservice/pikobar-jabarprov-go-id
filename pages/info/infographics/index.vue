<template>
  <div class="infographic">
    <h2 class="text-xl md:text-3xl leading-normal">
      <p class="infographic__description">
        Info yang memuat infografis terkait COVID-19
      </p>
    </h2>
    <br>
    <div v-show="isImageLoaded" class="infographic__list">
      <InfographicCarousel :is-image-loaded.sync="isImageLoaded" />
    </div>
    <div
      v-if="showLoader"
      class="infographic__skeleton"
    >
      <InfographicSkeleton
        v-for="i in 4"
        :key="i"
      />
    </div>
    <br>
    <div
      v-if="showLoadMore"
      class="flex justify-center pb-6"
    >
      <button
        class="infographic__button"
        @click="onLoadMore"
      >
        Load More
      </button>
    </div>
    <div
      v-if="showEmptyFig"
      class="flex justify-center"
    >
      <img
        src="~/static/img/icon-empty-state.svg"
        alt="img-faq-empty"
        class="mb-5"
      >
    </div>
  </div>
</template>

<script>
import { faDownload, faShare } from '@fortawesome/free-solid-svg-icons'
import { mapState, mapActions } from 'vuex'
import { analytics } from '~/lib/firebase'
import { onDownload, onShare } from '~/lib/download-and-share-firestore-doc'
import InfographicSkeleton from '~/components/_pages/infographics/InfographicSkeleton.vue'
import InfographicCarousel from '~/components/Homepage/InfographicCarousel'
export default {
  components: {
    InfographicSkeleton,
    InfographicCarousel
  },
  data () {
    return {
      icon: {
        faDownload,
        faShare
      },
      isPending: false,
      isImageLoaded: false
    }
  },
  computed: {
    ...mapState('infographics', {
      infographics: 'items',
      isFiltered: 'isFiltered'
    }),
    showLoader () {
      return this.isPending || (!this.isImageLoaded && this.infographics.length)
    },
    showLoadMore () {
      return !this.isPending && this.isImageLoaded && this.infographics.length && !this.isFiltered
    },
    showEmptyFig () {
      return !this.infographics.length && !this.showLoader
    }
  },
  mounted () {
    if (!this.isFiltered) {
      this.isPending = true
      this.getItems({ perPage: 12 })
        .finally(() => {
          this.isPending = false
        })
    }
    if (process.browser) {
      analytics.logEvent('infographic_list_view')
    }
  },
  methods: {
    ...mapActions('infographics', {
      getItems: 'getItems'
    }),
    async onLoadMore () {
      this.isPending = true
      await this.getItems({ perPage: 12, fresh: true })
      this.isPending = false
    },
    beforeDownload (item) {
      onDownload(item.downloadURL, item.title)
    },
    beforeShare (item) {
      onShare(item.shareText)
    },
    onClickSlide (slide) {
      const { route } = slide
      if (typeof route !== 'string' || !route.length) {
        return
      }
      if (route.startsWith('http')) {
        return window.open(route, '_blank')
      } else {
        return this.$router.push(route)
      }
    }
  },
  head () {
    const title = 'Infografis - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.infographic {
  &__skeleton {
    @apply grid grid-cols-1 gap-6
    mt-6;

    @screen md {
      @apply grid-cols-2;
    }

    @screen lg {
      @apply grid-cols-3;
    }

    @screen xl {
      @apply grid-cols-4;
    }
  }

  &__button {
      @apply w-full mt-6 bg-green-600 border border-transparent
      rounded-md py-3 px-8 flex items-center justify-center
      text-base font-medium text-white;

      @screen lg {
        @apply w-1/4 ;
      }
  }

  &__description {
    @apply text-base;

    color: #424242;
    font-family: 'Roboto', sans-serif;
  }
}
</style>
