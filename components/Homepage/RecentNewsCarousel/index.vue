<template>
  <NewsCarousel
    :items="news"
    :loading="loading"
  />
</template>

<script>
import { mapState } from 'vuex'
import { NewsCarousel } from '~/components/NewsCarousel'
export default {
  name: 'RecentNewsCarousel',
  components: {
    NewsCarousel
  },
  computed: {
    ...mapState({
      news: (state) => {
        const items = state.news?.items || []
        return items.map(item => ({
          ...item,
          thumbnail: item.image,
          date: item.published_at,
          source: item.news_channel,
          url: item.route
        }))
      }
    }),
    loading () {
      return !Array.isArray(this.news) ||
        !this.news.length
    }
  },
  mounted () {
    this.$store.dispatch('news/getItems', {
      perPage: 4
    })
  }
}
</script>
