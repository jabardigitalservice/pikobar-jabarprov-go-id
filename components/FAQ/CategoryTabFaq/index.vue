<template>
  <div class="card-category">
    <div
      v-for="(item, index) in data"
      :key="index"
    >
      <div class="card-category__title">
        {{ item.category }}
      </div>
      <div
        v-for="(categori, indexCategori) in item.list"
        :key="indexCategori"
        class="card-category__item"
        :class="{
          'disable': disableTab,
          active:categori.id == selectedTab
        }"
        @click="disableTab ? null:selectedTab = categori.id"
      >
        {{ categori.title }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default () {
        return null
      }
    },
    selected: {
      type: String,
      default: undefined
    },
    isDisable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectedTab: {
      get () {
        return this.selected
      },
      set (value) {
        this.$emit('update:tabSelected', value)
      }
    },
    disableTab: {
      get () {
        return this.isDisable
      },
      set (value) {
        this.$emit('update:disable', value)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.card-category {
    @apply relative;
    &__title {
        @apply text-gray-500 flex items-center px-3 py-4 text-base font-medium;
    }
    &__item {
        @apply cursor-pointer flex items-center px-3 py-4 text-base font-medium;
        &:hover {
          @apply bg-green-200;
        }
    }

    .active {
        &,
        > * {
          @apply bg-green-200 text-brand-green font-bold border-2 border-yellow-300;
        }
    }
    .disable {
      &,
      > * {
        @apply text-gray-500 pointer-events-none;
      }
    }
}
</style>
