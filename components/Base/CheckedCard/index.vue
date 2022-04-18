<template>
  <div class="base rounded-lg bg-gray-100 p-4">
    <div class="font-semibold">
      <span v-show="icons" class="base__icon">
        <img
          :src="image"
          width="12px"
          alt="content-check-src"
        >
      </span>
      <span class="base__label">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icons: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    image () {
      return this.icons
        ? require(`~/assets/icons/${this.icons}`)
        : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.base {
  font-family: 'Lato', sans-serif;

  &__label {
    color: inherit;
    line-height: 20px;

    @apply flex-none text-sm;
  }

  &__icon {
    line-height: 0;
    @apply flex-none
    inline-flex flex-row flex-no-wrap
    justify-center items-center;
  }
}
</style>
