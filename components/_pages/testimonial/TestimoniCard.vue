<template>
  <div class="action-card">
    <div class="flex items-start py-3">
      <div class="flex-shrink-0 inline-flex rounded-full border-2 border-white">
        <img
          class="h-10 w-10 rounded-full"
          :src="image"
        >
      </div>
      <div class="ml-2">
        <div class="text-base font-semibold text-black">
          {{ name }}
        </div>
        <div class="text-xs font-thin text-gray-600">
          {{ address }}
        </div>
      </div>
    </div>
    <div class="flex justify-end py-3">
      <svg class="h-6 w-6 opacity-25 grey transform translate-y-2 -rotate-180" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
      </svg>
    </div>
    <div class="action-card__content">
      <p class="text-gray-800 mt-4 mb-4">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.action-card {
  @apply p-4
  rounded-md
  grid grid-cols-2
  border border-solid border-gray-300
  bg-white;

  &__content {
    @apply flex flex-col
    gap-6
    justify-between
    items-start
    col-span-6;

    @screen lg {
      @apply col-span-4;
    }
  }

}
</style>
