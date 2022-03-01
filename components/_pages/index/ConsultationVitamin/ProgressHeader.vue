<template>
  <div class="header">
    <span class="step__title">
      Konsultasi Dokter
    </span>
    <span class="step__info">
      Konsultasi dengan dokter mengenai gejala yang Anda rasakan
    </span>
    <div class="step__img">
      <img
        v-show="step === 1"
        src="~/assets/progressbar/progress-1.svg"
        width="1200px"
        alt="Identitas Diri"
      >
      <img
        v-show="step === 2"
        src="~/assets/progressbar/progress-2.svg"
        width="1200px"
        alt="Identitas Diri"
      >
      <img
        v-show="step === 3"
        src="~/assets/progressbar/progress-3.svg"
        width="1200px"
        alt="Identitas Diri"
      >
      <img
        v-show="step === 4"
        src="~/assets/progressbar/progress-4.svg"
        width="1200px"
        alt="Identitas Diri"
      >
      <img
        v-show="step === 5"
        src="~/assets/progressbar/progress-5.svg"
        width="1200px"
        alt="Identitas Diri"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  @apply mx-auto rounded-lg flex flex-col w-full;
}
.step {
  font-family: Lora;
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
  &__img {
    @apply mb-6 self-center text-center;
  }
}
</style>
