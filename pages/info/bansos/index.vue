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
      <img class="md:w-full" :src="imgFlowBansos" alt="content-image-flow-bansos">
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
    SocialAssistanceCard
  },
  data () {
    return {
      imgFlowBansos: 'https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2Fdekstop-flow-bansos.png?alt=media&token=69acce3b-9c01-45f4-8ee0-0d311050887b',
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
