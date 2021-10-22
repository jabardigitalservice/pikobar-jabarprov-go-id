<template>
  <client-only>
    <component :is="paginationComponent" class="app_pagination" v-bind="$attrs" v-on="$listeners" />
  </client-only>
</template>

<script>
export default {
  data () {
    return {
      paginationComponent: () => {
        if (process.client) {
          return import('vuejs-paginate')
        }
        return null
      }
    }
  }
}
</script>

<style lang="scss">
.app_pagination {
  @apply flex flex-row flex-no-wrap items-stretch;

  li {
    @apply inline-flex items-stretch border border-solid border-gray-500;

    > a {
      @apply w-full h-full px-4 py-2;
    }
  }

  li:first-child {
    @apply border-r-0 rounded-tl rounded-bl;
  }

  li:last-child {
    @apply border-l-0 rounded-tr rounded-br;
  }

  li.disabled {
    @apply bg-gray-300;
  }

  li.active {
    @apply bg-brand-blue text-white;
  }

  li.disabled > * {
    @apply cursor-not-allowed;
    &:focus,
    &:active {
      outline: none;
    }
  }
}
</style>
