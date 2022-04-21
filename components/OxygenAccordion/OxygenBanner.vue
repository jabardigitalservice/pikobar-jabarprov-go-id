<template>
  <div class="oxygen-banner sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px">
    <div class="oxygen-banner-body space-x-3 hover:border-gray-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
      <div class="flex-shrink-3">
        <img
          src="~/assets/icons/tube.svg"
          width="64"
          height="64"
          alt="tube oxygen"
        >
      </div>
      <div>
        <div class="text-green-500 text-4xl">
          {{ totalItem }}
        </div>
        <div class="mt-2 text-base text-black-500">
          Jumlah total agen oksigen di Jawa Barat
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalItem: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
.oxygen-banner {
  @apply rounded-lg bg-gray-200 overflow-hidden shadow border border-gray-300 mb-6;

  .oxygen-banner-body {
    @apply relative rounded-lg bg-white px-6 py-5 shadow-sm flex items-center;
  }
}
</style>
