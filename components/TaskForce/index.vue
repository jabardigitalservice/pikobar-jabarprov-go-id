<template>
  <div>
    <StringSearchQuery v-if="showSearchBar" :value="mSearchString" @search="onLocalSearchStringChanged" />
    <br>
    <table class="w-full">
      <thead class="hidden md:table-header-group">
        <tr class="bg-gray-300 flex flex-col flex-no wrap md:table-row text-left text-gray-600">
          <th class="hidden md:table-cell p-4 w-1/12 text-center">
            No.
          </th>
          <th class="p-4">
            Kota/Kab
          </th>
          <th class="whitespace-no-wrap p-4">
            WEBSITE
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isPending || !filteredTaskForces">
          <tr v-for="i in 4" :key="i">
            <td colspan="3" class="pt-4" style="border: none !important; background: none !important;">
              <ContentLoader :speed="3" :height="16">
                <rect width="100%" height="100%" rx="2" ry="2" />
              </ContentLoader>
            </td>
          </tr>
        </template>
        <template v-else-if="!filteredTaskForces.length">
          <tr>
            <td colspan="3" class="py-4">
              <div class="w-full p-4 rounded-lg bg-gray-200 text-center">
                Data Tidak Tersedia
              </div>
            </td>
          </tr>
        </template>
        <template v-else-if="filteredTaskForces && filteredTaskForces.length">
          <tr
            v-for="(item, index) in filteredTaskForces"
            :key="index"
            class="relative flex flex-col flex-no wrap md:table-row pl-5 md:pl-0 mb-8 md:mb-0"
          >
            <td class="hidden md:table-cell text-center">
              {{ index + 1 }}
            </td>
            <td class="title-cell text-lg font-bold md:font-normal md:text-base md:p-2 text-left">
              {{ item.name }}
            </td>
            <td :class="['text-left md:table-cell', item.website ? '' : 'hidden']">
              <h6 class="md:hidden leading-loose opacity-50">
                Website:
              </h6>
              <p v-if="item.website">
                <a
                  class="text-sm inline-block px-4 py-1 bg-green-100 rounded mr-4 mb-4 md:m-1 text-gray-800 hover:opacity-50"
                  target="_blank"
                  :href="item.website"
                >
                  {{ item.website }}
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
  name: 'TaskForce',
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
      filteredTaskForces: null
    }
  },
  computed: {
    taskForces () {
      return this.$store.state['task-forces'].items
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
    ...mapActions('task-forces', {
      getItems: 'getItems'
    }),
    onLocalSearchStringChanged (str) {
      this.$emit('update:searchString')
      this.mSearchString = str
      this.performFiltering(str)
    },
    performFiltering (str) {
      if (!this.taskForces) {
        this.filteredTaskForces = null
      }
      if (!str) {
        this.filteredTaskForces = this.taskForces.filter((_, index) => index < this.count)
      }
      if (str) {
        this.filteredTaskForces = this.taskForces.filter((taskForce) => {
          return taskForce.name.toLowerCase().includes(str.toLowerCase())
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
