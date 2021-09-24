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
        <div class="relative text-gray-600 border rounded-md">
          <span class="absolute left-0 top-0 mt-3 ml-4">
            <svg
              id="Capa_1"
              class="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style="enable-background:new 0 0 56.966 56.966;"
              xml:space="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </span>
          <input type="search" name="serch" placeholder="Search" class="w-11/12 bg-white ml-4 h-10 px-5 pr-10 rounded-full text-base focus:outline-none">
          <button
            type="button"
            class="absolute right-0 top-0 mb-1 justify-around mb-1 md:mr-1 px-6 py-2 text-white rounded-md bg-brand-green hover:bg-brand-green-lighter"
          >
            Cari
          </button>
        </div>
      </div>
      <div>
        <div class="lg:grid lg:grid-cols-4 lg:gap-8">
          <div class="rounded border">
            <CardSide
              :data="data"
            />
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
              <ExpandableContent
                v-for="(faq, index) in items"
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
    CardSide: () => import('./CardSide'),
    ExpandableContent,
    ContentLoader
  },
  data () {
    return {
      data: [],
      filteredItems: null,
      searchString: ''
    }
  },
  computed: {
    ...mapState('faqs', {
      items: state => state.items,
      categories: state => state.categories
    })
  },
  async mounted () {
    if (process.browser) {
      analytics.logEvent('faqs_view')
    }
    await Promise.all([this.getItems(), this.getItemsCategories()])
    await this.filtered()
  },
  methods: {
    ...mapActions('faqs', {
      getItems: 'getItems',
      getItemsCategories: 'getItemsCategories'
    }),
    filtered () {
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
    }
  }
}
</script>
