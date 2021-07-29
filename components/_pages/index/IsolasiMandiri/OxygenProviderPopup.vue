<template>
  <div
    :class="{
      'oxygen-provider-popup': true,
      'oxygen-provider-popup--show': show
    }"
    @click.self="onClickOverlay"
  >
    <div class="oxygen-provider-popup__content-wrapper">
      <button
        class="oxygen-provider-popup__btn-close"
        @click.stop="onClickCloseButton"
      >
        <FontAwesomeIcon
          :icon="iconFaTimes"
          class="absolute"
          color="white"
        />
      </button>
      <div class="oxygen-provider-popup__content">
        <figure
          v-for="(card, index) in cards"
          :key="index"
          :class="{
            'oxygen-provider-popup__card': true,
            'oxygen-provider-popup__card--coming-soon': card.comingSoon
          }"
          @click="onClickCard(card)"
        >
          <img
            :src="card.image"
            class="oxygen-provider-popup__card__image"
          >
          <img
            :src="comingSoonBannerImage"
            class="oxygen-provider-popup__card__banner"
          >
          <figcaption
            class="oxygen-provider-popup__card__caption"
          >
            <p>
              {{ card.title }}
            </p>
            <p>
              {{ card.body }}
            </p>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { faTimes as iconFaTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import govBuildingImage from '~/assets/illustrations/gov-building.png'
import citizenImage from '~/assets/illustrations/citizen.png'
import comingSoonBannerImage from '~/assets/illustrations/coming-soon-banner.png'
export default {
  data () {
    return {
      iconFaTimes,
      comingSoonBannerImage,
      show: false
    }
  },
  computed: {
    ...mapState('oxygen', {
      /* eslint-disable camelcase */
      formRequestBacklink: state => state.formBacklinks?.form_request,
      formRequestToGovBacklink: state => state.formBacklinks?.form_request_to_gov
      /* eslint-enable camelcase */
    }),
    cards () {
      return [
        {
          image: govBuildingImage,
          title: 'Ajukan permohonan ke pemerintahan',
          body: `
            Pinjaman oksigen langsung dari pemerintah
            dengan mengisi formulir permohonan
          `,
          backlink: null,
          comingSoon: true
        },
        {
          image: citizenImage,
          title: 'Cari pemilik tabung oksigen',
          body: `
            Pinjaman oksigen langsung dari warga sekitar
            dengan mencari pemilik tabung sekitar Anda
          `,
          backlink: this.formRequestBacklink
        }
      ]
    }
  },
  watch: {
    show: {
      immediate: false,
      handler (isOpen) {
        document.documentElement
          .style
          .setProperty('overflow-y', isOpen ? 'hidden' : 'auto')
      }
    }
  },
  methods: {
    open () {
      this.show = true
    },
    close () {
      this.show = false
    },
    onClickCloseButton () {
      this.close()
    },
    onClickOverlay () {
      this.close()
    },
    onClickCard (card) {
      if (card.backlink) {
        window.open(card.backlink, '_blank')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.oxygen-provider-popup {
  @apply fixed z-50
  inset-0 w-screen h-screen;
  background-color: rgba(0,0,0,0.2);
  transition: background-color 0.5s ease-out;

  @screen md {
    @apply flex justify-center items-center;
  }

  &:not(&--show) {
    background-color: rgba(0,0,0,0);
    pointer-events: none;
  }

  &--show & {
    &__content-wrapper {
      bottom: 0;
    }
  }

  @screen md {
    &:not(&--show) {
      display: none;
    }
  }

  &__content-wrapper {
    @apply absolute z-50 overflow-visible;
    bottom: -100%;
    transition: all 0.5s ease-out;

    @screen md {
      bottom: unset !important;
      transition: none;
    }
  }

  &__content {
    @apply overflow-y-auto
    w-full  p-4 pt-12
    rounded-lg
    flex flex-col flex-no-wrap
    bg-white shadow-xl;
    max-height: 80vh;
    gap: 24px;

    @screen md {
      max-width: 80vw;
      width: 720px;
      @apply p-16 flex-row;
    }
  }

  &__btn-close {
    @apply absolute
    flex flex-row justify-center items-center
    rounded-full
    bg-black;
    width: 3rem;
    height: 3rem;
    top: -1rem;
    left: calc((100% - 3rem) / 2);

    &:hover {
      @apply bg-gray-800;
    }

    &:focus
    &:active {
      outline: none !important;
    }

    @screen md {
      left: unset;
      right: -1rem;
    }
  }

  &__card {
    @apply cursor-pointer
    relative
    w-full p-4
    flex flex-col flex-no-wrap
    items-center
    rounded-lg
    border border-solid border-gray-200
    text-center;

    &:not(&--coming-soon):hover {
      @apply border-green-600;
    }

    @screen md {
      @apply w-1/2;
    }

    &__image {
      @apply inline-block h-auto
      object-center object-cover
      rounded-lg;
      width: 240px;
      max-width: 100%;
    }

    &__banner {
      top: 0.5rem;
      width: calc(50% - 2rem);
      max-width: 100px;
      @apply absolute hidden;
    }

    &__caption {
      p:nth-child(1) {
        @apply my-2 text-xl font-bold;
        padding: 0 12.5%;
      }

      p:nth-child(2) {
        @apply text-gray-600 text-base;
      }

      @screen md {
        @apply flex-1 flex flex-col justify-between;
      }
    }

    &--coming-soon {
      @apply cursor-not-allowed;
    }
    &--coming-soon & {
      &__image {
        filter: brightness(50%);
      }
      &__banner {
        @apply block;
      }
    }
  }
}
</style>
