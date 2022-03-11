<template>
  <div class="flex flex-col">
    <label :for="name">
      <span class="input-label md:text-base">{{ label }}</span>
    </label>
    <div
      v-for="option in options"
      :key="option.id"
      class="flex flex-row"
    >
      <input
        :value="option.id"
        :name="name"
        class="form-radio"
        type="radio"
        :checked="option.id.toString() === value"
        @input="$emit('input', $event.target.value)"
        @change="$emit('input', $event.target.value)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
      >
      <span class="ml-2">{{ option.name }}</span>
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
    value: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    note: {
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

<style scoped>
.input-label {
  @apply font-bold text-gray-700 leading-loose
  text-sm;
}
</style>
