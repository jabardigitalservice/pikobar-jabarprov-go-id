
<template>
  <div class="container mx-auto">
    <section class="m-4 md:m-8">
      <DonationBanners />
      <h4 class="px-8 py-8 md:pt-16 md:pb-12 text-center text-xl md:text-3xl">
        <b>Ambil Bagianmu Sekarang!</b>
      </h4>
      <div class="action-buttons">
        <nuxt-link
          class="action-button bg-brand-green-light"
          to="/donate/logistic"
          tag="a"
        >
          <span class="action-button__text">
            Bantu kebutuhan Non Tunai
          </span>
          <FontAwesomeIcon class="flex-none ml-3 text-2xl lg:text-4xl" :icon="icon.faArrowCircleRight" />
        </nuxt-link>
        <nuxt-link
          class="action-button bg-brand-blue-light"
          to="/donate/fund"
          tag="a"
        >
          <span class="action-button__text">
            Bantu kebutuhan Tunai
          </span>
          <FontAwesomeIcon class="flex-none ml-3 text-2xl lg:text-4xl" :icon="icon.faArrowCircleRight" />
        </nuxt-link>
      </div>
    </section>
    <section v-if="false" class="m-4 mt-8 md:m-8 md:mt-16">
      <div class="p-5 md:p-8 rounded-lg border border-solid border-gray-300 bg-white">
        <CollectedDonationTable />
      </div>
    </section>
    <section class="m-4 md:m-8 rounded-lg border border-solid border-gray-300 bg-white">
      <KPBMContact />
    </section>
  </div>
</template>
<script>
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { analytics } from '~/lib/firebase'

export default {
  components: {
    DonationBanners: () => import('../../components/_pages/donate/Banner'),
    KPBMContact: () => import('../../components/_pages/donate/KPBMContact'),
    CollectedDonationTable: () => import('../../components/_pages/donate/CollectedDonationTable')
  },
  data () {
    return {
      icon: {
        faArrowCircleRight
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('donate_view')
      }
    })
  }
}

</script>

<style lang="scss" scoped>

.action-buttons {
  @apply flex flex-col;

  @screen lg {
    @apply -mx-4 flex-row flex-no-wrap items-stretch;
  }
}

.action-button {
  z-index: 1;
  @apply relative w-full px-8 py-10 my-2
  inline-block flex flex-row justify-between items-center
  rounded-lg text-white;

  @screen lg {
    &::before {
      content: '';
      border-radius: inherit;
      top: -1rem;
      left: -1rem;
      right: -1rem;
      bottom: -1rem;
      background-color: rgba(0,0,0,0.075);
      @apply absolute z-0 block opacity-0;
    }

    &:hover,
    &:focus {
      @apply outline-none;

      &::before {
        @apply opacity-100;
      }
    }

    &:active {
      opacity: 0.8;
    }
  }

  @screen lg {
    @apply flex-1 mx-4 my-0 py-16;
  }

  &__text {
    @apply inline-block flex-1 text-left text-xl font-bold;

    @screen lg {
      @apply text-3xl;
    }
  }
}
</style>
