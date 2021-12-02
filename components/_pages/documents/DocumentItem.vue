<template>
  <div class="document" @click="onClick">
    <img
      width="40px"
      height="40px"
      src="~/assets/icons/pdf.svg"
    >
    <div class="document__content">
      <span class="document__content__date">
        {{ formatDateDayIndonesia(doc.published_at) }}
      </span>
      <strong>
        {{ doc.title }}
      </strong>
    </div>
  </div>
</template>

<script>
import { formatDateDayIndonesia } from '~/lib/date'
export default {
  props: {
    doc: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    formatDateDayIndonesia,
    onClick () {
      this.$router.push({
        path: this.doc.route
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.document {
  @apply border border-solid rounded-lg
  flex flex-col p-4 gap-3 cursor-pointer;

  border-color: #E0E0E0;

  @screen sm {
    @apply flex-row gap-4;
  }

  &__content {
    @apply flex flex-col text-sm gap-2;

    &__date {
      color: #424242;
    }
  }
}
</style>
