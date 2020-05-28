<template>
  <div>
    <StringSearchQuery v-if="showSearchBar" :value="mSearchString" @search="onLocalSearchStringChanged" />
    <br>
    <table class="w-full">
      <thead class="hidden md:table-header-group">
        <tr class="bg-gray-300 flex flex-col flex-no wrap md:table-row text-left text-gray-600">
          <th class="hidden md:table-cell p-3 w-1/12 text-center">
            No
          </th>
          <th class="p-3">
            Kota/Kab
          </th>
          <th class="whitespace-no-wrap p-3">
            CALL CENTER
          </th>
          <th class="p-3">
            HOTLINE
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isPending || !filteredCallCenters">
          <tr v-for="i in 4" :key="i">
            <td colspan="4" class="pt-4" style="border: none !important; background: none !important;">
              <ContentLoader :speed="3" :height="16">
                <rect width="100%" height="100%" rx="2" ry="2" />
              </ContentLoader>
            </td>
          </tr>
        </template>
        <template v-else-if="!filteredCallCenters.length">
          <tr>
            <td colspan="4" class="py-4">
              <div class="w-full p-4 rounded-lg bg-gray-200 text-center">
                Data Tidak Tersedia
              </div>
            </td>
          </tr>
        </template>
        <template v-else-if="filteredCallCenters && filteredCallCenters.length">
          <tr
            v-for="(item, index) in filteredCallCenters"
            :key="index"
            class="relative flex flex-col flex-no wrap md:table-row pl-5 md:pl-0 mb-8 md:mb-0"
          >
            <td class="hidden md:table-cell text-center">
              {{ index + 1 }}
            </td>
            <td class="title-cell text-lg font-bold md:font-normal md:text-base md:p-2 text-left">
              {{ item.nama_kotkab }}
            </td>
            <td :class="['text-left md:table-cell', item.call_center && item.call_center.length ? '' : 'hidden']">
              <h6 class="md:hidden leading-loose opacity-50">
                Call Center:
              </h6>
              <p v-if="item.call_center && item.call_center.length">
                <a
                  v-for="(cc, cc_index) in item.call_center"
                  :key="cc_index"
                  class="text-sm inline-block px-4 py-1 bg-blue-100 rounded mr-4 mb-4 md:m-1 text-gray-800 hover:opacity-50"
                  :href="`tel:${cc}`"
                >
                  {{ cc }}
                </a>
              </p>
              <span v-else class="m-4">-</span>
            </td>
            <td :class="['text-left md:table-cell', item.hotline && item.hotline.length ? '' : 'hidden']">
              <h6 class="md:hidden leading-loose opacity-50">
                Hotline:
              </h6>
              <p v-if="item.hotline && item.hotline.length">
                <a
                  v-for="(h, h_index) in item.hotline"
                  :key="h_index"
                  class="text-sm inline-block px-4 py-1 bg-green-100 rounded mr-4 mb-4 md:m-1 text-gray-800 hover:opacity-50"
                  :href="`tel:${h}`"
                >
                  {{ h }}
                </a>
              </p>
              <span v-else class="m-4">-</span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapActions } from 'vuex'
export default {
  name: 'CallCenter',
  components: {
    StringSearchQuery: () => import('../StringSearchQuery'),
    ContentLoader
  },
  props: {
    searchString: {
      type: String,
      default: null
    },
    count: {
      type: Number,
      default: 9999
    },
    showSearchBar: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isPending: true,
      mSearchString: '',
      filteredCallCenters: null
    }
  },
  computed: {
    callCenters () {
      return this.$store.state['call-centers'].items
    }
  },
  mounted () {
    this.isPending = true
    this.getItems()
      .then(() => {
        this.$watch(
          'searchString',
          function handler (v) {
            this.mSearchString = v
            this.performFiltering(this.mSearchString)
          },
          { immediate: true }
        )
      })
      .finally(() => {
        this.isPending = false
      })
  },
  methods: {
    ...mapActions('call-centers', {
      getItems: 'getItems'
    }),
    onLocalSearchStringChanged (str) {
      this.$emit('update:searchString')
      this.mSearchString = str
      this.performFiltering(str)
    },
    performFiltering (str) {
      if (!this.callCenters) {
        this.filteredCallCenters = null
      }
      if (!str) {
        this.filteredCallCenters = this.callCenters.filter((_, index) => index < this.count)
      }
      if (str) {
        this.filteredCallCenters = this.callCenters.filter((cc) => {
          return cc.nama_kotkab.toLowerCase().includes(str.toLowerCase())
        }).filter((_, index) => index < this.count)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  td {
    vertical-align: middle;
  }
  td:not(:last-child) {
    border-bottom: 0;
  }

  tbody tr:nth-child(even) td {
    @screen md {
      @apply bg-gray-200;
    }
  }

  tbody tr td {
    @screen md {
      @apply border-t-2 border-solid border-gray-300;
    }
  }

  .title-cell::before {
    content: '';
    @apply absolute top-0 left-0 bottom-0 block w-1 bg-orange-300;
    @screen md {
      @apply hidden;
    }
  }
</style>
