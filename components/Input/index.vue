<template>
  <div v-if="type !== 'checkbox'" class="flex flex-col">
    <label :for="name">
      <span class="input-label md:text-base">{{ label }}</span>
      <span v-show="model === 'landmark'" class="text-sm md:text-base text-gray-500">(Blok/Unit/Patokan)</span>
      <span v-if="!required" class="text-sm md:text-base text-gray-500">(Optional)</span>
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
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    >
  </div>
  <div v-else>
    <div class="form-check">
      <input
        :id="model"
        class="input-check"
        type="checkbox"
        :value="value"
        :name="name"
        @input="$emit('input', $event.target.checked)"
        @change="$emit('change', $event.target.checked)"
        @click="$emit('click', $event.target.checked)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
      >
      <label class="form-check__label" :for="model">
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

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
      type: [String, Boolean],
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
  },
  data () {
    return {
      date: format
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
.form-check {
  position: relative;
  &__label {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #424242;
  }
}
input[type=checkbox] {
  width: 15px;
  height: 15px;
}
input[type=checkbox]:checked+label::before {
  content: "";
  display: block;
  position: absolute;
  text-align: center;
  height: 18px;
  width: 18px;
  left: 0;
  top: 0px;
  background-color: #069550;
  border: 3px solid #069550;
  box-sizing: border-box;
  border-radius: 4px;
  margin-top:2px;
}
input[type=checkbox]:checked+label::after {
  content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>');
  display: block;
  position: absolute;
  left: 2px;
  top: 4px;
}
</style>
