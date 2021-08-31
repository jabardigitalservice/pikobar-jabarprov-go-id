<template>
  <div class="file-input">
    <label :for="name">
      <span class="file-input__label md:text-base">{{ label }}</span>
      <i v-if="required" class="text-sm md:text-base">(wajib diisi)</i>
    </label>
    <div class="file-input__container" @click="onChooseFile">
      <FontAwesomeIcon
        :icon="icons.faImage"
        class="file-input__icon"
      />
      <span v-if="!file" class="file-input__placeholder">Unggah gambar</span>
      <span v-else>
        {{ file.name }}
      </span>
      <span class="file-input__info">PNG, JPG, GIF up to 10MB</span>
    </div>
    <input
      ref="inputFile"
      v-show="false"
      :name="name"
      :placeholder="placeholder"
      type="file"
      :accept="accept"
      @input="$emit('input', $event.target.files[0])"
      @change="$emit('input', $event.target.files[0])"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    >
  </div>
</template>

<script>
import { faImage } from '@fortawesome/free-solid-svg-icons'
export default {
  $_veeValidate: {
    value () {
      return this.file
    }
  },
  model: {
    prop: 'file',
    event: 'input'
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
    file: {
      default: null
    }
  },
  data () {
    return {
      icons: {
        faImage
      }
    }
  },
  methods: {
    onChooseFile () {
      this.$refs.inputFile.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.file-input {
  @apply flex flex-col;

  &__label {
    @apply font-bold text-gray-700 leading-loose
    text-sm;
  }

  &__container {
    @apply flex flex-col items-center
    border-2 border-gray-400 border-dashed
    rounded-md p-20
  }

  &__icon {
    @apply text-gray-500 text-5xl
  }

  &__placeholder {
    @apply text-gray-600
  }

  &__info {
    @apply text-gray-500
  }
}
</style>
