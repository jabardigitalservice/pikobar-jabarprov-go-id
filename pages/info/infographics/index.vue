<template>
  <div class="infographic">
    <h2 class="text-xl md:text-3xl leading-normal">
      <p class="text-base opacity-75">
        Info yang memuat infografis terkait COVID-19
      </p>
    </h2>
    <br>
    <div class="infographic__list">
      <figure
        v-for="(item, index) in infographics"
        :key="index"
        class="relative w-full bg-white rounded-lg border divide-y divide-gray-200"
        @click="onClickSlide(item.route)"
      >
        <div class="img-container relative overflow-hidden">
          <img
            :src="item.images[0] || null"
            class="cursor-pointer infographic-list__item-image w-full object-cover object-left-top rounded-lg shadow-lg"
            @click.prevent="$router.push(item.route)"
          >
        </div>
        <caption class="px-4 py-2 overflow-ellipsis text-left block w-full font-bold opacity-75 hover:underline">
          <nuxt-link :to="item.route">
            {{ item.title }}
          </nuxt-link>
        </caption>
      </figure>
    </div>
    <br>
    <div class="flex justify-center pb-6">
      <button
        class="infographic__button"
        @click="onLoadMore"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import { faDownload, faShare } from '@fortawesome/free-solid-svg-icons'
import { mapState, mapActions } from 'vuex'
import { analytics } from '~/lib/firebase'
import { onDownload, onShare } from '~/lib/download-and-share-firestore-doc'
export default {
  data () {
    return {
      icon: {
        faDownload,
        faShare
      },
      isPending: true
    }
  },
  computed: {
    ...mapState('infographics', {
      infographics: 'items'
    })
  },
  mounted () {
    this.isPending = true
    this.getItems({ perPage: 12, fresh: true })
      .finally(() => {
        if (process.browser) {
          analytics.logEvent('infographic_list_view')
        }
        this.isPending = false
      })
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
  &__list {
    @apply grid grid-cols-1 gap-6;

    @screen md {
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
}

.img-container {
  > img {

    &:hover {
      opacity: 0.5;

      @screen lg {
        opacity: 1;
      }
    }
  }
  > .action-overlay {
    cursor: pointer;
    pointer-events: none;
    opacity: 0;
    transform: translateY(1rem);
    transition-property: opacity, transform;
    transition-duration: 0.25s;
    transition-timing-function: ease-in-out;
  }
  &:hover {

    > .action-overlay {
      pointer-events: all;
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
