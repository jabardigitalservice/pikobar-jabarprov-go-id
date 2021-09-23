<template>
  <div class="card-category">
    <div
      v-for="(item, index) in data"
      :key="index"
    >
      <div class="card-category__title">
        {{ item.categori }}
      </div>
      <div
        v-for="(categori, indexCategori) in item.list"
        :key="indexCategori"
        class="card-category__item hover:bg-green-200"
        :class="{active:categori.id == selected}"
        @click="selected = categori.id"
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
        return []
      }
    }
  },
  data () {
    return {
      selected: undefined
    }
  }
}
</script>
<style lang="scss" scoped>
.card-category {
    &__title {
        @apply text-gray-500 flex items-center px-3 py-4 text-base font-medium;
    }
    &__item {
        @apply cursor-pointer flex items-center px-3 py-4 text-base font-medium;
    }

    .active {
        &,
        > * {
        @apply text-brand-green font-bold;
        }
    }
}
</style>
