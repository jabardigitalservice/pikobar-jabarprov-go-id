<template>
  <NewsCarousel
    :items="news"
    :loading="isLoading"
  />
</template>

<script>
import { mapState } from 'vuex'
import { NewsCarousel } from '~/components/Base/NewsCarousel'

export default {
  name: 'HoaxNewsCarousel',
  components: {
    NewsCarousel
  },
  computed: {
    ...mapState('anti-hoax', {
      news: (state) => {
        const items = state.items || []
        return items.map(item => ({
          ...item,
          source: 'Anti Hoax',
          thumbnail: item.image,
          date: item.published_at,
          url: item.route
        }))
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
    this.$store.dispatch('anti-hoax/getItems', {
      perPage: 4
    })
  }
}
</script>
