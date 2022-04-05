<template>
  <div class="isoman">
    <div class="isoman__title">
      <h2 class="header">
        Baca Panduan <span class="text-green-600">Isolasi Mandiri</span>
      </h2>
    </div>
    <ContentLoader
      v-if="isInfoItemsLoading"
      :speed="3"
      :height="48"
    >
      <rect width="100%" height="100%" rx="2" ry="2" />
    </ContentLoader>
    <template v-else>
      <ExpandableContent
        v-for="(item, i) in infoItems"
        :key="i"
        :open="i === 0"
      >
        <template #title>
          {{ item.title }}
        </template>
        <div
          class="html-content"
          v-html="item.content"
        />
      </ExpandableContent>
    </template>
    <div
      v-show="false"
      class="isoman__action-card-grids"
    >
      <ActionCard
        class="isoman__action-card"
        title="Konsultasi dengan Dokter"
        body="Bagi Wargi yang membutuhkan obat, yuk konsultasikan terlebih dahulu dengan dokter melalui layanan telekonsultasi dokter Pikobar"
        prompt="Daftar Konsultasi"
        :event="konsultasiDokterEvent"
        :image="konsultasiDokterImage"
        :backlink="permohonanKonsultasiDokter"
      />
      <ActionCard
        class="isoman__action-card"
        title="Permohonan Kebutuhan Vitamin"
        body="Ajukan permohonan kebutuhan vitamin untuk isolasi mandiri"
        prompt="Ajukan Sekarang"
        :event="permohonanKebutuhanEvent"
        :image="permohonanKebutuhanImage"
        :backlink="permohonanKebutuhan"
      />
      <ActionCard
        class="isoman__action-card"
        title="Saya Butuh Tabung Oksigen"
        body="Warga dapat ajukan permohonan tabung oksigen ke pemerintah & warga di sini"
        prompt="Klik untuk pengajuan"
        :event="peminjamOksigenEvent"
        :image="peminjamOksigenImage"
        :backlink="peminjamOksigenJotform"
      />
      <ActionCard
        class="isoman__action-card"
        title="Saya Punya Tabung Oksigen"
        body="Pinjam atau donasikan tabung oksigen Anda bagi warga yang membutuhkan"
        prompt="Daftar sekarang"
        :event="pemberiOksigenEvent"
        :image="pemberiOksigenImage"
        :backlink="pemberiOksigenJotform"
      />
    </div>
    <div
      v-show="false"
      class="flex flex-col flex-no-wrap sm:flex-row gap-4 mt-4 lg:mt-6"
    >
      <ActionCard
        class="w-full"
        title="Lacak Permohonan Vitamin/Obat Anda"
        body="Anda dapat mengetahui status tindak lanjut permohonan obat/vitamin yang telah diajukan melalui tombol di bawah ini"
        prompt="Lacak di Sini"
        :event="trackApplicationEvent"
        :image="deliveryImage"
        :backlink="trackApplication"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import ExpandableContent from './ExpandableContent'
import ActionCard from './ActionCard'
import { konsultasiDokter, permohonanKebutuhan, trackApplication, permohonanKonsultasiDokter } from './backlinks'
import {
  TAP_KONSULTASI_DOKTER as konsultasiDokterEvent,
  TAP_PERMOHONAN_ISOMAN as permohonanKebutuhanEvent,
  TAP_TRACK_APPLICATION as trackApplicationEvent,
  TAP_PEMINJAM_OKSIGEN as peminjamOksigenEvent,
  TAP_PEMBERI_OKSIGEN as pemberiOksigenEvent
} from './events'
import permohonanKebutuhanImage from '~/assets/illustrations/permohonan-kebutuhan-isoman.png'
import konsultasiDokterImage from '~/assets/illustrations/konsultasi-dokter.png'
import deliveryImage from '~/assets/illustrations/delivery.svg'
import peminjamOksigenImage from '~/assets/illustrations/peminjam-oksigen.png'
import pemberiOksigenImage from '~/assets/illustrations/pemberi-oksigen.png'

export default {
  components: {
    ExpandableContent,
    ActionCard,
    ContentLoader
  },
  data () {
    return {
      konsultasiDokter,
      konsultasiDokterImage,
      konsultasiDokterEvent,
      permohonanKonsultasiDokter,
      permohonanKebutuhan,
      permohonanKebutuhanImage,
      permohonanKebutuhanEvent,
      trackApplication,
      trackApplicationEvent,
      deliveryImage,
      peminjamOksigenImage,
      peminjamOksigenEvent,
      peminjamOksigenJotform: process.env.NUXT_ENV_FORM_OXYGEN_REQUEST,
      pemberiOksigenImage,
      pemberiOksigenEvent,
      pemberiOksigenJotform: process.env.NUXT_ENV_FORM_OXYGEN_PROVIDE
    }
  },
  computed: {
    ...mapState('self-isolation', [
      'isInfoItemsLoading',
      'infoItems'
    ])
  },
  methods: {
    onOpenOxygenRequestPopup () {
      this.$refs.popup.open()
    }
  }
}
</script>

<style lang="scss" scoped>
.isoman {
  &__title {
    @apply mb-4 mt-4 text-center text-xl;

    @screen md {
      @apply mb-8 text-2xl;
    }
  }

  &__action-card-grids {
    @apply block;

    @screen sm {
      @apply grid grid-cols-2
      gap-4 mt-4;
    }

    @screen lg {
      @apply gap-6 mt-6;
    }
  }

  &__action-card {
    @apply my-4;

    @screen sm {
      @apply m-0;
    }
  }
}
.header {
  @apply inline-block mb-4 text-xl font-bold font-lora;
  @screen sm {
    font-size: 28px;
  }
}
.html-content::v-deep {
  @apply grid grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 gap-2 col-span-1 flex flex-col;

  .panduan-isolasi {
    @apply text-left text-gray-800;
    ol {
      @apply list-outside text-left text-gray-800;

      li {
        @apply ml-4 pl-4;
      }
    }
  }

  @media (min-width: 1024px) {
    .lg:grid-cols-4 {
      grid-template-columns: repeat(4,minmax(0,1fr));
    }
  }
  @media (min-width: 768px) {
    .md:grid-cols-3 {
      grid-template-columns: repeat(3,minmax(0,1fr));
    }
  }
  @media (min-width: 640px) {
    .sm:grid-cols-2 {
      grid-template-columns: repeat(2,minmax(0,1fr));
    }
  }
}
</style>
