<template>
  <div class="container mx-auto p-5">
    <header class="flex flex-row justify-start md:justify-center items-center">
      <img
        class="w-20 mr-4 lg:mr-6 h-full object-contain object-center"
        src="/logo.jpg"
      >
      <h3 class="text-xl lg:text-2xl leading-none">
        <b>Pikobar</b>
        <br>
        <small class="opacity-75">
          Pusat Informasi dan Koordinasi COVID-19 Jawa Barat
        </small>
      </h3>
    </header>
    <section class="max-w-xl mx-auto my-8 md:p-8 md:bg-white md:rounded-lg md:shadow-xl md:border md:border-solid md:border-gray-300">
      <h4 class="text-xl text-center">
        <strong>Perhatian</strong>
      </h4>
      <br>
      <p>
        Pendaftaran Peserta TES MASIF COVID-19 bersifat terbatas dan
        hanya diprioritaskan bagi masyarakat dengan profesi interaksi tinggi dengan publik,
        rawan terinfeksi dan/atau yang memiliki gejala COVID-19.
        <br><br>
        Peserta yang telah <b>melalui tahap diagnosa dari fitur Periksa Mandiri</b>
        dan telah mendaftarkan diri, akan diverifikasi dan divalidasi oleh Dinas Kesehatan Kabupaten/Kota dan Dinas Kesehatan Provinsi.
        Hanya peserta yang disetujuilah yang dapat mengikuti tes ini.
      </p>
      <br>
      <p class="text-center my-4">
        <a
          class="appearance-none px-4 py-2 rounded-lg text-white bg-brand-blue"
          :href="backlink"
        >
          Mengerti
        </a>
      </p>
    </section>
  </div>
</template>

<script>
import { useNoIndexMeta } from '~/lib/metainfo'

export default {
  layout: 'blank',
  data () {
    return {
      backlink: 'https://covid19.prixa.ai/partner/80b47a20-1353-49e9-af91-a0a5995ca89f/app/52b7d983-3e5d-49cc-9c99-508dc779aad3'
    }
  },
  head () {
    return useNoIndexMeta()
  }
}
</script>
