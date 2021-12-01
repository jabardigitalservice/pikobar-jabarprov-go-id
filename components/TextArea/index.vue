<template>
  <div class="text-area">
    <label :for="name">
      <span class="text-area__label md:text-base">{{ label }}</span>
      <i v-if="required" class="text-sm md:text-base">(wajib diisi)</i>
    </label>
    <textarea
      :name="name"
      :value="value"
      :placeholder="placeholder"
      class="text-area__field"
      cols="30"
      rows="5"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.text-area {
  @apply flex flex-col;

  &__label {
    @apply font-bold text-gray-700 leading-loose
    text-sm;
  }

  &__field {
    @apply border-gray-200 p-4
    border-2 border-solid rounded-md
  }
}
</style>
