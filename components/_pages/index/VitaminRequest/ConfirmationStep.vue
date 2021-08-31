<template>
  <div class="form-input container md:px-20 md:py-10">
    <ConfirmationDetail
      v-for="content in contentList"
      :key="content.title"
      :title="content.title"
      :content="content.data"
      class="mb-4"
    />
    <hr class="my-6 -mx-10">
    <div class="flex flex-row gap-2 lg:justify-between">
      <button
        class="button__cancel sm:mr-0 hover:bg-gray-100 lg:w-40 w-full"
        @click="onBack"
      >
        Kembali
      </button>
      <button
        class="button__next sm:mr-0 bg-brand-green hover:bg-brand-green-light lg:w-40 w-full"
        @click="onNext"
      >
        Berikutnya
      </button>
    </div>
  </div>
</template>

<script>
import ConfirmationDetail from './ConfirmationDetail.vue'
import { identity, address, medical } from './confirmationDetail.js'
export default {
  components: {
    ConfirmationDetail
  },
  data () {
    return {
      contentList: [
        identity,
        address,
        medical
      ]
    }
  },
  methods: {
    onBack () {
      this.$emit('update:step', 2)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    onNext () {
      /**
        @todo: Proceed to next step
      */
    }
  }
}
</script>

<style lang="scss" scoped>
.form-input {
  @apply mx-auto px-10 py-5 my-4
  rounded-lg bg-white shadow-md
  flex flex-col w-full;
}
.button {
  &__next {
    @apply px-4 py-2 rounded-lg text-white
    justify-center items-center
  }

  &__cancel {
    @apply px-4 py-2 rounded-lg text-gray-600
    justify-center items-center border-gray-400
    border-2 border-solid font-bold
  }
}
</style>
