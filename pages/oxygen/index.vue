<template>
  <div>
    <Section class="py-6 md:py-20 bg-white">
      <ContentCard v-bind="headerContent" />
    </Section>
    <div id="section-oxygen-services" class="isoman__action-card-grids">
      <ActionCard
        class="isoman__action-card"
        :split-body="true"
        body="Warga dapat ajukan"
        body-split="Permohonan Tabung Oksigen"
        body-split-two="ke pemerintah & warga di sini"
        color-split-two="text-green-600"
        prompt="Klik untuk pengajuan"
        :event="peminjamOksigenEvent"
        :image="peminjamOksigenImage"
        :backlink="peminjamOksigenJotform"
      />
      <ActionCard
        class="isoman__action-card"
        :split-body="true"
        body="Pinjam"
        body-split="atau"
        body-split-two="Donasikan Tabung Oksigen"
        body-split-three="Anda bagi warga yang membutuhkan"
        color-split-one="text-green-600"
        color-split-three="text-green-600"
        prompt="Daftar sekarang"
        :event="pemberiOksigenEvent"
        :image="pemberiOksigenImage"
        :backlink="pemberiOksigenJotform"
      />
    </div>
    <br>
    <div class="container mx-auto">
      <div class="m-4 md:m-8 p-5 md:p-8 rounded-lg bg-white shadow-md">
        <h2 class="text-2xl font-bold leading-tight mb-6">
          Terapi Oksigen & Pemanfaatannya
        </h2>
        <ContentLoader
          v-if="isInfoItemsLoading"
          :speed="3"
          :height="48"
        >
          <rect width="100%" height="100%" rx="2" ry="2" />
        </ContentLoader>
        <template v-else>
          <ExpandableContent
            v-for="(item, i) in infoItems"
            :key="i"
          >
            <template #title>
              {{ item.title }}
            </template>
            <div
              class="html-content"
              v-html="item.content"
            />
          </ExpandableContent>
        </template>
      </div>
      <OxygenAccordion />
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapState } from 'vuex'
import { analytics } from '~/lib/firebase'
import ExpandableContent from '~/components/_pages/index/IsolasiMandiri/ExpandableContent'
import ContentCard from '~/components/Base/ContentCard'
import ActionCard from '~/components/_pages/index/IsolasiMandiri/ActionCard'
import { Section } from '~/components/Base/Section'
import {
  TAP_PEMINJAM_OKSIGEN as peminjamOksigenEvent,
  TAP_PEMBERI_OKSIGEN as pemberiOksigenEvent
} from '~/components/_pages/index/IsolasiMandiri/events'
import peminjamOksigenImage from '~/assets/illustrations/peminjam-oksigen.png'
import pemberiOksigenImage from '~/assets/illustrations/pemberi-oksigen.png'
export default {
  components: {
    ContentLoader,
    OxygenAccordion: () => import('~/components/OxygenAccordion'),
    ExpandableContent,
    ContentCard,
    Section,
    ActionCard
  },
  data () {
    return {
      headerContent: {
        headerSize: 'large',
        title: 'Tabung Oksigen Bagi Pasien Covid-19',
        body: 'Informasi mengenai pemanfaatan tabung oksigen & sebaran lokasi agen penyedia tabung oksigen di Jawa Barat',
        image: require('~/assets/illustrations/cek-oksigen.svg'),
        imagePosition: 'right',
        prompt: 'Selengkapnya',
        backLink: '#section-oxygen-services'
      },
      peminjamOksigenImage,
      pemberiOksigenImage,
      peminjamOksigenJotform: process.env.NUXT_ENV_FORM_OXYGEN_REQUEST,
      pemberiOksigenJotform: process.env.NUXT_ENV_FORM_OXYGEN_PROVIDE,
      peminjamOksigenEvent,
      pemberiOksigenEvent
    }
  },
  computed: {
    ...mapState('oxygen', [
      'isInfoItemsLoading',
      'infoItems'
    ])
  },
  mounted () {
    this.$store.dispatch('oxygen/getItems')
    this.$store.dispatch('oxygen/getTotals')
    this.$store.dispatch('oxygen/getInfoItems')
    this.$store.dispatch('oxygen/getCollectedDistricts')
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('oxygen_view')
      }
    })
  },
  head () {
    const title = 'Cari Oksigen - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.html-content::v-deep {
  table {
    overflow-x: auto;
    display: block;
    border-top: 1px solid #eee !important;
    border-left: 1px solid #eee !important;

    td {
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 0 16px;
      vertical-align: top;
    }
  }
}
.isoman {
  &__action-card-grids {
    @apply block;

    @screen sm {
      @apply grid grid-cols-2
      gap-4 mt-4 p-8;
    }

    @screen lg {
      @apply gap-6 mt-6;
    }
  }

  &__action-card {
    @apply font-semibold my-4;

    @screen sm {
      @apply m-0;
    }
  }
}
</style>
