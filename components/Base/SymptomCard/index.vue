<template>
  <div class="card-symptom">
    <div class="card-symptom__grid">
      <CardAccentSquares
        v-for="(val, i) in data"
        :key="i"
        bordered
        :accent-color="val.color"
        class="card-symptom__grid-item"
      >
        <div class="text-black">
          <img :src="val.image" alt="Symptom Image">
          <div class="card-symptom__title">
            {{ val.title }}
          </div>
          <div class="text-left">
            {{ val.body }}
          </div>
        </div>
      </CardAccentSquares>
    </div>
  </div>
</template>
<script>
import { CardAccentSquares } from '~/components/Base/Card'

export default {
  components: {
    CardAccentSquares
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.card-symptom {
  &__grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 16px;
  }
  &__grid-item {
    grid-column: auto / span 12;
  }

  &__title {
    @apply py-6 font-bold text-left;
  }

  @screen md {
    &__grid {
      gap: 16px;
    }
  }

  @screen lg {
    &__grid {
      gap: 32px;
    }
    &__grid-item {
      grid-column: auto / span 4;
    }
  }
}

</style>
