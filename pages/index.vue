
<template>
  <div>
    <client-only>
      <PopupCampaign />
      <Section class="bg-white">
        <TopAlert />
      </Section>
    </client-only>
    <Section class="pt-20 bg-white">
      <ContentCard v-bind="listContent[0]">
        <template #button="props">
          <ContentCardButton
            v-bind="props"
            class="mt-6"
          />
        </template>
      </ContentCard>
    </Section>
    <Section class="py-20 bg-white">
      <BannerCarousel />
    </Section>
    <Section
      id="eventStatistics"
      class="py-20 bg-gray-50"
      v-bind="section.eventStatistics"
    >
      <EventStatistics
        ref="eventStatistics"
        @loading="onSectionLoad('eventStatistics', $event)"
      />
      <div class="mt-6 md:mt-10 flex flex-row justify-center">
        <ContentCardButton v-bind="button.eventStatistics" />
      </div>
    </Section>
    <Section class="bg-white">
      <ContentCard
        v-for="(data, index) in listContent.slice(1)"
        :key="index"
        v-bind="data"
        class="py-20"
      />
    </Section>
    <Section
      class="py-20 bg-gray-50"
      v-bind="section.recentNews"
    >
      <RecentNewsCarousel
        ref="recentNews"
        @loading="onSectionLoad('recentNews', $event)"
      />
      <div class="mt-6 md:mt-10 flex flex-row justify-center">
        <ContentCardButton v-bind="button.recentNews" />
      </div>
    </Section>
    <Section
      class="py-20 bg-white"
      v-bind="section.miscInfo"
    >
      <InfographicAndDocument v-model="model.infoAndDocTab" />
      <div class="mt-6 md:mt-10 flex flex-row justify-center">
        <ContentCardButton
          v-if="model.infoAndDocTab === 0"
          key="infographics"
          v-bind="button.infographics"
        />
        <ContentCardButton
          v-if="model.infoAndDocTab === 1"
          key="documents"
          v-bind="button.documents"
        />
      </div>
    </Section>
    <Section class="bg-white">
      <EmergencyNumbers />
    </Section>
  </div>
</template>

<script>
import { analytics } from '~/lib/firebase'
import TopAlert from '~/components/TopAlert'
import PopupCampaign from '~/components/PopupCampaign'
import Section from '~/components/Base/Section'
import ContentCard from '~/components/ContentCard'
import ContentCardButton from '~/components/ContentCard/ContentCardButton'
import BannerCarousel from '~/components/Homepage/BannerCarousel'
import EventStatistics from '~/components/Homepage/EventStatistics'
import RecentNewsCarousel from '~/components/Homepage/RecentNewsCarousel'
import InfographicAndDocument from '~/components/Homepage/InfographicAndDocument'
import EmergencyNumbers from '~/components/Homepage/EmergencyNumbers'

export default {
  components: {
    PopupCampaign,
    TopAlert,
    Section,
    ContentCard,
    ContentCardButton,
    BannerCarousel,
    EventStatistics,
    RecentNewsCarousel,
    InfographicAndDocument,
    EmergencyNumbers
  },
  data () {
    return {
      model: {
        infoAndDocTab: 0
      },
      section: {
        eventStatistics: {
          loading: true,
          title: 'Angka Kejadian Di Jawa Barat',
          subtitle: null
        },
        recentNews: {
          loading: true,
          title: 'Berita Terkini',
          subtitle: null
        },
        miscInfo: {
          title: 'Informasi Lainnya',
          alignHeader: 'left'
        }
      },
      listContent: [
        {
          title: 'Pusat Informasi & Koordinasi Covid-19 Jawa Barat',
          body: 'Media komunikasi dan informasi penanganan Covid-19 satu pintu di Jawa Barat. Hadirkan data dan visualisasi perkembangan kasus terkini Covid-19. Dilengkapi ragam layanan kesehatan digital pendukung kedaruratan pandemi.',
          image: '/img/icon-hero.svg',
          imagePosition: 'right',
          backLink: '#eventStatistics',
          prompt: 'Selanjutnya'
        },
        {
          header: 'Kenali Covid-19',
          title: 'Kenali Informasi Seputar Covid-19',
          body: 'Ketahui penyakit yang disebabkan oleh Novel Coronavirus (2019-nCoV), gejala, serta penularan Covid-19. Dapatkan informasi soal tindakan yang harus dilakukan jika tertular Covid-19, juga tren penanganan pandemi di Jawa Barat.',
          image: '/img/icon-kenali-covid.svg',
          imagePosition: 'right',
          backLink: '/',
          buttonType: 'outline',
          prompt: 'Selanjutnya'
        },
        {
          header: 'Penanganan Covid-19',
          title: 'Apa itu Testing, Tracing, Treatment (3T)?',
          body: 'Testing, tracing, dan treatment atau melakukan pengetesan, penelusuran kontak, dan perawatan terhadap pasien Covid-19 dapat bantu petakan penularan sedini mungkin, sehingga peluang penyebaran Covid-19 bisa diantisipasi. Ketahui lebih jauh perkembangan upaya 3T di Jawa Barat selengkapnya.',
          image: '/img/icon-isoman.svg',
          imagePosition: 'left',
          backLink: '/',
          buttonType: 'outline',
          prompt: 'Selanjutnya'
        },
        {
          header: 'Informasi Vaksin',
          title: 'Pelajari Informasi soal Vaksinasi Covid-19',
          body: 'Ketahui lebih jauh program Vaksinasi Covid-19 sebagai upaya mencapai herd immunity sekaligus menurunkan angka penyakit dan kematian akibat Covid-19. Baca selengkapnya untuk mengetahui informasi lebih lanjut tentang Vaksinasi Covid-19 di Jawa Barat.',
          image: '/img/icon-inject-vaccine.svg',
          imagePosition: 'right',
          backLink: '/',
          buttonType: 'outline',
          prompt: 'Selanjutnya'
        }
      ],
      button: {
        eventStatistics: {
          backLink: '/data',
          prompt: 'Selengkapnya',
          buttonType: 'outline'
        },
        recentNews: {
          backLink: '/articles?tab=jabar',
          prompt: 'Lihat Berita Selengkapnya',
          buttonType: 'outline'
        },
        infographics: {
          backLink: '/info/infographics',
          prompt: 'Lihat Selengkapnya',
          buttonType: 'outline'
        },
        documents: {
          backLink: '/info/documents',
          prompt: 'Lihat Selengkapnya',
          buttonType: 'outline'
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('homepage_view')
      }
    })
  },
  methods: {
    onSectionLoad (name, isLoading) {
      const { lastUpdate } = this.$refs[name]
      this.section[name].loading = isLoading
      this.section[name].subtitle = !isLoading && lastUpdate
        ? `Update Terakhir: ${lastUpdate}`
        : null
    }
  }
}

</script>
