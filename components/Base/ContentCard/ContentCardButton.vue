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
        v-if="iconType === 'open-new-tab'"
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 20 20"
        height="20"
      >
        <path d="M15.3333 16.2222H4.66667C4.17778 16.2222 3.77778 15.8222 3.77778 15.3333V4.66667C3.77778 4.17778 4.17778 3.77778 4.66667 3.77778H9.11111C9.6 3.77778 10 3.37778 10 2.88889C10 2.4 9.6 2 9.11111 2H3.77778C3.30628 2 2.8541 2.1873 2.5207 2.5207C2.1873 2.8541 2 3.30628 2 3.77778V16.2222C2 17.2 2.8 18 3.77778 18H16.2222C17.2 18 18 17.2 18 16.2222V10.8889C18 10.4 17.6 10 17.1111 10C16.6222 10 16.2222 10.4 16.2222 10.8889V15.3333C16.2222 15.8222 15.8222 16.2222 15.3333 16.2222ZM11.7778 2.88889C11.7778 3.37778 12.1778 3.77778 12.6667 3.77778H14.9689L6.85333 11.8933C6.68713 12.0595 6.59376 12.285 6.59376 12.52C6.59376 12.755 6.68713 12.9805 6.85333 13.1467C7.01954 13.3129 7.24495 13.4062 7.48 13.4062C7.71505 13.4062 7.94046 13.3129 8.10667 13.1467L16.2222 5.03111V7.33333C16.2222 7.82222 16.6222 8.22222 17.1111 8.22222C17.6 8.22222 18 7.82222 18 7.33333V2.88889C18 2.4 17.6 2 17.1111 2H12.6667C12.1778 2 11.7778 2.4 11.7778 2.88889Z" fill="#069550" />
      </svg>
      <svg
        v-else-if="iconType === 'arrow-right'"
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
    },
    iconType: {
      type: String,
      default: 'arrow-right'
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
      if (backLink.startsWith('http') || backLink.startsWith('mailto')) {
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
