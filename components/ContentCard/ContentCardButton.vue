<template>
  <BaseButton
    tag="a"
    target="_blank"
    :label="prompt"
    :href="backLink"
    :outlined="buttonType === 'outline'"
  >
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 ml-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </template>
  </BaseButton>
</template>

<script>
import BaseButton from '~/components/Base/Button'
export default {
  components: {
    BaseButton
  },
  inheritAttrs: false,
  props: {
    prompt: {
      type: String,
      default: ''
    },
    backLink: {
      type: String,
      default: '#'
    },
    buttonType: {
      type: String,
      default: ''
    }
  }
}
</script>
