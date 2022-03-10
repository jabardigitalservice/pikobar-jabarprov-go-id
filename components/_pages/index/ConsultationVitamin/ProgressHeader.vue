<template>
  <div class="header">
    <span class="step__title">
      {{ title }}
    </span>
    <span class="step__info">
      {{ subtitle }}
    </span>
    <div class="step__img">
      <div v-for="item in 5" :key="item">
        <img
          v-show="step === item"
          :src="img"
          width="1200px"
          :alt="item"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: null
    },
    consultation: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    img () {
      return require(`~/assets/progressbar/progress-${this.step}.svg`)
    },
    title () {
      return this.consultation ? 'Konsultasi Dokter' : 'Pengajuan Vitamin'
    },
    subtitle () {
      return this.consultation ? 'Konsultasi dengan dokter mengenai gejala yang Anda rasakan' : 'Ajukan vitamin ketika Anda sedang melakukan isolasi mandiri dengan mengisi form ini'
    }
  }
}
</script>

<style lang="scss" scoped>
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
  &__img {
    @apply mb-6 self-center text-center;
  }
}
</style>
