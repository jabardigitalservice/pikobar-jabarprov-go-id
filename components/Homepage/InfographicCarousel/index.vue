<template>
  <div class="infographic-carousel">
    <figure
      v-for="(item, index) in infographics"
      :key="index"
      class="infographic-carousel__container divide-y divide-gray-200"
      @click="onClickSlide(item.route)"
    >
      <div class="infographic-carousel__img-container">
        <img
          :src="item.images[0] || null"
          class="infographic-carousel__img cursor-pointer rounded-lg"
          :class="{'h-64': !isImageLoaded}"
          @load="isImageLoaded = true"
          @click.prevent="$router.push(item.route)"
        >
      </div>
      <caption class="infographic-carousel__caption overflow-ellipsis">
        <nuxt-link :to="item.route">
          {{ item.title }}
        </nuxt-link>
      </caption>
    </figure>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'InfographicCarousel',
  data () {
    return {
      isImageLoaded: false
    }
  },
  computed: {
    ...mapState('infographics', {
      infographics: 'items'
    }),
    loading () {
      return !Array.isArray(this.infographics) ||
        !this.infographics.length
    }
  },
  mounted () {
    this.$store.dispatch('infographics/getItems', {
      perPage: 4
    })
  },
  watch: {
    isImageLoaded (val) {
      this.$emit('update:isImageLoaded', val)
    }
  },
  methods: {
    onClickSlide (slide) {
      const { route } = slide
      if (typeof route !== 'string' || !route.length) {
        return
      }
      if (route.startsWith('http')) {
        return window.open(route, '_blank')
      } else {
        return this.$router.push(route)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.infographic-carousel {
  @apply grid grid-cols-1 gap-6;

  @screen md {
    @apply grid-cols-2;
  }

  @screen lg {
    @apply grid-cols-3;
  }

  @screen xl {
    @apply grid-cols-4;
  }

  &__container {
    @apply relative w-full bg-white
    rounded-lg border;
  }

  &__caption {
    @apply px-4 py-2 text-left
    block w-full font-medium opacity-75;

    &:hover {
      @apply underline;
    }

    font-family: 'Roboto', sans-serif;
  }

  &__img-container {
    @apply relative overflow-hidden;

    > img {

      &:hover {
        opacity: 0.5;

        @screen lg {
          opacity: 1;
        }
      }
    }
    > .action-overlay {
      cursor: pointer;
      pointer-events: none;
      opacity: 0;
      transform: translateY(1rem);
      transition-property: opacity, transform;
      transition-duration: 0.25s;
      transition-timing-function: ease-in-out;
    }
    &:hover {

      > .action-overlay {
        pointer-events: all;
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  &__img {
    @apply w-full object-cover object-left-top
    shadow-lg;
  }
}
</style>
