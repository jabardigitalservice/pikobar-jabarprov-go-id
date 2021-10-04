<template>
  <div>
    <Section class="bg-white pb-24">
      <div class="space-y-3 pt-2 lg:pt-8">
        <h3 class="text-3xl text-gray-900 font-bold">
          Frequently Asked Questions
        </h3>
        <p class="text-gray-500">
          Pertanyaan yang sering ditanyakan terkait Covid-19 dan lainnya.
        </p>
      </div>
      <div class="py-10">
        <StringSearchQuery
          :value="query.search"
          @search="onSearchStringChanged"
        />
      </div>
      <div>
        <div class="lg:grid lg:grid-cols-4 lg:gap-8">
          <div>
            <div class="rounded border">
              <CategoryTabFAQ
                :data="data"
                :selected="query.category"
                :tab-selected.sync="query.category"
                :is-disable="isDisableSelected"
                :disable.sync="isDisableSelected"
              />
            </div>
          </div>
          <div class="mt-12 lg:mt-0 lg:col-span-3">
            <div v-show="!items">
              <div
                v-for="i in 6"
                :key="i"
                class="mb-4 rounded-lg p-4 bg-white"
              >
                <ContentLoader
                  :width="320"
                  :height="16"
                  :speed="3"
                  primary-color="#eee"
                  secondary-color="#fafafa"
                >
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    rx="4"
                    ry="4"
                  />
                </ContentLoader>
              </div>
            </div>
            <div class="space-y-4">
              <div v-if="!filteredItems.length" class="flex justify-center">
                <img src="~/static/img/icon-empty-state.svg" alt="img-faq-empty">
              </div>
              <ExpandableContent
                v-for="(faq, index) in filteredItems"
                :key="index"
                :header-size="'md'"
                :icon-color="'gray'"
              >
                <template #title>
                  {{ faq.title }}
                </template>
                <p
                  v-html="faq.content"
                />
              </ExpandableContent>
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import { analytics } from '~/lib/firebase'
import Section from '~/components/Base/Section'
import ExpandableContent from '~/components/_pages/index/IsolasiMandiri/ExpandableContent'

export default {
  components: {
    Section,
    CategoryTabFAQ: () => import('~/components/FAQ/CategoryTabFaq'),
    StringSearchQuery: () => import('~/components/StringSearchQuery'),
    ExpandableContent,
    ContentLoader
  },
  data () {
    return {
      data: [],
      filteredItems: [],
      isDisableSelected: false,
      query: {
        category: undefined,
        search: ''
      }
    }
  },
  computed: {
    ...mapState('faqs', {
      items: state => state.items,
      categories: state => state.categories
    })
  },
  watch: {
    items: {
      immediate: true,
      deep: true,
      handler (arr) {
        this.onSearchFAQ(this.query)
      }
    },
    query: {
      immediate: true,
      deep: true,
      handler (val) {
        this.isDisableSelected = false
        if (val.search.length) {
          this.query.category = undefined
          this.isDisableSelected = true
        }
        this.onSearchFAQ(val)
      }
    }
  },
  mounted () {
    if (process.browser) {
      analytics.logEvent('faqs_view')
    }
    Promise.all([
      this.getItems(),
      this.getItemsCategories().then(() => {
        this.filteringCategory()
      })
    ])
  },
  methods: {
    ...mapActions('faqs', {
      getItems: 'getItems',
      getItemsCategories: 'getItemsCategories'
    }),
    onSearchStringChanged (str) {
      this.query.search = str
    },
    filteringCategory () {
      const filteredCategory = []
      if (this.categories) {
        this.categories.map((x) => {
          if (!filteredCategory.includes(x.category)) { filteredCategory.push(x.category) }
        })
        filteredCategory.map((data) => {
          const list = this.categories.filter((item, index) => {
            if (item.category === data) {
              return data
            }
          })

          this.data.push({
            category: data,
            list
          })
        })
      }
    },
    onSearchFAQ (query) {
      if (!this.items || !this.items.length) {
        this.filteredItems = []
        return
      }

      this.filteredItems = this.items.filter((faq) => {
        if (query?.category) {
          return [faq.category_id].some((str) => {
            return `${str}`.includes(query.category)
          })
        }

        if (!query.search) {
          this.query.category = undefined
          return true
        }

        return [faq.title, faq.content].some((str) => {
          return `${str}`.toLowerCase().includes(query.search.toLowerCase())
        })
      })
    }
  }
}
</script>
