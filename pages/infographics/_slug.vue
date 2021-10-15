<template>
  <div>
    <Section
      class="bg-white py-6 md:py-16"
    >
      <div class="text-green-500 space-x-2 pb-8 cursor-pointer" @click="$router.go(-1)">
        <FontAwesomeIcon :icon="icon.faArrowLeft" class="mr-3" />
        Kembali
      </div>
      <template v-if="isPending">
        <ContentLoader
          :speed="2"
          width="400"
          height="200"
        >
          <rect
            x="0"
            y="0"
            rx="0"
            ry="0"
            width="100%"
            height="100%"
          />
        </ContentLoader>
      </template>
      <template v-else-if="item">
        <div class="flex flex-col justify-start items-start lg:flex-row lg:justify-between lg:items-center pb-10">
          <h2 class="text-3xl lg:text-5xl font-bold leading-tight mb-3 lg:mb-0">
            {{ item.title }}
          </h2>
        </div>
        <Section
          class="bg-white"
        >
          <div class="relative container-with-ratio rounded-lg overflow-hidden">
            <ImageCarousel
              class="absolute inset-0 w-full h-full"
              :items="imagesMap(item.images)"
              :carousel-props="carouselProps"
            />
          </div>
        </Section>
        <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center sm:mt-8 sm:space-x-2 space-y-2 sm:space-y-0">
          <Button
            class="w-full flex"
            :label="'Unduh'"
            @click="beforeDownload"
          />
          <Button
            class="w-full flex"
            :label="'Bagikan'"
            :outlined="true"
            @click="beforeShare"
          />
        </div>
      </template>
    </Section>
  </div>
</template>

<script>
import { faArrowLeft, faDownload, faShare } from '@fortawesome/free-solid-svg-icons'
import { ContentLoader } from 'vue-content-loader'
import { onDownload, onShare } from '~/lib/download-and-share-firestore-doc'
import { analytics } from '~/lib/firebase'
import { useArticleMetaInfo } from '~/lib/metainfo'
import Section from '~/components/Base/Section'

const regex = /(?:(-inf\.))(.*)$/
export default {
  components: {
    ContentLoader,
    ImageCarousel: () => import('~/components/ImageCarousel'),
    Button: () => import('~/components/Base/Button'),
    Section
  },
  validate ({ redirect, params }) {
    const { slug } = params
    if (!slug || typeof slug !== 'string') {
      redirect('/articles')
      return
    }
    return true
  },
  async fetch () {
    await this.fetchItem()
      .then(() => {
        this.isPending = false
      })
  },
  data () {
    return {
      carouselProps: {
        paginationEnabled: true
      },
      icon: {
        faDownload,
        faArrowLeft,
        faShare
      },
      isPending: true
    }
  },
  computed: {
    itemId () {
      const slug = this.$route.params.slug
      if (slug.includes('-inf.')) {
        const matched = regex.exec(slug)
        return matched && matched.length ? matched[2] : null
      } else {
        return slug
      }
    },
    item () {
      return this.$store.getters['infographics/itemsMap'][this.itemId]
    }
  },
  methods: {
    fetchItem () {
      this.isPending = true
      return this.$store.dispatch('infographics/getItemById', this.itemId)
        .then(() => {
          if (process.client || process.browser) {
            analytics.logEvent('infographic_detail_view', { id: this.$route.params.slug })
          }
        })
        .finally(() => {
          this.isPending = false
        })
    },
    beforeShare () {
      onShare(this.item.shareText)
    },
    beforeDownload () {
      onDownload(this.item.downloadURL, this.item.title)
    },
    imagesMap (item) {
      const array = item
        .map((cc, index) => ({
          id: index,
          url: cc
        }))
      return array
    }
  },
  head () {
    if (this.item) {
      const { title, route, published_at: publishedAt, images = [] } = this.item
      const date = publishedAt && typeof publishedAt.toISOString === 'function'
        ? publishedAt.toISOString()
        : ''
      return useArticleMetaInfo({
        title,
        publishedTime: date,
        url: `${process.env.URL}${route}`,
        image: images[0]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container-with-ratio {
  padding-top: (900 * 100/ 900) * 1%;
  @screen lg {
    padding-top: (500 * 100/ 900) * 1%;
  }
}
</style>
