<template>
  <div>
    <Section class="pt-16 bg-white">
      <ContentCard v-bind="listContent[0]">
        <template #body>
          <p class="mt-3">
            Laman ini berguna untuk mengetahui tata cara mengakses data penerima bantuan sosial yang telah disalurkan atau masih dalam proses penyaluran melalui Website Kemensos.
          </p>
          <p class="info">
            *Laman ini tidak ditujukan untuk melakukan pengajuan bantuan sosial
          </p>
        </template>
      </ContentCard>
    </Section>
    <Section class="py-6 md:py-16 bg-white">
      <Jumbotron>
        <div class="mx-2">
          <template>
            <p class="disclaimer">
              Halaman ini hanya ditujukan untuk memeriksa penyaluran bantuan sosial dari Kementerian Sosial Republik Indonesia, tidak untuk mengajukan bantuan sosial. Kunjungi FAQ atau hubungi Hotline Pikobar untuk aduan/pertanyaan lebih lanjut.
            </p>
          </template>
        </div>
      </Jumbotron>
    </Section>
    <div class="timeline-title">
      Bagaimana Cara Mengakses Data
      <div>
        <span class="px-2">Penerima</span><span class="text-green-600">Bansos Kemensos</span>?
      </div>
    </div>
    <Section class="py-6 md:py-16 bg-white mx-auto w-full h-full">
      <Timeline />
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
    Timeline: () => import('./Timeline'),
    SocialAssistanceCard
  },
  data () {
    return {
      imgFlowBansos: 'https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2Fdekstop-flow-bansos.png?alt=media&token=69acce3b-9c01-45f4-8ee0-0d311050887b',
      listContent: [
        {
          title: 'Selamat datang di Laman Informasi Data Penerima Bantuan Sosial Kemensos',
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

<style lang="scss" scoped>
p {
  color: #424242;
}
.info {
  @apply italic mt-6;

  font-size: 14px;
}
.disclaimer {
  font-family: 'Roboto', sans-serif;
  color: #424242;
}
.timeline-title {
  @apply bg-white text-3xl text-center font-bold overflow-x-auto;

  font-family: 'Lora', serif;
  color: #424242;
}
</style>
