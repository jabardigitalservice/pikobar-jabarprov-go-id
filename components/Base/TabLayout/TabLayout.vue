<template>
  <div class="tablayout">
    <div
      ref="itemTrack"
      class="tablayout__item-track"
    >
      <TabItem
        v-for="(tab, i) in tabs"
        ref="tabItems"
        :key="i"
        :active="i === mValue"
        v-bind="tab"
        :show-count="showCount"
        @click="onClickTabItem(tab, i)"
      />
    </div>
    <i
      class="tablayout__active-marker"
      :style="activeMarkerStyles"
    />
    <div class="tablayout__content-wrapper">
      <TabContentItem
        v-for="(tab, i) in tabs"
        :key="i"
        :class="{
          'tablayout__content-item': true,
          'tablayout__content-item--visible': i === mValue
        }"
      >
        <template>
          <slot
            :name="`content.${tab.name}`"
            v-bind="{ name: tab.name, index: i, tab }"
          />
        </template>
      </TabContentItem>
    </div>
  </div>
</template>

<script>
import TabItem from './TabItem'
import TabContentItem from './TabContentItem'

export default {
  components: {
    TabItem,
    TabContentItem
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    /**
     * Active tab index
     */
    value: {
      type: Number,
      default: 0
    },
    /**
     * Array of TabItem's props
     * @See './TabItem.vue'
     */
    tabs: {
      type: Array,
      default: () => []
    },
    showCount: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mValue: 0,
      activeMarkerWidth: 0,
      activeMarkerPosition: 0
    }
  },
  computed: {
    activeMarkerStyles () {
      const styles = {
        width: `${this.activeMarkerWidth}px`,
        transform: `translateX(${this.activeMarkerPosition}px)`
      }
      return styles
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        this.mValue = typeof v === 'number'
          ? v
          : 0
      }
    }
  },
  async mounted () {
    await this.$nextTick()
    this.syncActiveMarker()
    window.addEventListener('resize', this.handleViewportResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleViewportResize)
  },
  methods: {
    onClickTabItem (tab, tabIndex) {
      this.mValue = tabIndex
      this.$emit('change', tabIndex)
      this.$emit('click:tab', tab, tabIndex)
    },
    handleViewportResize () {
      this.updateActiveMarker(this.mValue)
    },
    syncActiveMarker () {
      this.$watch(
        function target () {
          return this.mValue
        },
        async function handler (v) {
          await this.$nextTick()
          this.updateActiveMarker(v)
        },
        { immediate: true }
      )
    },
    updateActiveMarker (tabIndex) {
      const track = this.$refs.itemTrack
      const tabEl = this.$refs.tabItems?.[tabIndex].$el

      const { x: trackX } = (track?.getBoundingClientRect() ?? {})
      const { width, x: tabX } = (tabEl?.getBoundingClientRect() ?? {})

      const canAssign = [
        trackX,
        width,
        tabX
      ].every(val => typeof val === 'number')

      if (canAssign) {
        this.activeMarkerWidth = width
        this.activeMarkerPosition = tabX - trackX
      } else {
        this.activeMarkerWidth = 0
        this.activeMarkerPosition = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tablayout {
  @apply relative;

  &__item-track {
    @apply flex flex-row flex-no-wrap
    justify-start items-stretch;
  }

  &__active-marker {
    height: 2px;
    transition: all 0.3s ease;
    transition-property: width, transform;
    @apply absolute inline-block w-0
    bg-green-700;
  }

  &__content-wrapper {
    @apply relative block;
  }

  &__content-item {
    visibility: hidden;
    @apply absolute inset-0
    pointer-events-none;

    &--visible {
      visibility: visible;
      @apply relative pointer-events-auto;
    }
  }
}
</style>
