<template>
  <Jumbotron :show-bubble="false">
    <template #header>
      Akses Layanan Kesehatan Bagi Pasien <span class="text-green-600">Isolasi Mandiri</span>?
    </template>
    <template>
      <!-- Todo: fix subtitle wording which actually -->
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur in sed aenean risus pellentesque eget dapibus sed tristique.
    </template>
    <div class="isoman__content-card-grids">
      <ContentCardButton
        prompt="Konsultasi Dokter Pikobar"
        :back-link="permohonanKonsultasiDokter"
        button-type="outline"
        width="358px"
        height="120px"
        class="isoman__card"
        src="icon-teleconsult.svg"
      />
      <ContentCardButton
        prompt="Permohonan Vitamin Pikobar"
        :back-link="permohonanKebutuhan"
        button-type="outline"
        width="358px"
        class="isoman__card"
        height="120px"
        src="icon-medicine.svg"
      />
      <ContentCardButton
        prompt="Layanan Oksigen"
        back-link="/oxygen"
        button-type="outline"
        width="358px"
        class="isoman__card"
        height="120px"
        src="icon-oxigen.svg"
      />
    </div>
  </Jumbotron>
</template>

<script>
import { permohonanKonsultasiDokter, permohonanKebutuhan } from './backlinks'
import Jumbotron from '~/components/Base/Jumbotron'
import ContentCardButton from '~/components/Base/ContentCard/ContentCardButton'
export default {
  components: {
    Jumbotron,
    ContentCardButton
  },
  data () {
    return {
      permohonanKonsultasiDokter,
      permohonanKebutuhan
    }
  }
}
</script>

<style lang="scss" scoped>
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
      @apply grid grid-cols-3
      gap-4 mt-4;
    }

    @screen lg {
      @apply gap-6 mt-3;
    }
  }
}
</style>
