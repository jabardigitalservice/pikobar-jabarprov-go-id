<template>
  <div class="container mx-auto">
    <div class="md:m-8 md:p-8 result-card">
      <img src="~assets/tracking-not-found.png" width="350px">
      <span class="text-2xl font-bold text-center">
        Data Permohonan Tidak Ditemukan
      </span>
      <span class="text-center">
        Maaf, kami tidak dapat menemukan data permohonan yang anda cari.
      </span>
    </div>
  </div>
</template>

<style scoped>
.result-card {
  @apply flex flex-col p-5 m-4
  rounded-lg bg-white shadow-md
  items-center
}
</style>
