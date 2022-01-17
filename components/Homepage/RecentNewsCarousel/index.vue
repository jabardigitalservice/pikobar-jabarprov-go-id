<template>
  <NewsCarousel
    :items="news"
    :loading="isLoading"
  />
</template>

<script>
import { mapState } from 'vuex'
import { NewsCarousel } from '~/components/Base/NewsCarousel'
import { formatDateTimeShort } from '~/lib/date'

export default {
  name: 'RecentNewsCarousel',
  components: {
    NewsCarousel
  },
  props: {
    tag: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState('news', {
      news: (state) => {
        // get articles from 3 collection
        const provinceNews = state.items || []
        const nationalNews = state.item_articles_national || []
        const worldNews = state.item_articles_world || []

        // filtering 4 most recent news from 3 collection
        let items = [...provinceNews, ...nationalNews, ...worldNews]
        items.sort((a, b) => (a.published_at < b.published_at) ? 1 : -1)
        items = items.slice(0, 4)

        return items.map(item => ({
          ...item,
          thumbnail: item.image,
          date: item.published_at,
          source: item.news_channel,
          url: item.url
        }))
      },
      /**
       * @public
       */
      lastUpdate: (state) => {
        const { lastUpdate } = state
        return lastUpdate
          ? formatDateTimeShort(new Date(lastUpdate))
          : null
      }
    }),
    isLoading () {
      return !Array.isArray(this.news) ||
        !this.news.length
    }
  },
  mounted () {
    this.$watch(
      'isLoading',
      function (v) {
        this.$emit('loading', v)
      },
      { immediate: true }
    )
    this.$store.dispatch('news/getLastUpdate')
    this.$store.dispatch('news/getItems', {
      perPage: 4,
      tag: this.tag
    })
    this.$store.dispatch('news/getArticleNationals', {
      perPage: 4,
      tag: this.tag
    })
    this.$store.dispatch('news/getArticleWorlds', {
      perPage: 4,
      tag: this.tag
    })
  }
}
</script>
