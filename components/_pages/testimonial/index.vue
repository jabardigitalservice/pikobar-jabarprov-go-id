<template>
  <div class="testimoni">
    <h2 class="testimoni__title">
      <strong>Testimoni</strong>
    </h2>
    <carousel class="testimoni__carousel">
      <slide v-for="testimoni in dataTestimoni" :key="testimoni.key">
        <TestimoniCard
          :name="testimoni.name"
          :address="testimoni.address"
          :image="defaultAvatar"
          :message="testimoni.message"
        />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import TestimoniCard from './TestimoniCard'
import dataTestimoni from './testimoni'
import defaultAvatar from '~/assets/illustrations/default_avatar.png'

export default {
  components: {
    TestimoniCard,
    Carousel,
    Slide
  },
  data () {
    return {
      defaultAvatar,
      dataTestimoni
    }
  }
}
</script>

<style lang="scss">
.testimoni {
  &__title {
    @apply mb-4 text-left text-xl;

    @screen md {
      @apply mb-8 text-2xl;
    }
  }

  &__carousel {
    .VueCarousel-slide {
      @apply p-2;
    }
    .VueCarousel-pagination{
      @apply relative;
    }
    .VueCarousel-dot {
      &-container {
        @apply -m-2
        #{!important};
      }
    }
    .VueCarousel-dot--active {
        @apply bg-green-600
        #{!important};
    }
  }
}

@media (max-width: 640px) {
  .testimoni {
    &__carousel {
      .VueCarousel-inner {
        @apply block overflow-hidden;
      }
      .VueCarousel-dot {
        @apply hidden;
      }
    }
  }
}
</style>
