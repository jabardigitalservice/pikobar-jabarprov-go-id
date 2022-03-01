<template>
  <div class="flex flex-col">
    <label :for="name">
      <span class="input-label md:text-base">{{ label }}</span>
      <em v-show="model === 'landmark'" class="text-sm md:text-base">(Blok/Unit/Patokan)</em>
      <em v-if="required" class="text-sm md:text-base">(wajib diisi)</em>
      <em v-else class="text-sm md:text-base">(optional)</em>
    </label>
    <input
      :value="value"
      :name="name"
      class="input-text"
      :placeholder="placeholder"
      :type="type"
      :accept="accept"
      :max="date(new Date(),'yyyy-MM-dd')"
      @input="$emit('input', $event.target.value)"
      @change="onChange(name, $event.target.value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    >
  </div>
</template>

<script>
import { format } from 'date-fns'
import { extend } from 'vee-validate'
import { checkNikAvailability } from '~/api/isoman'

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
    model: {
      type: String,
      default: null
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
    },
    requestType: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      date: format
    }
  },
  methods: {
    onChange (name) {
      if (name === 'NIK') {
        extend('nikAvailability', {
          validate: async () => {
            try {
              await checkNikAvailability({
                nik: this.value,
                request_type: this.requestType
              })
              return true
            } catch (e) {
              return false
            }
          },
          message: 'NIK belum dapat digunakan karena belum memenuhi syarat untuk mengajukan permohonan'
        })
      } else {
        return true
      }
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
