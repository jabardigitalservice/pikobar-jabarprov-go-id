<template>
  <div class="form-input md:px-20 md:py-10">
    <div class="header">
      <span class="step__title">
        Konsultasi Dokter
      </span>
      <span class="step__info">
        Konsultasi dengan dokter mengenai gejala yang Anda rasakan
      </span>
    </div>
    <div class="isoman__content-checked-grids">
      <CheckedCard
        icons="checked.svg"
        label="Isi formulir data diri"
        :style="[{ width: '180px' }]"
      />
      <ArrowRight
        :class="[isMobile ? '' : 'p-4 ml-12']"
      />
      <CheckedCard
        icons="checked.svg"
        label="Konsultasi dengan dokter"
        :style="[{ width: '210px' }]"
      />
      <ArrowRight
        :class="[isMobile ? '' : 'p-4 ml-16']"
      />
      <CheckedCard
        icons="checked.svg"
        label="Dapatkan resep"
        :style="[{ width: '150px' }]"
      />
      <ArrowRight
        :class="[isMobile ? '' : 'p-4 ml-12']"
      />
      <CheckedCard
        icons="checked.svg"
        label="Lacak pengiriman"
        :style="[{ width: '160px' }]"
      />
      <ArrowRight
        :class="[isMobile ? '' : 'p-4 ml-12']"
      />
      <CheckedCard
        icons="checked.svg"
        label="Terima paket"
        :style="[{ width: '150px' }]"
      />
    </div>
    <BaseAlert
      :icon="faInfoCircle"
      info
      class="mt-8 alert__content"
      label="Stok obat dan vitamin masih tersedia"
    />
    <div class="isoman__content-card-grids">
      <ContentCardButton
        prompt="Isi Formulir Data Diri"
        subtitle="Lengkapi formulir sebelum konsultasi"
        size="big"
        :back-link="permohonanKonsultasiDokter"
        button-type="outline"
        height="120px"
        class="isoman__card"
        src="icon-formulir.svg"
      />
      <ContentCardButton
        prompt="Lacak Permohonan"
        subtitle="Sudah dapat resep? Lacak pengiriman di sini"
        button-type="outline"
        size="big"
        :back-link="trackApplication"
        class="isoman__card"
        height="120px"
        src="icon-location.svg"
      />
    </div>
  </div>
</template>

<script>
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Utils from '@/utils/index.js'
import { permohonanKonsultasiDokter, trackApplication } from '@/components/_pages/index/IsolasiMandiri/backlinks'
import BaseAlert from '@/components/Base/Alert'
import ContentCardButton from '@/components/Base/ContentCard/ContentCardButton'
import CheckedCard from '@/components/Base/CheckedCard'
import ArrowRight from '@/components/Base/ArrowRight'

export default {
  components: {
    ContentCardButton,
    CheckedCard,
    BaseAlert,
    ArrowRight
  },
  data () {
    return {
      permohonanKonsultasiDokter,
      faInfoCircle,
      trackApplication,
      isMobile: false
    }
  },
  mounted () {
    this.isMobile = Utils.checkIsMobile()
  }
}
</script>

<style lang="scss" scoped>
.form-input {
  @apply mx-auto px-10 py-5 my-4
  rounded-lg bg-white shadow-md
  flex flex-col w-full pb-24;
}
.header {
  @apply mx-auto rounded-lg flex flex-col w-full;
}
.step {
  font-family: font-lora;
  display: flex;
  align-items: center;
  color: #424242;
  &__title {
    @apply mb-2;
    font-style: normal;
    font-weight: bold;
    font-size: 37px;
    line-height: 60px;
  }
  &__info {
    @apply mb-12;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
  }
}
.isoman {
   &__card {
     @apply bg-white;
     color: #424242;
     border: 1px solid #E0E0E0;
   }

   &__content-card-grids {
    @apply pt-10 block;
    line-height: 7.5rem;

    @screen sm {
      @apply grid grid-cols-2
      gap-4 mt-4;
    }

    @screen lg {
      @apply gap-6 mt-3;
    }
  }

  &__content-checked-grids {
    @apply block;

    @screen sm {
      @apply grid grid-cols-9
      gap-4 mt-4;
    }

    @screen lg {
      @apply gap-6 mt-3;
    }
  }
}
.alert__content {
  @apply font-roboto text-brand-black;
  font-size: 14px;
  word-spacing: 1px;
  font-weight: 500;
  font-style: normal;
  line-height: 24px;
}
</style>
