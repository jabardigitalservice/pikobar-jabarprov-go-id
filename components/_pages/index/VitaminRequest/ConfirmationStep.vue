<template>
  <div class="form-input container md:px-20 md:py-10">
    <span class="step-info">
      Cek kembali data yang sudah Anda inputkan, jika terdapat kesalahan, silahkan kembali untuk memperbaiki
    </span>
    <ConfirmationDetail
      v-for="content in contentList"
      :key="content.title"
      :title="content.title"
      :content="content.data"
      class="mb-4"
    />
    <hr class="my-6 -mx-10">
    <Alert
      v-if="showAlert"
      :label="alertMessage"
      :show.sync="showAlert"
      class="mb-3"
    />
    <div class="flex flex-row gap-2 lg:justify-between">
      <button
        class="button__cancel sm:mr-0 hover:bg-gray-100 lg:w-40 w-full"
        @click="onBack"
      >
        Kembali
      </button>
      <button
        class="button__next sm:mr-0 bg-brand-green hover:bg-brand-green-light lg:w-40 w-full"
        @click="onSubmit"
      >
        <Spinner v-if="isLoading" />
        <span v-else>Simpan</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { identity, address, medical } from './confirmationDetail.js'
import ConfirmationDetail from './ConfirmationDetail.vue'
import Spinner from '~/components/Spinner'
import Alert from '~/components/Alert'
export default {
  components: {
    ConfirmationDetail,
    Spinner,
    Alert
  },
  data () {
    return {
      contentList: [
        identity,
        address,
        medical
      ],
      isLoading: false,
      showAlert: false,
      alertMessage: 'Terjadi Kesalahan'
    }
  },
  computed: {
    ...mapState('isoman', [
      'receipt'
    ])
  },
  methods: {
    onBack () {
      this.$emit('update:step', 2)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    async onSubmit () {
      this.isLoading = true
      await this.$store.dispatch('isoman/postForm')
      this.isLoading = false
      if (Object.keys(this.receipt).length !== 0) {
        this.$emit('update:step', 4)
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        this.showAlert = true
      }
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
.step-info {
  @apply self-center mb-6 text-center;

  font-size: 16px;
  color: #4F4F4F;
}
</style>
