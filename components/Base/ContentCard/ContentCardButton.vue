<template>
  <BaseButton
    tag="a"
    :label="prompt"
    :href="backLink"
    :outlined="buttonType === 'outline'"
    @click.prevent="onClick"
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
  },
  methods: {
    /**
     * NOTES:
     * this function should've provided most common cases of link handling.
     * might be wise to refactor this function onto "~/lib".
     */
    onClick () {
      const { backLink } = this
      if (typeof backLink !== 'string' || !backLink.length) {
        return
      }
      // for external link.
      // will always open in new tab with WindowFeatures "noopener, noreferrer"
      if (backLink.startsWith('http')) {
        return window.open(backLink, '_blank', 'noreferrer,noopener')
      }

      // for internal link
      if (backLink.startsWith('/')) {
        return this.$router.push(backLink)
      }

      // for anchor within page
      if (backLink.startsWith('#')) {
        // NOTES:
        // this won't work if there exists a sticky element outside of appbar
        const appbar = document.querySelector('header.appbar')
        const target = document.querySelector(this.backLink)
        if (!appbar || !target) {
          return
        }
        const { height: appbarHeight } = appbar.getBoundingClientRect()
        const { top: targetTop } = target.getBoundingClientRect()

        // subtracted by appbarHeight due to appbar's sticky position
        const position = targetTop - appbarHeight + window.scrollY
        return window.scrollTo({
          behavior: 'smooth',
          top: position
        })
      }
    }
  }
}
</script>
