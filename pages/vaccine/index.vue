<template>
  <div>
    <Section class="py-6 md:py-20 bg-white">
      <ContentCard v-bind="headerContent" />
    </Section>
    <Section class="pt-6 pb-10 md:py-20 bg-white">
      <VaccineJumbotron />
      <VaccinationContents class="pt-10 md:pt-24" />
    </Section>
    <Section class="py-6 md:py-20 bg-gray-100">
      <SectionHeader class="text-center">
        <template #title>
          <span>Tahapan Pelaksanaan <strong class="text-green-600">Vaksinasi Covid-19</strong></span>
        </template>
        <template #subtitle>
          Vaksinasi dilaksanakan dalam 4 tahapan dengan mempertimbangkan<br>
          ketersediaan dan waktu kedatangan
        </template>
      </SectionHeader>
      <VaccinationStages />
    </Section>
    <Section
      class="py-6 md:py-20 bg-white"
      v-bind="section.newsTab"
    >
      <NewsTabLayout v-model="model.newsTab" />
      <div class="mt-6 md:mt-10 flex flex-row justify-center">
        <ContentCardButton
          v-if="model.newsTab === 0"
          key="infographics"
          v-bind="button.recentNews"
        />
        <ContentCardButton
          v-if="model.newsTab === 1"
          key="documents"
          v-bind="button.antiHoaxNews"
        />
      </div>
    </Section>
    <Section class="pb-6 md:pb-20 bg-white">
      <ChatAndFaq />
    </Section>
  </div>
</template>
<script>
import { analytics } from '~/lib/firebase'
import { Section, SectionHeader } from '~/components/Base/Section'
import ContentCard from '~/components/Base/ContentCard'
import ContentCardButton from '~/components/Base/ContentCard/ContentCardButton'
import ChatAndFaq from '~/components/Vaccine/ChatAndFaq'
import VaccineJumbotron from '~/components/Vaccine/VaccineJumbotron'
import NewsTabLayout from '~/components/Vaccine/NewsTabLayout'
import VaccinationContents from '~/components/Vaccine/VaccinationContents'
import VaccinationStages from '~/components/Vaccine/VaccinationStages'

export default {
  components: {
    Section,
    SectionHeader,
    ContentCard,
    ContentCardButton,
    VaccineJumbotron,
    NewsTabLayout,
    ChatAndFaq,
    VaccinationContents,
    VaccinationStages
  },
  data () {
    return {
      model: {
        newsTab: 0
      },
      headerContent: {
        headerSize: 'large',
        title: 'Jadwal dan Lokasi Vaksinasi Covid-19',
        body: 'Temukan lokasi dan jadwal kegiatan vaksinasi Covid-19 yang akan berlangsung di Jawa Barat.',
        image: '/img/icon-vaccine-family.svg',
        imagePosition: 'right',
        prompt: 'Lihat di Sini',
        backLink: '/vaccine/schedule'
      },
      section: {
        newsTab: {
          title: 'Informasi Vaksin Lainnya',
          alignHeader: 'left'
        }
      },
      button: {
        recentNews: {
          prompt: 'Lihat Selengkapnya',
          backLink: '/articles?tab=jabar',
          buttonType: 'outline'
        },
        antiHoaxNews: {
          prompt: 'Lihat Selengkapnya',
          backLink: 'https://saberhoaks.jabarprov.go.id/v2/klarifikasi?key=vaksin',
          buttonType: 'outline'
        }
      }
    }
  },
  created () {
    if (process.client || process.browser) {
      analytics.logEvent('vaccinepage_view')
    }
  },
  head () {
    const title = 'Informasi Vaksinasi Covid-19 - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
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
