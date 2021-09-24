<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <ContentCard
      v-for="(content, index) in contents"
      :key="content.id"
      v-bind="content"
      :class="{
        'pt-10 md:pt-40': index > 0
      }"
    >
      <template #body>
        <div
          class="text-gray-600"
          v-html="content.html"
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
      const items = this.$store.state.vaksin.items ?? []
      return items.map(this.mapContent)
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
    mapContent (item, index) {
      const { title, body, image, footer } = item
      const content = {
        title,
        html: body,
        image,
        imagePosition: (index + 1) % 2 ? 'left' : 'right'
      }

      if (footer?.type === 'text') {
        Object.assign(content, {
          // double row-breaks are used due to footer slot is
          // not currently supported
          html: `
            ${content.html}
            <br><br>
            ${footer.value}
          `
        })
      } else if (footer?.type === 'button') {
        Object.assign(content, {
          prompt: footer.value,
          buttonType: 'outline',
          backLink: footer.url
        })
      }
      return content
    }
  }
}
</script>
