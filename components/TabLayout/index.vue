<template>
  <div class="tab-container">
    <ul
      class="overflow-x-auto md:overflow-x-hidden flex flex-row flex-no-wrap items-stretch border-b-2 border-solid border-gray-300"
    >
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[
          'relative px-4 py-4 sm:px-6 whitespace-no-wrap select-none',
          tab.id === mActiveTabId && 'border-b-4 border-solid border-brand-green',
          !fixed && 'hover:bg-gray-200 cursor-pointer'
        ]"
        @click="onClickTab(tab.id)"
      >
        <a :class="['text-lg', tab.id === mActiveTabId && 'font-bold text-brand-green']">
          {{ tab.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    activeTabId: {
      type: String,
      default: null
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mActiveTabId: null
    }
  },
  watch: {
    activeTabId: {
      immediate: true,
      handler (v) {
        this.mActiveTabId = this.activeTabId
      }
    }
  },
  methods: {
    onClickTab (newTabId) {
      if (!this.fixed) {
        this.mActiveTabId = newTabId
        this.$emit('change', newTabId)
      }
    }
  }
}
</script>

<style>

</style>
