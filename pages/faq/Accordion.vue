<template>
  <div class="">
    <div class="tab__header">
      <a href="#" class="tab__link p-4 block bg-gray-100 no-underline rounded border flex justify-between" @click.prevent="active = !active">
        <strong>{{ title }}</strong>
        <span>
          <svg
            class="rotate-0 h-6 w-6 transform"
            :class="{ '-rotate-180': !(active), 'rotate-0': active }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </a>
    </div>
    <div v-show="active" class="tab__content border">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: undefined
  },
  data () {
    return {
      active: false
    }
  }
}
</script>
