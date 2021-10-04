<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <Section class="bg-white pb-16">
    <div class="py-10">
      <h2 class="font-bold text-3xl">
        Berita Terkini
      </h2>
      <h4 class="text-gray-500">
        Berita seputar Covid-19 mulai dari berita lokal hingga mancanegara.
      </h4>
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
import { db } from '~/lib/firebase'
import { Section } from '~/components/Base/Section'
import ListNews from '~/components/NewsPage/ListNews'
import { TabLayout } from '~/components/Base/TabLayout'

export default {
  name: 'NewsTabPage',
  components: {
    TabLayout,
    ListNews,
    Section
  },
  data () {
    return {
      tabs: Object.freeze([
        {
          name: 'news',
          query: 'jabar',
          label: 'Jabar'
        },
        {
          name: 'news',
          query: 'national',
          label: 'Nasional'
        },
        {
          name: 'news',
          query: 'world',
          label: 'Dunia'
        }
      ]),
      items: null,
      perPage: 4,
      collectionName: 'articles',
      isLoadingMore: false,
      hasReachedEnd: false,
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
        switch (this.tabs[index].query) {
          case 'national':
            this.collectionName = 'articles_national'
            break
          case 'world':
            this.collectionName = 'articles_world'
            break
          default:
            this.collectionName = 'articles'
            break
        }
        this.fetchItems(false)
        this.$emit('change', index)
      }
    },
    isLoading () {
      return !Array.isArray(this.news) || !this.news.length
    }
  },
  mounted () {
    this.fetchItems(false)
  },
  methods: {
    isTabActive (tab) {
      return this.currentTab && tab === this.currentTab
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
        this.items = null
      }
      if (!this.collectionName) {
        this.items = null
      }
      let querySnapshot = db
        .collection(this.collectionName)
        .orderBy('published_at', 'desc')
        .limit(this.perPage)
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
                url: data.route
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
            // analytics.logEvent(this.eventName)
          }
        })
    }
  }
}
</script>
