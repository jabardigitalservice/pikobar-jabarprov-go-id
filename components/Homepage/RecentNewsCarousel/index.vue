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
  computed: {
    ...mapState('news', {
      news: (state) => {
        const items = state.items || []
        return items.map(item => ({
          ...item,
          thumbnail: item.image,
          date: item.published_at,
          source: item.news_channel,
          url: item.route
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
      tag: 'vaksin'
    })
  }
}
</script>
