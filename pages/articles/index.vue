<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <Section class="bg-white pb-16">
    <div class="pt-10">
      <h2 class="font-bold text-3xl">
        Berita Terkini
      </h2>
      <h4 class="text-gray-500">
        Berita seputar Covid-19 mulai dari berita lokal hingga mancanegara.
      </h4>
    </div>
    <div class="py-10">
      <StringSearchQuery
        :placeholder="'Cari Berita'"
        :value="query.search"
        @search="onSearchStringChanged"
      />
    </div>
    <TabLayout
      v-model="tabLayoutModel"
      :tabs="tabs"
      :show-count="showCount"
    >
      <template #content.news>
        <div class="mt-10">
          <ListArticles
            :items="listDisplay"
            :loading="loading"
            :has-reached-end="hasReachedEnd"
            :on-load-more="onLoadMore"
            :show-load-more="showLoadMore"
            :is-filtered="isFiltered"
          />
        </div>
      </template>
    </TabLayout>
  </Section>
</template>

<script>
import { mapState } from 'vuex'
import { db, analytics } from '~/lib/firebase'
import { slugifyArticleRoute } from '~/lib/slugify'
export default {
  name: 'NewsTabPage',
  components: {
    TabLayout: () => import('~/components/Base/TabLayout'),
    Section: () => import('~/components/Base/Section'),
    StringSearchQuery: () => import('~/components/StringSearchQuery'),
    ListArticles: () => import('~/components/ArticlesPage/ListArticles')
  },
  data () {
    return {
      tabs: Object.freeze([
        {
          name: 'news',
          collection: 'articles',
          label: 'Jabar'
        },
        {
          name: 'news',
          collection: 'articles_national',
          label: 'Nasional'
        },
        {
          name: 'news',
          collection: 'articles_world',
          label: 'Dunia'
        }
      ]),
      items: [],
      query: {
        perPage: 12,
        search: ''
      },
      collectionName: 'articles',
      isLoading: false,
      hasReachedEnd: false,
      lastDocumentSnapshot: null,
      section: {
        recentNews: {
          loading: true,
          title: 'Berita Terkini',
          subtitle: null
        }
      },
      tabActive: 0,
      isProvinceLoading: false,
      isNationalLoading: false,
      isWorldLoading: false
    }
  },
  computed: {
    ...mapState('news', {
      articles: state => state.items,
      articles_national: state => state.item_articles_national,
      articles_world: state => state.item_articles_world,
      isFiltered: 'isFiltered'
    }),
    tabLayoutModel: {
      get () {
        return 0
      },
      set (index) {
        this.collectionName = this.tabs[index].collection
        this.tabActive = index
        if (!this.isFiltered) { this.fetchItems(false) }
        this.$emit('change', index)
      }
    },
    eventName () {
      switch (this.collectionName) {
        case 'articles_national': return 'article_national_list_view'
        case 'articles_world': return 'article_world_list_view'
        default: return 'article_jabar_list_view'
      }
    },
    showCount () {
      return this.query.search.length !== 0 &&
        !this.isProvinceLoading &&
        !this.isNationalLoading &&
        !this.isWorldLoading &&
        this.isFiltered
    },
    listDisplay () {
      switch (this.tabActive) {
        case 1:
          return this.articles_national
        case 2:
          return this.articles_world
        default:
          return this.articles
      }
    },
    showLoadMore () {
      return this.query.search.length === 0 &&
        !this.isLoading &&
        this.listDisplay.length !== 0
    },
    loading () {
      return this.isLoading ||
        this.isProvinceLoading ||
        this.isNationalLoading ||
        this.isWorldLoading
    }
  },
  watch: {
    query: {
      immediate: true,
      deep: true,
      handler (val) {
        this.fetchItems(false)
      }
    }
  },
  methods: {
    onSearchStringChanged (str) {
      this.query.search = str
      this.fetchItems(false)
    },
    onLoadMore () {
      this.fetchItems(true)
    },
    setItems () {
      switch (this.tabActive) {
        case 1:
          this.items = [...this.articles_national]
          break
        case 2:
          this.items = [...this.articles_world]
          break
        default:
          this.items = [...this.articles]
      }
    },
    async fetchItems (append = true) {
      this.isLoading = true
      if (!append) {
        this.items = []
      }
      if (!this.collectionName) {
        this.items = []
      }
      if (this.query.search.length) {
        // executed when search input is filled
        this.lastDocumentSnapshot = null
        this.$store.dispatch('news/setIsFiltered', true)

        // search on national tab
        this.isNationalLoading = true
        const nationalRawData = await this.$store.dispatch('news/getArticleNationals', {
          perPage: 500
        })
        const nationalFiltered = this.arrayFilter(nationalRawData)
        this.$store.dispatch('news/setArticleNationals', nationalFiltered)
          .finally(() => {
            this.isNationalLoading = false
          })
        this.tabs[1].count = this.articles_national.length

        // search on world tab
        this.isWorldLoading = true
        const worldRawData = await this.$store.dispatch('news/getArticleWorlds', {
          perPage: 500
        })
        const worldFiltered = this.arrayFilter(worldRawData)
        this.$store.dispatch('news/setArticleWorlds', worldFiltered)
          .finally(() => {
            this.isWorldLoading = false
          })
        this.tabs[2].count = this.articles_world.length

        // search on province tab
        this.isProvinceLoading = true
        const provinceRawData = await this.$store.dispatch('news/getItems', {
          perPage: 500
        })
        const provinceFiltered = this.arrayFilter(provinceRawData)
        this.$store.dispatch('news/setArticles', provinceFiltered)
          .finally(() => {
            this.isProvinceLoading = false
          })
        this.tabs[0].count = this.articles.length

        return
      } else if (!append && this.lastDocumentSnapshot) {
        // executed when search is back to null value, after list being searched
        // set list item in all tabs to default (12 cards per tab)
        this.lastDocumentSnapshot = null
        this.$store.dispatch('news/setIsFiltered', false)
        this.$store.dispatch('news/getArticleNationals', { perPage: 12 })
        this.$store.dispatch('news/getArticleWorlds', { perPage: 12 })
        this.$store.dispatch('news/getItems', { perPage: 12 })
        this.isLoading = false
        return
      }
      this.$store.dispatch('news/setIsFiltered', false)
      let querySnapshot = db
        .collection(this.collectionName)
        .orderBy('published_at', 'desc')
        .limit(this.query.perPage)
      if (this.lastDocumentSnapshot) {
        querySnapshot = querySnapshot.startAfter(this.lastDocumentSnapshot)
      }
      return querySnapshot
        .get()
        .then((snapshot) => {
          const docs = []
          if (!snapshot.empty) {
            this.lastDocumentSnapshot = snapshot.docs[snapshot.docs.length - 1]
            snapshot.docs.forEach((doc) => {
              const data = doc.data()
              docs.push({
                ...data,
                id: doc.id,
                thumbnail: data.image,
                date: data.published_at.toDate(),
                source: data.news_channel,
                url: slugifyArticleRoute(doc.id, data.title)
              })
            })
          }
          return docs
        }).then((docs) => {
          this.setItems()
          if (append) {
            this.items = this.items ? [...this.items, ...docs] : [...docs]
          } else {
            this.items = docs
          }

          // store items on global variable based on current tab
          switch (this.tabActive) {
            case 1:
              this.$store.dispatch('news/setArticleNationals', this.items)
              break
            case 2:
              this.$store.dispatch('news/setArticleWorlds', this.items)
              break
            default:
              this.$store.dispatch('news/setArticles', this.items)
          }

          if (!docs.length) {
            this.hasReachedEnd = true
          }
          this.isLoading = false
        }).catch((e) => {
          return null
        }).finally(() => {
          if ((process.client || process.browser) && this.eventName) {
            analytics.logEvent(this.eventName)
          }
        })
    },
    arrayFilter (array) {
      array = array.filter((data) => {
        return [data.title, data.content].some((str) => {
          return `${str}`.toLowerCase().includes(this.query.search.toLowerCase())
        })
      })
      this.isLoading = false
      return array
    }
  }
}
</script>
