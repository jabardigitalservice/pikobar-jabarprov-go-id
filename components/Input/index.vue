<template>
  <div class="flex flex-col">
    <label :for="name">
      <span class="input-label md:text-base">{{ label }}</span>
      <i v-if="required" class="text-sm md:text-base">(wajib diisi)</i>
    </label>
    <input
      :value="value"
      :name="name"
      class="input-text"
      :placeholder="placeholder"
      :type="type"
      :accept="accept"
      @input="$emit('input', $event.target.value)"
      @change="$emit('input', $event.target.value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    >
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
    placeholder: {
      type: String,
      default: null
    },
    note: {
      type: String,
      default: null
    },
    accept: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style lang="scss" scoped>
.input-text {
  appearance: none;
  @apply w-full min-w-0 px-4 py-2 rounded
  border border-solid border-gray-300;
}
.input-label {
  @apply font-bold text-gray-700 leading-loose
  text-sm;
}
</style>
