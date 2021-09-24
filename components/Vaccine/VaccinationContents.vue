<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <ContentCard
      v-for="(content, index) in contents"
      :key="content.id"
      v-bind="getContentCardProps(content, index)"
      :class="{
        'pt-10 md:pt-40': index > 0
      }"
    >
      <template #body>
        <div
          class="text-gray-600"
          v-html="getContentHTML(content)"
        />
      </template>
    </ContentCard>
  </div>
</template>

<script>
import ContentCard from '~/components/Base/ContentCard'
export default {
  components: {
    ContentCard
  },
  computed: {
    contents () {
      return this.$store.state.vaksin.items ?? []
    },
    isLoading () {
      return !Array.isArray(this.contents) ||
        !this.contents.length
    }
  },
  mounted () {
    this.$store.dispatch('vaksin/getItems')
  },
  methods: {
    getContentCardProps (item, index) {
      const { title, image, footer } = item
      const content = {
        title,
        image,
        imagePosition: (index + 1) % 2 ? 'left' : 'right'
      }

      if (footer?.type === 'button') {
        Object.assign(content, {
          prompt: footer.value,
          buttonType: 'outline',
          backLink: footer.url
        })
      }
      return content
    },
    getContentHTML (item) {
      const { body, footer } = item

      let html = body
      if (footer?.type === 'text') {
        // double row-breaks are used due to footer slot is
        // not currently supported
        html = `
          ${body}
          <br><br>
          ${footer.value}
        `
      }
      return html
    }
  }
}
</script>
