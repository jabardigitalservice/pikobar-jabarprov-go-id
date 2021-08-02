<template>
  <div class="mb-8 pl-5 relative">
    <div class="absolute top-0 bottom-0 left-0 w-1 bg-orange-300" />
    <h5 class="inline-block text-lg font-bold leading-loose">
      {{ oxygen_center_name }}
    </h5>
    <p class="opacity-75">
      {{ address }}
    </p>
    <p class="text-sm">
      <template v-if="phones && phones.length">
        <a
          v-for="(num, j) in phones"
          :key="j"
          class="inline-block px-4 py-1 bg-blue-100 rounded mt-2 mr-2 text-gray-800 hover:opacity-50"
          :href="`tel:${num}`"
          target="_blank"
          :title="`Telpon ${num}`"
        >
          <i class="fas fa-phone fa-sm mr-1" />
          <span>
            {{ num }}
          </span>
        </a>
      </template>
      <a
        v-if="item_type"
        class="inline-block px-4 py-1 bg-green-100 rounded mt-2 mr-2 text-gray-800 hover:opacity-50"
        :title="`Buka Laman ${item_type}`"
      >
        <i class="fas fa-globe-asia fa-sm mr-1" />
        <span>
          {{ item_type }}
        </span>
      </a>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    oxygen_center_name: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    phones: {
      type: Array,
      default: () => []
    },
    // eslint-disable-next-line vue/prop-name-casing
    item_type: {
      type: String,
      default: ''
    }
  }
}
</script>
