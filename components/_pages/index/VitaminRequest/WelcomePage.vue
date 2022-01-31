<template>
  <div class="welcome-page welcome-page__background container flex-col-reverse lg:flex-row">
    <div class="welcome-page__content lg:w-1/2 items-center lg:items-start">
      <h2 class="text-4xl font-bold">
        Selamat Datang,
      </h2>
      <p class="text-center lg:text-left">
        {{ redactionText }}
      </p>
      <p class="hidden lg:block">
        (Catatan: Mohon maaf Wargi Jabar, tidak semua permohonan dapat disetujui. Setiap permohonan yang masuk, akan diverifikasi terlebih dahulu dari sisi NIK, kelengkapan alamat, validitas hasil PCR/Antigen, dan area distribusi pengiriman hanya Jawa Barat)
      </p>
      <button
        class="welcome-page__button sm:mr-0 bg-brand-green hover:bg-brand-green-light lg:w-40 w-full"
        @click="onClick"
      >
        Mulai
      </button>
    </div>
    <div class="welcome-page__ilustration lg:w-1/2">
      <img src="~assets/vitamin-request.png" width="482px" height="348px">
    </div>
  </div>
</template>

<script>
import { redactionConsultation, redactionVitamin } from '~/components/_pages/index/IsolasiMandiri/backlinks'

export default {
  props: {
    consultation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      redactionConsultation,
      redactionVitamin
    }
  },
  computed: {
    redactionText () {
      return (this.consultation) ? redactionConsultation : redactionVitamin
    }
  },
  methods: {
    onClick () {
      this.$emit('update:step', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
h2, p {
  color: #4F4F4F;
}
.welcome-page {
  @apply mx-auto p-20 my-4
  rounded-lg bg-white shadow-md
  flex items-center
  bg-no-repeat bg-right;

  @media (min-width: 1024px) {
    &__background {
      background-image: url('~assets/vitamin-request-background.png');
      height: 60vh;
    }
  }

  &__content {
    @apply flex flex-col gap-4
  }

  &__ilustration {
    @apply flex justify-center
  }

  &__button {
    @apply px-4 py-2 rounded-lg text-white
    justify-center items-center
  }
}
</style>
