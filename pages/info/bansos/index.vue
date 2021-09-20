<template>
  <div>
    <Section class="pt-16 bg-white">
      <ContentCard v-bind="listContent[0]">
        <template #body>
          <div class="mt-3">
            Laman ini berguna untuk mengetahui tata cara mengakses data penerima bantuan sosial yang telah disalurkan atau masih dalam proses penyaluran melalui Website Kemensos.
          </div>
          <div class="text-gray-500 mt-5">
            *Laman ini tidak ditujukan untuk melakukan pengajuan bantuan sosial
          </div>
        </template>
      </ContentCard>
    </Section>
    <Section class="py-6 md:py-16 bg-white">
      <Jumbotron>
        <div class="mx-2">
          <template>
            Halaman yang dituju adalah halaman untuk memeriksa penyaluran bantuan sosial dari kementrian sosial Republik Indonesia. BUKAN untuk pengajuan bantuan sosial. Jika ada aduan atau pertanyaan lebih lanjut silahkan kunjungi FAQ atau hubungi hotline kami.
          </template>
        </div>
      </Jumbotron>
    </Section>
    <Section class="py-6 md:py-16 bg-white">
      <ImageMobile v-if="isMobile" />
      <ImageDekstop v-else />
    </Section>
    <Section class="py-6 md:py-16 bg-white">
      <SocialAssistanceCard />
    </Section>
  </div>
</template>
<script>
import { analytics } from '~/lib/firebase'
import Section from '~/components/Base/Section'
import ContentCard from '~/components/Base/ContentCard'
import Jumbotron from '~/components/Base/Jumbotron'
import SocialAssistanceCard from '~/components/Base/SocialAssistanceCard'

export default {
  components: {
    Section,
    ContentCard,
    Jumbotron,
    SocialAssistanceCard,
    ImageMobile: () => import('./ImageMobile'),
    ImageDekstop: () => import('./ImageDekstop')
  },
  data () {
    return {
      isMobile: false,
      listSymptom: [
        {
          title: 'Demam ≥ 38°C',
          body: 'Demam merupakan gejala pertama yang diderita sebagian besar pasien Covid-19. Ada kecenderungan pasien mengalami demam selama beberapa hari setelah terkena virus.',
          image: '../img/icon-fever.svg',
          color: '#FFB900'
        },
        {
          title: 'Batuk Kering',
          body: 'Hal ini dikarenakan infeksi virus menyebar ke dalam tubuh melalui hidung atau mulut, sehingga gejala kedua yang dapat menyebabkan timbulnya penyakit ini adalah batuk.',
          image: '../img/icon-cough.svg',
          color: '#30a5ff'
        },
        {
          title: 'Sesak Napas',
          body: 'Berdasarkan studi yang diterbitkan dalam jurnal JAMA menyebutkan bahwa gejala akibat Covid-19 ini bisa bertahan lama. Ini mungkin disebabkan peradangan yang berlangsung cukup lama di paru-paru.',
          image: '../img/icon-congested.svg',
          color: '#069550'
        }
      ],
      section: {
        loading: false,
        title: 'Gejala Umum Covid-19',
        subtitle: 'Jika ada orang yang dalam 14 hari sebelum muncul gejala di bawah ini pernah melakukan perjalanan ke negara terjangkit, atau pernah merawat/kontak erat dengan penderita Covid-19, maka terhadap orang tersebut akan dilakukan pemeriksaan laboratorium lebih lanjut untuk memastikan diagnosisnya.'
      },
      listContent: [
        {
          title: 'Selamat datang di Portal Informasi Data Penerima Bantuan Sosial Kemensos',
          image: '/img/icon-social-assistance.svg',
          imagePosition: 'right'
        }
      ]
    }
  },
  async mounted () {
    await this.$nextTick()
    analytics.logEvent('bansos_view')
  }
}
</script>
