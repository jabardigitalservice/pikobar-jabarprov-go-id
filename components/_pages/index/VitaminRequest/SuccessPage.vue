<template>
  <div class="success-page container md:px-20 md:py-10">
    <img src="~assets/save-success.png" width="350px" height="216px">
    <span class="success-page__title">Data Berhasil Disimpan!</span>
    <p class="success-page__info lg:w-1/4">
      Pengajuan Vitamin dan Obat Anda berhasil disimpan,
      Proses verifikasi membutuhkan waktu 1x24 Jam.
      Selanjutnya Anda akan dihubungi memalui Email atau No. Telp
      yang telah didaftarkan.
    </p>
    <button
      class="success-page__button sm:mr-0 bg-brand-green hover:bg-brand-green-light lg:w-80 w-full"
      @click="onNext"
    >
      Kembali ke halaman utama
    </button>
  </div>
</template>

<script>
export default {

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
