<template>
  <div :class="['dialog-popup', isActive && 'is-active']" @click.self="onClose">
    <div class="dialog-popup__content">
      <header>
        <h5 class="text-2xl">
          <b>{{ title }}</b>
        </h5>
        <div class="flex justify-end gap-2 pt-6">
          <button
            class="button__cancel sm:mr-0 hover:bg-gray-100 w-full"
            @click="onClose"
          >
            Tidak
          </button>
          <button
            class="button__next sm:mr-0 bg-brand-green hover:bg-brand-green-light w-full"
            @click="onSubmit"
          >
            Ya
          </button>
        </div>
      </header>
      <FontAwesomeIcon
        :icon="icon.faTimesCircle"
        size="lg"
        class="dialog-popup__close-btn"
        @click.prevent.stop="onClose"
      />
    </div>
  </div>
</template>

<script>
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    returnSubmit: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      icon: {
        faTimesCircle
      }
    }
  },
  methods: {
    onClose () {
      this.$emit('update:isActive', false)
      this.$emit('update:returnSubmit', false)
    },
    onSubmit () {
      this.$emit('update:isActive', false)
      this.$emit('update:returnSubmit', true)
      this.$emit('update')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-popup {
  @apply hidden pointer-events-none
  fixed inset-0 z-50
  justify-center items-center;

  &.is-active {
    background-color: rgba(0,0,0,0.25);
    backdrop-filter: blur(4px);
    @apply pointer-events-auto
    flex;
  }

  &__content {
    min-width: 320px;
    max-width: 600px;
    width: 75vw;
    max-height: 600px;
    @apply z-50 relative
    p-4
    rounded-md
    bg-white
    shadow-xl;

    @screen md {
      @apply p-8;
    }
  }

  &__close-btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
    @apply cursor-pointer;
  }
}
</style>
