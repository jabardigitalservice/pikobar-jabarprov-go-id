<template>
  <div class="contact-card">
    <p class="contact-card__title">
      <slot name="title">
        {{ title }}
      </slot>
    </p>
    <p class="contact-card__body">
      <slot name="body">
        {{ body }}
      </slot>
    </p>
    <div class="contact-card__grid">
      <slot>
        <ContactCardChip
          v-for="(contact, i) in contacts"
          :key="i"
          :icon="contact.icon"
          :label="contact.label"
          :href="contact.href"
        />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ContactCardChip: () => import('./ContactCardChip')
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    /**
     * Array of ContactCardChip's props
     * @type {ContactCardChip[]}
     */
    contacts: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-card {
  line-height: 1.618;
  font-size: 16px;

  @apply overflow-hidden
  block p-6
  rounded-lg
  bg-gray-100
  text-gray-600;

  &__title {
    @apply block
    m-0 mb-2 p-0
    font-bold
    text-gray-900;
  }

  &__body {
    @apply block
    mx-0 mt-2 mb-6 p-0
    font-normal;
  }

  &__grid {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
  }

  @screen lg {
    &__title {
      font-size: 21px;
    }
  }
}
</style>
