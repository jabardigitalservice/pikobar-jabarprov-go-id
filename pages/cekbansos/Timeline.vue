<template>
  <div class="bansos-timeline">
    <div class="bansos-timeline__content">
      <!-- left -->
      <div class="bansos-timeline__content--left">
        <TimelineJumbotron class="bansos-timeline__body--left">
          <template>
            Kunjungi Portal Bansos Kementrian Sosial
          </template>
        </TimelineJumbotron>
        <div class="bansos-timeline__line">
          <div class="bansos-timeline__line--position">
            <div class="bansos-timeline__line--color" />
          </div>
          <div class="bansos-timeline__circle">
            <h1 class="bansos-timeline__circle--number">
              1
            </h1>
          </div>
        </div>
      </div>
      <!-- right -->
      <div class="bansos-timeline__content--right">
        <div class="bansos-timeline__line">
          <div class="bansos-timeline__line--position">
            <div class="bansos-timeline__line--color" />
          </div>
          <div class="bansos-timeline__circle">
            <h1 class="bansos-timeline__circle--number">
              2
            </h1>
          </div>
        </div>
        <TimelineJumbotron
          :position="'right'"
          class="bansos-timeline__body--right"
        >
          <template>
            Pilih Provinsi, Kab/Kota, Kecamatan, Desa/Kelurahan Tempat Tinggalmu
          </template>
        </TimelineJumbotron>
      </div>
      <!-- left -->
      <div class="bansos-timeline__content--left">
        <TimelineJumbotron class="bansos-timeline__body--left">
          <template>
            Masukkan Nama Sesuai Dengan KTP
          </template>
        </TimelineJumbotron>
        <div class="bansos-timeline__line">
          <div class="bansos-timeline__line--position">
            <div class="bansos-timeline__line--color" />
          </div>
          <div class="bansos-timeline__circle">
            <h1 class="bansos-timeline__circle--number">
              3
            </h1>
          </div>
        </div>
      </div>
      <!-- right -->
      <div class="bansos-timeline__content--right">
        <div class="bansos-timeline__line">
          <div class="bansos-timeline__line--position">
            <div class="bansos-timeline__line--color" />
          </div>
          <div class="bansos-timeline__circle">
            <h1 class="bansos-timeline__circle--number">
              4
            </h1>
          </div>
        </div>
        <TimelineJumbotron
          :position="'right'"
          class="bansos-timeline__body--right"
        >
          <template>
            Masukkan 4 Kode Yang Tertera Dalam Kotak
          </template>
        </TimelineJumbotron>
      </div>
      <!-- left -->
      <div class="bansos-timeline__content--left">
        <TimelineJumbotron class="bansos-timeline__body--left">
          <template>
            Jika Tidak Terlihat Jelas, Klik Kotak Kode Untuk Mendapatkan Kode Baru
          </template>
        </TimelineJumbotron>
        <div class="bansos-timeline__line">
          <div class="bansos-timeline__line--position">
            <div class="bansos-timeline__line--color" />
          </div>
          <div class="bansos-timeline__circle">
            <h1 class="bansos-timeline__circle--number">
              5
            </h1>
          </div>
        </div>
      </div>
      <!-- right -->
      <div class="bansos-timeline__content--right">
        <div class="bansos-timeline__line">
          <div class="bansos-timeline__line--position">
            <div class="bansos-timeline__line--color" />
          </div>
          <div class="bansos-timeline__circle">
            <h1 class="bansos-timeline__circle--number">
              6
            </h1>
          </div>
        </div>
        <TimelineJumbotron
          :position="'right'"
          class="bansos-timeline__body--right"
        >
          <template>
            Klik Tombol Cari Dan Telurusi Data Penerima Bantuan Sosial
          </template>
        </TimelineJumbotron>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: {
    TimelineJumbotron: () => import('~/components/Base/Jumbotron/TimelineJumbotron')
  }
}
</script>
<style lang="scss" scoped>
.bansos-timeline {
  @apply items-center justify-center relative;

  &__content {
    @apply flex flex-col p-2;

    @screen md {
      @apply grid grid-cols-9;
    }
    &--left {
      @apply flex flex-row-reverse;

      @screen md {
        @apply contents;
      }
    }

    &--right {
      @apply flex;

      @screen md {
        @apply contents;
      }
    }
  }

  &__body {
    &--left {
      @apply col-start-1 col-end-5 p-4 rounded-xl my-4 shadow-md;
    }

    &--right {
      @apply col-start-6 col-end-10 p-4 rounded-xl my-4 shadow-md;
    }
  }

  &__line {
    @apply col-start-5 col-end-6 mr-10;

    &--position {
        @apply h-full flex items-center justify-center;
    }

    &--color {
        @apply h-full w-1 bg-gray-500 pointer-events-none;
    }

    @screen md {
      @apply mx-auto;
    }
  }

  &__circle {
    @apply w-10 h-10 relative -mt-24 pr-2 rounded-full bg-green-600 shadow;

    &--number {
      @apply flex pl-4 py-2 text-white font-semibold text-lg;
    }
  }
}
</style>
