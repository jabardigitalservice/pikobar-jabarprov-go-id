<template>
  <div class="isoman">
    <h2 class="isoman__title">
      <strong>Pelayanan Kesehatan & Telekonsultasi Selama Isolasi Mandiri</strong>
    </h2>
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
    <div class="flex flex-col flex-no-wrap sm:flex-row gap-4 mt-4 lg:mt-6 lg:gap-6">
      <ActionCard
        class="w-full lg:w-1/2"
        title="Konsultasi dengan Dokter"
        body="Bagi Wargi yang membutuhkan obat, yuk konsultasikan terlebih dahulu dengan dokter melalui layanan telekonsultasi dokter Pikobar"
        prompt="Tanyakan Sekarang"
        :event="konsultasiDokterEvent"
        :image="konsultasiDokterImage"
        :backlink="konsultasiDokter"
      />
      <ActionCard
        class="w-full lg:w-1/2"
        title="Permohonan Kebutuhan Vitamin"
        body="Ajukan permohonan kebutuhan vitamin untuk isolasi mandiri"
        prompt="Ajukan Sekarang"
        :event="permohonanKebutuhanEvent"
        :image="permohonanKebutuhanImage"
        :backlink="permohonanKebutuhan"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import ExpandableContent from './ExpandableContent'
import ActionCard from './ActionCard'
import { konsultasiDokter, permohonanKebutuhan } from './backlinks'
import {
  TAP_KONSULTASI_DOKTER as konsultasiDokterEvent,
  TAP_PERMOHONAN_ISOMAN as permohonanKebutuhanEvent
} from './events'
import permohonanKebutuhanImage from '~/assets/illustrations/permohonan-kebutuhan-isoman.png'
import konsultasiDokterImage from '~/assets/illustrations/konsultasi-dokter.png'

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
      permohonanKebutuhan,
      permohonanKebutuhanImage,
      permohonanKebutuhanEvent
    }
  },
  computed: {
    ...mapState('self-isolation', [
      'isInfoItemsLoading',
      'infoItems'
    ])
  }
}
</script>

<style lang="scss" scoped>
.isoman {
  &__title {
    @apply mb-4 text-left text-xl;

    @screen md {
      @apply mb-8 text-2xl;
    }
  }
}
.html-content::v-deep {
  .table-ap {
    display: grid;
    gap: 0 1rem;
    @apply -mt-4;

    &__col-header {
      @apply px-4 py-2 mt-4
      bg-green-600
      text-lg text-white;
    }

    &__col-header,
    &__col-body {
      @apply block
      border border-solid border-green-600;
    }

    &__col-body {
      @apply border-t-0 border-b-0;
    }

    &__col-sect {
      @apply px-4 py-2
      border-b border-solid border-gray-400;

      &--last {
        @apply border-b border-solid border-green-600;
      }

      &__title {
        @apply block text-green-600;
      }

      &__divider {
        @apply -mx-4;
      }

      ul {
        @apply mt-4
        text-gray-800 leading-normal;
      }

      ul > li + li {
        @apply mt-4;
      }
    }
  }
}
</style>
