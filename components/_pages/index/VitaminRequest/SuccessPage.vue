<template>
  <div class="success-page container md:px-20 md:py-10">
    <img src="~assets/save-success.png" width="350px" height="216px">
    <span class="success-page__title">Data Berhasil Disimpan!</span>
    <div class="success-page__result w-full lg:w-4/12">
      <div v-for="item in result" :key="item.title" class="flex flex-row">
        <span class="w-6/12 text-sm md:text-base">{{ item.title }}</span>
        <span class="w-6/12 text-sm md:text-base">: {{ item.value }}</span>
      </div>
    </div>
    <p class="success-page__info lg:w-5/12">
      Pengajuan Vitamin dan Obat Anda berhasil disimpan,
      Proses verifikasi membutuhkan waktu 1x24 Jam.
      Selanjutnya Anda akan dihubungi memalui Email atau No. Telp
      yang telah didaftarkan.
    </p>
    <button
      class="success-page__button sm:mr-0 bg-brand-green hover:bg-brand-green-light lg:w-3/12 w-full"
      @click="onReturn"
    >
      Kembali ke halaman utama
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      result: null
    }
  },
  computed: {
    ...mapState('isoman', [
      'receipt'
    ])
  },
  created () {
    this.result = [
      {
        title: 'ID Permohonan',
        value: this.receipt.request_number || ''
      },
      {
        title: 'NIK',
        value: this.receipt.nik || ''
      },
      {
        title: 'Nama Pemohon',
        value: this.receipt.name || ''
      },
      {
        title: 'Nama Paket',
        value: this.receipt.package_name || ''
      }
    ]
  },
  methods: {
    onReturn () {
      this.$emit('update:step', 0)
      this.$store.dispatch('isoman/resetForm')
      this.$store.dispatch('isoman/resetReceipt')
    }
  }
}
</script>

<style lang="scss" scoped>
.success-page {
  @apply mx-auto px-10 py-5 my-4
  rounded-lg bg-white shadow-md
  flex flex-col w-full items-center
  gap-3;

  &__title {
    font-size: 20px;
    font-weight: 700;
    color: #4F4F4F;
  }

  &__result {
    @apply flex flex-col gap-2 mb-2;

    color: #4F4F4F;
  }

  &__info {
    @apply text-center;

    font-size: 14px;
    color: #4F4F4F;
  }

  &__button {
    @apply px-4 py-2 rounded-lg text-white
    justify-center items-center
  }
}
</style>
