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
        <template v-for="(group, i) in groups">
          <ContactCardGroupLabel
            :key="`name:${group.name}`"
            :label="group.name"
          />
          <ContactCardGroupDetails
            :key="`contacts:${i}`"
          >
            <ContactCardChip
              v-for="(contact, j) in group.contacts"
              :key="j"
              :icon="contact.icon"
              :label="contact.label"
              :href="contact.href"
            />
          </ContactCardGroupDetails>
        </template>
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * @typedef  {Object}   ContactGroup
 * @property {string}   name      - group name
 * @property {Object[]} contacts  - Array of ContactCardChip's props
 * @see './ContactCardChip.vue'
 * @example
 * ```
 * const socmed = {
 *  name: 'Social Media',
 *  contacts: [
 *    { icon: 'web', label: '@john.doe', href: 'https://instagram.com/johndoe' },
 *    { icon: 'phone', label: '911', href: 'tel://911' },
 *  ]
 * }
 * ```
 */

export default {
  components: {
    ContactCardGroupLabel: () => import('./ContactCardGroupLabel'),
    ContactCardGroupDetails: () => import('./ContactCardGroupDetails'),
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
     * @type {ContactGroup[]}
     */
    groups: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-card {
  line-height: 1.618;

  @apply overflow-hidden
  block p-6
  rounded-lg
  bg-gray-100
  text-base text-gray-600;

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
    grid-template-columns: auto minmax(0, 1fr);
    @apply overflow-hidden
    grid gap-4
    mt-6;
  }
}
</style>
