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
        :value="query.search"
        @search="onSearchStringChanged"
      />
    </div>
    <TabLayout v-model="tabLayoutModel" :tabs="tabs">
      <template #content.news>
        <div class="mt-10">
          <ListArticles
            :items="items"
            :loading="isLoading"
            :is-search="isSearch"
            :has-reached-end="hasReachedEnd"
            :on-load-more="onLoadMore"
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
      isSearch: false,
      hasReachedEnd: false,
      lastDocumentSnapshot: null,
      section: {
        recentNews: {
          loading: true,
          title: 'Berita Terkini',
          subtitle: null
        }
      }
    }
  },
  computed: {
    ...mapState('news', {
      articles: state => state.items,
      articles_national: state => state.item_articles_national,
      articles_world: state => state.item_articles_world
    }),
    tabLayoutModel: {
      get () {
        return 0
      },
      set (index) {
        this.query.search = ''
        this.collectionName = this.tabs[index].collection
        this.fetchItems(false)
        this.$emit('change', index)
      }
    },
    eventName () {
      switch (this.collectionName) {
        case 'articles_national': return 'article_national_list_view'
        case 'articles_world': return 'article_world_list_view'
        default: return 'article_jabar_list_view'
      }
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
    fetchItems (append = true) {
      this.isLoading = true
      if (!append) {
        this.items = []
      }
      if (!this.collectionName) {
        this.items = []
      }
      if (this.query.search.length) {
        this.isSearch = true
        this.lastDocumentSnapshot = null
        switch (this.collectionName) {
          case 'articles_national':
            this.$store.dispatch('news/getArticleNationals', {
              perPage: 500
            })
            this.items = this.arrayFilter(this.articles_national)
            return this.items
          case 'articles_world':
            this.$store.dispatch('news/getArticleWorlds', {
              perPage: 500
            })
            this.items = this.arrayFilter(this.articles_world)
            return this.items
          default:
            this.$store.dispatch('news/getItems', {
              perPage: 500
            })
            this.items = this.arrayFilter(this.articles)
            return this.items
        }
      }
      this.isSearch = false
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
          if (append) {
            this.items = this.items ? [...this.items, ...docs] : [...docs]
          } else {
            this.items = docs
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
