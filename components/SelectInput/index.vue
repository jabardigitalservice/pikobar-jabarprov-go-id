<template>
  <div>
    <label :for="name">
      <span class="select-input__label md:text-base">{{ label }}</span>
      <i v-if="required" class="text-sm md:text-base">(wajib diisi)</i>
    </label>
    <div class="select-input">
      <select
        v-bind="$attrs"
        :name="name"
        :value="value"
        class="select-input__field placeholder-gray-600 focus:shadow-outline"
        :disabled="options.length === 0"
        @input="$emit('input', $event.target.value)"
        @change="$emit('input', $event.target.value)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
      >
        <option
          v-for="option in options"
          :key="option.name"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
      <div class="select-input__icon">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  $_veeValidate: {
    value () {
      return this.value
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.select-input {
  @apply relative inline-block w-full text-gray-700;

  &__label {
    @apply font-bold text-gray-700 leading-loose
    text-sm;
  }

  &__field {
    @apply w-full h-10 pl-3 pr-6 text-base
    border rounded-lg appearance-none;
  }

  &__icon {
    @apply absolute inset-y-0 right-0
    flex items-center px-2
    pointer-events-none
  }
}
</style>
