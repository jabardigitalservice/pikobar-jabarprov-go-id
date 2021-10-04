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
          <ListNews
            :items="items"
            :loading="isLoadingMore"
            :has-reached-end="hasReachedEnd"
            :on-load-more="onLoadMore"
          />
        </div>
      </template>
    </TabLayout>
  </Section>
</template>

<script>
import { db, analytics } from '~/lib/firebase'
import { slugifyArticleRoute } from '~/lib/slugify'
import { Section } from '~/components/Base/Section'
import ListNews from '~/components/NewsPage/ListNews'
import { TabLayout } from '~/components/Base/TabLayout'

export default {
  name: 'NewsTabPage',
  components: {
    TabLayout,
    StringSearchQuery: () => import('~/components/StringSearchQuery'),
    ListNews,
    Section
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
      isLoadingMore: false,
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
      this.isLoadingMore = true
      this.fetchItems(true)
        .then(() => {
          this.isLoadingMore = false
        })
    },
    fetchItems (append = true) {
      if (!append) {
        this.items = []
      }
      if (!this.collectionName) {
        this.items = []
      }
      let querySnapshot
      if (this.query.search.length) {
        const search = this.query.search.toLowerCase()
        querySnapshot = db
          .collection(this.collectionName)
          .orderBy('title')
          .startAt(search).endAt(search + '\uF8FF')
          .limit(this.query.perPage)
      } else {
        querySnapshot = db
          .collection(this.collectionName)
          .orderBy('published_at', 'desc')
          .limit(this.query.perPage)
      }
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
        }).catch((e) => {
          return null
        }).finally(() => {
          if ((process.client || process.browser) && this.eventName) {
            analytics.logEvent(this.eventName)
          }
        })
    }
  }
}
</script>
