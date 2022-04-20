<template>
  <div class="bg-gray-100 h-40 mb-8 pl-5 relative">
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
          class="inline-block px-4 py-1 bg-green-600 rounded-lg mt-2 mr-2 text-white hover:opacity-50"
          :href="`tel:${num}`"
          target="_blank"
          :title="`Telpon ${num}`"
        >
          <span>
            <img
              src="~/assets/icons/phone.svg"
              width="12"
              height="12"
              alt="phone"
              class="inline"
            >
            {{ num }}
          </span>
        </a>
      </template>
      <a
        v-if="item_type"
        class="inline-block px-4 py-1 bg-blue-600 rounded-lg mt-2 mr-2 text-white hover:opacity-50"
        :title="`Buka Laman ${item_type}`"
      >
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
